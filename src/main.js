import { siteConfig } from "./site.config.js";
import "./styles.css";

const appWindow = /** @type {Window & typeof globalThis & {
  dataLayer?: Array<Record<string, unknown>>,
  acquireVistaAnalytics?: { track: typeof track }
}} */ (window);

const importMeta = /** @type {{ env?: { DEV?: boolean } }} */ (import.meta);

/** @type {Record<string, string>} */
const iconMap = {
  target: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 7.25a4.75 4.75 0 1 0 4.75 4.75"/><path d="M12 12L20.5 3.5"/></svg>',
  broadcast: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 15.5V8.5l8-3v13l-8-3Z"/><path d="M12.5 8.5c3 0 5.5 2.46 5.5 5.5s-2.5 5.5-5.5 5.5"/><path d="M15 11.25c1.25.7 2 1.74 2 2.75s-.75 2.05-2 2.75"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.5v3"/><path d="M17 3.5v3"/><rect x="4" y="6.5" width="16" height="14" rx="3"/><path d="M4 10.5h16"/><path d="M8 14h3"/><path d="M13 14h3"/><path d="M8 17h5"/></svg>',
  insights: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V9"/><path d="M12 19V5"/><path d="M19 19v-7"/><path d="M4 19.5h16"/></svg>',
  optimize: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5v4"/><path d="M12 16.5v4"/><path d="M4.22 7.72l2.82 2.82"/><path d="M16.96 16.46l2.82 2.82"/><path d="M3.5 12h4"/><path d="M16.5 12h4"/><path d="M4.22 16.28l2.82-2.82"/><path d="M16.96 7.54l2.82-2.82"/><circle cx="12" cy="12" r="3.5"/></svg>',
  globe: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M3.8 12h16.4"/><path d="M12 3.5c2.4 2.3 3.75 5.3 3.75 8.5S14.4 18.2 12 20.5c-2.4-2.3-3.75-5.3-3.75-8.5S9.6 5.8 12 3.5Z"/></svg>',
  message: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6.5h14a2.5 2.5 0 0 1 2.5 2.5v6A2.5 2.5 0 0 1 19 17.5H11l-4.5 3v-3H5A2.5 2.5 0 0 1 2.5 15V9A2.5 2.5 0 0 1 5 6.5Z"/></svg>',
  workflow: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="7" height="5" rx="2"/><rect x="13.5" y="14.5" width="7" height="5" rx="2"/><rect x="13.5" y="4.5" width="7" height="5" rx="2"/><path d="M10.5 7h2.5a2 2 0 0 1 2 2v1.5"/><path d="M15 12.5v2"/><path d="M10.5 7v7a2 2 0 0 0 2 2h1"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5 19 6v5.75c0 4.1-2.67 7.8-7 8.75-4.33-.95-7-4.65-7-8.75V6l7-2.5Z"/><path d="M9 12.2 11.1 14.3 15.5 9.9"/></svg>',
  growth: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18.5h16"/><path d="M6 15.5 10 11l3 3 5.5-6"/><path d="M15.5 8h3v3"/></svg>',
  chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5c4.97 0 9 3.13 9 7s-4.03 7-9 7c-.83 0-1.63-.09-2.38-.27L5 20l1.17-3.2C4.2 15.53 3 13.63 3 11.5c0-3.87 4.03-7 9-7Z"/></svg>'
};

/** @param {string} [iconName] */
function renderIcon(iconName) {
  return iconMap[iconName || "growth"] || iconMap.growth;
}

/** @param {unknown} value */
const isConfiguredValue = (value) =>
  typeof value === "string" && value.trim().length > 0;

const pageKey = document.body.dataset.page || "home";

/** @param {string} value */
function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/**
 * @param {string} eventName
 * @param {Record<string, unknown>} [detail]
 */
function track(eventName, detail = {}) {
  const payload = {
    event: eventName,
    page: pageKey,
    timestamp: new Date().toISOString(),
    ...detail
  };

  appWindow.dataLayer = appWindow.dataLayer || [];
  appWindow.dataLayer.push(payload);
  appWindow.dispatchEvent(new CustomEvent("acquirevista:track", { detail: payload }));

  if (importMeta.env?.DEV) {
    console.info("[AcquireVista analytics]", payload);
  }
}

