export const navItems = [
  ["Services", "#services"],
  ["Process", "#process"],
  ["Funds", "#funds"],
  ["Stories", "#testimonials"],
  ["About", "#about"],
  ["FAQ", "#faq"],
] as const;

export const aboutIntro =
  "Local support and specialist lawyers who work with Indian investors every day.";

export const aboutRoles = [
  { icon: "Layers", title: "We organise", text: "Documents, milestones and follow-ups." },
  { icon: "Scale", title: "Lawyers advise", text: "India-based EB-5 specialists." },
  { icon: "ShieldCheck", title: "You decide", text: "Every choice stays yours." },
] as const;

export const aboutPoints = [
  {
    icon: "MapPin",
    title: "Based in India",
    text: "A team that understands Indian banking, documents and timelines.",
  },
  {
    icon: "MessageCircle",
    title: "Plain communication",
    text: "Clear scope, fees in writing and straight answers.",
  },
  {
    icon: "Clock",
    title: "Your pace",
    text: "Start with a conversation, not documents. No pressure to decide.",
  },
] as const;

export const services = [
  {
    icon: "FolderOpen",
    title: "Process coordination",
    text: "Track milestones, documents and follow-ups across your EB-5 journey.",
    detail: ["Milestone tracking", "Document coordination", "Follow-ups"],
  },
  {
    icon: "Users",
    title: "Indian EB-5 lawyers",
    text: "Work with India-based lawyers who specialise in EB-5 for Indian investors.",
    detail: ["Specialist lawyers", "Case review", "Clear scope"],
  },
  {
    icon: "FileText",
    title: "Document organisation",
    text: "Structure the records Indian investors need for source of funds.",
    detail: ["Checklists", "Record organisation", "Outstanding items"],
  },
] as const;

export const steps = [
  {
    title: "Conversation",
    text: "Share your goals and timeline. No documents yet.",
  },
  {
    title: "Landscape",
    text: "Get an overview and meet your EB-5 specialist lawyer.",
  },
  {
    title: "Next steps",
    text: "Build a practical checklist for Indian investors.",
  },
  {
    title: "Follow-up",
    text: "We track requests. The decisions stay with you.",
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
