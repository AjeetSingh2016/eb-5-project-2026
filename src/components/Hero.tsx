"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
const hs = [90, 140, 110, 190, 130, 230, 120, 170, 100, 200, 150, 110];
const stars = [[40, 40], [120, 90], [210, 30], [300, 70], [380, 25], [470, 60], [560, 35], [80, 150]];
const arc = "M70 300 C 190 70, 400 40, 520 235";
export default function Hero() {
  const reduce = useReducedMotion();
  const up = (d: number) => ({ initial: reduce ? false : { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d, ease: "easeOut" as const } });
  return (
    <section className="overflow-hidden bg-[#3B37C9] text-[#FBF7F0]" style={{ backgroundImage: "linear-gradient(180deg,#3B37C9 0%,#5A44D6 62%,#D9578F 100%)" }}>
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-6 px-5 py-10 md:grid-cols-[1.05fr_1fr] md:py-0">
        <div>
          <motion.p {...up(0)} className="inline-flex items-center gap-2 rounded-full bg-[#FBF7F0]/15 px-4 py-1.5 text-sm"><ShieldCheck className="h-4 w-4 text-[#F28C28]" aria-hidden />Legal work led by licensed attorneys</motion.p>
          <motion.h1 {...up(0.1)} className="mt-5 font-[family-name:var(--font-display)] text-5xl leading-[1.02] md:text-7xl">From Mumbai to Manhattan, one EB-5 step at a time.</motion.h1>
          <motion.p {...up(0.22)} className="mt-5 max-w-lg text-lg leading-relaxed text-[#FBF7F0]/90">Meridian Gate helps Indian investor families understand EB-5, document their funds and prepare a petition, with a named contact at every stage.</motion.p>
          <motion.div {...up(0.34)} className="mt-7 flex flex-wrap gap-4">
            <a href="#consult" className="inline-flex items-center gap-2 rounded-full bg-[#F28C28] px-7 py-3.5 font-medium text-[#15123D] transition hover:scale-105 hover:bg-[#ffa447]">Book a consultation <ArrowRight className="h-4 w-4" /></a>
            <a href="#check" className="rounded-full border border-[#FBF7F0]/50 px-7 py-3.5 transition hover:bg-[#FBF7F0]/10">Check the investment minimum</a>
          </motion.div>
          <p className="mt-4 text-sm text-[#FBF7F0]/70">No guarantee of approval or investment returns.</p>
        </div>
        <svg viewBox="0 0 600 520" className="mx-auto w-full max-w-[560px] md:max-h-[78svh]" role="img" aria-label="Flight route from India to the USA over a city skyline">
          {stars.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" fill="#FBF7F0" opacity=".6">{!reduce && <animate attributeName="opacity" values=".7;.15;.7" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />}</circle>)}
          <motion.circle cx="450" cy="215" r="105" fill="#F28C28" animate={reduce ? undefined : { cy: [215, 200, 215] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
          <motion.path d={arc} fill="none" stroke="#FBF7F0" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }} />
          {hs.map((h, i) => <g key={i}><rect x={i * 50} y={520 - h} width="46" height={h} fill={i % 3 ? "#2A2691" : "#4B47D8"} />
            {Array.from({ length: Math.floor(h / 30) }).map((_, r) => <rect key={r} x={i * 50 + 9} y={520 - h + 14 + r * 30} width="7" height="10" fill="#F28C28" opacity={(i + r) % 4 ? 0.15 : 0.85} />)}</g>)}
          <circle cx="70" cy="300" r="9" fill="#F28C28" stroke="#FBF7F0" strokeWidth="2" /><text x="70" y="332" fill="#FBF7F0" fontSize="17" textAnchor="middle">India</text>
          <circle cx="520" cy="235" r="9" fill="#F28C28" stroke="#FBF7F0" strokeWidth="2" /><text x="520" y="212" fill="#FBF7F0" fontSize="17" textAnchor="middle">USA</text>
          {!reduce && <g fill="#FBF7F0"><path d="M-14 0 L11 -7 L6 0 L11 7 Z" /><animateMotion dur="6s" begin="0.8s" repeatCount="indefinite" rotate="auto" path={arc} /></g>}
        </svg>
      </div>
    </section>
  );
}
