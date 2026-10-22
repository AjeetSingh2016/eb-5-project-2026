// "use client";

// import {
//   useEffect,
//   useId,
//   useRef,
//   useState,
//   useSyncExternalStore,
//   type FormEvent,
//   type ReactNode,
// } from "react";
// import {
//   motion,
//   animate,
//   useInView,
//   useMotionValue,
//   useReducedMotion,
//   useScroll,
//   useSpring,
//   useTransform,
//   AnimatePresence,
// } from "framer-motion";
// import Image from "next/image";
// import dynamic from "next/dynamic";
// import {
//   ArrowDown,
//   ArrowRight,
//   ArrowUpRight,
//   Check,
//   Menu,
//   ShieldCheck,
//   X,
//   FileText,
//   Quote,
//   MessageCircle,
//   Lock,
//   RefreshCw,
//   Send,
//   Repeat,
//   Mail,
//   Phone,
//   MapPin,
//   User,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// import {
//   navItems,
//   contactEmail,
//   contactPhone,
//   contactPhoneHref,
//   stats,
//   statsNote,
//   services,
//   testimonials,
//   aboutLead,
//   aboutBlocks,
//   engagementIntro,
//   engagementSteps,
//   contactSteps,
//   footerLinks,
//   footerContact,
//   socials,
// } from "@/data/content";
// import { WORLD_W, WORLD_H, LAND_PATH, COUNTRIES, ROUTES, project } from "@/data/worldDots";

// /* ---------- Tokens ---------- */
// const ease = [0.22, 1, 0.36, 1] as const;

// const focusRing =
//   "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a853]";

// const inputCls =
//   "w-full rounded-xl border border-white/20 bg-white/[0.06] px-3.5 py-3 text-base text-white outline-none transition placeholder:text-white/45 focus:border-[#d4a853] focus:bg-white/[0.09] focus:ring-2 focus:ring-[#d4a853]/30 disabled:opacity-60 sm:text-[14px]";

// /* ---------- Primitives ---------- */

// function Reveal({
//   children,
//   className = "",
//   delay = 0,
// }: {
//   children: ReactNode;
//   className?: string;
//   delay?: number;
// }) {
//   const reduce = useReducedMotion();
//   return (
//     <motion.div
//       className={className}
//       initial={reduce ? false : { opacity: 0, y: 18 }}
//       whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.15 }}
//       transition={{ duration: 0.6, delay, ease }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// function SectionHeading({
//   children,
//   description,
//   tag,
//   light = false,
// }: {
//   children: ReactNode;
//   description?: string;
//   tag?: string;
//   light?: boolean;
// }) {
//   return (
//     <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
//       {tag && (
//         <p
//           className={`mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-medium ${
//             light
//               ? "border-white/15 bg-white/[0.06] text-white/80"
//               : "border-[#d4a853]/40 bg-[#d4a853]/10 text-[#6b5214]"
//           }`}
//         >
//           <span className="h-1.5 w-1.5 rounded-full bg-[#d4a853]" />
//           {tag}
//         </p>
//       )}
//       <h2
//         className={`text-balance text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.8rem] lg:text-[3.2rem] xl:text-[3.5rem] ${
//           light ? "text-white" : "text-[#041e3f]"
//         }`}
//       >
//         {children}
//       </h2>
//       {description && (
//         <p
//           className={`mx-auto mt-4 max-w-xl text-[15px] leading-7 sm:text-[17px] sm:leading-8 ${
//             light ? "text-white/70" : "text-[#4a5a70]"
//           }`}
//         >
//           {description}
//         </p>
//       )}
//     </div>
//   );
// }

// /* Full-screen section shell: centred content, dotted grid + soft glow */
// function Section({
//   id,
//   className = "",
//   dark = false,
//   children,
// }: {
//   id: string;
//   className?: string;
//   dark?: boolean;
//   children: ReactNode;
// }) {
//   const dot = dark ? "rgba(255,255,255,0.08)" : "rgba(4,30,63,0.10)";
//   const mask = "radial-gradient(ellipse 75% 65% at 50% 40%, #000 25%, transparent 75%)";
//   return (
//     <section
//       id={id}
//       className={`relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 ${className}`}
//     >
//       <div aria-hidden className="pointer-events-none absolute inset-0">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `radial-gradient(${dot} 1px, transparent 1px)`,
//             backgroundSize: "24px 24px",
//             maskImage: mask,
//             WebkitMaskImage: mask,
//           }}
//         />
//         <div
//           className={`absolute left-1/2 top-0 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full blur-3xl ${
//             dark ? "bg-[#d4a853]/10" : "bg-[#d4a853]/15"
//           }`}
//         />
//       </div>
//       <div className="relative mx-auto w-full max-w-[1100px] px-4 xl:max-w-[1200px] sm:px-6 lg:px-8">{children}</div>
//     </section>
//   );
// }

// /* ---------------------- HEADER ---------------------- */

// function Header() {
//   const [open, setOpen] = useState(false);
//   const [active, setActive] = useState("#top");
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     if (!open) return;
//     const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [open]);

//   useEffect(() => {
//     const ids = ["top", "services", "about", "engagement", "testimonials", "consult"];
//     const elements = ids
//       .map((id) => document.getElementById(id))
//       .filter((el): el is HTMLElement => Boolean(el));

//     const observer = new IntersectionObserver(
//       (entries) => {
//         const visible = entries
//           .filter((e) => e.isIntersecting)
//           .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
//         if (visible) setActive(`#${visible.target.id}`);
//       },
//       { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.2, 0.45] },
//     );

//     elements.forEach((el) => observer.observe(el));
//     return () => observer.disconnect();
//   }, []);

//   /* Outer height stays 64/72px so the hero's overlap maths is unchanged;
//      the visible bar is a floating glass pill inside it. */
//   return (
//     <header className="sticky top-0 z-50 h-16 px-3 pt-2 sm:h-[72px] sm:px-5 sm:pt-3">
//       <div
//         className={`relative mx-auto flex h-12 max-w-[1100px] items-center justify-between rounded-2xl border pl-3 pr-1.5 transition-all duration-500 sm:h-[52px] sm:pl-4 lg:pr-2 xl:max-w-[1200px] ${
//           scrolled || open
//             ? "border-[#d8e1ec] bg-white/85 shadow-[0_12px_40px_-14px_rgba(4,30,63,0.22)] backdrop-blur-xl"
//             : "border-white/70 bg-white/55 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] backdrop-blur-md"
//         }`}
//       >
//         <a
//           href="#top"
//           aria-label="EB-5 Paralegal — Your Investors, Our Expertise"
//           className={`group flex min-w-0 items-center gap-1.5 rounded-lg ${focusRing}`}
//         >
//           <Image
//             src="/logov2.png"
//             alt=""
//             width={48}
//             height={60}
//             priority
//             className="h-10 w-auto shrink-0 object-contain sm:h-11"
//           />
//           <span className="flex min-w-0 flex-col justify-center">
//             <span className="text-[16px] font-bold leading-none tracking-tight sm:text-[18px]">
//               <span className="text-[#041e3f]">EB-5</span>{" "}
//               <span className="text-[#a8791c]">Paralegal</span>
//             </span>
//             <span className="mt-1 truncate text-[8.5px] font-semibold uppercase leading-none tracking-[0.12em] text-[#5f6f85] sm:text-[9.5px]">
//               Your Investors, Our Expertise
//             </span>
//           </span>
//         </a>

