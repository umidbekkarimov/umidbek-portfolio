import { useState } from "react";
import { Star } from "lucide-react";

export default function Testimonials({ t, th, isDark, SL, Reveal }) {
  return (
    <section id="testimonials" style={{ position: "relative", zIndex: 1, padding: "110px 0", borderTop: `1px solid ${th.divider}` }}>
      <div className="section-inner" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 28px" }}>
        <Reveal direction="up">
          <SL text={t.testimonials.label} th={th} />
          <h2 className="bg-font sh2" style={{ fontSize: 78, fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.01em", marginBottom: 14, whiteSpace: "pre-line", color: th.text }}>
            {t.testimonials.heading}
          </h2>
          <p className="inter-font" style={{ fontSize: 16, color: th.textSub, marginBottom: 50, maxWidth: 640 }}>
            {t.testimonials.sub}
          </p>
        </Reveal>

        <div className="testimonials-grid">
          {t.testimonials.list.map((item, idx) => (
            <Reveal key={idx} delay={80 * idx} direction="up">
              <TestimonialCard item={item} th={th} isDark={isDark} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const TestimonialCard = ({ item, th, isDark }) => {
  const [h, setH] = useState(false);

  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="testimonial-card"
      style={{
        border: `1px solid ${h ? th.accent + "50" : th.border}`,
        background: isDark ? (h ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.01)") : (h ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)"),
        backdropFilter: "blur(12px)",
        transform: h ? "translateY(-4px)" : "translateY(0)",
        boxShadow: h ? (isDark ? "0 15px 30px rgba(0,0,0,0.25)" : "0 8px 24px rgba(37,99,235,0.04)") : "none"
      }}
    >
      {/* Stars rating row */}
      <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} fill="#eab308" stroke="none" style={{ width: 16, height: 16 }} />
        ))}
      </div>

      <p className="inter-font" style={{ fontSize: 15, color: th.textSub, lineHeight: 1.7, fontStyle: "italic", margin: 0, marginBottom: 24 }}>
        "{item.quote}"
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h4 className="bg-font" style={{ fontSize: 16, fontWeight: 700, color: th.text, margin: 0, marginBottom: 2 }}>
            {item.author}
          </h4>
          <span className="inter-font" style={{ fontSize: 12, color: th.textMuted }}>
            {item.role}
          </span>
        </div>
        <div
          style={{
            background: `${th.accent}12`,
            border: `1px solid ${th.accent}30`,
            borderRadius: 8,
            padding: "4px 10px",
            fontSize: 11,
            fontWeight: 700,
            color: th.accent,
            fontFamily: "Inter, sans-serif"
          }}
        >
          {item.rating}
        </div>
      </div>
    </div>
  );
};
