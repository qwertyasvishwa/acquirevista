# AcquireVista

Static multi-page Vite site for the AcquireVista outbound growth brand.

## Commands

```bash
npm install
npm run dev
npm run build
```

## Site Notes

- Shared copy is centralized in `src/site.config.js`.
- Contact routing falls back to the consultation form unless a live endpoint is configured.
- The privacy policy is written for India-first operations and can be extended later if needed.
- Proof sections are written to support approved case studies, testimonials, or metrics when available.

## Current Implementation Notes

- Header, footer, service blocks, FAQs, and contact routing are rendered from a shared site config.
- The forms are fully wired for UX and gracefully fall back when no live endpoint is set.
- The site is production-facing and can be deployed as-is, with optional future enhancements for analytics, booking, or CRM routing.
