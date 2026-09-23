import React, { useCallback, useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  EDIT ME — everything personal lives here                                   */
/* -------------------------------------------------------------------------- */
const CONFIG = {
  name: "Nyoro Fadhili",
  role: "Backend Developer & Data Analyst",
  // Digits only: country code + number, no "+" or spaces (Kenya example: 2547XXXXXXXX)
  whatsapp: "25479793782",
  email: "fadhiliwanyoike@gmail.com",
  location: "Nairobi, Kenya",
  education: "BSc. Computer Science",
  schools: ["University of Nairobi"],
  interests: ["Playing football", "Reading novels"],
  github: "https://github.com/nyoike-yu",
  linkedin: "http://www.linkedin.com/in/nyoro-fadhili-816854329",
  // Put your resume at public/resume.pdf (file name is case-sensitive once deployed)
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,
  resumeFileName: "Nyoro-Fadhili-Resume.pdf", // name the visitor's download gets
};

const NAV = [
  ["Home", "home"],
  ["About", "about"],
  ["Projects", "projects"],
  ["Contacts", "contact"],
];

const KEYWORDS = [
  "Python Developer",
  "Cybersecurity",
  "Data Analyst",
  "PostgreSQL",
  "Power BI",
  "Threat Modeling",
  "Secure APIs",
  "Excel Analytics",
];

const STACK = [
  {
    title: "Backend & Scripting",
    blurb: "Where the application logic and automation live.",
    tools: [
      { name: "Python", note: "APIs, automation, data wrangling", icon: "code" },
    ],
  },
  {
    title: "Databases",
    blurb: "Data that stays consistent, indexed, and queryable.",
    tools: [
      { name: "PostgreSQL", note: "Schema design and query tuning", icon: "database" },
    ],
  },
  {
    title: "Data & Analytics",
    blurb: "Turning raw numbers into decisions.",
    tools: [
      { name: "Power BI", note: "Dashboards and reports", icon: "chart" },
      { name: "Microsoft Excel", note: "Cleaning, pivots, modeling", icon: "table" },
    ],
  },
  {
    title: "Security",
    blurb: "Designing so that misuse is hard from day one.",
    tools: [
      { name: "Cybersecurity Foundations", note: "Auth, hardening, secure defaults", icon: "lock" },
      { name: "Threat Modeling", note: "Finding abuse cases early", icon: "target" },
    ],
  },
];

const PROJECTS = [
  {
    id: "secure-api",
    kind: "Backend & Security",
    title: "Secure API Backend",
    desc: "Built with Python and PostgreSQL, featuring foundational cybersecurity protocols like rate limiting and JWT auth.",
    overview:
      "A backend service written in Python that keeps its data in PostgreSQL and treats security as part of the design instead of an add-on. Protected routes require a valid JWT, and rate limiting caps how often a client can call the API, which slows down brute-force attempts and general abuse.",
    tags: ["Python", "PostgreSQL", "JWT", "Rate limiting"],
    highlights: [
      "Python service backed by a PostgreSQL database.",
      "JWT-based authentication for protected routes.",
      "Rate limiting to slow down abuse and brute-force attempts.",
    ],
    art: "code",
  },
  {
    id: "sales-dashboard",
    kind: "Data & Analytics",
    title: "Sales Data Dashboard",
    desc: "Designed in Power BI using raw data cleaned in Excel and stored in PostgreSQL.",
    overview:
      "An end-to-end reporting pipeline. Raw sales exports were cleaned and standardized in Excel, then stored in PostgreSQL so every figure comes from a single source of truth. The Power BI dashboard sits on top of that database, so each number on screen traces back to a query.",
    tags: ["Power BI", "Excel", "PostgreSQL"],
    highlights: [
      "Raw sales data cleaned and standardized in Excel.",
      "Cleaned data stored in PostgreSQL as the single source of truth.",
      "Interactive dashboard designed in Power BI on top of it.",
    ],
    art: "bars",
  },
  {
    // PLACEHOLDER: replace every field below with your real project
    id: "project-placeholder",
    kind: "Category",
    title: "Project Placeholder",
    desc: "A short one or two sentence summary of your next project goes here.",
    overview:
      "This is a placeholder. Replace it with a fuller explanation of the project: the problem it solves, how you approached it, and what you learned along the way.",
    tags: ["Tag One", "Tag Two", "Tag Three"],
    highlights: [
      "First key feature or outcome.",
      "Second key feature or outcome.",
      "Third key feature or outcome.",
    ],
    art: "code",
  },
];

/* -------------------------------------------------------------------------- */
/*  Icons (inline, stroke-based, inherit currentColor)                         */
/* -------------------------------------------------------------------------- */
const ICONS = {
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </>
  ),
  moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  x: <path d="M18 6 6 18M6 6l12 12" />,
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
  arrow: <path d="M5 12h14M12 5l7 7-7 7" />,
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5M12 15V3" />
    </>
  ),
  external: (
    <>
      <path d="M15 3h6v6M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </>
  ),
  chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  send: <path d="m22 2-7 20-4-9-9-4Zm0 0L11 13" />,
  code: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  terminal: <path d="m4 17 6-6-6-6M12 19h8" />,
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5M3 12a9 3 0 0 0 18 0" />
    </>
  ),
  chart: <path d="M3 3v18h18M18 17V9M13 17V5M8 17v-3" />,
  table: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18" />
    </>
  ),
  shield: (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
};

