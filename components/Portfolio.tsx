"use client";
import { useState, useEffect, useRef } from "react";

// ─── RESPONSIVE HOOK ──────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(768);
  useEffect(() => {
    const set = () => setWidth(window.innerWidth);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);
  return width;
}

// ─── DATA ─────────────────────────────────────────────────────────────────
const DATA = {
  name: "Laio Benial",
  title: ["Data Analyst", "Data Scientist", "BI Engineer", "Insight Architect"],
  summary: "I translate raw chaos into clarity — turning millions of data points into decisions that move organisations forward. My work lives at the intersection of analytics, storytelling, and business impact.",
  email: "laio.benial@email.com",
  linkedin: "linkedin.com/in/laiobenial",
  phone: "+91 98765 43210",
  skills: [
    { cat: "Analytics", items: [{ name: "Power BI", pct: 90 }, { name: "Excel / PivotTables", pct: 92 }, { name: "Data Storytelling", pct: 85 }] },
    { cat: "Programming", items: [{ name: "SQL", pct: 88 }, { name: "Python (Pandas/NumPy)", pct: 78 }, { name: "R (basics)", pct: 60 }] },
    { cat: "Tools", items: [{ name: "Google Analytics", pct: 82 }, { name: "Tableau", pct: 75 }, { name: "MS Office Suite", pct: 95 }] },
  ],
  experience: [
    {
      company: "CapeStart Software Pvt Ltd",
      role: "Associate Research Analyst",
      period: "2022 – Present",
      highlights: [
        "Designed and maintained 12+ Power BI dashboards tracking real-time media KPIs for Fortune 500 clients",
        "Reduced manual reporting time by 40% through SQL-based automation pipelines",
        "Delivered weekly executive briefings distilling 50,000+ data points into 5 actionable insights",
        "Collaborated cross-functionally with product and sales teams to align analytics with business objectives",
      ],
    },
  ],
  projects: [
    { title: "Media Sentiment Dashboard", tools: ["Power BI", "SQL", "Python"], problem: "Client needed real-time view of brand perception across 200+ media outlets.", outcome: "Built a live dashboard processing 10K+ articles/day, cutting analysis time from 4 hours to 15 minutes.", color: "#00f5c4" },
    { title: "KPI Tracker — Excel Engine", tools: ["Excel", "VBA", "Power Query"], problem: "Manual KPI tracking led to weekly errors and delayed reporting cycles.", outcome: "Automated tracker reduced errors to zero and saved 6 hours/week across the team.", color: "#7b68ff" },
    { title: "Sales Funnel SQL Analysis", tools: ["SQL", "Python", "Matplotlib"], problem: "Sales leadership lacked visibility into conversion bottlenecks across the funnel.", outcome: "Identified 3 high-drop stages; recommendations drove 18% improvement in Q3 conversion.", color: "#ff6b6b" },
  ],
  education: [{ degree: "B.Sc. Data Science & Business Analytics", school: "University of Technology", year: "2022" }],
  kpis: [
    { label: "Dashboards Built", value: "12+", delta: "+3 this year" },
    { label: "Time Saved / Week", value: "6 hrs", delta: "Team-wide" },
    { label: "Data Points / Day", value: "50K+", delta: "Processed" },
    { label: "Reporting Errors", value: "0", delta: "Since automation" },
  ],
};

// ─── TYPEWRITER ───────────────────────────────────────────────────────────
function TypeWriter({ words }: { words: string[] }) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[wi];
    let timeout: ReturnType<typeof setTimeout>;
    if (!del) {
      if (ci < word.length) { timeout = setTimeout(() => { setDisplay(word.slice(0, ci + 1)); setCi(c => c + 1); }, 80); }
      else { timeout = setTimeout(() => setDel(true), 1800); }
    } else {
      if (ci > 0) { timeout = setTimeout(() => { setDisplay(word.slice(0, ci - 1)); setCi(c => c - 1); }, 45); }
      else { setDel(false); setWi(w => (w + 1) % words.length); }
    }
    return () => clearTimeout(timeout);
  }, [ci, del, wi, words]);
  return (
    <span style={{ color: "#00f5c4" }}>
      {display}
      <span style={{ animation: "blink 1s step-end infinite", borderRight: "2px solid #00f5c4", marginLeft: 2 }} />
    </span>
  );
}