//         <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">
//           {navItems.map(([label, href]) => (
//             <a
//               key={href}
//               href={href}
//               aria-current={active === href ? "true" : undefined}
//               className={`relative rounded-full px-3 py-1.5 text-[13px] xl:px-3.5 font-medium transition-colors ${focusRing} ${
//                 active === href ? "text-[#041e3f]" : "text-[#4a5a70] hover:text-[#041e3f]"
//               }`}
//             >
//               {active === href && (
//                 <motion.span
//                   layoutId="nav-pill"
//                   className="absolute inset-0 rounded-full bg-[#041e3f]/[0.07]"
//                   transition={{ type: "spring", stiffness: 420, damping: 34 }}
//                 />
//               )}
//               <span className="relative">{label}</span>
//             </a>
//           ))}
//         </nav>

//         <a
//           href="#consult"
//           className={`hidden items-center gap-1.5 rounded-xl bg-[#041e3f] px-4 py-2 text-[13px] font-semibold text-white shadow-md shadow-[#041e3f]/20 transition hover:bg-[#0b2c57] lg:inline-flex ${focusRing}`}
//         >
//           Partner with us
//           <ArrowUpRight size={14} aria-hidden />
//         </a>

//         <button
//           type="button"
//           onClick={() => setOpen(!open)}
//           aria-label={open ? "Close menu" : "Open menu"}
//           aria-expanded={open}
//           aria-controls="mobile-menu"
//           className={`flex h-10 w-10 items-center justify-center rounded-xl text-[#041e3f] transition hover:bg-[#041e3f]/[0.06] lg:hidden ${focusRing}`}
//         >
//           {open ? <X size={19} /> : <Menu size={19} />}
//         </button>
//       </div>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             id="mobile-menu"
//             initial={{ opacity: 0, y: -8, scale: 0.98 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -8, scale: 0.98 }}
//             transition={{ duration: 0.2, ease }}
//             className="absolute inset-x-3 top-[64px] mx-auto max-w-[1100px] origin-top rounded-2xl border border-[#d8e1ec] bg-white/95 p-2 shadow-[0_24px_60px_-20px_rgba(4,30,63,0.3)] backdrop-blur-xl sm:inset-x-5 sm:top-[70px] lg:hidden"
//           >
//             <nav aria-label="Mobile" className="space-y-0.5">
//               {navItems.map(([label, href]) => (
//                 <a
//                   key={href}
//                   href={href}
//                   onClick={() => setOpen(false)}
//                   className={`block rounded-xl px-3.5 py-3 text-[15px] ${focusRing} ${
//                     active === href ? "bg-[#041e3f]/[0.06] font-medium text-[#041e3f]" : "text-[#4a5a70]"
//                   }`}
//                 >
//                   {label}
//                 </a>
//               ))}
//               <a
//                 href="#consult"
//                 onClick={() => setOpen(false)}
//                 className={`mt-1.5 flex items-center justify-between rounded-xl bg-[#041e3f] px-4 py-3.5 text-[15px] font-medium text-white ${focusRing}`}
//               >
//                 Partner with us
//                 <ArrowRight size={16} aria-hidden />
//               </a>
//             </nav>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

// /* ---------------------- HERO ---------------------- */

// /* Immigration routes between countries (no cities). Geometry is computed once, at module load. */
// const PLANE_PATH = "M1 9 8 7 14 1 16 2 14 8 22 12 22 14 13 13 9 21 7 21 8 13 1 13Z";
// const TRAIL_LENGTH = 0.16; /* share of the route covered by the glowing trail */

// const flightRoutes = ROUTES.filter((r) => r.phone !== false).map((r, i) => {
//   const a = COUNTRIES[r.from];
//   const b = COUNTRIES[r.to];
//   const pts = [
//     project(a.lon, a.lat),
//     ...(r.via ?? []).map(([lo, la]) => project(lo, la)),
//     project(b.lon, b.lat),
//   ];
//   const n1 = (v: number) => v.toFixed(1);
//   let d: string;
//   let length = 0;

//   if (pts.length > 2) {
//     /* Smooth curve through the waypoints (Catmull-Rom converted to cubic curves) */
//     d = `M${n1(pts[0][0])} ${n1(pts[0][1])}`;
//     for (let k = 0; k < pts.length - 1; k++) {
//       const p0 = pts[Math.max(0, k - 1)];
//       const p1 = pts[k];
//       const p2 = pts[k + 1];
//       const p3 = pts[Math.min(pts.length - 1, k + 2)];
//       const c1x = p1[0] + (p2[0] - p0[0]) / 6;
//       const c1y = p1[1] + (p2[1] - p0[1]) / 6;
//       const c2x = p2[0] - (p3[0] - p1[0]) / 6;
//       const c2y = p2[1] - (p3[1] - p1[1]) / 6;
//       d += ` C${n1(c1x)} ${n1(c1y)} ${n1(c2x)} ${n1(c2y)} ${n1(p2[0])} ${n1(p2[1])}`;
//       length += Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
//     }
//   } else {
//     const [x1, y1] = pts[0];
//     const [x2, y2] = pts[1];
//     length = Math.hypot(x2 - x1, y2 - y1);
//     const cx = (x1 + x2) / 2;
//     const cy = (y1 + y2) / 2 - length * r.bend;
//     d = `M${n1(x1)} ${n1(y1)} Q${n1(cx)} ${n1(cy)} ${n1(x2)} ${n1(y2)}`;
//   }

//   return {
//     key: `${r.from}-${r.to}`,
//     d,
//     duration: 4.5 + length / 150,
//     delay: 0.8 + i * 0.85,
//     repeatDelay: 1.2 + (i % 3) * 0.9,
//   };
// });

// function FlightRoute({
//   d,
//   duration,
//   delay,
//   repeatDelay,
//   index,
//   mobile,
//   reduce,
// }: {
//   d: string;
//   duration: number;
//   delay: number;
//   repeatDelay: number;
//   index: number;
//   mobile: boolean;
//   reduce: boolean;
// }) {
//   const pathRef = useRef<SVGPathElement>(null);
//   const trailRef = useRef<SVGPathElement>(null);
//   const planeRef = useRef<SVGGElement>(null);
//   const progress = useMotionValue(0);