function Icon({ name, className = "h-5 w-5", strokeWidth = 1.75 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shared style strings                                                       */
/* -------------------------------------------------------------------------- */
const glass =
  "border border-black/5 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/60";

const btnSolid =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-700 active:scale-[0.98] dark:bg-white dark:text-black dark:hover:bg-neutral-300";

const btnOutline =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white/60 px-6 py-3.5 text-sm font-semibold transition hover:border-black active:scale-[0.98] dark:border-white/20 dark:bg-transparent dark:hover:border-white";

const card =
  "rounded-3xl border border-neutral-200 bg-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] dark:border-white/10 dark:bg-neutral-900 dark:shadow-none";

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                      */
/* -------------------------------------------------------------------------- */
function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduce;
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (_) {
      /* storage can be unavailable; the toggle still works */
    }
  }, [theme]);
  const toggle = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );
  return [theme, toggle];
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return active;
}

function useInView(ref, threshold = 0.6) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
}

/* Types `text` every time `active` turns true and clears it when `active`
   turns false, so the effect replays whenever the element scrolls back into
   view. While it is on screen and finished, `typing` is false (caret blinks). */
function useTypewriter(text, active, speed = 55, delay = 250) {
  const reduce = usePrefersReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) {
      setN(0);
      return;
    }
    if (reduce) {
      setN(text.length);
      return;
    }
    let i = 0;
    let id = 0;
    setN(0);
    const start = setTimeout(() => {
      id = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) clearInterval(id);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [text, active, speed, delay, reduce]);
  return { typed: text.slice(0, n), typing: active && n > 0 && n < text.length };
}

/* Downloads the resume through fetch so we can tell when the file is missing.
   A plain <a download> silently saves the site's index.html (or nothing) when
   public/resume.pdf does not exist, which looks like "the download is broken". */
function useResumeDownload() {
  const [status, setStatus] = useState("idle"); // idle | loading | error

  const download = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch(CONFIG.resumeUrl, { cache: "no-store" });
      const type = res.headers.get("content-type") || "";
      if (!res.ok || type.includes("text/html")) {
        throw new Error(`Resume not found at ${CONFIG.resumeUrl} (HTTP ${res.status})`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = CONFIG.resumeFileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus("idle");
    } catch (err) {
      console.error(
        "[resume] Download failed. Make sure your PDF is saved as public/resume.pdf.",
        err
      );
      setStatus("error");
    }
  }, []);

  return [status, download];
}