function renderPreviewNotice() {
  const container = document.querySelector("[data-preview-notice]");
  if (!container) {
    return;
  }

  if (!siteConfig.meta.previewMode) {
    container.remove();
    return;
  }

  container.innerHTML = `
    <p>${escapeHtml(siteConfig.meta.previewNotice)}</p>
  `;
}

function renderNav() {
  const navTargets = document.querySelectorAll("[data-nav-links]");
  navTargets.forEach((target) => {
    target.innerHTML = siteConfig.nav
      .map((item) => {
        const isActive = item.href === window.location.pathname;
        return `<a class="site-nav__link${isActive ? " is-active" : ""}" href="${item.href}"${isActive ? ' aria-current="page"' : ""}>${item.label}</a>`;
      })
      .join("");
  });
}

function renderContactRoute() {
  const targets = document.querySelectorAll("[data-contact-route]");
  const email = isConfiguredValue(siteConfig.contact.primaryEmail)
    ? `<a href="mailto:${siteConfig.contact.primaryEmail}">${siteConfig.contact.primaryEmail}</a>`
    : "";
  const phone = isConfiguredValue(siteConfig.contact.primaryPhone)
    ? `<a href="tel:${siteConfig.contact.primaryPhone.replaceAll(" ", "")}">${siteConfig.contact.primaryPhone}</a>`
    : "";
  const lines = [email, phone].filter(Boolean);

  targets.forEach((target) => {
    target.innerHTML = lines.length
      ? lines.join("<span class=\"inline-divider\"></span>")
      : `<span>${siteConfig.contact.routingFallbackLabel}</span>`;
  });
}

/**
 * @param {string} selector
 * @param {string[]} items
 * @param {string} className
 * @param {keyof HTMLElementTagNameMap} [wrapper="div"]
 */
function renderSimpleList(selector, items, className, wrapper = "div") {
  document.querySelectorAll(selector).forEach((target) => {
    target.innerHTML = items
      .map((item) => `<${wrapper} class="${className}">${item}</${wrapper}>`)
      .join("");
  });
}

function renderServiceHighlights() {
  document.querySelectorAll("[data-service-highlights]").forEach((target) => {
    target.innerHTML = siteConfig.serviceHighlights
      .map(
        (service) => `
          <article class="service-line">
            <div class="service-line__headline">
              <span class="icon-badge icon-badge--soft">${renderIcon(service.icon)}</span>
              <p class="eyebrow">Service</p>
              <h3>${service.title}</h3>
            </div>
            <p>${service.summary}</p>
          </article>
        `
      )
      .join("");
  });
}

function renderServiceDetails() {
  document.querySelectorAll("[data-service-details]").forEach((target) => {
    target.innerHTML = siteConfig.serviceDetails
      .map(
        (service) => `
          <article class="detail-band">
            <div class="detail-band__intro">
              <span class="icon-badge">${renderIcon(service.icon)}</span>
              <p class="eyebrow">Service pillar</p>
              <h3>${service.title}</h3>
              <p>${service.strapline}</p>
            </div>
            <ul class="detail-band__list">
              ${service.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
            </ul>
          </article>
        `
      )
      .join("");
  });
}

function renderProcess() {
  document.querySelectorAll("[data-process-steps]").forEach((target) => {
    target.innerHTML = siteConfig.process
      .map(
        (item) => `
          <article class="process-step">
            <span class="icon-badge icon-badge--ghost">${renderIcon(item.icon)}</span>
            <span class="process-step__number">${item.step}</span>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </article>
        `
      )
      .join("");
  });
}

function renderPrinciples() {
  document.querySelectorAll("[data-principles]").forEach((target) => {
    target.innerHTML = siteConfig.principles
      .map(
        (item) => `
          <article class="principle">
            <span class="icon-badge icon-badge--soft">${renderIcon(item.icon)}</span>
            <h3>${item.title}</h3>
            <p>${item.body}</p>
          </article>
        `
      )
      .join("");
  });
}

function renderProofFramework() {
  document.querySelectorAll("[data-proof-framework]").forEach((target) => {
    target.innerHTML = siteConfig.proofFramework
      .map(
        (item) => `
          <article class="proof-slot">
            <span class="icon-badge icon-badge--soft">${renderIcon(item.icon)}</span>
            <p class="eyebrow">Proof framework</p>
            <h3>${item.title}</h3>
            <p>${item.body}</p>
          </article>
        `
      )
      .join("");
  });
}

