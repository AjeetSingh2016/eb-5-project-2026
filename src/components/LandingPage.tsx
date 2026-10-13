"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  motion,
  animate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  ShieldCheck,
  X,
  FileText,
  Users,
  FolderOpen,
  Quote,
  MapPin,
  Scale,
  MessageCircle,
  Layers,
  Clock,
} from "lucide-react";

import {
  navItems,
  services,
  steps,
  fundItems,
  questionsWorthAsking,
  faqs,
  testimonials,
  aboutIntro,
  aboutPoints,
  aboutRoles,
} from "@/data/content";

const iconMap = { FolderOpen, Users, FileText } as const;

/* ---------- Tokens ---------- */
const ease = [0.22, 1, 0.36, 1] as const;

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a853]";

const inputCls =
  "w-full rounded-xl border border-white/20 bg-white/[0.06] px-3.5 py-3 text-base text-white outline-none transition placeholder:text-white/45 focus:border-[#d4a853] focus:bg-white/[0.09] focus:ring-2 focus:ring-[#d4a853]/30 disabled:opacity-60 sm:text-[14px]";

/* ---------- Primitives ---------- */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  children,
  description,
  tag,
  light = false,
}: {
  children: ReactNode;
  description?: string;
  tag?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
      {tag && (
        <p
          className={`mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-medium ${
            light
              ? "border-white/15 bg-white/[0.06] text-white/80"
              : "border-[#d4a853]/40 bg-[#d4a853]/10 text-[#6b5214]"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#d4a853]" />
          {tag}
        </p>
      )}
      <h2
        className={`text-balance text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.8rem] lg:text-[3.2rem] xl:text-[3.5rem] ${
          light ? "text-white" : "text-[#0f2a26]"
        }`}
      >
        {children}
      </h2>
      {description && (
        <p
          className={`mx-auto mt-4 max-w-lg text-[15px] leading-7 sm:text-[17px] sm:leading-8 ${
            light ? "text-white/70" : "text-[#4a5c57]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* Full-screen section shell: centred content, dotted grid + soft glow */
function Section({
  id,
  className = "",
  dark = false,
  children,
}: {
  id: string;
  className?: string;
  dark?: boolean;
  children: ReactNode;
}) {
  const dot = dark ? "rgba(255,255,255,0.08)" : "rgba(15,42,38,0.10)";
  const mask = "radial-gradient(ellipse 75% 65% at 50% 40%, #000 25%, transparent 75%)";
  return (
    <section
      id={id}
      className={`relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 ${className}`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${dot} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            maskImage: mask,
            WebkitMaskImage: mask,
          }}
        />
        <div
          className={`absolute left-1/2 top-0 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full blur-3xl ${
            dark ? "bg-[#d4a853]/10" : "bg-[#d4a853]/15"
          }`}
        />
      </div>
      <div className="relative mx-auto w-full max-w-[1100px] px-4 xl:max-w-[1200px] sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/* ---------------------- HEADER ---------------------- */

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const ids = ["top", "about", "services", "process", "funds", "testimonials", "faq", "consult"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.2, 0.45] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Outer height stays 64/72px so the hero's overlap maths is unchanged;
     the visible bar is a floating glass pill inside it. */
  return (
    <header className="sticky top-0 z-50 h-16 px-3 pt-2 sm:h-[72px] sm:px-5 sm:pt-3">
      <div
        className={`relative mx-auto flex h-12 max-w-[1100px] items-center justify-between rounded-2xl border pl-3 pr-1.5 transition-all duration-500 sm:h-[52px] sm:pl-4 lg:pr-2 xl:max-w-[1200px] ${
          scrolled || open
            ? "border-[#d9e2de] bg-white/85 shadow-[0_12px_40px_-14px_rgba(15,42,38,0.22)] backdrop-blur-xl"
            : "border-white/70 bg-white/55 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] backdrop-blur-md"
        }`}
      >
        <a href="#top" className={`group flex items-center gap-2.5 rounded-lg ${focusRing}`}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f2a26] text-white shadow-md shadow-[#0f2a26]/20 transition group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <path d="M3 17L8 7l5 7 4-6 4 9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 20h18" stroke="#d4a853" strokeWidth="1.8" />
            </svg>
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-[#0f2a26]">Lawyers on Call</span>
        </a>

        <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={active === href ? "true" : undefined}
              className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${focusRing} ${
                active === href ? "text-[#0f2a26]" : "text-[#4a5c57] hover:text-[#0f2a26]"
              }`}
            >
              {active === href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-[#0f2a26]/[0.07]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{label}</span>
            </a>
          ))}
        </nav>

        <a
          href="#consult"
          className={`hidden items-center gap-1.5 rounded-xl bg-[#0f2a26] px-4 py-2 text-[13px] font-semibold text-white shadow-md shadow-[#0f2a26]/20 transition hover:bg-[#163832] lg:inline-flex ${focusRing}`}
        >
          Start a conversation
          <ArrowUpRight size={14} aria-hidden />
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={`flex h-10 w-10 items-center justify-center rounded-xl text-[#0f2a26] transition hover:bg-[#0f2a26]/[0.06] lg:hidden ${focusRing}`}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease }}
            className="absolute inset-x-3 top-[64px] mx-auto max-w-[1100px] origin-top rounded-2xl border border-[#d9e2de] bg-white/95 p-2 shadow-[0_24px_60px_-20px_rgba(15,42,38,0.3)] backdrop-blur-xl sm:inset-x-5 sm:top-[70px] lg:hidden"
          >
            <nav aria-label="Mobile" className="space-y-0.5">
              {navItems.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-3.5 py-3 text-[15px] ${focusRing} ${
                    active === href ? "bg-[#0f2a26]/[0.06] font-medium text-[#0f2a26]" : "text-[#4a5c57]"
                  }`}
                >
                  {label}
                </a>
              ))}
              <a
                href="#consult"
                onClick={() => setOpen(false)}
                className={`mt-1.5 flex items-center justify-between rounded-xl bg-[#0f2a26] px-4 py-3.5 text-[15px] font-medium text-white ${focusRing}`}
              >
                Start a conversation
                <ArrowRight size={16} aria-hidden />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------------------- HERO ---------------------- */

function HeroFlight({
  className = "",
  parallax = false,
  mobile = false,
}: {
  className?: string;
  parallax?: boolean;
  mobile?: boolean;
}) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const progress = useMotionValue(0);
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 700], [0, 56]);

  useEffect(() => {
    const path = pathRef.current;
    const plane = planeRef.current;
    if (!path || !plane) return;
    const len = path.getTotalLength();

    const place = (t: number) => {
      const p = path.getPointAtLength(t * len);
      const q = path.getPointAtLength(Math.min(len, t * len + 1));
      const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
      plane.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${angle})`);
    };

    place(0);
    if (reduce) return;

    const unsub = progress.on("change", place);
    const controls = animate(progress, [0, 1], {
      duration: 7.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1.6,
      delay: 1.2,
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [reduce, progress]);

  return (
    <motion.div
      aria-hidden
      style={parallax && !reduce ? { y: drift } : undefined}
      className={`pointer-events-none ${className}`}
    >
      <svg
        viewBox={mobile ? "80 120 470 290" : "0 0 640 560"}
        className={mobile ? "absolute inset-0 h-full w-full" : "h-full w-full"}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`${uid}-route`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0f2a26" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#0f2a26" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#d4a853" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id={`${uid}-glow`}>
            <stop offset="0%" stopColor="#d4a853" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#d4a853" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="340" cy="280" rx="220" ry="160" fill={`url(#${uid}-glow)`} />

        <g fill="#b8c9c3" opacity="0.22">
          <ellipse cx="140" cy="340" rx="70" ry="85" />
          <ellipse cx="480" cy="200" rx="95" ry="70" />
          <ellipse cx="300" cy="380" rx="45" ry="35" />
        </g>

        <g stroke="#a8bdb6" strokeWidth="0.7" opacity="0.28" fill="none">
          <ellipse cx="320" cy="280" rx="240" ry="150" />
          <ellipse cx="320" cy="280" rx="140" ry="150" />
          <path d="M80 280H560M120 200H520M120 360H520" />
        </g>

        <motion.path
          ref={pathRef}
          d="M140 340 C240 140 400 120 480 200"
          stroke={`url(#${uid}-route)`}
          strokeWidth={mobile ? 3.4 : 2.4}
          fill="none"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />

        <path
          d="M140 340 C240 140 400 120 480 200"
          stroke="#d4a853"
          strokeWidth="1"
          strokeDasharray="3 8"
          fill="none"
          opacity="0.45"
        />

        <g ref={planeRef}>
          <g transform={`scale(${mobile ? 1.8 : 1}) translate(-11,-11)`}>
            <path
              d="M1 9 8 7 14 1 16 2 14 8 22 12 22 14 13 13 9 21 7 21 8 13 1 13Z"
              fill="#0f2a26"
              stroke="#f7f9f8"
              strokeWidth="0.7"
            />
          </g>
        </g>

        <motion.circle
          cx="140"
          cy="340"
          r="16"
          fill="#0f2a26"
          fillOpacity="0.08"
          animate={reduce ? undefined : { r: mobile ? [14, 28, 14] : [11, 20, 11] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="140" cy="340" r={mobile ? 8 : 5.5} fill="#0f2a26" />
        <circle cx="140" cy="340" r={mobile ? 3.2 : 2.2} fill="#f7f9f8" />

        <motion.circle
          cx="480"
          cy="200"
          r="16"
          fill="#d4a853"
          fillOpacity="0.14"
          animate={reduce ? undefined : { r: mobile ? [14, 28, 14] : [11, 20, 11] }}
          transition={{ duration: 2.8, delay: 1.3, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="480" cy="200" r={mobile ? 8 : 5.5} fill="#d4a853" />
        <circle cx="480" cy="200" r={mobile ? 3.2 : 2.2} fill="#f7f9f8" />

        <text x={mobile ? 140 : 108} y={mobile ? 396 : 380} textAnchor={mobile ? "middle" : "start"} fontSize={mobile ? 21 : 13} fontWeight="600" fill="#0f2a26" opacity="0.65">
          India
        </text>
        <text x={mobile ? 480 : 445} y={mobile ? 254 : 235} textAnchor={mobile ? "middle" : "start"} fontSize={mobile ? 21 : 13} fontWeight="600" fill="#0f2a26" opacity="0.65">
          United States
        </text>
      </svg>
    </motion.div>
  );
}

/* The hero is exactly one screen tall (svh handles mobile browser bars).
   It sits behind the transparent sticky header, so header + hero = 100svh. */
function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative -mt-16 flex min-h-[100svh] flex-col overflow-hidden pt-16 sm:-mt-[72px] sm:pt-[72px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#eef4f2] via-[#f7f9f8] to-[#f0f4f2]" />
      <HeroFlight
        parallax
        className="absolute inset-y-0 right-0 hidden w-[52%] lg:block"
      />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-start px-4 py-4 sm:px-6 sm:py-8 lg:justify-center lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease }}
          className="relative z-10 my-auto max-w-xl lg:my-0 lg:max-w-[48%]"
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d4a853]/40 bg-[#d4a853]/10 px-3.5 py-1.5 text-[12px] font-medium text-[#6b5214]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4a853]" />
            India-based, for Indian investors
          </p>

          <h1 className="text-balance text-[2.1rem] font-semibold leading-[1.05] tracking-tight text-[#0f2a26] sm:text-[3.4rem] lg:text-[3.9rem] xl:text-[4.4rem]">
            Clear process support for your{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">EB-5 journey</span>
              <motion.span
                aria-hidden
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.7, ease }}
                className="absolute -bottom-1 left-0 right-0 h-2.5 origin-left bg-[#d4a853]/35 sm:h-3"
              />
            </span>
          </h1>

          <p className="mt-5 max-w-md text-[16px] leading-7 text-[#3f514c]">
            We connect Indian investors with EB-5 specialist lawyers and keep documents and milestones organised.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <motion.a
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              href="#consult"
              className={`inline-flex items-center gap-2 rounded-xl bg-[#0f2a26] px-5 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(15,42,38,0.35)] transition hover:bg-[#163832] ${focusRing}`}
            >
              Start a conversation
              <ArrowRight size={16} aria-hidden />
            </motion.a>
            <a
              href="#services"
              className={`inline-flex items-center gap-2 rounded-xl border border-[#c9d6d1] bg-white/80 px-5 py-3.5 text-[14px] font-medium text-[#0f2a26] backdrop-blur-sm transition hover:border-[#0f2a26]/30 hover:bg-white ${focusRing}`}
            >
              See how we help
              <ArrowDown size={15} aria-hidden />
            </a>
          </div>

          <p className="mt-6 hidden items-center gap-2 text-[13px] text-[#4a5c57] sm:flex">
            <ShieldCheck size={16} className="shrink-0 text-[#0f2a26]" strokeWidth={1.7} aria-hidden />
            No guaranteed outcomes. Every case is different.
          </p>
        </motion.div>

        {/* Phones and tablets: full-width flight anchored at the bottom of the hero */}
        <HeroFlight
          mobile
          className="relative -mx-4 mt-4 h-[180px] shrink-0 min-[400px]:h-[200px] sm:-mx-6 sm:h-[240px] lg:hidden [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_16%)] [mask-image:linear-gradient(to_bottom,transparent,black_16%)]"
        />
      </div>

      {!reduce && (
        <motion.a
          href="#services"
          aria-label="Scroll to services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{ opacity: { delay: 1.8 }, y: { delay: 1.8, duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
          className={`absolute bottom-5 left-1/2 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-[#c9d6d1] bg-white/80 text-[#0f2a26] sm:flex ${focusRing}`}
        >
          <ArrowDown size={16} aria-hidden />
        </motion.a>
      )}
    </section>
  );
}

/* ---------------------- ABOUT ---------------------- */

const aboutIconMap = { MapPin, MessageCircle, Clock } as const;
const roleIconMap = { Layers, Scale, ShieldCheck } as const;

function About() {
  const reduce = useReducedMotion();

  return (
    <Section id="about" className="bg-[#0f2a26]" dark>
      <Reveal>
        <SectionHeading light tag="About us" description={aboutIntro}>
          Based in India, built for Indian investors
        </SectionHeading>
      </Reveal>

      {/* Who does what: three roles joined by arrows */}
      <Reveal className="mb-5">
        <div className="grid divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm md:grid-cols-3 md:divide-x md:divide-y-0">
          {aboutRoles.map((role, i) => {
            const Icon = roleIconMap[role.icon];
            return (
              <div key={role.title} className="relative flex flex-col items-center px-6 py-8 text-center sm:py-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d4a853]/10 text-[#e3bd6a] ring-1 ring-[#d4a853]/30">
                  <Icon size={22} strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="mt-5 text-[1.4rem] font-semibold tracking-tight text-white sm:text-[1.6rem]">
                  {role.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-6 text-white/65">{role.text}</p>
                {i < aboutRoles.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute right-0 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0f2a26] text-[#e3bd6a] md:flex"
                  >
                    <ArrowRight size={14} />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {aboutPoints.map((point, i) => {
          const Icon = aboutIconMap[point.icon];
          return (
            <Reveal key={point.title} delay={i * 0.09} className="h-full">
              <motion.div
                whileHover={reduce ? undefined : { y: -5 }}
                transition={{ duration: 0.3 }}
                className="flex h-full flex-col items-center rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition hover:border-[#d4a853]/40 hover:bg-white/[0.07] lg:p-8"
              >
                <Icon size={22} strokeWidth={1.6} className="text-[#e3bd6a]" aria-hidden />
                <h3 className="mt-4 text-[1.15rem] font-semibold tracking-tight text-white">{point.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-white/70">{point.text}</p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------------- SERVICES ---------------------- */

function Services() {
  const reduce = useReducedMotion();

  return (
    <Section id="services" className="bg-white">
      <Reveal>
        <SectionHeading tag="What we do" description="Organised support from India, with EB-5 specialist lawyers by your side.">
          Practical support at every stage
        </SectionHeading>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {services.map((service, i) => {
          const Icon = iconMap[service.icon];
          return (
            <Reveal key={service.title} delay={i * 0.09} className="h-full">
              <motion.article
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-[#e2eae7] bg-gradient-to-b from-white to-[#f4f8f6] p-6 text-center lg:p-8 shadow-[0_1px_2px_rgba(15,42,38,0.04)] transition-all hover:border-[#d4a853]/50 hover:shadow-[0_30px_60px_-24px_rgba(15,42,38,0.2)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-8 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[#d4a853] to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f2a26] text-white shadow-lg shadow-[#0f2a26]/20 ring-4 ring-[#0f2a26]/[0.06]">
                  <Icon size={24} strokeWidth={1.6} aria-hidden />
                </div>
                <h3 className="mt-6 text-[1.3rem] font-semibold tracking-tight text-[#0f2a26]">{service.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-7 text-[#4a5c57]">{service.text}</p>
                <ul className="mt-6 flex flex-wrap justify-center gap-2">
                  {service.detail.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-[#dbe5e1] bg-white px-3 py-1 text-[12px] text-[#2a3d38]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------------- PROCESS ---------------------- */

function Process() {
  const reduce = useReducedMotion();

  return (
    <Section id="process" className="bg-[#0f2a26]" dark>
      <Reveal>
        <SectionHeading light tag="The process" description="A typical sequence. Every situation is different.">
          How it unfolds
        </SectionHeading>
      </Reveal>

      <div className="relative">
        {/* connecting line behind the numbered markers (desktop) */}
        <motion.span
          aria-hidden
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease }}
          className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px origin-left bg-gradient-to-r from-[#d4a853]/10 via-[#d4a853]/60 to-[#d4a853]/10 lg:block"
        />
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.1} className="flex flex-col items-center text-center">
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#d4a853]/60 bg-[#0f2a26] text-[15px] font-semibold text-[#e3bd6a] shadow-[0_0_0_6px_#0f2a26,0_0_30px_-4px_rgba(212,168,83,0.45)]">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-[1.2rem] font-semibold text-white">{step.title}</h3>
                <p className="mt-2 max-w-[16rem] text-[15px] leading-7 text-white/70">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <Reveal delay={0.3} className="mt-14 flex justify-center">
        <a
          href="#consult"
          className={`inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[14px] font-semibold text-[#0f2a26] transition hover:bg-[#eef4f2] ${focusRing}`}
        >
          Start a conversation
          <ArrowRight size={16} aria-hidden />
        </a>
      </Reveal>
    </Section>
  );
}

/* ---------------------- FUNDS ---------------------- */

function Funds() {
  const reduce = useReducedMotion();

  return (
    <Section id="funds" className="bg-white">
      <Reveal>
        <SectionHeading tag="Source of funds" description="Often the heart of an EB-5 case. Your lawyer confirms what is required.">
          The story behind the capital
        </SectionHeading>
      </Reveal>

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {fundItems.map((item, i) => (
          <li key={item.title} className="h-full">
            <Reveal delay={i * 0.07} className="h-full">
              <motion.div
                whileHover={reduce ? undefined : { y: -4 }}
                className="flex h-full flex-col items-center rounded-3xl border border-[#e2eae7] bg-gradient-to-b from-white to-[#f4f8f6] p-6 text-center transition hover:border-[#d4a853]/50 hover:shadow-[0_24px_48px_-24px_rgba(15,42,38,0.18)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f2a26] text-sm font-semibold text-[#e3bd6a] ring-4 ring-[#0f2a26]/[0.06]">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-[1.15rem] font-semibold text-[#0f2a26]">{item.title}</h3>
                <p className="mt-1.5 text-[15px] leading-6 text-[#4a5c57]">{item.text}</p>
              </motion.div>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal delay={0.2} className="mx-auto mt-6 max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl bg-[#0f2a26] p-7 text-center text-white sm:p-9">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-[#d4a853]/15 blur-3xl"
          />
          <h3 className="relative text-[1.3rem] font-semibold tracking-tight">Before you commit</h3>
          <ul className="relative mx-auto mt-6 grid max-w-2xl gap-x-8 gap-y-3 text-left sm:grid-cols-2">
            {questionsWorthAsking.map((q) => (
              <li key={q} className="flex gap-3 text-[14px] leading-6 text-white/80">
                <Check size={16} className="mt-1 shrink-0 text-[#d4a853]" aria-hidden />
                {q}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------------- TESTIMONIALS ---------------------- */

function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <Section id="testimonials" className="bg-[#eef4f2]">
      <Reveal>
        <SectionHeading tag="Client stories">What clients say</SectionHeading>
      </Reveal>

      {/* Swipeable row on phones, three columns from tablet up */}
      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
        {testimonials.map((item, i) => (
          <li key={item.name} className="w-[85%] shrink-0 snap-center sm:w-[60%] md:w-auto">
            <Reveal delay={i * 0.1} className="h-full">
              <motion.figure
                whileHover={reduce ? undefined : { y: -5 }}
                transition={{ duration: 0.3 }}
                className="flex h-full flex-col rounded-3xl border border-[#d9e2de] bg-white p-6 shadow-[0_1px_2px_rgba(15,42,38,0.04)] transition hover:border-[#d4a853]/50 hover:shadow-[0_30px_60px_-24px_rgba(15,42,38,0.18)] lg:p-8"
              >
                <Quote size={26} className="text-[#d4a853]" strokeWidth={1.6} aria-hidden />
                <blockquote className="mt-4 flex-1 text-[15px] leading-7 text-[#2a3d38] sm:text-[16px]">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[#e2eae7] pt-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0f2a26] text-[13px] font-semibold text-[#e3bd6a]">
                    {item.name.replace(/[^A-Za-z]/g, "").slice(0, 2)}
                  </span>
                  <span className="text-[14px] leading-5">
                    <span className="block font-semibold text-[#0f2a26]">{item.name}</span>
                    <span className="block text-[#5a6b65]">{item.place}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------------- FAQ ---------------------- */

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section id="faq" className="bg-white">
      <Reveal>
        <SectionHeading tag="FAQ">Frequently asked questions</SectionHeading>
      </Reveal>

      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={faq.q}>
              <div
                className={`overflow-hidden rounded-2xl border transition-all ${
                  isOpen
                    ? "border-[#d4a853]/50 bg-white shadow-[0_16px_40px_-20px_rgba(15,42,38,0.2)]"
                    : "border-[#e2eae7] bg-[#f7f9f8] hover:border-[#c5d4cf] hover:bg-[#f2f6f4]"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    className={`flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left sm:px-6 sm:py-5 ${focusRing}`}
                  >
                    <span className="text-[15px] font-medium leading-snug text-[#0f2a26] sm:text-[16px]">{faq.q}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                        isOpen ? "bg-[#d4a853]/20 text-[#6b5214]" : "bg-[#eef4f2] text-[#5a6b65]"
                      }`}
                    >
                      <ChevronDown
                        size={15}
                        aria-hidden
                        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.28, ease }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-[15px] leading-7 text-[#3f514c] sm:px-6">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------------- CONSULTATION ---------------------- */

function Consultation() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const reduce = useReducedMotion();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      country: String(data.get("country") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus({ type: "success", message: "Thank you. Your request has been submitted." });
      form.reset();
    } catch {
      setStatus({ type: "error", message: "We couldn’t submit your request. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section id="consult" className="bg-[#0f2a26]" dark>
      <Reveal>
        <SectionHeading light tag="Get in touch" description="Tell us what you are exploring. No documents, no pressure.">
          Begin with a conversation
        </SectionHeading>
      </Reveal>

      <Reveal delay={0.1} className="mx-auto max-w-2xl">
        <form
          onSubmit={handleSubmit}
          aria-busy={submitting}
          className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)] backdrop-blur-md sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-[13px] text-white/80">
                Full name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                maxLength={120}
                disabled={submitting}
                placeholder="Your name"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[13px] text-white/80">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                maxLength={254}
                disabled={submitting}
                placeholder="you@example.com"
                className={inputCls}
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="country" className="mb-1.5 block text-[13px] text-white/80">
              Country of residence
            </label>
            <input
              id="country"
              name="country"
              autoComplete="country-name"
              maxLength={100}
              disabled={submitting}
              placeholder="India / other"
              className={inputCls}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="message" className="mb-1.5 block text-[13px] text-white/80">
              What would you like to discuss?
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              maxLength={3000}
              rows={4}
              disabled={submitting}
              placeholder="Your goals or questions. Please don’t include sensitive documents."
              className={`${inputCls} resize-y leading-6`}
            />
          </div>

          <div className="mt-6 flex flex-col items-center gap-3">
            <motion.button
              whileHover={reduce || submitting ? undefined : { y: -2 }}
              whileTap={reduce || submitting ? undefined : { scale: 0.98 }}
              type="submit"
              disabled={submitting}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[14px] font-semibold text-[#0f2a26] transition hover:bg-[#eef4f2] disabled:opacity-70 sm:w-auto sm:min-w-[16rem] ${focusRing}`}
            >
              {submitting ? "Submitting…" : "Request an introduction"}
              {!submitting && <ArrowRight size={16} aria-hidden />}
            </motion.button>
            <p className="text-center text-[12px] leading-5 text-white/60">Sending this form does not start a legal engagement.</p>
          </div>

          <div aria-live="polite" role="status">
            {status && (
              <p
                className={`mt-4 rounded-xl px-4 py-3 text-center text-[14px] ${
                  status.type === "success" ? "bg-emerald-500/15 text-emerald-100" : "bg-rose-500/15 text-rose-100"
                }`}
              >
                {status.message}
              </p>
            )}
          </div>
        </form>
      </Reveal>
    </Section>
  );
}

/* ---------------------- MOBILE CTA ---------------------- */

function MobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const consult = document.getElementById("consult");
    if (!hero || !consult) return;
    let heroOut = false;
    let consultIn = false;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) heroOut = !e.isIntersecting;
        else consultIn = e.isIntersecting;
      });
      setShow(heroOut && !consultIn);
    });
    io.observe(hero);
    io.observe(consult);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d9e2de] bg-white/95 px-4 pt-3 backdrop-blur-xl lg:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <a
            href="#consult"
            className={`flex items-center justify-center gap-2 rounded-xl bg-[#0f2a26] px-5 py-3.5 text-[14px] font-semibold text-white ${focusRing}`}
          >
            Start a conversation
            <ArrowRight size={16} aria-hidden />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------------- PAGE ---------------------- */

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const reduce = useReducedMotion();
  const progressWidth = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <main
      style={{
        fontFamily:
          "var(--font-sans, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif)",
      }}
      className="overflow-x-clip bg-[#f7f9f8] text-[#0f2a26] antialiased"
    >
      <a
        href="#services"
        className="sr-only z-[70] rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#0f2a26] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      {!reduce && (
        <motion.div
          aria-hidden
          style={{ width: progressWidth }}
          className="fixed left-0 top-0 z-[60] h-[2.5px] bg-gradient-to-r from-[#0f2a26] via-[#d4a853] to-[#d4a853]"
        />
      )}

      <Header />
      <Hero />
      <Services />
      <Process />
      <Funds />
      <Testimonials />
      <About />
      <FAQ />
      <Consultation />

      <footer className="border-t border-[#d9e2de] bg-white pb-20 lg:pb-0">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center px-4 py-10 text-center sm:px-6 lg:px-8">
          <p className="text-base font-semibold text-[#0f2a26]">Lawyers on Call</p>
          <nav aria-label="Footer" className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] text-[#5a6b65]">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className={`rounded transition hover:text-[#0f2a26] ${focusRing}`}>
                {label}
              </a>
            ))}
          </nav>
          <p className="mt-8 max-w-2xl border-t border-[#e2eae7] pt-5 text-[12px] leading-5 text-[#66766f]">
            General information only. Not legal, tax or investment advice. EB-5 investments carry risk, and no
            immigration outcome or return is guaranteed. © {new Date().getFullYear()} Lawyers on Call.
          </p>
        </div>
      </footer>

      <MobileCTA />
    </main>
  );
}
