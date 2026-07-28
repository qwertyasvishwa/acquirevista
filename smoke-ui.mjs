import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const baseUrl = "http://127.0.0.1:5173";
const pages = ["/", "/services/", "/about/", "/contact/", "/privacy/"];
const viewports = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 }
];

const outDir = path.resolve("qa-shots", "smoke-2026-07-28");
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const report = [];

try {
    for (const vp of viewports) {
        const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
        const page = await context.newPage();

        for (const route of pages) {
            const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
            await page.waitForTimeout(250);

            const metrics = await page.evaluate(async () => {
                const doc = document.documentElement;
                const body = document.body;
                const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
                const clientWidth = doc.clientWidth;

                const visibleTapTargets = [...document.querySelectorAll("a,button,input,select,textarea")]
                    .map((el) => {
                        const style = getComputedStyle(el);
                        const rect = el.getBoundingClientRect();
                        return {
                            style,
                            rect,
                            text: (el.textContent || el.getAttribute("aria-label") || el.getAttribute("placeholder") || "").trim()
                        };
                    })
                    .filter(({ style, rect }) => style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0);

                const tinyTapTargets = visibleTapTargets
                    .filter(({ rect }) => rect.width < 32 || rect.height < 32)
                    .slice(0, 8)
                    .map(({ text, rect }) => ({
                        text: text.slice(0, 60),
                        width: Math.round(rect.width),
                        height: Math.round(rect.height)
                    }));

                window.scrollTo(0, document.body.scrollHeight);
                await new Promise((resolve) => setTimeout(resolve, 500));

                const brokenImages = [...document.querySelectorAll("img")]
                    .filter((img) => img.naturalWidth === 0)
                    .map((img) => ({ src: img.getAttribute("src"), alt: img.getAttribute("alt") }));

                return {
                    title: document.title,
                    h1Count: document.querySelectorAll("h1").length,
                    primaryNavCount: document.querySelectorAll('nav[aria-label="Primary"] a').length,
                    hasHorizontalOverflow: scrollWidth > clientWidth + 1,
                    formFields: document.querySelectorAll("form input, form select, form textarea").length,
                    tinyTapTargets,
                    brokenImages
                };
            });

            const shotPath = path.join(outDir, `${vp.name}-${route === "/" ? "home" : route.replaceAll("/", "")}.png`);
            await page.screenshot({ path: shotPath, fullPage: true });

            report.push({
                viewport: vp.name,
                path: route,
                status: response?.status() ?? null,
                screenshot: shotPath,
                ...metrics
            });
        }

        // mobile nav behavior check only in mobile viewport
        if (vp.name === "mobile") {
            await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
            const menuBefore = await page.evaluate(() => {
                const btn = document.querySelector("[data-nav-toggle]");
                const nav = document.querySelector("[data-site-nav]");
                const style = btn ? getComputedStyle(btn) : null;
                const rect = btn ? btn.getBoundingClientRect() : null;
                return {
                    buttonExists: !!btn,
                    buttonDisplay: style?.display ?? null,
                    buttonVisible: !!(rect && rect.width > 0 && rect.height > 0),
                    ariaExpanded: btn?.getAttribute("aria-expanded") ?? null,
                    navOpenClass: !!nav?.classList.contains("is-open")
                };
            });

            if (menuBefore.buttonExists && menuBefore.buttonVisible) {
                await page.click("[data-nav-toggle]");
            }

            const menuAfter = await page.evaluate(() => {
                const btn = document.querySelector("[data-nav-toggle]");
                const nav = document.querySelector("[data-site-nav]");
                return {
                    ariaExpanded: btn?.getAttribute("aria-expanded") ?? null,
                    navOpenClass: !!nav?.classList.contains("is-open")
                };
            });

            report.push({ viewport: "mobile", path: "/ (menu-check)", status: 200, menuBefore, menuAfter });
        }

        await context.close();
    }
} finally {
    await browser.close();
}

const reportPath = path.resolve("qa-shots", "smoke-2026-07-28-report.json");
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
console.log(`Smoke report written to ${reportPath}`);
console.log(JSON.stringify(report, null, 2));