function renderMetricHighlights() {
  document.querySelectorAll("[data-metric-highlights]").forEach((target) => {
    target.innerHTML = siteConfig.metricHighlights
      .map(
        (item) => `
          <article class="metric-card">
            <p class="metric-card__value">${item.value}</p>
            <h3>${item.label}</h3>
            <p>${item.support}</p>
          </article>
        `
      )
      .join("");
  });
}

function renderFaqs() {
  document.querySelectorAll("[data-faqs]").forEach((target) => {
    target.innerHTML = siteConfig.faqs
      .map(
        (item) => `
          <details class="faq-item">
            <summary>${item.question}</summary>
            <p>${item.answer}</p>
          </details>
        `
      )
      .join("");
  });
}

function renderFooterLinks() {
  document.querySelectorAll("[data-footer-links]").forEach((target) => {
    target.innerHTML = siteConfig.footerLinks
      .map((item) => `<a href="${item.href}">${item.label}</a>`)
      .join("");
  });
}

function renderAvailability() {
  document.querySelectorAll("[data-availability]").forEach((target) => {
    target.innerHTML = siteConfig.contact.availability
      .map((item) => `<li>${item}</li>`)
      .join("");
  });
}

function renderStickyBar() {
  const target = document.querySelector("[data-sticky-bar]");
  if (!target) {
    return;
  }

  const whatsappHref = isConfiguredValue(siteConfig.contact.whatsappUrl)
    ? siteConfig.contact.whatsappUrl
    : "/contact/#consultation-form";

  target.innerHTML = `
    <a href="/contact/#consultation-form" data-track="sticky_consultation_click">${siteConfig.contact.consultationLabel}</a>
    <a href="/#sample-leads" data-track="sticky_sample_click">${siteConfig.contact.sampleLabel}</a>
    <a href="${whatsappHref}" data-track="whatsapp_click">${siteConfig.contact.whatsappLabel}</a>
  `;
}

function renderHeroText() {
  const titleTarget = document.querySelector("[data-hero-title]");
  const bodyTarget = document.querySelector("[data-hero-body]");
  const kickerTarget = document.querySelector("[data-hero-kicker]");
  const supportTarget = document.querySelector("[data-hero-support]");
  if (titleTarget) titleTarget.textContent = siteConfig.hero.title;
  if (bodyTarget) bodyTarget.textContent = siteConfig.hero.body;
  if (kickerTarget) kickerTarget.textContent = siteConfig.hero.kicker;
  if (supportTarget) supportTarget.textContent = siteConfig.hero.support;
}

function trackLinkedElements() {
  /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll("[data-track]")).forEach((element) => {
  element.addEventListener("click", () => {
    track(element.dataset.track || "unknown_track", {
      label: element.textContent?.trim() || ""
    });
  });
});
}

/** @param {HTMLFormElement} form */
function collectFormPayload(form) {
  const formData = new FormData(form);
  return {
    fullName: formData.get("fullName")?.toString().trim() || "",
    workEmail: formData.get("workEmail")?.toString().trim() || "",
    companyName: formData.get("companyName")?.toString().trim() || "",
    phoneOrWhatsApp: formData.get("phoneOrWhatsApp")?.toString().trim() || "",
    serviceInterest: formData.get("serviceInterest")?.toString().trim() || "",
    monthlyLeadGoal: formData.get("monthlyLeadGoal")?.toString().trim() || "",
    message: formData.get("message")?.toString().trim() || "",
    page: pageKey,
    source: form.dataset.formType || "primary"
  };
}

/** @param {HTMLFormElement} form */
function getFormStatusNode(form) {
  return /** @type {HTMLElement | null} */ (form.parentElement?.querySelector("[data-form-status]") || null);
}

