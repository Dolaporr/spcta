"use client";
import { motion } from "framer-motion";
import { useEnergyCanvas } from "@/hooks/useEnergyCanvas";
import { heroTitle, fadeUp, stagger } from "@/lib/animations";
import styles from "./Hero.module.css";

const LOGOS = [
  { name: "Indorama", path: "/logos/indorama.svg", width: 170, height: 30 },
  { name: "bp", path: "/logos/bp.svg", width: 136, height: 44 },
  { name: "Coca-Cola", path: "/logos/coca-cola.svg", width: 188, height: 36 },
  { name: "IHS", path: "/logos/ihs.svg", width: 96, height: 34 },
  { name: "ACT", path: "/logos/act.svg", width: 188, height: 34 },
  { name: "Future Africa", path: "/logos/future-africa.svg", width: 206, height: 36 },
  { name: "CleanTech Open", path: "/logos/cleantech-open.svg", width: 214, height: 46 },
  { name: "Lagos State Office of Works", path: "/logos/lagos-state-works.svg", width: 72, height: 72 },
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
          <motion.p className="eyebrow eyebrow-green" variants={fadeUp}>
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

          <motion.div className="btn-row" variants={fadeUp}>
            <button onClick={onOpenModal} className={`btn ${styles.btnPrimary}`}>
              Partner With SPCTA
            </button>
            <button onClick={onOpenModal} className="btn btn-secondary">
              Explore the SPCTA System
            </button>
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
                  className={styles.logoImage}
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
