"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useEnergyCanvas } from "@/hooks/useEnergyCanvas";
import {
  fadeUp, fadeIn, stagger, staggerFast, cardItem,
  slideLeft, slideRight, scaleIn, viewport,
} from "@/lib/animations";

/* ─── PROBLEM ─────────────────────────────────────────── */
const PAIN_CARDS = [
  { n: "01", title: "Inconsistent supply",       body: "Quality and volume of recovered material varies too widely for industrial buyers to depend on." },
  { n: "02", title: "Weak traceability",          body: "No visibility into where material came from, how it was handled, or what it contains." },
  { n: "03", title: "Inefficient logistics",      body: "Collection routes are fragmented, costly, and disconnected from processing capacity." },
  { n: "04", title: "Low processing readiness",   body: "Most recovered material never reaches industrial-grade specification without proper processing infrastructure." },
];

export function Problem() {
  const canvasRef = useEnergyCanvas("problem");
  return (
    <section className="bg-sec fade-bottom" id="problem" style={{ backgroundImage: "url('/img/problem_desktop.png')", padding: "120px 0" }}>
      <div className="bg-overlay overlay-problem" />
      <canvas ref={canvasRef} className="sec-canvas" />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <motion.p className="eyebrow" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>The Challenge</motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} style={{ marginBottom: 52 }}>
          The Need Is Growing.<br />The System Is Still Broken.
        </motion.h2>

        <div className="split-layout split-layout-wide" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 80, alignItems: "start" }}>
          <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={viewport}>
            <p style={{ marginBottom: 16 }}>Industrial demand for recycled materials is rising. But supply remains fragmented, inconsistent, and hard to scale.</p>
            <p style={{ marginBottom: 16 }}>Recovery systems are often manual. Processing is uneven. Infrastructure is too weak or too far from where waste is generated. Logistics are inefficient. Visibility is limited.</p>
            <p style={{ marginBottom: 16 }}>The result is simple: industry struggles to get recycled feedstock at the right quality, quantity, consistency, and cost.</p>
            <p className="section-closing">Circular supply chains cannot scale without real infrastructure.</p>
          </motion.div>

          <motion.div className="card-grid card-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }} variants={staggerFast} initial="hidden" whileInView="visible" viewport={viewport}>
            {PAIN_CARDS.map(c => (
              <motion.article key={c.n} variants={cardItem} style={{ background: "rgba(13,17,23,0.84)", border: "1px solid var(--border)", padding: "32px 28px", backdropFilter: "blur(6px)", position: "relative", borderTop: "2px solid var(--blue)" }}>
                <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 16 }}>// {c.n}</p>
                <h4 style={{ color: "var(--text)", marginBottom: 8 }}>{c.title}</h4>
                <p style={{ fontSize: 13 }}>{c.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── POSITIONING ─────────────────────────────────────── */
export function Positioning() {
  return (
    <section
      className="bg-sec fade-bottom positioning-hero"
      id="positioning"
      style={{ padding: "120px 0", borderTop: "1px solid var(--border)" }}
    >
      <div className="bg-overlay overlay-hero" />
      <div className="container">
        <motion.div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }} variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
          <motion.p className="eyebrow eyebrow-center" variants={fadeUp}>What We Do</motion.p>
          <motion.h2 variants={fadeUp} style={{ marginBottom: 24 }}>SPCTA Builds the Missing Infrastructure Layer</motion.h2>
          <motion.p variants={fadeUp} style={{ marginBottom: 16 }}>SPCTA is not just a recycling company. We are building the infrastructure that makes circular supply chains work.</motion.p>
          <motion.p variants={fadeUp}>Our model combines distributed recovery systems, clean-energy operations, digital workflow, workforce development, and advanced processing into one connected platform. This helps materials move more efficiently from source to industrial use—with better traceability, stronger quality control, and greater operational reliability.</motion.p>
          <motion.blockquote className="pull-quote" variants={scaleIn}>More than recycling. Infrastructure for circular industry.</motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SYSTEM OVERVIEW ─────────────────────────────────── */
const SYS_NODES = [
  { abbr: "WEB",  name: "SPCTA WEB",      sub: "Solar-powered waste bank systems" },
  { abbr: "FLOW", name: "SPCTA FLOW",     sub: "Digital workflow software" },
  { abbr: "ACD",  name: "SPCTA Academy",  sub: "Workforce training & certification" },
  { abbr: "ARC",  name: "SPCTA ARC",      sub: "Advanced recycling centres" },
];

export function SystemOverview() {
  return (
    <section className="sec sec-mid" id="system-overview">
      <div className="container">
        <motion.div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 72px" }} variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
          <motion.p className="eyebrow eyebrow-center" variants={fadeUp}>The SPCTA System</motion.p>
          <motion.h2 variants={fadeUp} style={{ marginBottom: 16 }}>
            One Platform.
            <br />
            <span style={{ display: "block", width: "100%", textAlign: "center" }}>Four Connected Capabilities.</span>
          </motion.h2>
          <motion.p variants={fadeUp}>SPCTA brings together the critical layers needed to make circular supply chains operational—from recovery and coordination to workforce and processing.</motion.p>
          <motion.p className="support-line" variants={fadeUp}>Each part strengthens the next, creating a more reliable path from waste source to industrial supply.</motion.p>
        </motion.div>

        <motion.div className="system-overview-flow" style={{ display: "flex", alignItems: "center", justifyContent: "center" }} variants={staggerFast} initial="hidden" whileInView="visible" viewport={viewport}>
          {SYS_NODES.map((node, i) => (
            <div key={node.abbr} className="system-overview-item" style={{ display: "flex", alignItems: "center" }}>
              <motion.div variants={cardItem} style={{ flex: 1, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", color: "var(--muted)", marginBottom: 14 }}>0{i + 1}</p>
                <div style={{ width: 64, height: 64, borderRadius: "50%", border: `1.5px solid ${i % 2 === 0 ? "var(--blue)" : "var(--green)"}`, background: i % 2 === 0 ? "rgba(26,105,178,0.08)" : "rgba(143,192,69,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, animation: `sysPulse 3s ease-in-out ${i * 0.8}s infinite` }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "var(--cyan)", textTransform: "uppercase" }}>{node.abbr}</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{node.name}</p>
                <p style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.5, maxWidth: 120, textAlign: "center" }}>{node.sub}</p>
              </motion.div>
              {i < SYS_NODES.length - 1 && (
                <svg className="system-overview-connector" width="64" height="20" viewBox="0 0 64 20" style={{ margin: "0 8px", flexShrink: 0, marginBottom: 68 }}>
                  <path d="M0,10 L58,10" fill="none" stroke="var(--blue)" strokeWidth="1" strokeDasharray="5 4" style={{ animation: "connDash 1.6s linear infinite" }} />
                  <polygon points="52,5 64,10 52,15" fill="var(--blue)" opacity="0.5" />
                </svg>
              )}
            </div>
          ))}
        </motion.div>
      </div>
      <style>{`
        @keyframes sysPulse { 0%,100%{box-shadow:0 0 10px rgba(26,105,178,0.15)} 50%{box-shadow:0 0 24px rgba(26,105,178,0.38)} }
        @keyframes connDash { from{stroke-dashoffset:0} to{stroke-dashoffset:-36} }
      `}</style>
    </section>
  );
}

/* ─── PRODUCTS ────────────────────────────────────────── */
const PRODUCTS = [
  { id: "spcta-web",      label: "SPCTA WEB",     title: "Solar-Powered Waste Bank Systems",             soundbite: "Recovery starts where waste is generated.",             body: "SPCTA “Waste+Energy Banks” are solar-powered recovery nodes located close to waste generation points. They aggregate, sort, process, and store recyclable materials closer to source—reducing inefficiency upstream and improving supply readiness downstream.", benefits: ["Brings recovery infrastructure closer to waste sources","Improves sorting, quality, and traceability early in the chain","Supports cleaner operations through distributed solar power"], cta: "Learn About SPCTA WEB", img: "features_desktop" },
  { id: "spcta-flow",     label: "SPCTA FLOW",    title: "End-to-End Workflow Software",                  soundbite: "The digital backbone of circular operations.",           body: "SPCTA FLOW digitizes the workflow from communities to industry. It supports collection, tracking, pricing, inventory, logistics, payments, and quality management—bringing visibility and coordination to the full chain.", benefits: ["Gives end-to-end visibility across recovery and movement","Improves coordination across field and industrial operations","Supports traceability, accountability, and scale"], cta: "Explore SPCTA FLOW", img: "flow_desktop" },
  { id: "spcta-academy",  label: "SPCTA Academy", title: "Training and Certification for the Recycling Workforce", soundbite: "Skilled people power better systems.", body: "SPCTA Academy trains and certifies blue-collar workers across collection, sorting, operations, safety, and recovery system management. It helps build the capable workforce needed to run modern circular infrastructure well.", benefits: ["Builds the workforce needed for reliable execution","Improves professionalism, safety, and operating discipline","Expands inclusive pathways into circular economy jobs"], cta: "Discover SPCTA Academy", img: "community_desktop" },
  { id: "spcta-arc",      label: "SPCTA ARC",     title: "Advanced Recycling Centres",                    soundbite: "Turning recovered materials into industrial-grade output.", body: "SPCTA ARC converts recovered materials into the feedstock formats required by manufacturers. It bridges the gap between collection and industrial use—improving quality, consistency, and commercial value.", benefits: ["Converts recovered materials into specification-ready formats","Improves consistency for industrial buyers","Increases value creation across the supply chain"], cta: "See SPCTA ARC", img: "solution_desktop" },
];

export function Products({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="sec" id="products" style={{ background: "var(--surface-lo)", borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <motion.div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 72px" }} variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
          <motion.p className="eyebrow eyebrow-center" variants={fadeUp}>Products</motion.p>
          <motion.h2 variants={fadeUp}>The SPCTA Platform<br />in Action</motion.h2>
          <motion.p className="products-intro" variants={fadeUp} style={{ marginTop: 16, whiteSpace: "nowrap" }}>Four integrated capabilities. One connected platform for circular supply chains.</motion.p>
        </motion.div>

        {PRODUCTS.map((p, i) => {
          const even = i % 2 === 0;
          return (
            <motion.article key={p.id} id={p.id} className="product-card"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid var(--border)", marginBottom: 2, background: "var(--surface-mid)", direction: even ? "ltr" : "rtl" }}
              variants={fadeIn} initial="hidden" whileInView="visible" viewport={viewport}
            >
              <div className="product-card-media" style={{ minHeight: 340, backgroundImage: `url('/img/${p.img}.png')`, backgroundSize: "cover", backgroundPosition: "center", direction: "ltr" }} />
              <div className="product-card-copy" style={{ padding: "52px 52px", display: "flex", flexDirection: "column", justifyContent: "center", direction: "ltr" }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 12 }}>{p.label}</p>
                <h3 style={{ color: "var(--text)", marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--blue)", marginBottom: 20, fontStyle: "italic" }}>{p.soundbite}</p>
                <p style={{ fontSize: 14, marginBottom: 24 }}>{p.body}</p>
                <ul style={{ listStyle: "none", marginBottom: 32, display: "flex", flexDirection: "column", gap: 10 }}>
                  {p.benefits.map(b => (
                    <li key={b} style={{ fontSize: 13, color: "var(--muted)", paddingLeft: 20, position: "relative", lineHeight: 1.6 }}>
                      <span style={{ position: "absolute", left: 0, color: "var(--green)", fontSize: 11 }}>→</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <button onClick={onOpenModal} style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", cursor: "pointer", padding: "10px 22px", borderRadius: 8, border: "none", backgroundImage: "linear-gradient(90deg, #6fa332 50%, var(--blue) 50%)", backgroundSize: "200% 100%", backgroundPosition: "100% 0", color: "#fff", fontFamily: "inherit", alignSelf: "flex-start", transition: "background-position 0.42s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s" }} onMouseEnter={e=>(e.currentTarget.style.backgroundPosition="0 0")} onMouseLeave={e=>(e.currentTarget.style.backgroundPosition="100% 0")}>Partner With SPCTA</button>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ────────────────────────────────────── */
const STEPS = [
  { n: "01", tag: "// SPCTA WEB",      title: "Recover closer to source",              body: "SPCTA WEB captures and processes recyclable materials near where waste is generated." },
  { n: "02", tag: "// SPCTA FLOW",     title: "Coordinate every movement digitally",   body: "SPCTA FLOW tracks collection, logistics, inventory, payments, and quality across the network." },
  { n: "03", tag: "// SPCTA Academy",  title: "Build workforce capability",            body: "SPCTA Academy trains the people who operate the system safely and consistently." },
  { n: "04", tag: "// SPCTA ARC",      title: "Process for industrial use",            body: "SPCTA ARC converts materials into formats manufacturers can use." },
];

export function HowItWorks() {
  const canvasRef = useEnergyCanvas("howworks");
  return (
    <section className="bg-sec" id="how-it-works" style={{ backgroundImage: "url('/img/flow_desktop.png')", padding: "120px 0" }}>
      <div className="bg-overlay overlay-left" />
      <canvas ref={canvasRef} className="sec-canvas" />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 64px" }} variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
          <motion.p className="eyebrow eyebrow-center" variants={fadeUp}>How It Works</motion.p>
          <motion.h2 variants={fadeUp}>From Waste Source to Industrial Supply</motion.h2>
        </motion.div>

        <motion.div className="card-grid card-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, marginBottom: 48 }} variants={staggerFast} initial="hidden" whileInView="visible" viewport={viewport}>
          {STEPS.map(s => (
            <motion.article key={s.n} variants={cardItem} style={{ background: "rgba(13,17,23,0.82)", border: "1px solid var(--border)", padding: "44px 32px", backdropFilter: "blur(6px)", position: "relative" }}>
              <span style={{ fontSize: 60, fontWeight: 800, lineHeight: 1, color: "rgba(255,255,255,0.04)", position: "absolute", top: 16, right: 16, letterSpacing: "-0.04em" }}>{s.n}</span>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 16 }}>{s.tag}</p>
              <h3 style={{ fontSize: 16, color: "var(--text)", marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65 }}>{s.body}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} style={{ textAlign: "center", fontSize: 16, fontWeight: 600, color: "var(--text)", padding: 24, border: "1px solid var(--border)", background: "rgba(13,17,23,0.72)", backdropFilter: "blur(6px)", maxWidth: 600, margin: "0 auto" }}>
          A cleaner, smarter, more reliable path from communities to industry.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── OUTCOMES ────────────────────────────────────────── */
const OUTCOMES = [
  { tag: "For Industry",          title: "Reliable Feedstock Supply",       body: "Improve access to recycled materials with stronger quality, consistency, and visibility.", accent: "var(--green)" },
  { tag: "For Operations",        title: "Smarter System Performance",      body: "Reduce friction across recovery, logistics, processing, and coordination.",                accent: "var(--blue)"  },
  { tag: "For Circularity Goals", title: "Cleaner Execution",               body: "Support lower-emission recovery and logistics through energy-enabled infrastructure.",      accent: "var(--cyan)"  },
  { tag: "For Ecosystems",        title: "Workforce and Local Value",        body: "Create stronger jobs, better capability, and more inclusive participation in the circular economy.", accent: "var(--green)" },
];

export function Outcomes() {
  return (
    <section className="sec sec-mid" id="outcomes">
      <div className="container">
        <motion.div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }} variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
          <motion.p className="eyebrow eyebrow-center" variants={fadeUp}>Outcomes</motion.p>
          <motion.h2 variants={fadeUp}>Built for Better Supply, Better Operations, and Better Results</motion.h2>
        </motion.div>
        <motion.div className="card-grid card-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2 }} variants={staggerFast} initial="hidden" whileInView="visible" viewport={viewport}>
          {OUTCOMES.map(o => (
            <motion.article key={o.title} variants={cardItem} style={{ background: "var(--surface-mid)", border: "1px solid var(--border)", padding: "44px 36px", borderTop: `2px solid ${o.accent}` }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>// {o.tag}</p>
              <h3 style={{ fontSize: 17, color: "var(--text)", marginBottom: 12 }}>{o.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65 }}>{o.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── WHY SPCTA ───────────────────────────────────────── */
const CONTRAST = [
  { not: "Not just collection",          but: "A distributed recovery network",                      desc: "Built for supply readiness, not just waste removal." },
  { not: "Not just software",            but: "Digital visibility connected to physical execution",   desc: "FLOW ties the full chain together, not just the front-end." },
  { not: "Not just processing",          but: "A full path from waste source to industrial output",   desc: "Recovery, coordination, training, and conversion in one." },
  { not: "Not just circularity ambition",but: "Operational infrastructure that performs in the real world", desc: "Designed for industrial relevance, not just ESG optics." },
];

export function WhySPCTA() {
  return (
    <section className="sec" id="why-spcta" style={{ background: "var(--surface-lo)", borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <motion.p className="eyebrow" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>Why SPCTA</motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} style={{ marginBottom: 16 }}>
          Most Players Solve One Part.<br />SPCTA Integrates the System.
        </motion.h2>

        <div className="split-layout split-layout-wide" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginTop: 52, alignItems: "start" }}>
          <motion.p variants={slideLeft} initial="hidden" whileInView="visible" viewport={viewport} style={{ fontSize: 16, lineHeight: 1.75 }}>
            Collection alone is not enough. Software alone is not enough. Processing alone is not enough. SPCTA combines infrastructure, software, workforce, and advanced processing into one platform built for industrial relevance and scale.
          </motion.p>

          <motion.div className="card-grid card-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }} variants={staggerFast} initial="hidden" whileInView="visible" viewport={viewport}>
            {CONTRAST.map(c => (
              <motion.div key={c.not} variants={cardItem} style={{ background: "var(--surface-mid)", border: "1px solid var(--border)", padding: "36px 32px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: "var(--muted)", textDecoration: "line-through", marginBottom: 10 }}>{c.not}</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{c.but}</p>
                <p style={{ fontSize: 13, lineHeight: 1.6 }}>{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROOF ───────────────────────────────────────────── */
const PROOF_TILES = [
  { val: "75k",   unit: "MT",  label: "Per annum industrial demand pipeline",        accent: "var(--green)" },
  { val: "305",   unit: "",    label: "Waste generator businesses signed up",          accent: "var(--blue)"  },
  { val: "1M",    unit: "",    label: "Plastic bottles recovered to date",             accent: "var(--cyan)"  },
  { val: "40%",   unit: "",    label: "Transport cost reduction achieved",             accent: "var(--green)" },
  { val: "Pilots", unit: "", label: "Completed with Coca-Cola and Alkem",             accent: "var(--blue)"  },
  { val: "Public Sector", unit: "", label: "Aligned on jobs, waste & emissions reduction", accent: "var(--cyan)" },
];
const PARTNERS = ["Coca-Cola","British Petroleum","Procter & Gamble","Indorama","IHS Towers","US CleanTech Open","Future Africa","Alkem"];

export function Proof() {
  const canvasRef = useEnergyCanvas("impact");
  return (
    <section className="bg-sec" id="proof" style={{ backgroundImage: "url('/img/impact_desktop.png')", padding: "120px 0" }}>
      <div className="bg-overlay overlay-proof" />
      <canvas ref={canvasRef} className="sec-canvas" />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }} variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
          <motion.p className="eyebrow eyebrow-center" variants={fadeUp}>Built for Execution</motion.p>
          <motion.h2 variants={fadeUp} style={{ marginBottom: 16 }}>Designed for Serious Industrial and Ecosystem Partners</motion.h2>
          <motion.p variants={fadeUp}>SPCTA is built to support industrial buyers, enterprise waste generators, public-sector collaborators, and strategic investors seeking circular infrastructure that can scale.</motion.p>
        </motion.div>

        <motion.div className="card-grid card-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, marginBottom: 32 }} variants={staggerFast} initial="hidden" whileInView="visible" viewport={viewport}>
          {PROOF_TILES.map(t => (
            <motion.div key={t.label} variants={cardItem} style={{ background: "rgba(13,17,23,0.84)", border: "1px solid var(--border)", padding: "36px 28px", backdropFilter: "blur(6px)", textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1, color: t.accent, marginBottom: 8, letterSpacing: "-0.02em" }}>{t.val}{t.unit}</div>
              <p style={{ fontSize: 12, lineHeight: 1.5 }}>{t.label}</p>
            </motion.div>
          ))}
        </motion.div>



        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} style={{ textAlign: "center", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
          Built for quality, quantity, consistency, and traceability.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── AUDIENCES ───────────────────────────────────────── */
const AUDIENCES = [
  { icon: "🏭", title: "Industrial manufacturers",          body: "Reliable access to recycled feedstock with better consistency and supply visibility." },
  { icon: "🏢", title: "Enterprise waste generators",       body: "Structured recovery systems that make circularity more measurable and operational." },
  { icon: "🏛️", title: "Governments and development partners", body: "Scalable infrastructure that supports jobs, cleaner systems, and inclusive growth." },
  { icon: "📈", title: "Investors and strategic partners",  body: "A platform model at the intersection of clean energy, infrastructure, software, and industrial supply chains." },
];

export function Audiences() {
  const partners = [
    { name: "bp", src: "/logos/official/bp.svg", width: 138, height: 44, tone: "invert" },
    { name: "Coca-Cola", src: "https://www.coca-colacompany.com/content/dam/company/us/en/the-coca-cola-company-logo-white.svg", width: 176, height: 34, tone: "plain" },
    { name: "P&G", src: "/logos/official/pg.png", width: 116, height: 44, tone: "invert" },
    { name: "Indorama", src: "/logos/official/indorama-white.png", width: 188, height: 42, tone: "plain" },
    { name: "IHS", src: "/logos/official/ihs-white.png", width: 138, height: 52, tone: "plain" },
    { name: "ACT", src: "/logos/official/act.svg", width: 176, height: 32, tone: "invert" },
    { name: "Future Africa", src: "/logos/official/future-africa.svg", width: 196, height: 36, tone: "plain" },
    { name: "CleanTech Open", src: "/logos/official/cleantech-open-white.png", width: 176, height: 62, tone: "plain" },
    { name: "Lagos State Office of Works", src: "/logos/official/lagos-state-works-white.png", width: 78, height: 78, tone: "plain" },
    { name: "Alliance to End Plastic Waste", src: "/logos/official/alliance-to-end-plastic-waste-white.png", width: 150, height: 68, tone: "plain" },
    { name: "Alkem", src: "/logos/official/alkem-white.png", width: 138, height: 66, tone: "plain" },
    { name: "Exxon", src: "/logos/official/exxon-white.png", width: 148, height: 56, tone: "plain" },
    { name: "carbonivity", src: "/logos/official/carbonivity-white.png", width: 158, height: 46, tone: "plain" },
  ];
  return (
    <section className="sec sec-mid audiences-section" id="audiences" style={{ paddingBottom: 140 }}>
      <div className="container">
        <motion.div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 64px" }} variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
          <motion.p className="eyebrow eyebrow-center" variants={fadeUp}>Who We Serve</motion.p>
          <motion.h2 variants={fadeUp}>Built for the Stakeholders Shaping Circular Industry</motion.h2>
        </motion.div>
        <motion.div className="card-grid card-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2 }} variants={staggerFast} initial="hidden" whileInView="visible" viewport={viewport}>
          {AUDIENCES.map(a => (
            <motion.article key={a.title} variants={cardItem} style={{ background: "var(--surface-mid)", border: "1px solid var(--border)", padding: "44px 36px" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(26,105,178,0.12)", border: "1px solid rgba(26,105,178,0.3)", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{a.icon}</div>
              <h3 style={{ fontSize: 15, color: "var(--text)", marginBottom: 12 }}>{a.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65 }}>{a.body}</p>
            </motion.article>
          ))}
        </motion.div>
        {/* Partner logos below audience grid */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} style={{ marginTop: 72, paddingTop: 12, maxWidth: 980, marginInline: "auto" }}>
          <motion.p variants={fadeUp} style={{ textAlign: "center", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 36 }}>Our Partners</motion.p>
          <motion.div
            className="partner-grid"
            variants={staggerFast}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              columnGap: 42,
              rowGap: 28,
              padding: "8px 0 0",
              maxWidth: 980,
              marginInline: "auto",
            }}
          >
            {partners.map((partner) => (
              <motion.div key={partner.name} className="partner-grid-item" variants={cardItem} style={{ minHeight: 82, minWidth: 148, display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 4px", textAlign: "center" }}>
                <img
                  src={partner.src}
                  alt={partner.name}
                  style={{
                    width: partner.width,
                    height: partner.height,
                    objectFit: "contain",
                    opacity: 0.92,
                    filter: `${partner.tone === "invert" ? "brightness(0) invert(1) " : ""}drop-shadow(0 0 12px rgba(255,255,255,0.05))`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} style={{ height: 48 }} />
        </motion.div>

      </div>
    </section>
  );
}

/* ─── FINAL CTA ───────────────────────────────────────── */
export function FinalCTA({ onOpenModal }: { onOpenModal: () => void }) {
  const canvasRef = useEnergyCanvas("cta");
  return (
    <section className="bg-sec" id="final-cta" style={{ backgroundImage: "url('/img/cta_desktop.png')", padding: "160px 0", textAlign: "center" }}>
      <div className="bg-overlay overlay-heavy" />
      <canvas ref={canvasRef} className="sec-canvas" />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div style={{ maxWidth: 720, margin: "0 auto" }} variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
          <motion.p className="eyebrow eyebrow-center eyebrow-green" variants={fadeUp}>Get in touch</motion.p>
          <motion.h2 variants={fadeUp} style={{ color: "var(--text)", marginBottom: 20 }}>Build the Next Layer of Circular Infrastructure With SPCTA</motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: 17, maxWidth: 540, margin: "0 auto 40px" }}>
            Whether you are looking to secure feedstock, structure recovery, deploy infrastructure, or back a scalable circular platform, SPCTA is built to help make that future operational.
          </motion.p>
          <motion.p variants={fadeUp} style={{ fontSize: 14, maxWidth: 480, margin: "0 auto 12px" }}>
            Tell us whether you are an industrial buyer, enterprise partner, government stakeholder, or investor, and we will direct you to the right conversation.
          </motion.p>
          <motion.div className="btn-row" variants={fadeUp} style={{ justifyContent: "center", marginTop: 8 }}>
            <button onClick={onOpenModal} className="btn btn-primary" style={{ backgroundImage: "linear-gradient(90deg, #6fa332 50%, var(--blue) 50%)", backgroundSize: "200% 100%", backgroundPosition: "100% 0", border: "none", cursor: "pointer", color: "#fff" }} onMouseEnter={e=>(e.currentTarget.style.backgroundPosition="0 0")} onMouseLeave={e=>(e.currentTarget.style.backgroundPosition="100% 0")}>Talk to SPCTA</button>
            <button onClick={onOpenModal} className="btn btn-secondary" style={{ cursor: "pointer", backgroundColor: "rgba(7,9,13,0.88)", color: "var(--text)" }}>Explore Partnership Opportunities</button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────── */
const FAQS = [
  { q: "What does SPCTA do?", a: "SPCTA builds distributed clean-energy infrastructure for circular supply chains. We combine recovery systems, software, workforce training, and advanced processing to help move recyclable materials from source to industrial use more reliably." },
  { q: "Is SPCTA just a recycling company?", a: "No. SPCTA goes beyond recycling. We are building the infrastructure layer that makes circular supply chains more structured, traceable, and scalable." },
  { q: "What industries can SPCTA support?", a: "SPCTA is designed for industrial manufacturers and processors that need reliable recycled feedstock, as well as enterprise waste generators and public-sector partners building circular systems." },
  { q: "What recyclable materials does SPCTA operate in?", a: "We have started with plastics, and will be expanding to include paper, e-waste, aluminium, tyres and used oils. Any material that has industrial demand and value." },
  { q: "What role does clean energy play in the model?", a: "SPCTA deploys solar-powered waste bank systems and supports cleaner operating models that reduce dependence on more carbon-intensive recovery approaches." },
  { q: "What does SPCTA FLOW manage?", a: "SPCTA FLOW supports collection, tracking, pricing, logistics, payments, inventory, quality management, and visibility across the circular supply chain." },
  { q: "Why does SPCTA include workforce training?", a: "Because strong infrastructure depends on strong operators. SPCTA Academy helps build the skilled workforce needed to run recovery and processing systems consistently and safely." },
  { q: "What does SPCTA ARC produce?", a: "SPCTA ARC converts recovered materials into industrial-grade feedstock formats required by manufacturers." },
  { q: "Can SPCTA work with strategic partners?", a: "Yes. SPCTA is built for collaboration with industrial buyers, enterprise partners, governments, development institutions, and investors." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="sec sec-dark" id="faq" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <motion.div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 64px" }} variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
          <motion.p className="eyebrow eyebrow-center" variants={fadeUp}>FAQ</motion.p>
          <motion.h2 variants={fadeUp}>Common Questions</motion.h2>
        </motion.div>

        <motion.div style={{ maxWidth: 820, margin: "0 auto" }} variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
          {FAQS.map((faq, i) => (
            <motion.div key={i} variants={fadeUp} style={{ borderBottom: "1px solid var(--border)", overflow: "hidden" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0", textAlign: "left", gap: 16, fontFamily: "inherit" }}
                aria-expanded={open === i}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>{faq.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ width: 28, height: 28, border: `1px solid ${open === i ? "rgba(80,159,209,0.75)" : "rgba(255,255,255,0.14)"}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: open === i ? "rgba(80,159,209,0.12)" : "rgba(255,255,255,0.02)" }}
                >
                  <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
                    <path d="M1 1.5L7 8L13 1.5" fill="none" stroke={open === i ? "#509FD1" : "#D6DCE6"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ overflow: "hidden" }}
              >
                <p style={{ fontSize: 14, lineHeight: 1.75, paddingBottom: 24 }}>{faq.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER ──────────────────────────────────────────── */
export function SiteFooter() {
  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", padding: "72px 0 0" }}>
      <div className="container">
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 60, marginBottom: 60 }}>
          <div>
            <img
              src="/logos/official/header-transparent.png"
              alt="SPCTA Industrial"
              style={{ width: 188, height: "auto", marginBottom: 18, display: "block", marginLeft: -18, marginRight: "auto" }}
            />
            <p style={{ fontSize: 13, lineHeight: 1.65, maxWidth: 240 }}>Building the infrastructure that powers circular supply chains.</p>
          </div>
          {[
            { title: "Company",   links: [["About","#positioning"],["Contact","#final-cta"],["Partners","#proof"]] },
            { title: "Products",  links: [["SPCTA WEB","#spcta-web"],["SPCTA FLOW","#spcta-flow"],["SPCTA Academy","#spcta-academy"],["SPCTA ARC","#spcta-arc"]] },
            { title: "Resources", links: [["How It Works","#how-it-works"],["FAQ","#faq"],["LinkedIn","#"],["Privacy","#"]] },
          ].map(col => (
            <div key={col.title}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>// {col.title}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(([label, href]) => (
                  <a key={label} href={href} style={{ fontSize: 13, color: "rgba(255,255,255,0.32)", transition: "color 0.2s" }}>{label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="footer-bottom" style={{ borderTop: "1px solid var(--border)", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>© 2026 SPCTA Industrial. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Infrastructure for circular supply chains.</span>
        </div>
      </div>
    </footer>
  );
}
