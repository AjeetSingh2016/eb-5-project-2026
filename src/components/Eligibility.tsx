"use client";
import { useState } from "react";
export default function Eligibility() {
  const [v, setV] = useState(900000);
  const fmt = (n: number) => "$" + n.toLocaleString("en-US");
  const [msg, tone] = v >= 1050000 ? ["Meets the general minimum for an EB-5 investment.", "bg-emerald-100 text-emerald-900"]
    : v >= 800000 ? ["Meets the minimum only for projects in a targeted employment area.", "bg-amber-100 text-amber-900"]
    : ["Below the current minimum. EB-5 may not fit at this amount.", "bg-rose-100 text-rose-900"];
  return (
    <div className="rounded-3xl bg-[#FBF7F0] p-6 text-[#15123D] md:p-10">
      <label htmlFor="amt" className="text-sm">Planned investment</label>
      <p className="font-[family-name:var(--font-display)] text-6xl">{fmt(v)}</p>
      <input id="amt" type="range" min={500000} max={1500000} step={10000} value={v} onChange={(e) => setV(+e.target.value)} className="mt-4 w-full accent-[#F28C28]" />
      <p role="status" className={`mt-6 rounded-xl px-4 py-3 ${tone}`}>{msg}</p>
      <p className="mt-3 text-sm text-[#15123D]/65">Funds must also be lawfully sourced and documented. Thresholds can change, and your attorney confirms them against current USCIS rules.</p>
    </div>
  );
}