//   useEffect(() => {
//     const path = pathRef.current;
//     const trail = trailRef.current;
//     const plane = planeRef.current;
//     if (!path || !trail || !plane) return;
//     const len = path.getTotalLength();

//     /* Moves the plane and its trail to position t (0..1) along the route */
//     const place = (t: number) => {
//       const p = path.getPointAtLength(t * len);
//       const q = path.getPointAtLength(Math.min(len, t * len + 1));
//       const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
//       plane.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${angle})`);
//       trail.setAttribute("stroke-dashoffset", String(TRAIL_LENGTH - t));
//       const o = t < 0.06 ? t / 0.06 : t > 0.9 ? (1 - t) / 0.1 : 1;
//       plane.setAttribute("opacity", String(o));
//       trail.setAttribute("opacity", String(o));
//     };

//     if (reduce) {
//       place(0.5);
//       return;
//     }

//     place(0);
//     const unsub = progress.on("change", place);
//     const controls = animate(progress, [0, 1], {
//       duration,
//       ease: "easeInOut",
//       repeat: Infinity,
//       repeatDelay,
//       delay,
//     });
//     return () => {
//       controls.stop();
//       unsub();
//     };
//   }, [duration, delay, repeatDelay, reduce, progress]);

//   return (
//     <>
//       <motion.path
//         ref={pathRef}
//         d={d}
//         stroke="#041e3f"
//         strokeOpacity={0.28}
//         strokeWidth={mobile ? 2.4 : 1.7}
//         fill="none"
//         strokeLinecap="round"
//         initial={reduce ? false : { pathLength: 0 }}
//         animate={{ pathLength: 1 }}
//         transition={{ duration: 2.2, delay: index * 0.15, ease: "easeInOut" }}
//       />
//       <path
//         ref={trailRef}
//         d={d}
//         pathLength={1}
//         stroke="#d4a853"
//         strokeWidth={mobile ? 5.5 : 3.8}
//         fill="none"
//         strokeLinecap="round"
//         strokeDasharray={`${TRAIL_LENGTH} 2`}
//         opacity={0}
//       />
//       <g ref={planeRef} opacity={0}>
//         <g transform={`scale(${mobile ? 1.7 : 1.15}) translate(-11,-11)`}>
//           <path d={PLANE_PATH} fill="#041e3f" stroke="#f6f8fb" strokeWidth="0.8" />
//         </g>
//       </g>
//     </>
//   );
// }

// function HeroFlight({
//   className = "",
//   parallax = false,
//   mobile = false,
// }: {
//   className?: string;
//   parallax?: boolean;
//   mobile?: boolean;
// }) {
//   const reduce = Boolean(useReducedMotion());
//   const uid = useId().replace(/:/g, "");
//   const { scrollY } = useScroll();
//   const drift = useTransform(scrollY, [0, 700], [0, 56]);
//   const labelSize = mobile ? 34 : 21;

//   return (
//     <motion.div
//       aria-hidden
//       style={parallax && !reduce ? { y: drift } : undefined}
//       className={`pointer-events-none ${className}`}
//     >
//       <svg
//         viewBox={`0 0 ${WORLD_W} ${WORLD_H}`}
//         className={mobile ? "absolute inset-0 h-full w-full" : "h-full w-full"}
//         preserveAspectRatio={mobile ? "xMidYMax meet" : "xMidYMid meet"}
//       >
//         <defs>
//           <radialGradient id={`${uid}-glow`}>
//             <stop offset="0%" stopColor="#d4a853" stopOpacity="0.16" />
//             <stop offset="100%" stopColor="#d4a853" stopOpacity="0" />
//           </radialGradient>
//         </defs>

//         <ellipse cx={WORLD_W / 2} cy={WORLD_H / 2} rx={470} ry={230} fill={`url(#${uid}-glow)`} />

//         {/* Dotted world map */}
//         <path
//           d={LAND_PATH}
//           stroke="#8fa2bf"
//           strokeOpacity={0.55}
//           strokeWidth={mobile ? 6.5 : 5}
//           strokeLinecap="round"
//           fill="none"
//         />

//         {/* Routes and planes */}
//         {flightRoutes.map((r, i) => (
//           <FlightRoute
//             key={r.key}
//             d={r.d}
//             duration={r.duration}
//             delay={r.delay}
//             repeatDelay={r.repeatDelay}
//             index={i}
//             mobile={mobile}
//             reduce={reduce}
//           />
//         ))}

//         {/* Country markers */}
//         {Object.entries(COUNTRIES).map(([key, c], i) => {
//           const [x, y] = project(c.lon, c.lat);
//           const color = c.kind === "origin" ? "#041e3f" : "#d4a853";
//           return (
//             <g key={key}>
//               <motion.circle
//                 cx={x}
//                 cy={y}
//                 r={mobile ? 9 : 8}
//                 fill={color}
//                 fillOpacity={0.16}
//                 animate={reduce ? undefined : { r: mobile ? [9, 22, 9] : [8, 17, 8] }}
//                 transition={{ duration: 2.8, delay: (i % 5) * 0.55, repeat: Infinity, ease: "easeInOut" }}
//               />
//               <circle cx={x} cy={y} r={mobile ? 7 : 5.5} fill={color} />
//               <circle cx={x} cy={y} r={mobile ? 3 : 2.2} fill="#f6f8fb" />
//               {(!mobile || c.showOnPhone) && c.name && (
//                 <text
//                   x={x + c.label.dx}
//                   y={y + c.label.dy}
//                   textAnchor={c.label.anchor}
//                   fontSize={labelSize}
//                   fontWeight={600}
//                   fill="#041e3f"
//                   fillOpacity={0.8}
//                   stroke="#eef3f9"
//                   strokeWidth={4}
//                   strokeLinejoin="round"
//                   paintOrder="stroke"
//                 >
//                   {c.name}
//                 </text>
//               )}
//             </g>
//           );
//         })}
//       </svg>
//     </motion.div>
//   );
// }

// /* ---------- 3D globe (react-globe.gl, desktop only) ---------- */

// /* Set to false to go back to the flat map on desktop as well. */
// const USE_GLOBE = true;

// /* The globe and its 3D engine load only in the browser, and only on desktop */
// const GlobeScene = dynamic(() => import("@/components/GlobeScene"), { ssr: false });

// function useIsDesktop() {
//   return useSyncExternalStore(
//     (onChange) => {
//       const m = window.matchMedia("(min-width: 1024px)");
//       m.addEventListener("change", onChange);
//       return () => m.removeEventListener("change", onChange);
//     },
//     () => window.matchMedia("(min-width: 1024px)").matches,
//     () => false,
//   );
// }