// ─── COUNTER ──────────────────────────────────────────────────────────────
function Counter({ value }: { value: string }) {
  const num = parseInt(value.replace(/\D/g, "")) || 0;
  const suffix = value.replace(/[\d]/g, "");
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (num === 0) { setCount(0); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = () => { start += Math.ceil(num / 40); if (start >= num) { setCount(num); return; } setCount(start); requestAnimationFrame(step); };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [num]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── SKILL BAR ────────────────────────────────────────────────────────────
function SkillBar({ name, pct }: { name: string; pct: number }) {
  const [w, setW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setW(pct), 200); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 13, color: "#c0c0d0" }}>
        <span>{name}</span><span style={{ color: "#00f5c4" }}>{pct}%</span>
      </div>
      <div style={{ height: 5, background: "#1e1e30", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${w}%`, background: "linear-gradient(90deg,#7b68ff,#00f5c4)", borderRadius: 10, transition: "width 1s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
}

// ─── SECTION ──────────────────────────────────────────────────────────────
function Section({ id, children, style = {} }: { id: string; children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} style={{ padding: "64px 0", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)", transition: "opacity .7s ease, transform .7s ease", ...style }}>
      {children}
    </section>
  );
}

// ─── SPARKLINE ────────────────────────────────────────────────────────────
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / (max - min)) * 80 + 10}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: 50 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`0,100 ${pts} 100,100`} fill={`${color}22`} />
    </svg>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────
function Nav({ dark, setDark }: { dark: boolean; setDark: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [scroll, setScroll] = useState(false);
  const [open, setOpen] = useState(false);
  const w = useWindowWidth();
  const isMobile = w < 768;

  useEffect(() => {
    const h = () => setScroll(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close menu on link click
  const handleLink = () => setOpen(false);

  const links = ["About", "Skills", "Experience", "Projects", "Dashboard", "Contact"];

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", background: scroll || open ? "rgba(9,9,18,0.96)" : "transparent", backdropFilter: scroll || open ? "blur(12px)" : "none", borderBottom: scroll || open ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all .3s" }}>
        <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 22, letterSpacing: 3, color: "#fff" }}>LB<span style={{ color: "#00f5c4" }}>.</span></span>

        {isMobile ? (
          /* Hamburger */
          <button onClick={() => setOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }} aria-label="Toggle menu">
            <span style={{ display: "block", width: 24, height: 2, background: open ? "#00f5c4" : "#fff", transition: "all .3s", transform: open ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ display: "block", width: 24, height: 2, background: "#fff", opacity: open ? 0 : 1, transition: "all .3s" }} />
            <span style={{ display: "block", width: 24, height: 2, background: open ? "#00f5c4" : "#fff", transition: "all .3s", transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        ) : (
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 12, letterSpacing: 1.5, color: "#888", textDecoration: "none", textTransform: "uppercase", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#00f5c4"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#888"}>{l}</a>
            ))}
            <button onClick={() => setDark(d => !d)} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "5px 14px", color: "#aaa", cursor: "pointer", fontSize: 12 }}>
              {dark ? "☀ Light" : "◑ Dark"}
            </button>
          </div>
        )}
      </nav>

      {/* Mobile drawer */}
      {isMobile && (
        <div style={{ position: "fixed", top: 60, left: 0, right: 0, zIndex: 199, background: "rgba(9,9,18,0.98)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: open ? "20px 24px 28px" : "0 24px", maxHeight: open ? 400 : 0, overflow: "hidden", transition: "max-height .4s cubic-bezier(.4,0,.2,1), padding .4s" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={handleLink}
              style={{ display: "block", padding: "14px 0", fontSize: 20, fontFamily: "'Bebas Neue',cursive", letterSpacing: 2, color: "#e8e8f0", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {l}
            </a>
          ))}
          <button onClick={() => { setDark(d => !d); setOpen(false); }} style={{ marginTop: 20, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "8px 20px", color: "#aaa", cursor: "pointer", fontSize: 14, width: "100%" }}>
            {dark ? "☀ Switch to Light" : "◑ Switch to Dark"}
          </button>
        </div>
      )}
    </>
  );
}

// ─── TAG ─────────────────────────────────────────────────────────────────
function Tag({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, letterSpacing: 3, color: "#00f5c4", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 8 }}>▸ {children}</div>;
}

const H2: React.CSSProperties = { fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(34px,6vw,56px)", letterSpacing: 1, marginTop: 8, marginBottom: 8, lineHeight: 1 };

// ─── PROJECT CARD ─────────────────────────────────────────────────────────
function ProjectCard({ p, card, border, sub }: { p: typeof DATA.projects[0]; card: string; border: string; sub: string }) {
  const [active, setActive] = useState(false);
  return (
    <div
      onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)} onTouchEnd={() => setTimeout(() => setActive(false), 300)}
      style={{ background: card, border: `1px solid ${active ? p.color + "60" : border}`, borderRadius: 16, padding: 24, transition: "border-color .3s, transform .3s", transform: active ? "translateY(-4px)" : "none", touchAction: "manipulation" }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: p.color + "20", border: `1px solid ${p.color}50`, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 10, height: 10, borderRadius: 2, background: p.color }} />
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{p.title}</h3>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {p.tools.map(t => <span key={t} style={{ fontSize: 10, padding: "3px 8px", background: p.color + "15", color: p.color, borderRadius: 20 }}>{t}</span>)}
      </div>
      <div style={{ fontSize: 13, color: sub, marginBottom: 8, lineHeight: 1.6 }}>
        <span style={{ color: "#7b68ff", fontWeight: 600 }}>Problem: </span>{p.problem}
      </div>
      <div style={{ fontSize: 13, color: sub, lineHeight: 1.6 }}>
        <span style={{ color: "#00f5c4", fontWeight: 600 }}>Outcome: </span>{p.outcome}
      </div>
    </div>
  );
}

// ─── DASHBOARD DEMO ───────────────────────────────────────────────────────
function DashboardDemo({ card, border, sub, dark, fg }: { card: string; border: string; sub: string; dark: boolean; fg: string }) {
  const w = useWindowWidth();
  const isMobile = w < 640;
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const articles = [420, 510, 480, 620, 590, 710, 680, 750, 830];
  const sources = [
    { name: "Online News", pct: 48, color: "#00f5c4" },
    { name: "Print Media", pct: 28, color: "#7b68ff" },
    { name: "Broadcast", pct: 15, color: "#ff6b6b" },
    { name: "Social", pct: 9, color: "#f0a500" },
  ];
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: isMobile ? 20 : 32, overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 10, color: sub, letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>Media Intelligence</div>
          <div style={{ fontSize: isMobile ? 16 : 20, fontWeight: 700, marginTop: 4 }}>Brand Monitor Dashboard</div>
        </div>
        <div style={{ fontSize: 11, padding: "6px 12px", background: "#00f5c420", color: "#00f5c4", borderRadius: 20, border: "1px solid #00f5c430", whiteSpace: "nowrap" }}>● Live</div>
      </div>
      {/* KPI row — 2x2 on mobile */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Articles Today", val: "1,243", trend: "+12%" },
          { label: "Avg Sentiment", val: "84%", trend: "+3%" },
          { label: "Reach (M)", val: "2.8M", trend: "+0.4M" },
          { label: "Alert Level", val: "Low", trend: "Stable" },
        ].map(k => (
          <div key={k.label} style={{ background: dark ? "#161626" : "#f8f8fc", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 9, color: sub, letterSpacing: 1, textTransform: "uppercase" }}>{k.label}</div>
            <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, margin: "5px 0 3px", color: fg }}>{k.val}</div>
            <div style={{ fontSize: 10, color: "#00f5c4" }}>{k.trend}</div>
          </div>
        ))}
      </div>
      {/* Charts — stacked on mobile */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: 16 }}>
        <div style={{ background: dark ? "#161626" : "#f8f8fc", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 10, color: sub, letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>Article Volume — 9 Months</div>
          <Sparkline data={articles} color="#00f5c4" />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            {months.map(m => <span key={m} style={{ fontSize: 9, color: sub }}>{m}</span>)}
          </div>
        </div>
        <div style={{ background: dark ? "#161626" : "#f8f8fc", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 10, color: sub, letterSpacing: 1, marginBottom: 14, textTransform: "uppercase" }}>Source Breakdown</div>
          {sources.map(s => (
            <div key={s.name} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4, color: sub }}>
                <span>{s.name}</span><span style={{ color: s.color }}>{s.pct}%</span>
              </div>
              <div style={{ height: 4, background: dark ? "#0d0d1a" : "#e8e8f0", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${s.pct}%`, background: s.color, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────
function ContactForm({ border, sub, fg }: { border: string; sub: string; fg: string }) {
  const [vals, setVals] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const inp: React.CSSProperties = { width: "100%", background: "transparent", border: `1px solid ${border}`, borderRadius: 8, padding: "14px 16px", color: fg, fontSize: 16, outline: "none", marginBottom: 14, fontFamily: "inherit", WebkitAppearance: "none" };
  if (sent) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 0", gap: 12 }}>
      <div style={{ fontSize: 48 }}>✓</div>
      <div style={{ color: "#00f5c4", fontWeight: 700, fontSize: 18 }}>Message sent!</div>
      <div style={{ color: sub, fontSize: 14, textAlign: "center" }}>I'll get back to you within 24 hours.</div>
    </div>
  );
  return (
    <div>
      <input style={inp} placeholder="Your name" value={vals.name} onChange={e => setVals(v => ({ ...v, name: e.target.value }))} />
      <input style={inp} placeholder="Email address" type="email" value={vals.email} onChange={e => setVals(v => ({ ...v, email: e.target.value }))} />
      <textarea style={{ ...inp, height: 120, resize: "none" }} placeholder="Your message" value={vals.msg} onChange={e => setVals(v => ({ ...v, msg: e.target.value }))} />
      <button onClick={() => { if (vals.name && vals.email && vals.msg) setSent(true); }}
        style={{ width: "100%", padding: "16px", background: "#00f5c4", color: "#090912", fontWeight: 700, fontSize: 14, letterSpacing: 1.5, textTransform: "uppercase", borderRadius: 8, border: "none", cursor: "pointer", touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}>
        Send Message →
      </button>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const w = useWindowWidth();
  const isMobile = w < 768;
  const isTablet = w < 1024;

  const bg = dark ? "#090912" : "#f4f4f8";
  const fg = dark ? "#e8e8f0" : "#111122";
  const card = dark ? "#0f0f1c" : "#fff";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const sub = dark ? "#6b6b85" : "#888";

  const px = isMobile ? "20px" : isTablet ? "32px" : "40px";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: bg, color: fg, minHeight: "100vh", transition: "background .3s, color .3s", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px #00f5c430} 50%{box-shadow:0 0 40px #00f5c460} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
        body { -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #00f5c430; border-radius: 4px; }
        input, textarea, button { font-family: inherit; }
        a { -webkit-tap-highlight-color: transparent; }
      `}</style>

      <Nav dark={dark} setDark={setDark} />

      {/* ── HERO ── */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: `80px ${px} 60px`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at ${isMobile ? "50% 30%" : "70% 40%"}, ${dark ? "#00f5c410" : "#00f5c415"} 0%, transparent 60%), linear-gradient(rgba(0,245,196,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,196,0.025) 1px, transparent 1px)`, backgroundSize: "auto, 50px 50px, 50px 50px", pointerEvents: "none" }} />

        <div style={{ maxWidth: 900, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#00f5c4", textTransform: "uppercase", marginBottom: 16, fontFamily: "monospace" }}>▸ Portfolio 2025 — Data & Analytics</div>
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: isMobile ? "clamp(52px,16vw,80px)" : "clamp(56px,9vw,120px)", lineHeight: 0.95, letterSpacing: 2, marginBottom: 20 }}>
            {DATA.name.split(" ")[0]}<br />
            <span style={{ color: dark ? "#2a2a45" : "#ddd", WebkitTextStroke: `1px ${dark ? "#3a3a60" : "#ccc"}` }}>{DATA.name.split(" ")[1]}</span>
          </h1>
          <div style={{ fontSize: isMobile ? "clamp(18px,5vw,24px)" : "clamp(20px,3vw,32px)", fontWeight: 300, marginBottom: 24, color: sub }}>
            I'm a <TypeWriter words={DATA.title} />
          </div>
          <p style={{ maxWidth: 520, lineHeight: 1.8, color: sub, marginBottom: 36, fontSize: isMobile ? 15 : 16 }}>{DATA.summary}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#projects" style={{ padding: isMobile ? "13px 24px" : "14px 32px", background: "#00f5c4", color: "#090912", fontWeight: 700, fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", borderRadius: 4, textDecoration: "none", animation: "glow 2s ease infinite", touchAction: "manipulation" }}>View My Work</a>
            <a href="#" style={{ padding: isMobile ? "13px 24px" : "14px 32px", border: `1px solid ${border}`, color: fg, fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", borderRadius: 4, textDecoration: "none", touchAction: "manipulation" }}>Download CV</a>
          </div>
        </div>

        {/* Floating stats — hidden on mobile to avoid clutter */}
        {!isMobile && (
          <div style={{ position: "absolute", right: 60, top: "50%", transform: "translateY(-50%)", animation: "float 4s ease infinite", display: "grid", gap: 12 }}>
            {DATA.kpis.slice(0, 2).map(k => (
              <div key={k.label} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "16px 24px", textAlign: "center", minWidth: 140 }}>
                <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 36, color: "#00f5c4", lineHeight: 1 }}><Counter value={k.value} /></div>
                <div style={{ fontSize: 11, color: sub, marginTop: 4, letterSpacing: 1 }}>{k.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: sub, fontSize: 10 }}>
          <span style={{ letterSpacing: 2, textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 32, background: "linear-gradient(#00f5c4,transparent)" }} />
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: `0 ${px}` }}>

        {/* ── ABOUT ── */}
        <Section id="about">
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
            <div>
              <Tag>About Me</Tag>
              <h2 style={H2}>From Numbers to <span style={{ color: "#00f5c4" }}>Narratives</span></h2>
              <p style={{ color: sub, lineHeight: 1.9, marginBottom: 16, fontSize: 15 }}>
                It started with a spreadsheet. Not the glamorous origin story people expect — but that's exactly how it went. A curiosity about why some cells turned red, leading to questions about what the numbers <em>meant</em>, then obsessing over what they could predict.
              </p>
              <p style={{ color: sub, lineHeight: 1.9, fontSize: 15 }}>
                Today I sit at the intersection of technical depth and business clarity. At CapeStart, I've transformed reactive reporting into proactive intelligence — building systems that surface the signal before anyone even knows to ask the question.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {DATA.kpis.map(k => (
                <div key={k.label} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: isMobile ? 18 : 24 }}>
                  <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: isMobile ? 34 : 42, color: "#00f5c4", lineHeight: 1 }}><Counter value={k.value} /></div>
                  <div style={{ fontSize: 11, color: sub, marginTop: 6 }}>{k.label}</div>
                  <div style={{ fontSize: 11, color: "#7b68ff", marginTop: 3 }}>{k.delta}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── SKILLS ── */}
        <Section id="skills">
          <Tag>Capabilities</Tag>
          <h2 style={H2}>The Toolkit</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: 20, marginTop: 36 }}>
            {DATA.skills.map(cat => (
              <div key={cat.cat} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 10, letterSpacing: 3, color: "#00f5c4", textTransform: "uppercase", marginBottom: 20, fontFamily: "monospace" }}>{cat.cat}</div>
                {cat.items.map(s => <SkillBar key={s.name} {...s} />)}
              </div>
            ))}
          </div>
        </Section>

        {/* ── EXPERIENCE ── */}
        <Section id="experience">
          <Tag>Experience</Tag>
          <h2 style={H2}>Where I've Made <span style={{ color: "#00f5c4" }}>Impact</span></h2>
          <div style={{ marginTop: 40, position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "linear-gradient(#00f5c4,transparent)" }} />
            {DATA.experience.map((e, i) => (
              <div key={i} style={{ paddingLeft: isMobile ? 28 : 40, marginBottom: 40, position: "relative" }}>
                <div style={{ position: "absolute", left: -5, top: 4, width: 11, height: 11, borderRadius: "50%", background: "#00f5c4", boxShadow: "0 0 12px #00f5c4" }} />
                <div style={{ fontSize: 10, color: "#00f5c4", letterSpacing: 2, fontFamily: "monospace", marginBottom: 6 }}>{e.period}</div>
                <h3 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, marginBottom: 4 }}>{e.role}</h3>
                <div style={{ color: sub, marginBottom: 16, fontSize: 14 }}>{e.company}</div>
                <div style={{ display: "grid", gap: 10 }}>
                  {e.highlights.map((h, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, fontSize: 14, color: sub, lineHeight: 1.6 }}>
                      <span style={{ color: "#7b68ff", flexShrink: 0, marginTop: 2 }}>◆</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── PROJECTS ── */}
        <Section id="projects">
          <Tag>Projects</Tag>
          <h2 style={H2}>Work That <span style={{ color: "#00f5c4" }}>Speaks</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: 18, marginTop: 36 }}>
            {DATA.projects.map((p, i) => <ProjectCard key={i} p={p} card={card} border={border} sub={sub} />)}
          </div>
        </Section>

        {/* ── DASHBOARD ── */}
        <Section id="dashboard">
          <Tag>Live Dashboard</Tag>
          <h2 style={H2}>Analytics in <span style={{ color: "#00f5c4" }}>Action</span></h2>
          <p style={{ color: sub, marginBottom: 32, maxWidth: 480, lineHeight: 1.8, fontSize: 15 }}>A real-time demo dashboard — the kind I build daily. Tracking media sentiment, source velocity, and engagement trends.</p>
          <DashboardDemo card={card} border={border} sub={sub} dark={dark} fg={fg} />
        </Section>

        {/* ── EDUCATION ── */}
        <Section id="education">
          <Tag>Education</Tag>
          <h2 style={H2}>Foundation</h2>
          <div style={{ marginTop: 28 }}>
            {DATA.education.map((e, i) => (
              <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: isMobile ? 20 : 28, display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: 12 }}>
                <div>
                  <h3 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 6 }}>{e.degree}</h3>
                  <div style={{ color: sub, fontSize: 14 }}>{e.school}</div>
                </div>
                <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: isMobile ? 36 : 48, color: "#00f5c420", letterSpacing: 2 }}>{e.year}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── CONTACT ── */}
        <Section id="contact" style={{ paddingBottom: 100 }}>
          <Tag>Contact</Tag>
          <h2 style={H2}>Let's Build Something <span style={{ color: "#00f5c4" }}>Together</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 60, marginTop: 40 }}>
            <div>
              <p style={{ color: sub, lineHeight: 1.9, marginBottom: 28, fontSize: 15 }}>I'm actively seeking Data Analyst / Data Scientist roles. If you're looking for someone who turns data into decisions, let's talk.</p>
              {[
                { icon: "✉", label: "Email", val: DATA.email },
                { icon: "⊕", label: "LinkedIn", val: DATA.linkedin },
                { icon: "☏", label: "Phone", val: DATA.phone },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 18 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "#00f5c415", border: "1px solid #00f5c430", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, color: sub, letterSpacing: 1 }}>{c.label.toUpperCase()}</div>
                    <div style={{ fontSize: 14, marginTop: 2, wordBreak: "break-all" }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <ContactForm border={border} sub={sub} fg={fg} />
          </div>
        </Section>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: `1px solid ${border}`, padding: isMobile ? "20px" : "24px 40px", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "center" : "auto", gap: 8, color: sub, fontSize: 12, textAlign: isMobile ? "center" : "left" }}>
        <span>© 2025 Laio Benial — Data & Analytics</span>
        <span style={{ fontFamily: "monospace" }}>Built with purpose.</span>
      </div>
    </div>
  );
}
