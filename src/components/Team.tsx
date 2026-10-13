import { BadgeCheck } from "lucide-react";
// Sample people for design only. Replace with real team members and verifiable credentials.
const team = [
  ["Aarav Menon", "Client director", "Your first call and your point of contact throughout.", "#F28C28", "mt-0"],
  ["Daniel Brooks", "Supervising attorney", "Gives legal advice and signs off on the petition.", "#7C6CF0", "md:mt-12"],
  ["Isha Kapoor", "Funds documentation lead", "Builds the source-of-funds and path-of-funds file.", "#2BB3A3", "md:mt-4"],
];
const checks = ["Look up your attorney’s bar admission on the state bar’s public lookup.", "Ask for the written engagement agreement before paying any fees.", "Ask who every specialist is and how each one is paid."];
export default function Team() {
  return (
    <div>
      <h2 data-reveal className="max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-tight md:text-6xl">The people on your file</h2>
      <p className="mt-3 text-sm text-[#15123D]/60">Sample names for design only.</p>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {team.map(([n, r, d, c, off]) => (
          <div data-reveal key={n} className={`group ${off}`}>
            <div className="overflow-hidden rounded-t-[999px] rounded-b-3xl transition-transform duration-500 group-hover:-translate-y-2" style={{ background: c }}>
              <svg viewBox="0 0 200 250" className="w-full" aria-hidden>
                <circle cx="150" cy="60" r="28" fill="#FBF7F0" opacity=".35" />
                <path d="M15 250 C15 188 66 168 100 168 C134 168 185 188 185 250Z" fill="#15123D" />
                <circle cx="100" cy="108" r="40" fill="#15123D" />
                <path d="M82 168 L100 192 L118 168Z" fill="#FBF7F0" />
              </svg>
            </div>
            <h3 className="mt-5 font-[family-name:var(--font-display)] text-3xl">{n}</h3>
            <p className="font-medium text-[#B45309]">{r}</p>
            <p className="mt-1 text-[#15123D]/75">{d}</p>
          </div>
        ))}
      </div>
      <div data-reveal className="mt-16 grid gap-6 rounded-[2rem] bg-[#3B37C9] p-8 text-[#FBF7F0] md:grid-cols-3 md:p-10">
        <p className="font-[family-name:var(--font-display)] text-3xl md:col-span-3">How to verify any immigration adviser, including us</p>
        {checks.map((c) => <p key={c} className="flex gap-3 text-[#FBF7F0]/90"><BadgeCheck className="h-6 w-6 shrink-0 text-[#F28C28]" aria-hidden />{c}</p>)}
      </div>
    </div>
  );
}