// function HeroGlobe({ className = "", parallax = false }: { className?: string; parallax?: boolean }) {
//   const reduce = Boolean(useReducedMotion());
//   const isDesktop = useIsDesktop();
//   const { scrollY } = useScroll();
//   const drift = useTransform(scrollY, [0, 700], [0, 56]);

//   return (
//     <motion.div
//       aria-hidden
//       style={parallax && !reduce ? { y: drift } : undefined}
//       className={`pointer-events-none ${className}`}
//     >
//       {isDesktop && <GlobeScene reduceMotion={reduce} />}
//     </motion.div>
//   );
// }

// /* The hero is exactly one screen tall (svh handles mobile browser bars).
//    It sits behind the transparent sticky header, so header + hero = 100svh. */
// function Hero() {
//   const reduce = useReducedMotion();

//   return (
//     <section
//       id="top"
//       className="relative -mt-16 flex min-h-[calc(100svh-3.8rem-max(0.75rem,env(safe-area-inset-bottom,0px)))] flex-col overflow-hidden pt-16 sm:-mt-[72px] sm:pt-[72px] lg:min-h-[100svh]"
//     >
//       <div className="absolute inset-0 bg-[#eef3f9] lg:bg-gradient-to-br lg:from-[#eef3f9] lg:via-[#f6f8fb] lg:to-[#f0f4f9]" />
//       {USE_GLOBE ? (
//         <HeroGlobe parallax className="absolute inset-y-0 right-0 hidden w-[52%] lg:block" />
//       ) : (
//         <HeroFlight parallax className="absolute inset-y-0 right-0 hidden w-[52%] lg:block" />
//       )}

//       <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-start px-4 pt-3 sm:px-6 sm:pt-8 lg:pointer-events-none lg:justify-center lg:px-8 lg:py-8">
//         {/* Text zone: on phones it takes the space above the animation and centres its content in it */}
//         <div className="flex flex-1 items-center lg:block lg:flex-none">
//         <motion.div
//           initial={reduce ? false : { opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.85, ease }}
//           className="relative z-10 max-w-xl lg:pointer-events-auto lg:max-w-[48%]"
//         >
//           <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4a853]/40 sm:mb-5 bg-[#d4a853]/10 px-3.5 py-1.5 text-[12px] font-medium text-[#6b5214]">
//             <span className="h-1.5 w-1.5 rounded-full bg-[#d4a853]" />
//             Behind Every Approval, Expert Support
//           </p>

//           <h1 className="text-balance text-[length:clamp(1.85rem,5svh,2.7rem)] font-semibold leading-[1.08] tracking-tight text-[#041e3f] sm:text-[3.4rem] sm:leading-[1.05] lg:text-[3.9rem] xl:text-[4.4rem]">
//             Specialist paralegal support for your{" "}
//             <span className="relative inline-block whitespace-nowrap">
//               <span className="relative z-10">EB-5 practice</span>
//               <motion.span
//                 aria-hidden
//                 initial={reduce ? false : { scaleX: 0 }}
//                 animate={{ scaleX: 1 }}
//                 transition={{ duration: 0.9, delay: 0.7, ease }}
//                 className="absolute -bottom-1 left-0 right-0 h-2.5 origin-left bg-[#d4a853]/35 sm:h-3"
//               />
//             </span>
//           </h1>

//           <p className="mt-4 max-w-md text-[15px] leading-6 text-[#3d4d63] sm:mt-5 sm:text-[16px] sm:leading-7">
//             We work as a white-label extension of your team. We handle the document-heavy side of EB-5 cases while your attorneys keep full control.
//           </p>

//           <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7">
//             <motion.a
//               whileHover={reduce ? undefined : { y: -2 }}
//               whileTap={reduce ? undefined : { scale: 0.98 }}
//               href="#consult"
//               className={`hidden items-center gap-2 rounded-xl bg-[#041e3f] px-5 py-3.5 sm:inline-flex text-[14px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(4,30,63,0.35)] transition hover:bg-[#0b2c57] ${focusRing}`}
//             >
//               Partner with us
//               <ArrowRight size={16} aria-hidden />
//             </motion.a>
//             <a
//               href="#services"
//               className={`inline-flex items-center gap-2 rounded-xl border border-[#c8d3e0] bg-white/80 px-5 py-3.5 text-[14px] font-medium text-[#041e3f] backdrop-blur-sm transition hover:border-[#041e3f]/30 hover:bg-white ${focusRing}`}
//             >
//               See what we deliver
//               <ArrowDown size={15} aria-hidden />
//             </a>
//           </div>

//           <p className="mt-5 hidden items-center gap-2 text-[13px] text-[#4a5a70] sm:mt-6 sm:flex [@media(min-height:780px)]:flex">
//             <ShieldCheck size={16} className="shrink-0 text-[#041e3f]" strokeWidth={1.7} aria-hidden />
//            We deliver tailored solutions that empower businesses to grow.
//           </p>
//         </motion.div>
//         </div>

//         {/* Phones and tablets: full-width flight anchored at the bottom of the hero */}
//         <HeroFlight
//           mobile
//           className="relative -mx-4 h-[clamp(150px,25svh,240px)] shrink-0 sm:-mx-6 sm:h-[clamp(240px,32svh,380px)] lg:hidden [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_16%)] [mask-image:linear-gradient(to_bottom,transparent,black_16%)]"
//         />
//       </div>

//       {!reduce && (
//         <motion.a
//           href="#stats"
//           aria-label="Scroll down"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1, y: [0, 6, 0] }}
//           transition={{ opacity: { delay: 1.8 }, y: { delay: 1.8, duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
//           className={`absolute bottom-5 left-1/2 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-[#c8d3e0] bg-white/80 text-[#041e3f] sm:flex ${focusRing}`}
//         >
//           <ArrowDown size={16} aria-hidden />
//         </motion.a>
//       )}
//     </section>
//   );
// }

// /* ---------------------- STATS ---------------------- */

// function CountUp({ to, suffix }: { to: number; suffix: string }) {
//   const reduce = useReducedMotion();
//   const ref = useRef<HTMLSpanElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-10% 0px" });
//   const [value, setValue] = useState(0);

//   useEffect(() => {
//     if (reduce || !inView) return;
//     const controls = animate(0, to, {
//       duration: 1.6,
//       ease,
//       onUpdate: (v) => setValue(Math.round(v)),
//     });
//     return () => controls.stop();
//   }, [inView, reduce, to]);

//   const shown = reduce ? to : value;

//   return (
//     <span ref={ref}>
//       {shown.toLocaleString("en-US")}
//       {suffix}
//     </span>
//   );
// }

