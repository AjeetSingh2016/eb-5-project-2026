"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
type S = "idle" | "sending" | "done" | "error";
export default function ConsultForm() {
  const [s, setS] = useState<S>("idle");
  const [msg, setMsg] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setS("sending");
    const fd = new FormData(e.currentTarget);
    const data = { ...Object.fromEntries(fd), consent: fd.get("consent") === "on" };
    try {
      const r = await fetch("/api/consult", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Request failed.");
      setS("done");
    } catch (err) { setMsg(err instanceof Error ? err.message : "Something went wrong."); setS("error"); }
  }
  if (s === "done") return <p role="status" className="text-xl">Request received. We will contact you within two working days to confirm a time.</p>;
  const f = "mt-1 w-full rounded-sm border border-[#FBF7F0]/30 bg-transparent px-3 py-2.5 text-[#FBF7F0] focus:border-[#FBF7F0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBF7F0]";
  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm">Full name<input name="name" required autoComplete="name" className={f} /></label>
      <label className="text-sm">Email<input name="email" type="email" required autoComplete="email" className={f} /></label>
      <label className="text-sm">Phone or WhatsApp<input name="phone" type="tel" required autoComplete="tel" className={f} /></label>
      <label className="text-sm">City<input name="city" autoComplete="address-level2" className={f} /></label>
      <label className="text-sm sm:col-span-2">Planned investment range
        <select name="range" className={f + " [&>option]:text-black"} defaultValue="">
          <option value="" disabled>Select</option><option>Below $800,000</option><option>$800,000 to $1,050,000</option><option>Above $1,050,000</option><option>Not sure yet</option>
        </select>
      </label>
      <label className="text-sm sm:col-span-2">Anything we should know?<textarea name="message" rows={3} className={f} /></label>
      <label className="flex gap-3 text-sm sm:col-span-2"><input type="checkbox" name="consent" required className="mt-1" />
        <span>I agree to be contacted about my enquiry. I understand this form does not create an attorney-client relationship.</span></label>
      <div className="sm:col-span-2">
        <button disabled={s === "sending"} className="inline-flex items-center gap-2 rounded-sm bg-[#FBF7F0] px-6 py-3 font-medium text-[#15123D] hover:bg-white disabled:opacity-60">
          {s === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}Request consultation
        </button>
        {s === "error" && <p role="alert" className="mt-3 text-sm text-red-300">{msg} Check the fields and try again.</p>}
      </div>
    </form>
  );
}