/** @param {ReturnType<typeof collectFormPayload>} payload */
async function submitLeadForm(payload) {
  if (!isConfiguredValue(siteConfig.forms.endpoint)) {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve({
          ok: true,
          preview: true,
          message: siteConfig.forms.successMessage
        });
      }, 650);
    });
  }

  const response = await fetch(siteConfig.forms.endpoint, {
    method: siteConfig.forms.method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Form request failed with status ${response.status}`);
  }

  return {
    ok: true,
    preview: false,
    message: "Thanks. Your consultation request has been sent."
  };
}

/** Toggle the mobile navigation open/closed. */
function initMobileNav() {
  const toggle = /** @type {HTMLButtonElement | null} */ (document.querySelector("[data-nav-toggle]"));
  const nav = document.getElementById("site-nav-main");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  // Close nav when a link inside it is clicked (single-page navigation)
  nav.addEventListener("click", (e) => {
    if (/** @type {HTMLElement} */ (e.target).closest("a")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    }
  });
}

/**
 * Animate metric card values counting up when they enter the viewport.
 */
function initMetricCountup() {
  /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll(".metric-card__value")).forEach((el) => {
  const raw = el.textContent?.trim() || "";
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return;

  const target = parseInt(match[1], 10);
  const suffix = match[2] || "";
  let started = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();

        const duration = 1000;
        const start = performance.now();

        function step(/** @type {number} */ now) {
          const elapsed = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - elapsed, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (elapsed < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(el);
});
}

/**
 * Adds scroll-reveal transitions to key sections using IntersectionObserver.
 */
function initScrollReveal() {
  const selectors = [
    ".section__intro",
    ".feature-band__copy",
    ".feature-band__visual",
    ".logo-pill",
    ".comparison-board",
    ".service-line",
    ".process-step",
    ".principle",
    ".proof-slot",
    ".industries-panel",
    ".faq-intro",
    ".faq-item",
    ".footer-cta",
    ".contact-panel",
    ".contact-aside",
    ".metric-card",
    ".page-hero-grid",
  ];

  /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll(selectors.join(","))).forEach((el) => {
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.07, rootMargin: "0px 0px -36px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function initForms() {
  /** @type {NodeListOf<HTMLFormElement>} */ (document.querySelectorAll("[data-lead-form]")).forEach((form) => {
  let hasTrackedStart = false;

  form.addEventListener(
    "focusin",
    () => {
      if (hasTrackedStart) return;
      hasTrackedStart = true;
      track("form_started", { formType: form.dataset.formType || "primary" });
    },
    { once: true }
  );

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const honeypot = /** @type {HTMLInputElement | null} */ (form.querySelector('input[name="companyWebsite"]'));
    if (honeypot && honeypot.value.trim()) {
      track("form_failed", { reason: "honeypot", formType: form.dataset.formType || "primary" });
      return;
    }

    const status = getFormStatusNode(form);
    const submitButton = /** @type {HTMLButtonElement | null} */ (form.querySelector('button[type="submit"]'));
    const payload = collectFormPayload(form);

    submitButton?.setAttribute("disabled", "true");
    if (status) {
      status.textContent = "Submitting...";
      status.dataset.state = "loading";
    }

    try {
      const result = await submitLeadForm(payload);
      if (status) {
        status.textContent = result.message;
        status.dataset.state = "success";
      }
      form.reset();
      track("form_submitted", {
        formType: form.dataset.formType || "primary",
        previewMode: String(result.preview)
      });
    } catch (error) {
      console.error(error);
      if (status) {
        status.textContent = siteConfig.forms.failureMessage;
        status.dataset.state = "error";
      }
      track("form_failed", {
        reason: "request_error",
        formType: form.dataset.formType || "primary"
      });
    } finally {
      submitButton?.removeAttribute("disabled");
    }
  });
});
}

renderPreviewNotice();
renderNav();
renderHeroText();
renderContactRoute();
renderSimpleList("[data-trust-signals]", siteConfig.trustSignals, "trust-signal", "li");
renderSimpleList("[data-industries]", siteConfig.industries, "industry-tag", "li");
renderMetricHighlights();
renderAvailability();
renderServiceHighlights();
renderServiceDetails();
renderProcess();
renderPrinciples();
renderProofFramework();
renderFaqs();
renderFooterLinks();
renderStickyBar();
trackLinkedElements();
initForms();
/** Shows a floating "Back to top" button after the user scrolls down 400px. */
function initBackToTop() {
  const btn = /** @type {HTMLButtonElement | null} */ (document.getElementById("back-to-top"));
  if (!btn) return;

  const toggle = () => {
    btn.classList.toggle("is-visible", window.scrollY > 400);
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

initMobileNav();
initScrollReveal();
initMetricCountup();
initBackToTop();

appWindow.acquireVistaAnalytics = { track };