// function Stats() {
//   return (
//     <section id="stats" className="scroll-mt-16 bg-[#eef3f9] pb-12 pt-6 sm:py-16">
//       <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8 xl:max-w-[1200px]">
//         <div className="relative">
//           {/* Mobile cross: each arm ends at the middle of its block */}
//           <span
//             aria-hidden
//             className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-px -translate-x-1/2 -translate-y-1/2 bg-[#c8d3e0] lg:hidden"
//           />
//           <span
//             aria-hidden
//             className="pointer-events-none absolute left-1/2 top-1/2 h-px w-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#c8d3e0] lg:hidden"
//           />

//           <dl className="grid grid-cols-2 lg:grid-cols-4">
//             {stats.map((stat, i) => (
//               <div
//                 key={stat.label}
//                 className={`flex flex-col-reverse items-center px-3 py-8 text-center lg:py-2 ${
//                   i > 0 ? "lg:border-l lg:border-[#c8d3e0]" : ""
//                 }`}
//               >
//                 <dt className="mt-3 max-w-[13rem] text-[13px] font-medium leading-5 text-[#4a5a70] sm:text-[14px]">
//                   {stat.label}
//                 </dt>
//                 <dd className="text-[2.6rem] font-semibold leading-none tracking-tight tabular-nums text-[#041e3f] sm:text-[3.6rem]">
//                   <CountUp to={stat.value} suffix={stat.suffix} />
//                 </dd>
//               </div>
//             ))}
//           </dl>
//         </div>
//         <p className="mt-6 text-center text-[12px] text-[#5f6f85] sm:mt-8">{statsNote}</p>
//       </div>
//     </section>
//   );
// }

// /* ---------------------- SERVICES ---------------------- */

// function Services() {
//   const reduce = useReducedMotion();

//   return (
//     <Section id="services" className="bg-[#041e3f]" dark>
//       <Reveal>
//         <SectionHeading
//           light
//           tag="Services"
//           description="Specialist EB-5 paralegal support for immigration law firms."
//         >
//           What we deliver
//         </SectionHeading>
//       </Reveal>

//       <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
//         {services.map((service, i) => (
//           <Reveal key={service.title} delay={(i % 3) * 0.08} className="h-full">
//             <motion.article
//               whileHover={reduce ? undefined : { y: -5 }}
//               transition={{ duration: 0.3 }}
//               className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-[border-color,background-color] hover:border-[#d4a853]/40 hover:bg-white/[0.07] lg:p-7"
//             >
//               <span
//                 aria-hidden
//                 className="absolute inset-x-8 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[#d4a853] to-transparent transition-transform duration-500 group-hover:scale-x-100"
//               />
//               <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d4a853]/10 text-[15px] font-semibold tabular-nums text-[#e3bd6a] ring-1 ring-[#d4a853]/30">
//                 {String(i + 1).padStart(2, "0")}
//               </span>
//               <h3 className="mt-5 text-[1.2rem] font-semibold tracking-tight text-white">
//                 {service.title}
//               </h3>
//               <p className="mt-2 text-[15px] leading-7 text-white/70">{service.text}</p>
//             </motion.article>
//           </Reveal>
//         ))}
//       </div>
//     </Section>
//   );
// }

// /* ---------------------- ABOUT ---------------------- */

// const aboutIcons = [FileText, Repeat, Lock, Check] as const;

// function About() {
//   const reduce = useReducedMotion();

//   return (
//     <Section id="about" className="bg-white">
//       {/* Tag only, centred at the top like the other sections */}
//       <Reveal>
//         <div className="mb-8 text-center sm:mb-10">
//           <p className="inline-flex items-center gap-2 rounded-full border border-[#d4a853]/40 bg-[#d4a853]/10 px-3.5 py-1.5 text-[12px] font-medium text-[#6b5214]">
//             <span className="h-1.5 w-1.5 rounded-full bg-[#d4a853]" />
//             About us
//           </p>
//         </div>
//       </Reveal>

//       <div className="grid items-stretch gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
//         {/* Navy story panel with the heading */}
//         <Reveal className="h-full">
//           <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-3xl bg-[#041e3f] p-7 text-white sm:p-10">
//             <div
//               aria-hidden
//               className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#d4a853]/20 blur-3xl"
//             />
//             <h2 className="relative text-balance text-[1.9rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.4rem] lg:text-[2.6rem]">
//               A specialist partner for your EB-5 practice
//             </h2>
//             <span aria-hidden className="relative mt-5 h-[3px] w-12 rounded-full bg-[#d4a853]" />
//             <p className="relative mt-5 text-[15px] leading-7 text-white/75 sm:text-[16px] sm:leading-8">
//               {aboutLead}
//             </p>
//           </div>
//         </Reveal>

//         {/* Four feature cards */}
//         <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
//           {aboutBlocks.map((block, i) => {
//             const Icon = aboutIcons[i];
//             return (
//               <Reveal key={block.title} delay={i * 0.08} className="h-full">
//                 <motion.div
//                   whileHover={reduce ? undefined : { y: -5 }}
//                   transition={{ duration: 0.3 }}
//                   className="group relative h-full overflow-hidden rounded-3xl border border-[#e1e8f0] bg-gradient-to-b from-white to-[#f3f6fa] p-6 transition-[border-color,box-shadow] hover:border-[#d4a853]/50 hover:shadow-[0_24px_48px_-24px_rgba(4,30,63,0.2)]"
//                 >
//                   <span
//                     aria-hidden
//                     className="absolute inset-x-6 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[#d4a853] to-transparent transition-transform duration-500 group-hover:scale-x-100"
//                   />
//                   <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#041e3f] text-[#e3bd6a] shadow-md shadow-[#041e3f]/20">
//                     <Icon size={20} strokeWidth={1.6} aria-hidden />
//                   </span>
//                   <h3 className="mt-5 text-[1.1rem] font-semibold tracking-tight text-[#041e3f]">{block.title}</h3>
//                   <p className="mt-2 text-[15px] leading-7 text-[#4a5a70]">{block.text}</p>
//                 </motion.div>
//               </Reveal>
//             );
//           })}
//         </div>
//       </div>
//     </Section>
//   );
// }

// /* ---------------------- ENGAGEMENT ---------------------- */

// const engagementIconMap = { MessageCircle, Lock, FileText, RefreshCw, Send, Repeat } as const;

// function Engagement() {
//   const reduce = useReducedMotion();
//   const listRef = useRef<HTMLOListElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: listRef,
//     offset: ["start 70%", "end 60%"],
//   });
//   const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
//   const fillHeight = useTransform(fill, (v) => `${v * 100}%`);

//   return (
//     <Section id="engagement" className="bg-[#eef3f9]">
//       <Reveal>
//         <SectionHeading tag="Engagement" description={engagementIntro}>
//           How the engagement works
//         </SectionHeading>
//       </Reveal>

