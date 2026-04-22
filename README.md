# AcquireVista Revamp

Static multi-page Vite build for the AcquireVista lead-generation website refresh.

## Commands

```bash
npm install
npm run dev
npm run build
```

## Launch Checklist

- Replace the preview notice settings in `src/site.config.js`.
- Add the real form endpoint in `src/site.config.js`.
- Add the real business email, phone, and WhatsApp route.
- Replace policy owner details on the privacy page.
- Replace the proof framework placeholders with approved case studies, logos, or testimonials.
- Add production analytics tooling if required.

## Current Implementation Notes

- The site is intentionally built in preview mode because real contact and proof assets were not provided.
- Forms validate and simulate successful submission until a live endpoint is configured.
- Header, footer, service blocks, FAQs, and contact routing are rendered from a shared site config.
