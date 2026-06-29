import React, { useState } from "react";
import { Sparkles, Monitor, Zap, PiggyBank, MessageSquare } from "lucide-react";

export default function WhyMe({ t, th, isDark, SL, Reveal }) {
  const icons = [
    <Sparkles style={{ width: 22, height: 22 }} />,
    <Monitor style={{ width: 22, height: 22 }} />,
    <Zap style={{ width: 22, height: 22 }} />,
    <PiggyBank style={{ width: 22, height: 22 }} />,
    <MessageSquare style={{ width: 22, height: 22 }} />
  ];

  return (
    <section id="why-me" style={{ position: "relative", zIndex: 1, padding: "110px 0", borderTop: `1px solid ${th.divider}` }}>
      <div className="section-inner" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 28px" }}>
        <Reveal direction="up">
          <SL text={t.whyMe.label} th={th} />
          <h2 className="bg-font sh2" style={{ fontSize: 78, fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.01em", marginBottom: 14, whiteSpace: "pre-line", color: th.text }}>
            {t.whyMe.heading}
          </h2>
          <p className="inter-font" style={{ fontSize: 16, color: th.textSub, marginBottom: 50, maxWidth: 640 }}>
            {t.whyMe.sub}
          </p>
        </Reveal>

        <div className="whyme-grid">
          {t.whyMe.cards.map((card, idx) => (
            <Reveal key={idx} delay={50 * idx} direction="up">
              <WhyMeCard title={card.title} desc={card.desc} icon={icons[idx]} th={th} isDark={isDark} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const WhyMeCard = ({ title, desc, icon, th, isDark }) => {
  const [h, setH] = useState(false);

  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="whyme-card"
      style={{
        border: `1px solid ${h ? th.accent + "50" : th.border}`,
        background: isDark ? (h ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.01)") : (h ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)"),
        backdropFilter: "blur(12px)",
        transform: h ? "translateY(-6px)" : "translateY(0)",
        boxShadow: h ? (isDark ? "0 20px 40px rgba(0,0,0,0.3)" : "0 10px 30px rgba(37,99,235,0.05)") : "none",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: h ? `${th.accent}20` : `${th.accent}0d`,
          color: th.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          transition: "all 0.3s"
        }}
      >
        {icon}
      </div>
      <h3 className="bg-font" style={{ fontSize: 18, fontWeight: 700, color: th.text, margin: 0, marginBottom: 10 }}>
        {title}
      </h3>
      <p className="inter-font" style={{ fontSize: 14, color: th.textSub, lineHeight: 1.6, margin: 0 }}>
        {desc}
      </p>
    </div>
  );
};
