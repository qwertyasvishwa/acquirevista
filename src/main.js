import "./styles.css";
import { siteConfig } from "./site.config.js";

document.documentElement.classList.add("js");

function initMenu() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  if (!toggle || !nav) return;

  const close = (restoreFocus = false) => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    if (restoreFocus) toggle.focus();
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) close(true);
  });

  document.addEventListener("click", (event) => {
    if (nav.classList.contains("is-open") && !nav.contains(event.target) && !toggle.contains(event.target)) close();
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => close()));
}

function formDataToText(form) {
  const fields = new FormData(form);
  const labels = {
    fullName: "Name",
    workEmail: "Work email",
    companyName: "Company",
    phoneOrWhatsApp: "Phone",
    serviceInterest: "Interest",
    monthlyLeadGoal: "Monthly goal",
    message: "Context"
  };
  return Object.entries(labels)
    .map(([key, label]) => `${label}: ${String(fields.get(key) || "").trim()}`)
    .filter((line) => !line.endsWith(":"))
    .join("\n");
}

function initForms() {
  document.querySelectorAll("[data-lead-form]").forEach((form) => {
    const status = form.parentElement?.querySelector("[data-form-status]");
    const fallback = form.parentElement?.querySelector("[data-email-fallback]");
    const required = form.querySelectorAll("[required]");

    required.forEach((field) => {
      const update = () => field.setAttribute("aria-invalid", String(!field.validity.valid));
      field.addEventListener("blur", update);
      field.addEventListener("input", update);
      field.addEventListener("change", update);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      required.forEach((field) => field.setAttribute("aria-invalid", String(!field.validity.valid)));
      if (!form.checkValidity()) {
        form.reportValidity();
        if (status) status.textContent = "Please complete the required fields before preparing your email.";
        return;
      }

      const subject = form.dataset.formType === "audit"
        ? "AcquireVista free audit request"
        : "AcquireVista consultation request";
      const href = `mailto:${siteConfig.contact.primaryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formDataToText(form))}`;
      if (fallback instanceof HTMLAnchorElement) {
        fallback.href = href;
        fallback.hidden = false;
      }
      if (status) status.textContent = "Your email app should open with this request. If it does not, use the visible email link below.";
      window.location.href = href;
    });
  });
}

function initBackToTop() {
  const button = document.querySelector("[data-back-to-top]");
  if (!button) return;
  const update = () => button.classList.toggle("is-visible", window.scrollY > 560);
  window.addEventListener("scroll", update, { passive: true });
  update();
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

document.querySelectorAll("[data-current-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

document.querySelectorAll("a.brand").forEach((brand) => {
  brand.setAttribute("aria-label", "AcquireVista — Qualified outbound systems home");
});

const serviceLinks = [
  "Explore targeting and enrichment",
  "Explore multichannel outreach",
  "Explore appointment and CRM flow"
];
document.querySelectorAll(".service-card .text-link").forEach((link, index) => {
  if (serviceLinks[index]) link.textContent = serviceLinks[index];
});

initMenu();
initForms();
initBackToTop();