//       {/* Walkthrough: the step in the focus band pops forward, the others recede, and it replays on every pass */}
//       <div className="relative mx-auto max-w-4xl">
//         <div
//           aria-hidden
//           className="absolute bottom-10 left-5 top-6 w-px -translate-x-1/2 bg-[#c8d3e0] md:left-1/2"
//         >
//           <motion.div
//             style={{ height: reduce ? "100%" : fillHeight }}
//             className="w-full bg-[#d4a853]"
//           />
//         </div>

//         <ol ref={listRef} className="relative space-y-6 md:space-y-10">
//           {engagementSteps.map((step, i) => {
//             const Icon = engagementIconMap[step.icon];
//             const left = i % 2 === 0;
//             // once:false so the pop replays every time a step re-enters the focus band
//             const view = { once: false, amount: 0.5, margin: "-12% 0px -12% 0px" } as const;
//             return (
//               <li key={step.title} className="relative md:grid md:grid-cols-2">
//                 {/* outer span handles position, inner span handles the pop */}
//                 <span className="absolute left-5 top-7 z-10 -translate-x-1/2 md:left-1/2">
//                   <motion.span
//                     aria-hidden
//                     initial={reduce ? false : { scale: 0.7, opacity: 0.4, boxShadow: "0 0 0 6px #eef3f9, 0 0 0 0 rgba(212,168,83,0)" }}
//                     whileInView={reduce ? undefined : { scale: 1, opacity: 1, boxShadow: "0 0 0 6px #eef3f9, 0 0 26px 4px rgba(212,168,83,0.55)" }}
//                     viewport={view}
//                     transition={{ type: "spring", stiffness: 380, damping: 16 }}
//                     className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4a853]/60 bg-[#041e3f] text-[15px] font-semibold text-[#e3bd6a]"
//                   >
//                     {i + 1}
//                   </motion.span>
//                 </span>

//                 <div
//                   className={`pl-14 md:pl-0 ${
//                     left ? "md:col-start-1 md:pr-14" : "md:col-start-2 md:pl-14"
//                   }`}
//                 >
//                   <motion.div
//                     initial={reduce ? false : { opacity: 0.3, scale: 0.9, y: 36 }}
//                     whileInView={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
//                     viewport={view}
//                     transition={{ type: "spring", stiffness: 210, damping: 19, mass: 0.8, delay: 0.1 }}
//                     className={left ? "origin-left md:origin-right" : "origin-left"}
//                   >
//                     <motion.div
//                       whileHover={reduce ? undefined : { y: -4 }}
//                       transition={{ duration: 0.3 }}
//                       className="flex items-start gap-4 rounded-3xl border border-[#d8e1ec] bg-white p-5 shadow-[0_1px_2px_rgba(4,30,63,0.04)] transition-[border-color,box-shadow] hover:border-[#d4a853]/50 hover:shadow-[0_24px_48px_-24px_rgba(4,30,63,0.2)] sm:p-6"
//                     >
//                       <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#041e3f] text-white shadow-md shadow-[#041e3f]/20">
//                         <Icon size={20} strokeWidth={1.6} aria-hidden />
//                       </span>
//                       <div>
//                         <p className="text-[12px] font-medium text-[#6b5214]">Step {i + 1}</p>
//                         <h3 className="mt-0.5 text-[1.15rem] font-semibold tracking-tight text-[#041e3f]">
//                           {step.title}
//                         </h3>
//                         <p className="mt-1.5 text-[15px] leading-7 text-[#4a5a70]">{step.text}</p>
//                       </div>
//                     </motion.div>
//                   </motion.div>
//                 </div>
//               </li>
//             );
//           })}
//         </ol>
//       </div>
//     </Section>
//   );
// }

// /* ---------------------- TESTIMONIALS ---------------------- */

// function Testimonials() {
//   const reduce = useReducedMotion();
//   const trackRef = useRef<HTMLUListElement>(null);
//   const [index, setIndex] = useState(0);
//   const [positions, setPositions] = useState<number>(testimonials.length);
//   const total = testimonials.length;

//   /* Phones show 1 card, large screens show 3. Work out how many scroll positions that gives. */
//   const measure = () => {
//     const el = trackRef.current;
//     const first = el?.firstElementChild as HTMLElement | null;
//     if (!el || !first) return null;
//     const itemW = first.getBoundingClientRect().width;
//     if (!itemW) return null;
//     const perView = Math.max(1, Math.round(el.clientWidth / itemW));
//     return { el, itemW, last: Math.max(0, total - perView) };
//   };

//   const sync = () => {
//     const m = measure();
//     if (!m) return;
//     setPositions(m.last + 1);
//     setIndex(Math.min(Math.round(m.el.scrollLeft / m.itemW), m.last));
//   };

//   useEffect(() => {
//     const el = trackRef.current;
//     if (!el) return;
//     const ro = new ResizeObserver(() => sync());
//     ro.observe(el);
//     return () => ro.disconnect();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const goTo = (i: number) => {
//     const m = measure();
//     if (!m) return;
//     const count = m.last + 1;
//     const next = (i + count) % count;
//     m.el.scrollTo({ left: next * m.itemW, behavior: reduce ? "auto" : "smooth" });
//   };

//   const navBtn = `flex h-11 w-11 items-center justify-center rounded-full border border-[#d8e1ec] bg-white text-[#041e3f] shadow-sm transition hover:border-[#d4a853] hover:bg-[#041e3f] hover:text-white ${focusRing}`;

//   return (
//     <Section id="testimonials" className="bg-white">
//       <Reveal>
//         <SectionHeading tag="Testimonials">What Our Clients Say</SectionHeading>
//       </Reveal>

//       <Reveal className="mx-auto max-w-3xl lg:max-w-none">
//         <div role="group" aria-roledescription="carousel" aria-label="Client testimonials">
//           {/* 1 testimonial per view on phones and tablets, 3 on large screens. Swipe, scroll sideways or use the arrows. */}
//           <ul
//             ref={trackRef}
//             onScroll={sync}
//             className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//           >
//             {testimonials.map((item, i) => (
//               <li
//                 key={item.quote}
//                 role="group"
//                 aria-roledescription="slide"
//                 aria-label={`${i + 1} of ${total}`}
//                 className="w-full shrink-0 snap-start px-1 py-3 sm:px-2 lg:w-1/3"
//               >
//                 <figure className="flex h-full flex-col items-center rounded-3xl border border-[#d8e1ec] bg-[#f6f8fb] p-7 text-center shadow-[0_1px_2px_rgba(4,30,63,0.04)] sm:p-10 lg:p-8">
//                   <Quote size={32} className="text-[#d4a853]" strokeWidth={1.6} aria-hidden />
//                   <blockquote className="mt-5 flex-1 text-[17px] leading-8 text-[#26364d] sm:text-[20px] sm:leading-9 lg:text-[16px] lg:leading-7">
//                     {item.quote}
//                   </blockquote>
//                   <figcaption className="mt-7 flex w-full items-center justify-center gap-3 border-t border-[#e1e8f0] pt-6">
//                     <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#041e3f] text-[#e3bd6a]">
//                       <User size={18} strokeWidth={1.8} aria-hidden />
//                     </span>
//                     <span className="text-left text-[14px] leading-5">
//                       <span className="block font-semibold text-[#041e3f]">{item.name}</span>
//                       <span className="block text-[#56667c]">{item.place}</span>
//                     </span>
//                   </figcaption>
//                 </figure>
//               </li>
//             ))}
//           </ul>

