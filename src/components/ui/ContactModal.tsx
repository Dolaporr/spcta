"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STAKEHOLDER_TYPES = [
  "Industrial Manufacturer",
  "Enterprise Waste Generator",
  "Government",
  "Development Institution",
  "Investor",
  "Strategic Corporate",
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    stakeholderType: "",
    fullName: "",
    jobTitle: "",
    companyName: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    request: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            style={{ position: "absolute", inset: 0, background: "rgba(7,9,13,0.88)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            style={{ position: "relative", zIndex: 1, background: "var(--surface-lo)", border: "1px solid var(--border)", borderTop: "2px solid var(--blue)", width: "100%", maxWidth: 640, maxHeight: "90vh", overflowY: "auto", borderRadius: 8, padding: "48px 48px" }}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Close */}
            <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "1px solid var(--border)", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", color: "var(--muted)", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>

            {formState === "success" ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(143,192,69,0.15)", border: "1px solid var(--green)", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>✓</div>
                <h3 style={{ color: "var(--text)", marginBottom: 16 }}>Thank You</h3>
                <p style={{ marginBottom: 8 }}>Thank you for your interest in SPCTA Industrial.</p>
                <p>A member of our team will reach out to you shortly.</p>
                <button onClick={onClose} className="btn btn-primary" style={{ marginTop: 32 }}>Close</button>
              </motion.div>
            ) : (
              <>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 12 }}>// Partner With SPCTA</p>
                <h3 style={{ color: "var(--text)", marginBottom: 8 }}>Let&apos;s Explore What SPCTA Can Build With You</h3>
                <p style={{ fontSize: 14, marginBottom: 36 }}>Tell us who you are and we will direct you to the right conversation.</p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {/* Stakeholder type */}
                  <div>
                    <label style={labelStyle}>Stakeholder Type *</label>
                    <select name="stakeholderType" value={form.stakeholderType} onChange={handleChange} required style={inputStyle}>
                      <option value="">Select stakeholder type</option>
                      {STAKEHOLDER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input name="fullName" value={form.fullName} onChange={handleChange} required style={inputStyle} placeholder="Your full name" />
                    </div>
                    <div>
                      <label style={labelStyle}>Job Title *</label>
                      <input name="jobTitle" value={form.jobTitle} onChange={handleChange} required style={inputStyle} placeholder="Your job title" />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Company Name *</label>
                    <input name="companyName" value={form.companyName} onChange={handleChange} required style={inputStyle} placeholder="Your company or organisation" />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={labelStyle}>City *</label>
                      <input name="city" value={form.city} onChange={handleChange} required style={inputStyle} placeholder="City" />
                    </div>
                    <div>
                      <label style={labelStyle}>Country *</label>
                      <input name="country" value={form.country} onChange={handleChange} required style={inputStyle} placeholder="Country" />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required style={inputStyle} placeholder="you@company.com" />
                  </div>

                  <div>
                    <label style={labelStyle}>Phone (with country & area code)</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} style={inputStyle} placeholder="+234 801 234 5678" />
                  </div>

                  <div>
                    <label style={labelStyle}>How can SPCTA help you? *</label>
                    <textarea name="request" value={form.request} onChange={handleChange} required rows={4} style={{ ...inputStyle, resize: "vertical" }} placeholder="Tell us about your interest — feedstock sourcing, recovery infrastructure, partnership, investment, etc." />
                  </div>

                  {formState === "error" && (
                    <p style={{ fontSize: 13, color: "#ff6b6b", background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)", padding: "12px 16px", borderRadius: 4 }}>
                      Something went wrong. Please try again or email us directly at charles@spcta.green
                    </p>
                  )}

                  <button type="submit" className="btn btn-primary" disabled={formState === "submitting"} style={{ marginTop: 8, opacity: formState === "submitting" ? 0.7 : 1 }}>
                    {formState === "submitting" ? "Sending..." : "Start the Conversation"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--surface-mid)",
  border: "1px solid var(--border)",
  borderRadius: 6,
  padding: "12px 16px",
  fontSize: 14,
  color: "var(--text)",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s",
};
