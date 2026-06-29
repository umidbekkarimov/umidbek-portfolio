import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ({ t, th, isDark, SL, Reveal }) {
  return (
    <section id="faq" style={{ position: "relative", zIndex: 1, padding: "110px 0", borderTop: `1px solid ${th.divider}` }}>
      <div className="section-inner" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 28px" }}>
        <Reveal direction="up">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <SL text={t.faq.label} th={th} />
            <h2 className="bg-font sh2" style={{ fontSize: 78, fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.01em", marginBottom: 14, whiteSpace: "pre-line", color: th.text }}>
              {t.faq.heading}
            </h2>
            <p className="inter-font" style={{ fontSize: 16, color: th.textSub, marginBottom: 50, maxWidth: 640 }}>
              {t.faq.sub}
            </p>
          </div>
        </Reveal>

        <div className="faq-list">
          {t.faq.list.map((item, idx) => (
            <Reveal key={idx} delay={50 * idx} direction="up">
              <FAQItem item={item} th={th} isDark={isDark} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQItem = ({ item, th, isDark }) => {
  const [open, setOpen] = useState(false);
  const [h, setH] = useState(false);
  const contentRef = useRef(null);

  const toggle = () => setOpen(!open);

  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="faq-item"
      style={{
        border: `1px solid ${open || h ? th.accent + "40" : th.border}`,
        background: isDark ? (open || h ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.01)") : (open || h ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)"),
        backdropFilter: "blur(12px)",
        boxShadow: open || h ? (isDark ? "0 10px 30px rgba(0,0,0,0.2)" : "0 6px 20px rgba(37,99,235,0.03)") : "none",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      <div className="faq-header" onClick={toggle}>
        <span className="bg-font" style={{ fontSize: 17, fontWeight: 700, color: open ? th.accent : th.text, transition: "color 0.2s" }}>
          {item.q}
        </span>
        <ChevronDown
          style={{
            width: 18,
            height: 18,
            color: open ? th.accent : th.textSub,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        />
      </div>
      <div
        className="faq-answer-wrapper"
        style={{
          maxHeight: open ? contentRef.current?.scrollHeight + 32 : 0,
          opacity: open ? 1 : 0,
          overflow: "hidden"
        }}
      >
        <div ref={contentRef} className="faq-answer inter-font" style={{ fontSize: 14, color: th.textSub }}>
          {item.a}
        </div>
      </div>
    </div>
  );
};
