"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  ["Services", "#services"],
  ["Our approach", "#approach"],
  ["Process", "#process"],
  ["Funds", "#funds"],
  ["FAQ", "#faq"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#top");

  useEffect(() => {
    const ids = ["services", "approach", "process", "funds", "faq", "consult"];
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: "-18% 0px -65% 0px", threshold: [0, 0.15, 0.35, 0.6] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const linkClass = (href: string) =>
    `relative py-2 text-[13px] font-medium transition-colors hover:text-[oklch(0.22_0.03_175)] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-[oklch(0.62_0.13_50)] after:transition-transform ${
      activeSection === href
        ? "text-[oklch(0.22_0.03_175)] after:scale-x-100"
        : "text-[oklch(0.40_0.02_175)] after:scale-x-0"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[oklch(0.86_0.02_85)] bg-[oklch(0.975_0.01_85)]/95">
      <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" aria-label="Layres on Call home" className="flex items-center gap-3">
          <span aria-hidden="true" className="grid h-9 w-9 place-items-center border border-[oklch(0.86_0.02_85)] text-[oklch(0.22_0.03_175)]">
            <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
              <path d="M5 27 15 11 23 23 29 14 35 27" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 33H35" stroke="oklch(0.62 0.13 50)" strokeWidth="1.7" />
            </svg>
          </span>
          <span className="leading-tight">
            <span className="block font-[family-name:var(--font-newsreader)] text-[25px] tracking-tight text-[oklch(0.22_0.03_175)]">Layres on Call</span>
            <span className="hidden text-[9px] font-medium uppercase tracking-[0.17em] text-[oklch(0.48_0.02_175)] sm:block">Independent EB-5 coordination</span>
          </span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} aria-current={activeSection === href ? "location" : undefined} className={linkClass(href)}>
              {label}
            </a>
          ))}
          <a href="#consult" aria-current={activeSection === "#consult" ? "location" : undefined}
            className="inline-flex min-h-11 items-center gap-2 border border-[oklch(0.22_0.03_175)] px-4 text-[13px] font-medium text-[oklch(0.22_0.03_175)] transition-colors hover:bg-[oklch(0.22_0.03_175)] hover:text-[oklch(0.975_0.01_85)]">
            Book a consultation <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>

        <button type="button" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}
          className="grid h-11 w-11 place-items-center border border-[oklch(0.86_0.02_85)] text-[oklch(0.22_0.03_175)] lg:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav aria-label="Mobile navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-[oklch(0.86_0.02_85)] bg-[oklch(0.975_0.01_85)] lg:hidden">
            <div className="mx-auto flex max-w-[1440px] flex-col px-5 py-3 sm:px-8">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setOpen(false)} aria-current={activeSection === href ? "location" : undefined}
                  className={`border-b border-[oklch(0.86_0.02_85)] py-4 text-sm ${activeSection === href ? "text-[oklch(0.22_0.03_175)]" : "text-[oklch(0.48_0.02_175)]"}`}>
                  {label}
                  {activeSection === href && <span className="ml-3 inline-block h-px w-7 align-middle bg-[oklch(0.62_0.13_50)]" />}
                </a>
              ))}
              <a href="#consult" onClick={() => setOpen(false)} className="mt-4 flex min-h-12 items-center justify-between border border-[oklch(0.22_0.03_175)] px-4 text-sm font-medium text-[oklch(0.22_0.03_175)]">
                Book a consultation <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
