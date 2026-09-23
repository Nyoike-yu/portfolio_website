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
  github: "https://github.com/nyoike-yu",
  linkedin: "http://www.linkedin.com/in/nyoro-fadhili-816854329",
  cvUrl: `${import.meta.env.BASE_URL}cv.pdf`, // put your CV at public/cv.pdf
};

const NAV = [
  ["Home", "home"],
  ["About", "about"],
  ["Experience", "experience"],
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

const EXPERIENCE = [
  {
    year: "2025 – Now",
    role: "Backend Developer",
    org: "Independent Projects",
    points: [
      "Build Python backends with JWT authentication, rate limiting, and audit logging for client applications.",
      "Design PostgreSQL schemas and migrations that stay fast as the data grows.",
    ],
    tags: ["Python", "PostgreSQL", "JWT", "REST API"],
  },
  {
    year: "2024",
    role: "Data Analyst",
    org: "Retail Analytics Team",
    points: [
      "Cleaned raw sales exports in Excel, loaded them into PostgreSQL, and reported on them in Power BI.",
      "Replaced manual weekly reporting with a single refreshable dashboard.",
    ],
    tags: ["Power BI", "Excel", "PostgreSQL", "SQL"],
  },
  {
    year: "2023",
    role: "Cybersecurity Trainee",
    org: "Security Foundations Program",
    points: [
      "Practiced threat modeling and secure-coding reviews on small web applications.",
    ],
    tags: ["Threat Modeling", "Python", "OWASP"],
  },
];

const STACK = [
  {
    title: "Backend & Scripting",
    blurb: "Where the application logic and automation live.",
    icon: "terminal",
    tools: [
      { name: "Python", note: "APIs, automation, data wrangling", icon: "code" },
    ],
  },
  {
    title: "Databases",
    blurb: "Data that stays consistent, indexed, and queryable.",
    icon: "database",
    tools: [
      { name: "PostgreSQL", note: "Schema design and query tuning", icon: "database" },
    ],
  },
  {
    title: "Data & Analytics",
    blurb: "Turning raw numbers into decisions.",
    icon: "chart",
    tools: [
      { name: "Power BI", note: "Dashboards and reports", icon: "chart" },
      { name: "Microsoft Excel", note: "Cleaning, pivots, modeling", icon: "table" },
    ],
  },
  {
    title: "Security",
    blurb: "Designing so that misuse is hard from day one.",
    icon: "shield",
    tools: [
      { name: "Cybersecurity Foundations", note: "Auth, hardening, secure defaults", icon: "lock" },
      { name: "Threat Modeling", note: "Finding abuse cases early", icon: "target" },
    ],
  },
];

const PROJECTS = [
  {
    id: "secure-api",
    title: "Secure API Backend",
    desc: "Built with Python and PostgreSQL, featuring foundational cybersecurity protocols like rate limiting and JWT auth.",
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
    title: "Sales Data Dashboard",
    desc: "Designed in Power BI using raw data cleaned in Excel and stored in PostgreSQL.",
    tags: ["Power BI", "Excel", "PostgreSQL"],
    highlights: [
      "Raw sales data cleaned and standardized in Excel.",
      "Cleaned data stored in PostgreSQL as the single source of truth.",
      "Interactive dashboard designed in Power BI on top of it.",
    ],
    art: "bars",
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

function useTypewriter(text, start, speed = 55) {
  const reduce = usePrefersReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setN(text.length);
      return;
    }
    let i = 0;
    setN(0);
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, start, speed, reduce]);
  return { typed: text.slice(0, n), done: n >= text.length };
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
      <nav
        aria-label="Primary"
        className={`pointer-events-auto mx-auto grid max-w-4xl grid-cols-[1fr_auto] items-center rounded-full px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:grid-cols-[1fr_auto_1fr] ${glass}`}
      >
        <a href="#home" className="text-lg font-extrabold tracking-tight">
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

        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-9 w-9 place-items-center rounded-full text-neutral-600 transition hover:bg-black/5 dark:text-neutral-300 dark:hover:bg-white/10"
          >
            <Icon name={theme === "dark" ? "moon" : "sun"} />
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full text-neutral-600 transition hover:bg-black/5 md:hidden dark:text-neutral-300 dark:hover:bg-white/10"
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </nav>

      {open && (
        <ul
          className={`pointer-events-auto pop-in mx-auto mt-2 max-w-4xl rounded-3xl p-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:hidden ${glass}`}
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
  const { typed, done } = useTypewriter(CONFIG.role, ready);

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
          <h1 className="text-[2.75rem] font-extrabold leading-[1.04] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Hi, I'm {CONFIG.name}
          </h1>

          <p className="mt-5 text-xl font-bold tracking-tight sm:text-2xl">
            <span className="sr-only">{CONFIG.role}</span>
            {/* the invisible copy reserves the final height so nothing jumps while typing */}
            <span className="grid" aria-hidden="true">
              <span className="invisible col-start-1 row-start-1">{CONFIG.role}</span>
              <span className="col-start-1 row-start-1">
                {typed}
                <span className={`ml-0.5 inline-block w-[2px] translate-y-[2px] bg-current align-baseline ${done ? "caret" : ""}`}>
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
            <a href={CONFIG.cvUrl} download className={btnOutline}>
              Download CV
              <Icon name="download" className="h-4 w-4" strokeWidth={2} />
            </a>
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

      <div className="mx-auto mt-14 flex w-full max-w-6xl gap-3 border-t border-neutral-200 pt-6 dark:border-white/10">
        {[
          ["github", "GitHub", CONFIG.github],
          ["linkedin", "LinkedIn", CONFIG.linkedin],
          ["mail", "Email", `mailto:${CONFIG.email}`],
        ].map(([icon, label, href]) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="grid h-11 w-11 place-items-center rounded-xl border border-neutral-200 text-neutral-700 transition hover:border-black hover:text-black dark:border-white/15 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white"
          >
            <Icon name={icon} />
          </a>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section header                                                             */
/* -------------------------------------------------------------------------- */
function SectionHeader({ eyebrow, title }) {
  return (
    <div className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">
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

  return (
    <section id="about" className="scroll-mt-24 px-6 py-28 md:px-10">
      <SectionHeader eyebrow="Discover" title="About Me" />

      <div className="mx-auto mt-16 grid max-w-5xl items-start gap-8 sm:grid-cols-[12rem_1fr] sm:gap-10 md:grid-cols-[16rem_1fr] md:gap-12 lg:grid-cols-[20rem_1fr] lg:gap-14">
        <div className="mx-auto w-48 overflow-hidden rounded-[2rem] sm:mx-0 sm:w-full bg-black shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/5 dark:ring-white/10">
          <div className="aspect-[4/5]">
            <Silhouette id="about" />
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <h3 className="border-b border-neutral-200 pb-3 text-lg font-bold tracking-tight dark:border-white/10">
                Who Am I
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                I'm a fullstack developer and data analyst who likes the parts
                of software most people skip: input validation, query plans,
                audit trails. I write backends in Python, model data in
                PostgreSQL, and report on it in Power BI.
              </p>
            </div>
            <div>
              <h3 className="border-b border-neutral-200 pb-3 text-lg font-bold tracking-tight dark:border-white/10">
                My Approach
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                Security first, then speed. I start by asking how a system
                could be misused, keep data clean at the source, and only then
                optimize. Every chart I ship traces back to a query I can
                defend.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.04]">
            <h3 className="border-l-[3px] border-black pl-3 text-lg font-bold tracking-tight dark:border-white">
              Personal Details
            </h3>
            <dl className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-2">
              {details.map(([k, v]) => (
                <div key={k} className="min-w-0">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                    {k}
                  </dt>
                  <dd className="mt-1 break-words text-sm font-semibold">
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
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee                                                                    */
/* -------------------------------------------------------------------------- */
function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="marquee overflow-hidden border-y border-neutral-200 py-6 dark:border-white/10"
    >
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
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
/*  Experience timeline                                                        */
/* -------------------------------------------------------------------------- */
function Experience() {
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const [progress, setProgress] = useState({ px: 0, reached: [] });

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
    <section id="experience" className="scroll-mt-24 px-6 py-28 md:px-10">
      <SectionHeader eyebrow="Career Path" title="Work Experience" />

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

          {EXPERIENCE.map((item, i) => (
            <li
              key={item.role}
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

              <article
                className={`p-7 ${card} ${i % 2 === 0 ? "md:col-start-1" : "md:col-start-2"}`}
              >
                <p className="text-sm font-semibold text-neutral-400">{item.year}</p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight">{item.role}</h3>
                <p className="mt-1 text-sm font-medium text-neutral-500">{item.org}</p>

                <ul className="mt-5 space-y-3">
                  {item.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400"
                      />
                      {p}
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700 dark:bg-white/10 dark:text-neutral-300"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tech stack                                                                 */
/* -------------------------------------------------------------------------- */
function TechStack() {
  return (
    <section id="skills" className="scroll-mt-24 px-6 py-28 md:px-10">
      <SectionHeader eyebrow="Skills & Tools" title="My Tech Stack" />

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
        {STACK.map((group) => (
          <article key={group.title} className={`flex flex-col p-7 ${card}`}>
            <div className="flex items-center gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-neutral-100 text-neutral-500 dark:bg-white/10 dark:text-neutral-400">
                <Icon name={group.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold tracking-tight">{group.title}</h3>
                <p className="text-sm text-neutral-500">{group.blurb}</p>
              </div>
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
/*  Projects                                                                   */
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
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        onClick={(e) => e.stopPropagation()}
        className="pop-in w-full max-w-lg overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl dark:border-white/10 dark:bg-neutral-900"
      >
        <ProjectArt kind={project.art} />
        <div className="p-7">
          <div className="flex items-start justify-between gap-4">
            <h3 id="project-dialog-title" className="text-2xl font-bold tracking-tight">
              {project.title}
            </h3>
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
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {project.desc}
          </p>
          <ul className="mt-5 space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                {h}
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700 dark:bg-white/10 dark:text-neutral-300"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="projects" className="scroll-mt-24 px-6 py-28 md:px-10">
      <SectionHeader eyebrow="Portfolio" title="Selected Works" />

      <div className="mx-auto mt-16 max-w-6xl">
        <div
          tabIndex={0}
          role="region"
          aria-label="Projects. Scroll horizontally to see more."
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:-mx-10 md:px-10 lg:mx-0 lg:px-0"
        >
          {PROJECTS.map((p) => (
            <article
              key={p.id}
              className={`flex w-[85%] shrink-0 snap-start flex-col overflow-hidden sm:w-[24rem] lg:w-[calc(50%-0.75rem)] ${card}`}
            >
              <ProjectArt kind={p.art} />
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {p.desc}
                </p>
                <button
                  type="button"
                  onClick={() => setSelected(p)}
                  className="mt-6 w-full rounded-xl border border-neutral-300 px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] transition hover:border-black hover:bg-black hover:text-white dark:border-white/20 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                >
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] transition hover:border-black dark:border-white/20 dark:hover:border-white"
          >
            View More Project
            <Icon name="external" className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </div>

      {selected && <ProjectDialog project={selected} onClose={close} />}
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

      <SectionHeader eyebrow="Get in Touch" title="Contact Me" />

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

        <button
          type="submit"
          className={`${btnSolid} mt-8 w-full text-xs font-bold uppercase tracking-[0.2em]`}
        >
          Send Message
        </button>

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
    return "Two highlights: a Secure API Backend (Python, PostgreSQL, JWT auth, rate limiting) and a Sales Data Dashboard in Power BI. Open Selected Works and tap View Details for more.";
  if (/(stack|skill|tool|tech|python|sql|power bi|excel)/.test(s))
    return "The core stack is Python and PostgreSQL for backends and data, Power BI and Excel for analytics, plus cybersecurity foundations and threat modeling.";
  if (/(experience|career|job|role|history)/.test(s))
    return "The Work Experience timeline covers fullstack development, data analysis, and cybersecurity training. Scroll up to the timeline for the details.";
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
const SECTION_IDS = ["home", "about", "experience", "skills", "projects", "contact"];

export default function App() {
  // "loading" -> splash visible, "reveal" -> splash fading, "done" -> splash removed
  const [phase, setPhase] = useState("loading");
  const [theme, toggleTheme] = useTheme();
  const rawActive = useActiveSection(SECTION_IDS);
  const active = rawActive === "skills" ? "experience" : rawActive;

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
        <Experience />
        <TechStack />
        <Projects />
        <Contact />
      </main>

      <footer className="px-6 pb-24 pt-10 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} {CONFIG.name}.
      </footer>

      <AIAssistant />
    </>
  );
}
