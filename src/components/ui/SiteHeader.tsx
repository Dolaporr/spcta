"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./SiteHeader.module.css";

const NAV_LINKS = [
  { label: "About",        href: "#positioning"     },
  { label: "The System",   href: "#system-overview"  },
  { label: "Products",     href: "#products"         },
  { label: "How It Works", href: "#how-it-works"    },
  { label: "Partners",     href: "#proof"            },
  { label: "Contact",      href: "#final-cta"        },
];

interface SiteHeaderProps { onOpenModal: () => void }

export default function SiteHeader({ onOpenModal }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo}>SPCTA</a>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className={styles.navLink}>{l.label}</a>
          ))}
        </nav>

        <button onClick={onOpenModal} className={styles.cta}>
          Partner With SPCTA
        </button>

        <button
          className={styles.hamburger}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <motion.nav
          className={styles.mobileMenu}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className={styles.mobileLink}
               onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <button className={styles.mobileCta} onClick={() => { setMenuOpen(false); onOpenModal(); }}>
            Partner With SPCTA
          </button>
        </motion.nav>
      )}
    </motion.header>
  );
}