//           {/* Controls */}
//           <div className="mt-6 flex items-center justify-center gap-5">
//             <button type="button" onClick={() => goTo(index - 1)} aria-label="Previous testimonials" className={navBtn}>
//               <ChevronLeft size={20} aria-hidden />
//             </button>
//             <div className="flex items-center gap-2">
//               {Array.from({ length: positions }).map((_, i) => (
//                 <button
//                   key={i}
//                   type="button"
//                   onClick={() => goTo(i)}
//                   aria-label={`Go to position ${i + 1}`}
//                   aria-current={index === i ? "true" : undefined}
//                   className={`h-2.5 rounded-full transition-all duration-300 ${focusRing} ${
//                     index === i ? "w-7 bg-[#d4a853]" : "w-2.5 bg-[#c8d3e0] hover:bg-[#a8b6cb]"
//                   }`}
//                 />
//               ))}
//             </div>
//             <button type="button" onClick={() => goTo(index + 1)} aria-label="Next testimonials" className={navBtn}>
//               <ChevronRight size={20} aria-hidden />
//             </button>
//           </div>
//         </div>
//       </Reveal>
//     </Section>
//   );
// }

// /* ---------------------- CONTACT US ---------------------- */

// function Contact() {
//   const [submitting, setSubmitting] = useState(false);
//   const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
//   const reduce = useReducedMotion();

//   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setSubmitting(true);
//     setStatus(null);

//     const form = e.currentTarget;
//     const data = new FormData(form);
//     /* NOTE: "country" was replaced by "firm". Update /api/consult to accept it. */
//     const payload = {
//       name: String(data.get("name") ?? "").trim(),
//       email: String(data.get("email") ?? "").trim(),
//       firm: String(data.get("firm") ?? "").trim(),
//       message: String(data.get("message") ?? "").trim(),
//     };

//     try {
//       const res = await fetch("/api/consult", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (!res.ok) throw new Error();
//       setStatus({ type: "success", message: "Thank you. We will be in touch to schedule an introductory call." });
//       form.reset();
//     } catch {
//       setStatus({ type: "error", message: "We couldn’t send your message. Please try again or email us directly." });
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <Section id="consult" className="bg-[#041e3f]" dark>
//       <Reveal>
//         <SectionHeading
//           light
//           tag="Contact us"
//           description="Share a sample matter, and we’ll provide a tailored scope of work within 48 hours of review."
//         >
//           Explore how we can support your EB-5 practice
//         </SectionHeading>
//       </Reveal>

//       <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
//         <Reveal className="h-full">
//           <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
//             <h3 className="text-[1.15rem] font-semibold tracking-tight text-white">How to get started</h3>
//             <ol className="mt-5 space-y-4">
//               {contactSteps.map((step, i) => (
//                 <li key={step} className="flex gap-3 text-[15px] leading-6 text-white/80">
//                   <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d4a853]/15 text-[12px] font-semibold text-[#e3bd6a] ring-1 ring-[#d4a853]/30">
//                     {i + 1}
//                   </span>
//                   {step}
//                 </li>
//               ))}
//             </ol>
//             <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-[14px]">
//               <a
//                 href={`mailto:${contactEmail}`}
//                 className={`flex items-center gap-3 rounded text-white/90 transition hover:text-white ${focusRing}`}
//               >
//                 <Mail size={16} className="shrink-0 text-[#e3bd6a]" aria-hidden />
//                 <span className="break-all">{contactEmail}</span>
//               </a>
//               <a
//                 href={contactPhoneHref}
//                 className={`flex items-center gap-3 rounded text-white/90 transition hover:text-white ${focusRing}`}
//               >
//                 <Phone size={16} className="shrink-0 text-[#e3bd6a]" aria-hidden />
//                 {contactPhone}
//               </a>
//             </div>
//           </div>
//         </Reveal>

//         <Reveal delay={0.1}>
//           <form
//             onSubmit={handleSubmit}
//             aria-busy={submitting}
//             className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)] backdrop-blur-md sm:p-8"
//           >
//             <div className="grid gap-4 sm:grid-cols-2">
//               <div>
//                 <label htmlFor="name" className="mb-1.5 block text-[13px] text-white/80">
//                   Full name
//                 </label>
//                 <input
//                   id="name"
//                   name="name"
//                   required
//                   autoComplete="name"
//                   maxLength={120}
//                   disabled={submitting}
//                   placeholder="Your name"
//                   className={inputCls}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="mb-1.5 block text-[13px] text-white/80">
//                   Work email
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   autoComplete="email"
//                   maxLength={254}
//                   disabled={submitting}
//                   placeholder="you@yourfirm.com"
//                   className={inputCls}
//                 />
//               </div>
//             </div>

//             <div className="mt-4">
//               <label htmlFor="firm" className="mb-1.5 block text-[13px] text-white/80">
//                 Law firm
//               </label>
//               <input
//                 id="firm"
//                 name="firm"
//                 autoComplete="organization"
//                 maxLength={150}
//                 disabled={submitting}
//                 placeholder="Your firm’s name"
//                 className={inputCls}
//               />
//             </div>

//             <div className="mt-4">
//               <label htmlFor="message" className="mb-1.5 block text-[13px] text-white/80">
//                 How can we help?
//               </label>
//               <textarea
//                 id="message"
//                 name="message"
//                 required
//                 minLength={10}
//                 maxLength={3000}
//                 rows={4}
//                 disabled={submitting}
//                 placeholder="Tell us about your EB-5 volume or the support you need. Please don’t include client documents."
//                 className={`${inputCls} resize-y leading-6`}
//               />
//             </div>

