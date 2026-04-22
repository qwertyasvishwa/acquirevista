export const siteConfig = {
  meta: {
    brand: "AcquireVista",
    domain: "https://acquirevista.com",
    tagline: "Acquire high-quality customers. Not just leads.",
    previewMode: true,
    previewNotice:
      "Preview implementation: replace contact routes, proof assets, privacy owner details, and live form wiring before production.",
    socialImage: "/og-cover.svg"
  },
  contact: {
    consultationLabel: "Book a Free Consultation",
    sampleLabel: "Request Sample Leads",
    whatsappLabel: "Talk on WhatsApp",
    primaryEmail: "",
    primaryPhone: "",
    whatsappUrl: "",
    routingFallbackLabel: "Consultation form is the active contact route in this preview build.",
    availability: [
      "B2B-first outbound campaigns across UK, US, Australia, and GCC buying windows.",
      "Response workflows designed for founders, growth teams, and sales operators.",
      "Contact routing, consent, and policy details must be finalized before launch."
    ]
  },
  forms: {
    endpoint: "",
    method: "POST",
    successMessage:
      "Preview mode is active. The form UX is complete, but the live delivery endpoint still needs to be connected.",
    failureMessage:
      "Submission could not be completed. Verify the form endpoint and spam controls in site.config.js."
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" }
  ],
  hero: {
    kicker: "Qualified outbound growth systems",
    title: "Acquire High-Quality Customers. Not Just Leads.",
    body:
      "AcquireVista helps B2B-focused teams turn sharper targeting, cleaner outreach, and appointment-setting discipline into booked conversations and healthier pipeline.",
    support:
      "Built for founder-led firms, service businesses, agencies, and expansion-stage teams that need sales momentum without vague marketing promises."
  },
  trustSignals: [
    "B2B-first pipeline acceleration",
    "Qualification-led appointment setting",
    "Cross-market outreach support",
    "Reporting designed around buyer intent"
  ],
  serviceHighlights: [
    {
      title: "B2B Lead Generation",
      summary:
        "Prospect targeting, list strategy, and outreach systems built around decision-makers instead of vanity volume."
    },
    {
      title: "B2C Outreach Campaigns",
      summary:
        "Consumer-focused acquisition flows for campaigns that still need message discipline, follow-up, and conversion visibility."
    },
    {
      title: "Appointment Setting",
      summary:
        "Qualified meeting workflows that screen intent before time reaches your sales calendar."
    },
    {
      title: "Data Intelligence and Targeting",
      summary:
        "ICP refinement, account filters, segmentation, and targeting logic that cut wasted outreach spend."
    },
    {
      title: "Campaign Setup and Optimization",
      summary:
        "Messaging, sequencing, reply handling, and continuous adjustments based on conversion signals."
    },
    {
      title: "Market Expansion Support",
      summary:
        "Outbound positioning for teams entering new regions, sectors, or customer segments."
    }
  ],
  serviceDetails: [
    {
      title: "Pipeline-Focused B2B Lead Generation",
      strapline: "For teams that care more about booked conversations than raw list size.",
      bullets: [
        "Define your ideal accounts and buyer roles before outreach starts.",
        "Build messaging around pain, urgency, and qualification criteria.",
        "Measure lead quality by reply relevance, meeting acceptance, and downstream fit."
      ]
    },
    {
      title: "B2C Outreach With Better Conversion Signals",
      strapline: "Useful when your growth model still needs personalization, audience filters, and follow-up discipline.",
      bullets: [
        "Segment by audience type, buying window, and offer intent.",
        "Use lower-friction messaging paths than generic promo blasts.",
        "Track the actions that matter: response quality, booked callbacks, and lead progression."
      ]
    },
    {
      title: "Appointment Setting",
      strapline: "Protect your calendar from low-fit conversations.",
      bullets: [
        "Pre-qualify interest before handoff to your closer or founder.",
        "Route high-fit opportunities into a cleaner booking process.",
        "Reduce calendar clutter from unready prospects."
      ]
    },
    {
      title: "Data Intelligence and Targeting",
      strapline: "Lead generation fails when the targeting model is weak.",
      bullets: [
        "Refine account lists by vertical, company profile, geography, and buyer role.",
        "Prioritize accounts with stronger purchase potential or expansion readiness.",
        "Use targeting criteria as a CAC control lever, not just a data exercise."
      ]
    },
    {
      title: "Campaign Setup and Optimization",
      strapline: "Launch quickly, then improve based on reply quality and meeting outcomes.",
      bullets: [
        "Create channel-aware messaging for email, call, WhatsApp, or mixed workflows.",
        "Tune cadence, offers, and qualification questions as signal comes in.",
        "Keep optimization tied to conversations and appointments, not superficial reach."
      ]
    },
    {
      title: "Market Expansion Support",
      strapline: "Useful when you are entering new buying geographies or verticals.",
      bullets: [
        "Adapt prospecting and messaging to region-specific expectations.",
        "Test customer segments without overcommitting spend too early.",
        "Build a structured outbound learning loop before you scale."
      ]
    }
  ],
  process: [
    {
      step: "01",
      title: "Target the right buyers",
      text: "We start with ICP clarity, account filters, and outreach segments that match your sales reality."
    },
    {
      step: "02",
      title: "Build the message architecture",
      text: "Every campaign is structured around relevance, buying signals, and qualification criteria."
    },
    {
      step: "03",
      title: "Run outreach with discipline",
      text: "Lead generation, follow-up, and appointment workflows stay aligned to response quality and scheduling intent."
    },
    {
      step: "04",
      title: "Report what actually matters",
      text: "You see progress through conversation quality, booked meetings, and pipeline-ready momentum."
    }
  ],
  industries: [
    "Agencies and B2B service firms",
    "Outbound-heavy consulting businesses",
    "Regional expansion campaigns",
    "Founder-led sales teams",
    "Appointment-setting dependent operators",
    "Growth-stage offers entering new markets"
  ],
  principles: [
    {
      title: "Qualification beats vanity volume",
      body: "AcquireVista is positioned around better-fit conversations, not inflated lead counts that never mature into revenue."
    },
    {
      title: "Every campaign needs an operating model",
      body: "Targeting, messaging, response handling, and handoff rules must work together if you want reliable outcomes."
    },
    {
      title: "Outbound should improve CAC discipline",
      body: "The point is not more activity. The point is lower waste, clearer fit, and stronger sales efficiency."
    }
  ],
  proofFramework: [
    {
      title: "Qualified conversations",
      body: "This section is designed to show the volume and quality of real buyer conversations once approved proof assets are supplied."
    },
    {
      title: "Booked appointments",
      body: "Use this slot for meeting acceptance rate, call-show data, or calendar-qualified lead metrics."
    },
    {
      title: "Pipeline efficiency",
      body: "Ideal for CAC improvement, opportunity rate, or region-entry performance once client numbers are approved."
    }
  ],
  faqs: [
    {
      question: "Who is AcquireVista best suited for?",
      answer:
        "The site is positioned for B2B-led teams that need qualified outreach, appointment setting, and a clearer prospecting system rather than generic traffic generation."
    },
    {
      question: "Is this focused only on lead generation?",
      answer:
        "No. The positioning is broader: targeting, messaging, appointment setting, response handling, and campaign optimization all feed the outcome."
    },
    {
      question: "How should proof be added later?",
      answer:
        "Replace the framework cards with approved case studies, testimonial quotes, client logos, or concrete metrics once the client signs them off."
    },
    {
      question: "What happens if WhatsApp or direct contact is not ready?",
      answer:
        "The build falls back to form-led routing so the UX remains usable without publishing unverified contact details."
    }
  ],
  footerLinks: [
    { label: "Services", href: "/services/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
    { label: "Privacy", href: "/privacy/" }
  ]
};
