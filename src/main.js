import { siteConfig } from "./site.config.js";
import "./styles.css";

const appWindow = /** @type {Window & typeof globalThis & {
  dataLayer?: Array<Record<string, unknown>>,
  acquireVistaAnalytics?: { track: typeof track }
}} */ (window);

const importMeta = /** @type {{ env?: { DEV?: boolean } }} */ (import.meta);

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
  if (!container || !siteConfig.meta.previewMode) {
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
        return `<a class="site-nav__link${isActive ? " is-active" : ""}" href="${item.href}">${item.label}</a>`;
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
            <div>
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
            <p class="eyebrow">Proof framework</p>
            <h3>${item.title}</h3>
            <p>${item.body}</p>
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

appWindow.acquireVistaAnalytics = { track };
