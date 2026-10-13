export const navItems = [
  ["Services", "#services"],
  ["Engagement", "#engagement"],
  ["Fees", "#fees"],
  ["Funds", "#funds"],
  ["Stories", "#testimonials"],
  ["About", "#about"],
  ["FAQ", "#faq"],
] as const;

export const aboutLead =
  "We deliver specialized legal process outsourcing services to U.S. immigration law firms handling EB-5 investor visas, H-1B employment-based petitions, and L-1 intra-company transfer cases.";

export const aboutBlocks = [
  {
    title: "Our expertise",
    text: "Our team combines deep expertise in immigration law with meticulous attention to petition preparation, documentation management, and regulatory compliance.",
  },
  {
    title: "How we partner",
    text: "We partner with law firms to streamline back-office workflows, reduce operational costs, and accelerate case processing – enabling attorneys to focus on client relationships and strategic counsel.",
  },
] as const;

export const aboutPillars = [
  { icon: "Check", label: "Accuracy" },
  { icon: "ShieldCheck", label: "Integrity" },
  { icon: "Lock", label: "Confidentiality" },
] as const;

export const services = [
  {
    title: "Immigration LPO Services",
    text: "Specialized legal process outsourcing services for U.S. immigration law firms.",
  },
  {
    title: "EB-5 Visa Expertise",
    text: "Deep expertise in EB-5 investor visas, including Source of Funds and Path of Funds analysis.",
  },
  {
    title: "End-to-End Petition Support",
    text: "Complete I-526E petition package preparation, including I-485 and DS-260 applications.",
  },
  {
    title: "Compliance & Documentation",
    text: "Meticulous petition preparation, documentation management, regulatory compliance, and complex RFE and NOID responses.",
  },
  {
    title: "Operational Efficiency",
    text: "Streamlined back-office workflows that reduce operational costs and accelerate case processing.",
  },
  {
    title: "Attorney Focus Enablement",
    text: "Enables attorneys to focus on client relationships and strategic counsel.",
  },
] as const;

export const fundItems = [
  { title: "Origin", text: "Where was the capital earned?" },
  { title: "Evidence", text: "Which records prove the source?" },
  { title: "Movement", text: "Can transfers from India be traced?" },
  { title: "Investment", text: "Is the final transfer documented?" },
] as const;

export const questionsWorthAsking = [
  "Check your lawyer’s credentials and EB-5 experience.",
  "Read the engagement letter before paying fees.",
  "Ask how sponsors and referrers are paid.",
  "Review investment risks independently.",
  "Never trust guaranteed approval or returns.",
] as const;

export const faqs = [
  {
    q: "What is EB-5?",
    a: "A US immigration pathway for investors who fund a new commercial enterprise and meet job-creation rules. An EB-5 specialist lawyer can explain how it applies to you.",
  },
  {
    q: "Who are the lawyers?",
    a: "India-based lawyers who specialise in EB-5 for Indian investors. Scope and fees are confirmed in writing before you engage anyone.",
  },
  {
    q: "How are fees structured?",
    a: "Flexibly. You can work per project or on a retainer. Scope, timelines and fees are agreed in writing before any work begins.",
  },
  {
    q: "Does investing guarantee a Green Card?",
    a: "No. Approval depends on evidence and adjudication, and investments carry financial risk.",
  },
  {
    q: "Can you help with Indian source of funds?",
    a: "Yes. We organise bank statements, tax returns and sale deeds. Your lawyer reviews whether they meet the requirements.",
  },
  {
    q: "Do you recommend investments?",
    a: "No. We don’t give investment advice or manage projects.",
  },
  {
    q: "What should I prepare for the first call?",
    a: "Your goals, timeline and main questions. Don’t send sensitive documents through the web form.",
  },
] as const;

/* REPLACE BEFORE LAUNCH: these are placeholder entries. Use only real
   testimonials you have written consent to publish, and avoid any quote that
   promises approval, timelines or returns. */
export const testimonials = [
  {
    quote: "I always knew what the next step was and who to ask. The checklist alone saved me weeks of back and forth.",
    name: "R. S.",
    place: "Mumbai",
  },
  {
    quote: "They were clear from the first call about who does what and what it costs. No pressure at any point.",
    name: "A. K.",
    place: "Bengaluru",
  },
  {
    quote: "Organising bank statements and records for source of funds felt manageable instead of overwhelming.",
    name: "P. M.",
    place: "Delhi",
  },
] as const;

export const engagementIntro = "A streamlined, professional workflow built for law firms.";

export const engagementSteps = [
  {
    icon: "MessageCircle",
    title: "Initial Consultation",
    text: "Discuss your practice needs, volume, preferred formats and deadlines.",
  },
  {
    icon: "Lock",
    title: "Secure Document Sharing",
    text: "You provide client data, past filings and specifications through encrypted channels.",
  },
  {
    icon: "FileText",
    title: "Drafting & Preparation",
    text: "Our team prepares drafts, forms, research notes or full petition packets as requested.",
  },
  {
    icon: "RefreshCw",
    title: "Review & Revision",
    text: "You review and give feedback, and we make precise adjustments to meet your standards.",
  },
  {
    icon: "Send",
    title: "Final Delivery",
    text: "We deliver polished, submission-ready documents within agreed timelines.",
  },
  {
    icon: "Repeat",
    title: "Ongoing Support",
    text: "Flexible retainer or per-project models for continuous collaboration.",
  },
] as const;

export const feesNote =
  "Scope, timelines and fees are agreed in writing before any work begins.";

export const feeModels = [
  {
    icon: "Briefcase",
    title: "Per-project",
    text: "A defined scope and price for a single filing, petition packet or research task.",
    bullets: ["Single filing or packet", "Defined scope", "Agreed timeline"],
  },
  {
    icon: "Repeat",
    title: "Flexible retainer",
    text: "Ongoing capacity for steady volume, with terms that fit your caseload.",
    bullets: ["Steady volume", "Continuous collaboration", "Flexible terms"],
  },
] as const;
