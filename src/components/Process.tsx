"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { steps } from "@/lib/content";
export default function Process() {
  const [i, setI] = useState(0);
  const last = steps.length - 1;
  return (
    <div>
      <div className="overflow-x-auto pb-2">
        <div role="tablist" aria-label="EB-5 steps" className="relative grid min-w-[640px] grid-cols-6">
          <div className="absolute left-[8.33%] right-[8.33%] top-5 h-1 rounded bg-[#3B37C9]/15">
            <motion.div className="h-full rounded bg-[#F28C28]" animate={{ width: `${(i / last) * 100}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
          </div>
          {steps.map((s, n) => (
            <button key={s.t} role="tab" aria-selected={i === n} onClick={() => setI(n)} className="relative flex flex-col items-center gap-3 px-1 text-center focus-visible:outline-none">
              <span className={`grid h-11 w-11 place-items-center rounded-full border-2 text-sm font-medium transition-all ${n < i ? "border-[#F28C28] bg-[#F28C28] text-[#15123D]" : i === n ? "scale-110 border-[#15123D] bg-[#3B37C9] text-[#FBF7F0] ring-4 ring-[#F28C28]/50" : "border-[#15123D]/30 bg-[#FBF7F0] text-[#15123D]/70"}`}>
                {n < i ? <Check className="h-5 w-5" /> : n + 1}
              </span>
              <span className={`text-sm leading-tight ${i === n ? "font-medium text-[#15123D]" : "text-[#15123D]/70"}`}>{s.t}</span>
            </button>
          ))}
        </div>
      </div>
      <div role="tabpanel" className="relative mt-10 overflow-hidden rounded-[2rem] bg-[#3B37C9] p-8 text-[#FBF7F0] md:p-14">
        <span aria-hidden className="pointer-events-none absolute -right-2 -top-10 font-[family-name:var(--font-display)] text-[13rem] leading-none text-[#FBF7F0]/10 md:text-[18rem]">{i + 1}</span>
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="relative min-h-[210px]">
            <span className="inline-block rounded-full bg-[#F28C28] px-4 py-1 text-sm font-medium text-[#15123D]">Led by {steps[i].who}</span>
            <h3 className="mt-5 max-w-xl font-[family-name:var(--font-display)] text-4xl md:text-6xl">{steps[i].t}</h3>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#FBF7F0]/90">{steps[i].b}</p>
          </motion.div>
        </AnimatePresence>
        <div className="relative mt-8 flex gap-3">
          <button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} className="inline-flex items-center gap-2 rounded-full border border-[#FBF7F0]/50 px-5 py-2.5 transition hover:bg-[#FBF7F0]/10 disabled:opacity-30"><ArrowLeft className="h-4 w-4" />Back</button>
          <button onClick={() => setI(Math.min(last, i + 1))} disabled={i === last} className="inline-flex items-center gap-2 rounded-full bg-[#F28C28] px-5 py-2.5 font-medium text-[#15123D] transition hover:bg-[#ffa447] disabled:opacity-30">Next step<ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}