/* -------------------------------------------------------------------------- */
/*  Preloader                                                                  */
/* -------------------------------------------------------------------------- */
function Preloader({ fading }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-500 dark:bg-neutral-950 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <p className="text-3xl font-extrabold tracking-tight">{CONFIG.name}</p>
      <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-400">
        Portfolio Loading
      </p>
      <div className="mt-5 h-[3px] w-44 overflow-hidden rounded-full bg-neutral-200 dark:bg-white/10">
        <div className="loader-bar h-full w-full rounded-full bg-black dark:bg-white" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navbar                                                                     */
/* -------------------------------------------------------------------------- */
const SOCIALS = [
  ["github", "GitHub", CONFIG.github],
  ["linkedin", "LinkedIn", CONFIG.linkedin],
  ["mail", "Email", `mailto:${CONFIG.email}`],
];

/* Inverted circles: white in dark mode, dark in light mode. */
function SocialLinks() {
  return (
    <ul className="pointer-events-auto flex h-14 shrink-0 items-center gap-1.5 sm:gap-2">
      {SOCIALS.map(([icon, label, href]) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="grid h-8 w-8 place-items-center rounded-full bg-neutral-950 text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.55)] ring-1 ring-black/10 transition hover:scale-110 active:scale-95 sm:h-11 sm:w-11 dark:bg-white dark:text-neutral-950 dark:shadow-[0_10px_24px_-8px_rgba(255,255,255,0.35)] dark:ring-white/40"
          >
            <Icon name={icon} className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Navbar({ theme, onToggleTheme, active }) {
  const [open, setOpen] = useState(false);
  const linkClass = (id) =>
    `text-sm transition-colors ${
      active === id
        ? "font-semibold text-neutral-950 dark:text-white"
        : "font-medium text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
    }`;

  return (
    <header
      className="pointer-events-none fixed inset-x-0 z-50 px-4"
      style={{ top: "calc(env(safe-area-inset-top, 0px) + 12px)" }}
    >
      <div className="mx-auto flex max-w-5xl items-start gap-2 sm:gap-3">
        <div className="min-w-0 flex-1">
          <nav
            aria-label="Primary"
            className={`pointer-events-auto grid h-14 grid-cols-[minmax(0,1fr)_auto] items-center rounded-full px-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:px-5 md:grid-cols-[1fr_auto_1fr] ${glass}`}
          >
            <a href="#home" className="truncate text-sm font-extrabold tracking-tight sm:text-lg">
              PORTFOLIO.
            </a>

            <ul className="hidden items-center gap-8 md:flex">
              {NAV.map(([label, id]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={linkClass(id)}
                    aria-current={active === id ? "location" : undefined}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-end gap-0.5 sm:gap-1">
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                className="grid h-8 w-8 place-items-center rounded-full text-neutral-600 transition hover:bg-black/5 sm:h-9 sm:w-9 dark:text-neutral-300 dark:hover:bg-white/10"
              >
                <Icon name={theme === "dark" ? "moon" : "sun"} />
              </button>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="grid h-8 w-8 place-items-center rounded-full text-neutral-600 transition hover:bg-black/5 sm:h-9 sm:w-9 md:hidden dark:text-neutral-300 dark:hover:bg-white/10"
              >
                <Icon name={open ? "x" : "menu"} />
              </button>
            </div>
          </nav>

          {open && (
            <ul
              className={`pointer-events-auto pop-in mt-2 rounded-3xl p-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:hidden ${glass}`}
            >
              {NAV.map(([label, id]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-2xl px-4 py-3 ${linkClass(id)}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <SocialLinks />
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Abstract avatar                                                            */
/* -------------------------------------------------------------------------- */
function Silhouette({ id }) {
  return (
    <svg
      viewBox="0 0 400 480"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="Abstract profile silhouette"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0a0a" />
          <stop offset="1" stopColor="#3f3f46" />
        </linearGradient>
        <linearGradient id={`${id}-fg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fafafa" />
          <stop offset="1" stopColor="#a1a1aa" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <rect width="400" height="480" fill={`url(#${id}-bg)`} />
      <g filter={`url(#${id}-blur)`} fill={`url(#${id}-fg)`}>
        <ellipse cx="200" cy="182" rx="66" ry="78" />
        <rect x="172" y="236" width="56" height="54" rx="22" />
        <path d="M40 480C40 370 105 305 165 290H235C295 305 360 370 360 480Z" />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */
const HERO_BADGES = [
  { icon: "code", label: "Python & SQL Core" },
  { icon: "chart", label: "Power BI & Excel Analytics" },
  { icon: "shield", label: "Security-First Approach" },
];

function Hero({ ready }) {
  const roleRef = useRef(null);
  // types when the role line is on screen, clears when it leaves, retypes on return
  const inView = useInView(roleRef, 0.6);
  const { typed, typing } = useTypewriter(CONFIG.role, ready && inView);
  const [resumeStatus, downloadResume] = useResumeDownload();

  return (
    <section
      id="home"
      className="relative flex min-h-svh scroll-mt-24 flex-col px-6 pb-10 pt-32 md:px-10"
    >
      {/* soft ambient gray so the glass elements have something to blur */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-24 top-20 h-[30rem] w-[30rem] rounded-full bg-neutral-200/70 blur-3xl dark:bg-white/[0.06]" />
        <div className="absolute -left-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-neutral-100 blur-3xl dark:bg-white/[0.03]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <h1 className="whitespace-nowrap text-[length:clamp(1.35rem,8vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.035em] lg:text-[length:clamp(2rem,4vw,3rem)]">
            Hi, I'm {CONFIG.name}
          </h1>

          <p ref={roleRef} className="mt-5 text-xl font-bold tracking-tight sm:text-2xl">
            <span className="sr-only">{CONFIG.role}</span>
            {/* the invisible copy reserves the final height so nothing jumps while typing */}
            <span className="grid" aria-hidden="true">
              <span className="invisible col-start-1 row-start-1">{CONFIG.role}</span>
              <span className="col-start-1 row-start-1">
                {typed}
                <span className={`ml-0.5 inline-block w-[2px] translate-y-[2px] bg-current align-baseline ${typing ? "" : "caret"}`}>
                  &nbsp;
                </span>
              </span>
            </span>
          </p>

          <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            I build secure, data-driven applications: hardened Python backends,
            well-modeled PostgreSQL databases, and dashboards that turn raw
            numbers into decisions people can trust.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className={btnSolid}>
              Explore Work
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </a>
            <button
              type="button"
              onClick={downloadResume}
              disabled={resumeStatus === "loading"}
              className={`${btnOutline} disabled:opacity-60`}
            >
              {resumeStatus === "loading" ? "Preparing..." : "Download Resume"}
              <Icon name="download" className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          <div role="status" aria-live="polite" className="mt-3 min-h-[1.25rem] text-sm">
            {resumeStatus === "error" && (
              <p className="text-neutral-600 dark:text-neutral-400">
                The resume isn't available right now.{" "}
                <a
                  href={`mailto:${CONFIG.email}?subject=Resume request`}
                  className="font-semibold text-black underline underline-offset-4 dark:text-white"
                >
                  Email me
                </a>{" "}
                and I'll send it over.
              </p>
            )}
          </div>
        </div>

        <div className="w-full">
          <div className="relative mx-auto w-64 sm:mr-0 sm:w-80 lg:w-96">
            <div className="aspect-square overflow-hidden rounded-full bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] ring-[10px] ring-white dark:ring-white/10">
              <Silhouette id="hero" />
            </div>

            <ul className="relative -mx-6 -mt-10 flex flex-col gap-3 sm:absolute sm:-left-48 sm:bottom-2 sm:mx-0 sm:mt-0 sm:w-[17rem]">
              {HERO_BADGES.map((b) => (
                <li
                  key={b.label}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.15)] backdrop-blur-md ${glass}`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
                    <Icon name={b.icon} className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold">{b.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section header                                                             */
/* -------------------------------------------------------------------------- */
function SectionHeader({ title }) {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  About                                                                      */
/* -------------------------------------------------------------------------- */
function About() {
  const details = [
    ["Name", CONFIG.name],
    ["Email", CONFIG.email],
    ["Location", CONFIG.location],
    ["Education", CONFIG.education],
  ];
  const dtClass = "text-base font-semibold text-neutral-500 dark:text-neutral-400";
  const ddClass = "mt-1 break-words text-base font-semibold sm:text-lg";

  return (
    <section id="about" className="scroll-mt-24 px-6 py-28 md:px-10">
      <SectionHeader title="About Me" />

      <div className="mx-auto mt-16 flex max-w-5xl flex-col gap-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <h3 className="border-b border-neutral-200 pb-3 text-2xl font-bold tracking-tight dark:border-white/10">
              Who Am I
            </h3>
            <p className="mt-4 text-base leading-relaxed text-neutral-700 sm:text-lg sm:leading-relaxed dark:text-neutral-300">
              I'm a fullstack developer and data analyst who likes the parts
              of software most people skip: input validation, query plans,
              audit trails. I write backends in Python, model data in
              PostgreSQL, and report on it in Power BI.
            </p>
          </div>
          <div>
            <h3 className="border-b border-neutral-200 pb-3 text-2xl font-bold tracking-tight dark:border-white/10">
              My Approach
            </h3>
            <p className="mt-4 text-base leading-relaxed text-neutral-700 sm:text-lg sm:leading-relaxed dark:text-neutral-300">
              Security first, then speed. I start by asking how a system
              could be misused, keep data clean at the source, and only then
              optimize. Every chart I ship traces back to a query I can
              defend.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.04]">
          <h3 className="border-l-[3px] border-black pl-3 text-2xl font-bold tracking-tight dark:border-white">
            Personal Details
          </h3>
          <dl className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-2">
            {details.map(([k, v]) => (
              <div key={k} className="min-w-0">
                <dt className={dtClass}>{k}</dt>
                <dd className={ddClass}>
                  {k === "Email" ? (
                    <a href={`mailto:${v}`} className="hover:underline">
                      {v}
                    </a>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            ))}

            <div className="min-w-0">
              <dt className={dtClass}>School</dt>
              <dd className="mt-1">
                <ul className="space-y-1 text-base font-semibold sm:text-lg">
                  {CONFIG.schools.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </dd>
            </div>

            <div className="min-w-0">
              <dt className={dtClass}>Interests</dt>
              <dd className="mt-1">
                <ul className="space-y-1 text-base font-semibold sm:text-lg">
                  {CONFIG.interests.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee                                                                    */
/* -------------------------------------------------------------------------- */
const MARQUEE_SPEED = 60; // px per second

/* Auto-scrolling keyword strip.
   - pauses while a mouse hovers it and resumes when the pointer leaves
   - swipe / drag (touch, mouse or trackpad) moves the content, with a little
     momentum on release
   Two identical copies sit side by side, so wrapping by one copy's width is
   seamless. */
function Marquee() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const copyRef = useRef(null);
  const st = useRef({ pos: 0, vel: 0, width: 0, hover: false, drag: null, visible: true });
  const [grabbing, setGrabbing] = useState(false);
  const reduce = usePrefersReducedMotion();
  const reduceRef = useRef(reduce);
  useEffect(() => {
    reduceRef.current = reduce;
  }, [reduce]);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const copy = copyRef.current;
    if (!root || !track || !copy) return;
    const s = st.current;

    const measure = () => {
      s.width = copy.offsetWidth;
    };
    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(copy);
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([e]) => {
            s.visible = e.isIntersecting;
          })
        : null;
    io?.observe(root);

    let raf = 0;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (s.visible) {
        if (!s.drag) {
          if (Math.abs(s.vel) > 5) {
            s.pos += s.vel * dt;
            s.vel *= Math.pow(0.02, dt); // momentum fades out in about a second
          } else {
            s.vel = 0;
          }
          if (!s.hover && !reduceRef.current) s.pos -= MARQUEE_SPEED * dt;
        }
        if (s.width) s.pos = (((s.pos % s.width) + s.width) % s.width) - s.width;
        track.style.transform = `translate3d(${s.pos}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // two-finger horizontal trackpad swipe
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        s.pos -= e.deltaX;
        s.vel = 0;
      }
    };
    root.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("wheel", onWheel);
      ro?.disconnect();
      io?.disconnect();
    };
  }, []);

  const onPointerEnter = (e) => {
    if (e.pointerType === "mouse") st.current.hover = true;
  };
  const onPointerLeave = (e) => {
    if (e.pointerType === "mouse") st.current.hover = false;
  };
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const s = st.current;
    s.drag = { id: e.pointerId, x: e.clientX, pos: s.pos, lastX: e.clientX, lastT: e.timeStamp };
    s.vel = 0;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setGrabbing(true);
  };
  const onPointerMove = (e) => {
    const s = st.current;
    const d = s.drag;
    if (!d || d.id !== e.pointerId) return;
    s.pos = d.pos + (e.clientX - d.x);
    const dt = (e.timeStamp - d.lastT) / 1000;
    if (dt > 0) {
      const v = (e.clientX - d.lastX) / dt;
      s.vel = Math.max(-3000, Math.min(3000, s.vel * 0.6 + v * 0.4));
    }
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
  };
  const endDrag = (e) => {
    const s = st.current;
    const d = s.drag;
    if (!d || d.id !== e.pointerId) return;
    if (e.timeStamp - d.lastT > 80) s.vel = 0; // held still before letting go
    s.drag = null;
    setGrabbing(false);
  };

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={`touch-pan-y select-none overflow-hidden border-y border-neutral-200 py-6 dark:border-white/10 ${
        grabbing ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            ref={copy === 0 ? copyRef : undefined}
            className="flex shrink-0 items-center"
          >
            {KEYWORDS.map((word) => (
              <li
                key={word}
                className="flex items-center whitespace-nowrap text-3xl font-extrabold tracking-tight text-neutral-300 md:text-5xl dark:text-neutral-700"
              >
                <span className="px-6 md:px-8">{word}</span>
                <span className="text-neutral-950 dark:text-white">•</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Projects timeline                                                          */
/* -------------------------------------------------------------------------- */
function ProjectArt({ kind }) {
  return (
    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-neutral-800 via-neutral-900 to-black">
      <div className="art-grid absolute inset-0" aria-hidden="true" />
      {kind === "code" ? (
        <svg viewBox="0 0 320 192" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <g fill="#fff">
            <circle cx="30" cy="30" r="4" opacity=".25" />
            <circle cx="44" cy="30" r="4" opacity=".25" />
            <circle cx="58" cy="30" r="4" opacity=".25" />
            <rect x="34" y="62" width="120" height="6" rx="3" opacity=".55" />
            <rect x="52" y="82" width="170" height="6" rx="3" opacity=".3" />
            <rect x="52" y="102" width="96" height="6" rx="3" opacity=".3" />
            <rect x="52" y="122" width="140" height="6" rx="3" opacity=".3" />
            <rect x="34" y="142" width="64" height="6" rx="3" opacity=".55" />
          </g>
          <g fill="none" stroke="#fff" strokeWidth="2" opacity=".75" transform="translate(236 70)">
            <path d="M32 0c-9 5-18 6-26 6v22c0 20 12 34 26 40 14-6 26-20 26-40V6C50 6 41 5 32 0Z" />
            <path d="m20 34 9 9 16-18" />
          </g>
        </svg>
      ) : (
        <svg viewBox="0 0 320 192" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <g fill="#fff">
            <rect x="40" y="110" width="26" height="46" rx="4" opacity=".3" />
            <rect x="80" y="84" width="26" height="72" rx="4" opacity=".45" />
            <rect x="120" y="98" width="26" height="58" rx="4" opacity=".3" />
            <rect x="160" y="60" width="26" height="96" rx="4" opacity=".7" />
            <rect x="200" y="76" width="26" height="80" rx="4" opacity=".45" />
            <rect x="240" y="44" width="26" height="112" rx="4" opacity=".85" />
          </g>
          <polyline
            points="53,96 93,70 133,84 173,46 213,62 253,30"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity=".9"
          />
        </svg>
      )}
    </div>
  );
}

function ProjectDialog({ project, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [onClose]);

  const label = "text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400";

  return (
    <div
      className="fixed inset-0 z-[70] overflow-y-auto bg-black/50 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          onClick={(e) => e.stopPropagation()}
          className="pop-in w-full max-w-xl overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl dark:border-white/10 dark:bg-neutral-900"
        >
          <ProjectArt kind={project.art} />
          <div className="p-7 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-neutral-400">{project.kind}</p>
                <h3 id="project-dialog-title" className="mt-1 text-2xl font-bold tracking-tight">
                  {project.title}
                </h3>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close details"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Icon name="x" />
              </button>
            </div>

            <h4 className={`mt-7 ${label}`}>Overview</h4>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {project.overview}
            </p>

            <h4 className={`mt-7 ${label}`}>Key features</h4>
            <ul className="mt-3 space-y-2.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                  {h}
                </li>
              ))}
            </ul>

            <h4 className={`mt-7 ${label}`}>Built with</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700 dark:bg-white/10 dark:text-neutral-300"
                >
                  {t}
                </li>
              ))}
            </ul>

            <a
              href={CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnOutline} mt-8 w-full`}
            >
              <Icon name="github" className="h-4 w-4" strokeWidth={2} />
              See it on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const [progress, setProgress] = useState({ px: 0, reached: [] });
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const px = Math.min(Math.max(window.innerHeight * 0.55 - rect.top, 0), rect.height);
      const reached = itemRefs.current.map((it) => (it ? it.offsetTop + 36 <= px : false));
      setProgress({ px, reached });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="projects" className="scroll-mt-24 px-6 py-28 md:px-10">
      <SectionHeader title="My Projects" />

      <div className="mx-auto mt-16 max-w-5xl">
        <ol ref={listRef} className="relative space-y-12">
          {/* base line + scroll-filled line */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-neutral-200 md:left-1/2 dark:bg-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute left-4 top-0 w-px -translate-x-1/2 bg-black md:left-1/2 dark:bg-white"
            style={{ height: progress.px }}
          />

          {PROJECTS.map((p, i) => (
            <li
              key={p.id}
              ref={(node) => (itemRefs.current[i] = node)}
              className="relative pl-12 md:grid md:grid-cols-2 md:gap-x-20 md:pl-0"
            >
              <span
                aria-hidden="true"
                className={`absolute left-4 top-9 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-[3px] bg-white transition-colors duration-300 md:left-1/2 dark:bg-neutral-950 ${
                  progress.reached[i]
                    ? "border-black dark:border-white"
                    : "border-neutral-300 dark:border-neutral-700"
                }`}
              />

              {/* the whole card is clickable through the stretched button below */}
              <article
                className={`stretch-card group relative cursor-pointer p-7 transition-colors hover:border-neutral-400 dark:hover:border-white/30 ${card} ${
                  i % 2 === 0 ? "md:col-start-1" : "md:col-start-2"
                }`}
              >
                <p className="text-sm font-semibold text-neutral-400">{p.kind}</p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight">
                  <button
                    type="button"
                    onClick={() => setSelected(p)}
                    aria-haspopup="dialog"
                    className="text-left after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:outline-none"
                  >
                    {p.title}
                  </button>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {p.desc}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700 dark:bg-white/10 dark:text-neutral-300"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 flex items-center gap-2 text-sm font-semibold">
                  View details
                  <Icon
                    name="arrow"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </p>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex justify-center">
          <a
            href={CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className={btnSolid}
          >
            <Icon name="github" className="h-4 w-4" strokeWidth={2} />
            View More Projects
            <Icon name="external" className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </div>

      {selected && <ProjectDialog project={selected} onClose={close} />}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tech stack                                                                 */
/* -------------------------------------------------------------------------- */
function TechStack() {
  return (
    <section id="skills" className="scroll-mt-24 px-6 py-28 md:px-10">
      <SectionHeader title="My Tech Stack" />

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
        {STACK.map((group) => (
          <article key={group.title} className={`flex flex-col p-7 ${card}`}>
            <div>
              <h3 className="text-lg font-bold tracking-tight">{group.title}</h3>
              <p className="text-sm text-neutral-500">{group.blurb}</p>
            </div>

            <ul className="mt-6 divide-y divide-neutral-100 border-t border-neutral-100 dark:divide-white/5 dark:border-white/5">
              {group.tools.map((tool) => (
                <li key={tool.name} className="flex items-center gap-3 py-3.5">
                  <Icon name={tool.icon} className="h-4 w-4 shrink-0 text-neutral-400" />
                  <span className="text-sm font-semibold">{tool.name}</span>
                  <span className="ml-auto text-right text-xs text-neutral-500">
                    {tool.note}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact → WhatsApp                                                         */
/* -------------------------------------------------------------------------- */
const inputClass =
  "mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm placeholder:text-neutral-400 transition focus:border-black focus:bg-white focus:outline-none focus:ring-4 focus:ring-black/5 dark:border-white/10 dark:bg-white/5 dark:focus:border-white dark:focus:bg-white/10 dark:focus:ring-white/10";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", url: "" });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name || !email || !message) return;

    // Build a readable message, then URL-encode the whole thing for wa.me
    const text = [
      `Hello ${CONFIG.name}, I'm contacting you from your portfolio.`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
    const win = window.open(url, "_blank");

    if (win) {
      win.opener = null;
      setStatus({ state: "opened", url });
      setForm({ name: "", email: "", message: "" });
    } else {
      // Popup blocked: hand the person a direct link instead
      setStatus({ state: "blocked", url });
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 px-6 py-28 md:px-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-neutral-200/60 blur-3xl dark:bg-white/[0.05]" />
      </div>

      <SectionHeader title="Contact Me" />

      <form
        onSubmit={onSubmit}
        className={`mx-auto mt-16 max-w-2xl p-7 sm:p-10 ${card}`}
      >
        <h3 className="text-2xl font-bold tracking-tight">Send a message directly.</h3>
        <p className="mt-2 text-sm text-neutral-500">
          Your message opens in WhatsApp, ready to send.
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label htmlFor="c-name" className="text-xs font-semibold text-neutral-500">
              Name
            </label>
            <input
              id="c-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="c-email" className="text-xs font-semibold text-neutral-500">
              Email
            </label>
            <input
              id="c-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="c-message" className="text-xs font-semibold text-neutral-500">
              Message
            </label>
            <textarea
              id="c-message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={onChange}
              placeholder="What would you like to talk about?"
              className={`${inputClass} resize-y`}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="inline-flex w-1/2 min-w-[11rem] items-center justify-center rounded-xl bg-black px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-neutral-700 active:scale-[0.98] dark:bg-white dark:text-black dark:hover:bg-neutral-300"
          >
            Send Message
          </button>
        </div>

        <div role="status" aria-live="polite" className="mt-4 min-h-[1.25rem] text-sm">
          {status.state === "opened" && (
            <p className="text-neutral-600 dark:text-neutral-400">
              WhatsApp opened in a new tab. Send the message there to finish.
            </p>
          )}
          {status.state === "blocked" && (
            <p className="text-neutral-600 dark:text-neutral-400">
              Your browser blocked the new tab.{" "}
              <a
                href={status.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-black underline underline-offset-4 dark:text-white"
              >
                Open WhatsApp
              </a>
            </p>
          )}
        </div>
      </form>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Floating AI assistant (mocked)                                             */
/* -------------------------------------------------------------------------- */
const timeNow = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

function mockReply(q) {
  const s = q.toLowerCase();
  if (/(project|work|built|build)/.test(s))
    return "Two highlights: a Secure API Backend (Python, PostgreSQL, JWT auth, rate limiting) and a Sales Data Dashboard in Power BI. Open the Projects section and click a project for the full details.";
  if (/(stack|skill|tool|tech|python|sql|power bi|excel)/.test(s))
    return "The core stack is Python and PostgreSQL for backends and data, Power BI and Excel for analytics, plus cybersecurity foundations and threat modeling.";
  if (/(experience|career|job|role|history)/.test(s))
    return "There isn't a formal work history on the page. The Projects section shows the hands-on work: a Secure API Backend and a Sales Data Dashboard.";
  if (/(contact|email|hire|reach|whatsapp|message)/.test(s))
    return "The quickest way is the contact form at the bottom of the page. It opens WhatsApp with your message ready to send.";
  if (/(who|about|yourself|you)/.test(s))
    return `I'm ${CONFIG.name}'s portfolio assistant. ${CONFIG.name} is a fullstack developer and data analyst focused on secure, data-driven applications.`;
  return "I'm a demo assistant for now, so I can only cover projects, tech stack, experience, and contact details. Try one of those.";
}

const SUGGESTIONS = ["Projects", "Tech stack", "Contact"];

function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => [
    {
      id: 1,
      from: "bot",
      text: `Hi! I'm ${CONFIG.name}'s assistant. Ask me about projects, experience, or how to get in touch.`,
      time: timeNow(),
    },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const timer = useRef(0);
  const nextId = useRef(2);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  const send = (raw) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { id: nextId.current++, from: "user", text, time: timeNow() }]);
    setDraft("");
    setTyping(true);
    timer.current = setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: nextId.current++, from: "bot", text: mockReply(text), time: timeNow() },
      ]);
      setTyping(false);
    }, 900);
  };

  const bottomOffset = "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)";

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="AI Assistant"
          className={`pop-in fixed right-4 z-[60] flex h-[30rem] max-h-[70svh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3)] backdrop-blur-2xl ${glass} bg-white/80 dark:bg-neutral-900/80`}
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 5.5rem)" }}
        >
          <div className="flex items-center gap-3 border-b border-black/5 px-5 py-4 dark:border-white/10">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-black text-xs font-bold text-white dark:bg-white dark:text-black">
              AI
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold">AI Assistant</p>
              <p className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Online
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="ml-auto grid h-8 w-8 place-items-center rounded-full text-neutral-500 hover:bg-black/5 dark:hover:bg-white/10"
            >
              <Icon name="x" className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    m.from === "user"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "border border-neutral-200 bg-white text-neutral-800 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200"
                  }`}
                >
                  {m.text}
                  <span className="mt-1 block text-[10px] opacity-50">{m.time}</span>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start" aria-label="Assistant is typing">
                <div className="flex gap-1 rounded-2xl border border-neutral-200 bg-white px-3.5 py-3 dark:border-white/10 dark:bg-white/5">
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-neutral-500" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-neutral-500" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-neutral-500" />
                </div>
              </div>
            )}

            {messages.length === 1 && !typing && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-semibold transition hover:border-black hover:bg-black hover:text-white dark:border-white/20 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
            className="flex items-center gap-2 border-t border-black/5 p-3 dark:border-white/10"
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask me anything..."
              aria-label="Message the assistant"
              className="min-w-0 flex-1 rounded-xl border border-neutral-200 bg-white/80 px-3.5 py-2.5 text-sm placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-white/10 dark:bg-white/5 dark:focus:border-white"
            />
            <button
              type="submit"
              disabled={!draft.trim() || typing}
              aria-label="Send message"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-black text-white transition enabled:hover:bg-neutral-700 disabled:opacity-40 dark:bg-white dark:text-black"
            >
              <Icon name="send" className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        className="fixed right-4 z-[60] grid h-14 w-14 place-items-center rounded-full bg-black text-white shadow-[0_12px_30px_-6px_rgba(0,0,0,0.45)] transition hover:scale-105 active:scale-95 dark:bg-white dark:text-black"
        style={{ bottom: bottomOffset }}
      >
        <Icon name={open ? "x" : "chat"} className="h-6 w-6" />
        {!open && (
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-400 text-[9px] font-extrabold text-black ring-2 ring-white dark:ring-neutral-950">
            AI
          </span>
        )}
      </button>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  App                                                                        */
/* -------------------------------------------------------------------------- */
const SECTION_IDS = ["home", "about", "projects", "skills", "contact"];

export default function App() {
  // "loading" -> splash visible, "reveal" -> splash fading, "done" -> splash removed
  const [phase, setPhase] = useState("loading");
  const [theme, toggleTheme] = useTheme();
  const rawActive = useActiveSection(SECTION_IDS);
  const active = rawActive === "skills" ? "projects" : rawActive;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 2000);
    const t2 = setTimeout(() => setPhase("done"), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = phase === "loading" ? "hidden" : "";
  }, [phase]);

  return (
    <>
      {phase !== "done" && <Preloader fading={phase === "reveal"} />}

      <Navbar theme={theme} onToggleTheme={toggleTheme} active={active} />

      <main>
        <Hero ready={phase !== "loading"} />
        <About />
        <Marquee />
        <Projects />
        <TechStack />
        <Contact />
      </main>

      <footer className="px-6 pb-24 pt-10 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} {CONFIG.name}.
      </footer>

      <AIAssistant />
    </>
  );
}
