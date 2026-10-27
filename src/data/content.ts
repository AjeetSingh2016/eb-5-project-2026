export const navItems = [
  ["Services", "#services"],
  ["About Us", "#about"],
  ["Engagement", "#engagement"],
  ["Testimonials", "#testimonials"],
  ["Contact Us", "#consult"],
] as const;

export const contactEmail = "eb5paralegal@gmail.com";
export const contactPhone = "+91-9831366567";
export const contactPhoneHref = "tel:+919831366567";

/* Numbers are the numeric part only; the suffix is rendered next to the count-up. */
export const stats = [
  { value: 10, suffix: "+", label: "Years of combined experience" },
  { value: 1600, suffix: "+", label: "Cases supported" },
  { value: 97, suffix: "%", label: "Approval rate" },
  { value: 21, suffix: "+", label: "Global attorney collaborations" },
] as const;

export const statsNote = "Figures are based on matters we have supported.";

export const aboutLead =
  "EB5 Paralegal is a specialist EB-5 paralegal support partner. We help immigration law firms streamline case preparation, strengthen documentation workflows and scale their EB-5 practice. We work as an extension of your legal team and handle the document-heavy side of EB-5, so attorneys can focus on strategy, client counsel and case oversight.";

export const aboutBlocks = [
  {
    title: "Exclusive EB-5 focus",
    text: "We only do EB-5. That gives us deeper subject knowledge, better efficiency and more consistent work than generalist support providers.",
  },
  {
    title: "White-label team extension",
    text: "Your clients see your firm. We handle the document workload behind the scenes.",
  },
  {
    title: "Attorney-controlled workflow",
    text: "Every deliverable is prepared for attorney review and final approval. Legal oversight stays entirely with your firm.",
  },
  {
    title: "Structured delivery",
    text: "Clear workflows, agreed timelines and regular progress updates. No surprises and no last-minute scrambles.",
  },
] as const;

export const services = [
  {
    title: "Case assessment and planning",
    text: "A tailored document checklist and an initial case review to plan the documentation.",
  },
  {
    title: "Source of funds analysis",
    text: "Collection, organisation and financial tracing reports, with documentation mapping.",
  },
  {
    title: "Attorney-ready drafting",
    text: "Source of funds memos, declarations and cover letters prepared for attorney review.",
  },
  {
    title: "RFE response support",
    text: "We organise the evidence and draft response components for attorney sign-off.",
  },
  {
    title: "Petition package preparation",
    text: "I-526E and I-829 exhibit lists, indexes and a quality-control review.",
  },
  {
    title: "End-to-end matter coordination",
    text: "Progress tracking and coordination with translators and accountants.",
  },
] as const;

export const engagementIntro =
  "All work is performed under your firm's direction and supervision. Attorneys keep full control of legal strategy, review and client representation at every stage.";

export const engagementSteps = [
  {
    icon: "MessageCircle",
    title: "Matter intake and case assignment",
    text: "You assign a new EB-5 matter with a client brief and scope of work.",
  },
  {
    icon: "FileText",
    title: "Engagement and kickoff",
    text: "We sign an engagement letter and agree on deliverables, timeline and fees.",
  },
  {
    icon: "Lock",
    title: "Document collection",
    text: "We request and collect source of funds documents, directly or through your team.",
  },
  {
    icon: "Repeat",
    title: "Comprehensive case preparation",
    text: "We organise and trace documents, and draft memoranda, summaries and petition components.",
  },
  {
    icon: "RefreshCw",
    title: "Attorney review",
    text: "Your attorney reviews, revises and signs off on all work.",
  },
  {
    icon: "Send",
    title: "Filing and post-submission support",
    text: "The final package is filed under your firm's supervision. We help with RFEs as needed.",
  },
] as const;

/* REPLACE BEFORE LAUNCH: these are placeholder entries. Use only real
   testimonials you have written consent to publish, and avoid any quote that
   promises approval, timelines or outcomes. */
export const testimonials = [
  {
    quote: "Scope, timelines and fees were clear before we started, and the progress updates arrived on schedule every time.",
    name: "Anonymous",
    place: "Managing partner",
  },
  {
    quote: "Source of funds files arrived organised, with clear summaries our attorneys could review quickly.",
    name: "Anonymous",
    place: "Lead immigration paralegal",
  },
  {
    quote: "Communication was prompt and professional. We always knew where each matter stood and what came next.",
    name: "Anonymous",
    place: "Senior case manager",
  },
] as const;

export const contactSteps = [
  "Schedule a brief introductory call.",
  "Share a sample matter or case brief.",
  "Get a scope of work and fixed-fee proposal within 48 hours of review.",
  "Sign the engagement letter and we begin.",
] as const;

export const footerLinks = [
  ["Services", "#services"],
  ["About Us", "#about"],
  ["Engagement", "#engagement"],
  ["Testimonials", "#testimonials"],
] as const;

export const footerContact = {
  address: "154, Manicktalla Main Road, Kolkata-700054",
  email: "eb5paralegal@gmail.com",
  phone: "+91-9831366567",
  phoneHref: "tel:+919831366567",
};

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/eb5-paralegal/" },
] as const;