//             <div className="mt-6 flex flex-col items-center gap-3">
//               <motion.button
//                 whileHover={reduce || submitting ? undefined : { y: -2 }}
//                 whileTap={reduce || submitting ? undefined : { scale: 0.98 }}
//                 type="submit"
//                 disabled={submitting}
//                 className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[14px] font-semibold text-[#041e3f] transition hover:bg-[#eef3f9] disabled:opacity-70 sm:w-auto sm:min-w-[16rem] ${focusRing}`}
//               >
//                 {submitting ? "Sending…" : "Partner with us"}
//                 {!submitting && <ArrowRight size={16} aria-hidden />}
//               </motion.button>
//               <p className="text-center text-[12px] leading-5 text-white/60">
//                 Sending this form does not start an engagement.
//               </p>
//             </div>

//             <div aria-live="polite" role="status">
//               {status && (
//                 <p
//                   className={`mt-4 rounded-xl px-4 py-3 text-center text-[14px] ${
//                     status.type === "success" ? "bg-emerald-500/15 text-emerald-100" : "bg-rose-500/15 text-rose-100"
//                   }`}
//                 >
//                   {status.message}
//                 </p>
//               )}
//             </div>
//           </form>
//         </Reveal>
//       </div>
//     </Section>
//   );
// }

// /* ---------------------- MOBILE CTA ---------------------- */

// /* Always visible on phones and tablets. Desktop keeps the sticky header button. */
// function MobileCTA() {
//   return (
//     <div
//       className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d8e1ec] bg-white/95 px-4 pt-3 backdrop-blur-xl lg:hidden"
//       style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
//     >
//       <a
//         href="#consult"
//         className={`flex h-12 items-center justify-center gap-2 rounded-xl bg-[#041e3f] px-5 text-[14px] font-semibold text-white ${focusRing}`}
//       >
//         Partner with us
//         <ArrowRight size={16} aria-hidden />
//       </a>
//     </div>
//   );
// }

// /* ---------------------- FOOTER ---------------------- */

// const socialPaths: Record<string, string> = {
//   Facebook:
//     "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
//   Instagram:
//     "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
//   LinkedIn:
//     "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
// };

// function Footer() {
//   const linkCls = `rounded text-[14px] text-[#4a5a70] transition hover:text-[#041e3f] ${focusRing}`;

//   return (
//     <footer className="border-t border-[#d8e1ec] bg-white pb-24 text-[#041e3f] lg:pb-0">
//       <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
//         {/* Columns */}
//         <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.4fr_0.9fr] lg:gap-12">
//           <div>
//             <a href="#top" className={`inline-flex items-center gap-1.5 rounded-lg ${focusRing}`}>
//               <Image
//                 src="/logov2.png"
//                 alt=""
//                 width={48}
//                 height={60}
//                 className="h-11 w-auto shrink-0 object-contain"
//               />
//               <span className="flex flex-col">
//                 <span className="text-[18px] font-bold leading-none tracking-tight">
//                   <span className="text-[#041e3f]">EB-5</span>{" "}
//                   <span className="text-[#a8791c]">Paralegal</span>
//                 </span>
//                 <span className="mt-1 text-[9.5px] font-semibold uppercase leading-none tracking-[0.12em] text-[#5f6f85]">
//                   Your Investors, Our Expertise
//                 </span>
//               </span>
//             </a>
//             <p className="mt-5 max-w-xs text-[14px] leading-6 text-[#4a5a70]">
//               Specialist EB-5 paralegal support for immigration law firms.
//             </p>
//           </div>

//           <nav aria-label="Footer">
//             <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#6b5214]">Quick Links</h3>
//             <ul className="mt-5 space-y-3">
//               {footerLinks.map(([label, href]) => (
//                 <li key={href}>
//                   <a href={href} className={`group inline-flex items-center gap-1.5 ${linkCls}`}>
//                     <ArrowRight
//                       size={13}
//                       aria-hidden
//                       className="-ml-4 text-[#a8791c] opacity-0 transition-all group-hover:ml-0 group-hover:opacity-100"
//                     />
//                     {label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           <div>
//             <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#6b5214]">Contact</h3>
//             <ul className="mt-5 space-y-4 text-[14px] leading-6 text-[#4a5a70]">
//               <li className="flex gap-3">
//                 <MapPin size={17} className="mt-0.5 shrink-0 text-[#a8791c]" aria-hidden />
//                 <span>{footerContact.address}</span>
//               </li>
//               <li>
//                 <a href={`mailto:${footerContact.email}`} className={`flex gap-3 transition hover:text-[#041e3f] ${focusRing}`}>
//                   <Mail size={17} className="mt-0.5 shrink-0 text-[#a8791c]" aria-hidden />
//                   <span className="break-all">{footerContact.email}</span>
//                 </a>
//               </li>
//               <li>
//                 <a href={footerContact.phoneHref} className={`flex gap-3 transition hover:text-[#041e3f] ${focusRing}`}>
//                   <Phone size={17} className="mt-0.5 shrink-0 text-[#a8791c]" aria-hidden />
//                   {footerContact.phone}
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#6b5214]">Follow Us</h3>
//             <ul className="mt-5 flex gap-3">
//               {socials.map((social) => (
//                 <li key={social.label}>
//                   <a
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label={social.label}
//                     className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#d8e1ec] bg-[#f6f8fb] text-[#041e3f] transition hover:-translate-y-0.5 hover:border-[#041e3f] hover:bg-[#041e3f] hover:text-white ${focusRing}`}
//                   >
//                     <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
//                       <path d={socialPaths[social.label]} />
//                     </svg>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className="border-t border-[#e1e8f0] py-6 text-center text-[12px] leading-5 text-[#5f6f85]">
//           <p className="mx-auto max-w-3xl">
//             EB5 Paralegal provides paralegal support to law firms. All work is performed under the direction and
//             supervision of your firm.
//           </p>
//           <p className="mt-2">© {new Date().getFullYear()} EB5 Paralegal. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// /* ---------------------- PAGE ---------------------- */

// export default function LandingPage() {
//   const { scrollYProgress } = useScroll();
//   const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
//   const reduce = useReducedMotion();
//   const progressWidth = useTransform(progress, (v) => `${v * 100}%`);

//   return (
//     <main
//       style={{
//         fontFamily:
//           "var(--font-sans, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif)",
//       }}
//       className="overflow-x-clip bg-[#f6f8fb] text-[#041e3f] antialiased"
//     >
//       <a
//         href="#services"
//         className="sr-only z-[70] rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#041e3f] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
//       >
//         Skip to content
//       </a>

//       {!reduce && (
//         <motion.div
//           aria-hidden
//           style={{ width: progressWidth }}
//           className="fixed left-0 top-0 z-[60] h-[2.5px] bg-gradient-to-r from-[#041e3f] via-[#d4a853] to-[#d4a853]"
//         />
//       )}

//       <Header />
//       <Hero />
//       <Stats />
//       <Services />
//       <About />
//       <Engagement />
//       <Testimonials />
//       <Contact />

//       <Footer />

//       <MobileCTA />
//     </main>
//   );
// }
