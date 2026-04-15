"use client";
import { motion } from "framer-motion";
import { useEnergyCanvas } from "@/hooks/useEnergyCanvas";
import { heroTitle, fadeUp, stagger } from "@/lib/animations";
import styles from "./Hero.module.css";

const LOGOS = [
  { name: "bp", path: "/logos/official/bp.svg", width: 142, height: 44, tone: "invert" },
  { name: "Coca-Cola", path: "https://www.coca-colacompany.com/content/dam/company/us/en/the-coca-cola-company-logo-white.svg", width: 188, height: 36, tone: "plain" },
  { name: "P&G", path: "/logos/official/pg.png", width: 120, height: 46, tone: "invert" },
  { name: "Indorama", path: "/logos/official/indorama-white.png", width: 202, height: 44, tone: "plain" },
  { name: "IHS", path: "/logos/official/ihs-white.png", width: 144, height: 54, tone: "plain" },
  { name: "ACT", path: "/logos/official/act.svg", width: 184, height: 32, tone: "invert" },
  { name: "Future Africa", path: "/logos/official/future-africa.svg", width: 198, height: 36, tone: "plain" },
  { name: "CleanTech Open", path: "/logos/official/cleantech-open-white.png", width: 184, height: 64, tone: "plain" },
  { name: "Lagos State Office of Works", path: "/logos/official/lagos-state-works-white.png", width: 80, height: 80, tone: "plain" },
  { name: "Alliance to End Plastic Waste", path: "/logos/official/alliance-to-end-plastic-waste-white.png", width: 158, height: 72, tone: "plain" },
  { name: "Alkem", path: "/logos/official/alkem-white.png", width: 144, height: 70, tone: "plain" },
  { name: "Exxon", path: "/logos/official/exxon-white.png", width: 154, height: 58, tone: "plain" },
  { name: "carbonivity", path: "/logos/official/carbonivity-white.png", width: 164, height: 48, tone: "plain" },
];

const MARQUEE_ITEMS = [...LOGOS, ...LOGOS];

interface HeroProps {
  onOpenModal: () => void;
}

export default function Hero({ onOpenModal }: HeroProps) {
  const canvasRef = useEnergyCanvas("hero");

  return (
    <section
      className={`bg-sec ${styles.hero}`}
      style={{ backgroundImage: "url('/img/hero_desktop.png')" }}
      id="hero"
      aria-labelledby="hero-heading"
    >
      <div className="bg-overlay overlay-hero" />
      <canvas ref={canvasRef} className="sec-canvas" />

      <div className={`container ${styles.layout}`}>
        <motion.div
          className={styles.copy}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="eyebrow eyebrow-green" variants={fadeUp} style={{ justifyContent: "center" }}>
            SPCTA Industrial
          </motion.p>

          <motion.h1 id="hero-heading" className={styles.headline} variants={heroTitle}>
            Infrastructure for Circular Supply Chains
          </motion.h1>

          <motion.p className={styles.sub} variants={fadeUp}>
            SPCTA is building a distributed clean-energy infrastructure network that
            powers circular supply chains through solar-powered waste banks, clean
            collection systems, advanced processing hubs, workforce capability, and
            digital workflow tools that make recycling and industrial feedstock supply
            possible at scale.
          </motion.p>

          <motion.div className="btn-row" variants={fadeUp} style={{ justifyContent: "center" }}>
            <button onClick={onOpenModal} className={`btn ${styles.btnPrimary}`}>
              Partner With SPCTA
            </button>
            <a href="#system-overview" className="btn btn-secondary">
              Explore the SPCTA System
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className={styles.marqueeWrap}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <p className={styles.marqueeLabel}>Partners and ecosystem collaborators</p>
        <div className={styles.marqueeTrack}>
          <div className={styles.marqueeInner}>
            {MARQUEE_ITEMS.map((logo, i) => (
              <div key={`${logo.name}-${i}`} className={styles.logoItem}>
                <img
                  src={logo.path}
                  alt={logo.name}
                  className={`${styles.logoImage} ${logo.tone === "invert" ? styles.logoImageInvert : ""}`}
                  style={{ width: logo.width, height: logo.height }}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
