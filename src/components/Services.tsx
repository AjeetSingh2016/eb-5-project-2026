import { ArrowUpRight, Compass, ClipboardCheck, FileText, Landmark, Handshake, LifeBuoy } from "lucide-react";
const items = [
  [Compass, "Initial consultation", "A plain-language session on requirements, risks and alternatives."],
  [ClipboardCheck, "Eligibility assessment", "Your background, funds and family reviewed against EB-5 rules."],
  [FileText, "Petition preparation", "Forms and evidence prepared and filed with your attorney."],
  [Landmark, "Source and path of funds", "Evidence mapped from where money was earned to where it is invested."],
  [Handshake, "Investment coordination", "Introductions to independent specialists for due diligence."],
  [LifeBuoy, "Ongoing case support", "A named contact through filings, questions and later stages."],
] as const;
export default function Services() {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.6fr]">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h2 data-reveal className="font-[family-name:var(--font-display)] text-5xl leading-tight md:text-6xl">Everything between “maybe” and “filed”</h2>
        <p data-reveal className="mt-5 max-w-sm text-lg text-[#15123D]/75">Six services, one team coordinating them, so nothing falls between advisers.</p>
      </div>
      <ul className="border-t border-[#15123D]/25">
        {items.map(([I, t, d], n) => (
          <li data-reveal style={{ transitionDelay: `${n * 70}ms` }} key={t} className="group relative overflow-hidden border-b border-[#15123D]/25">
            <span className="absolute inset-0 origin-left scale-x-0 bg-[#F28C28] transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden />
            <div className="relative z-10 flex items-center gap-5 px-2 py-7 md:gap-8 md:px-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#3B37C9] text-[#FBF7F0]"><I className="h-6 w-6" aria-hidden /></span>
              <div className="flex-1">
                <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">{t}</h3>
                <p className="mt-1 max-w-md text-[#15123D]/80">{d}</p>
              </div>
              <ArrowUpRight className="h-8 w-8 shrink-0 transition-transform duration-300 group-hover:rotate-45" aria-hidden />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
