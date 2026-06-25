import React from "react";
import { ArrowRight } from "lucide-react";

export default function Hero({ t, th, isDark, lang, typed, heroReady, cur, scrollTo, handleShowreel, stage, setStage }) {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className={`hero-section stage-${stage}`} style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 40, overflow: "hidden" }}>
        
        {/* Slow-spinning target circle background in Stage 0 */}
        <div className="hero-target-circle" style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: `1.5px dashed ${th.accent}20`,
          pointerEvents: "none",
          zIndex: 0,
          opacity: stage === 0 ? 1 : 0,
          transformOrigin: "center",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
          animation: "gizmoRotate 30s linear infinite"
        }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 380, height: 380, borderRadius: "50%", border: `1px solid ${th.accent}10` }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, background: `linear-gradient(to bottom, transparent, ${th.accent}1c, transparent)` }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: `linear-gradient(to right, transparent, ${th.accent}1c, transparent)` }} />
        </div>

        <div className={`hero-stage-container stage-${stage}`} style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 28px 20px", width: "100%", position: "relative", zIndex: 1, transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          
          {/* Subtitle Role (Stage 0 only) */}
          <div className="hero-role-badge" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 20,
            opacity: (heroReady && stage === 0) ? 1 : 0,
            transform: stage === 0 ? "translateY(0)" : "translateY(-40px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)"
          }}>
            <span className="dm" style={{ fontSize: 13, letterSpacing: "0.25em", color: th.textSub, textTransform: "uppercase", fontWeight: 700 }}>
              {t.hero.role.toUpperCase()}
            </span>
            <span style={{ display: "inline-block", width: 30, height: 1.5, background: th.accent, borderRadius: 2 }} />
          </div>

          {/* Interactive typography and photo layout */}
          <div className="hero-interactive-layout" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            minHeight: 380,
            transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)"
          }}>
            
            {/* Typo Name Wrapper */}
            <div className="hero-names-wrap" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 1,
              transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)"
            }}>
              <span className="rl hn name-umidbek" style={{
                fontSize: "clamp(64px, 11vw, 125px)",
                lineHeight: 0.9,
                fontWeight: 900,
                color: th.text,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)"
              }}>
                UMIDBEK
              </span>
              <span className="rl hn name-karimov" style={{
                fontSize: "clamp(64px, 11vw, 125px)",
                lineHeight: 0.95,
                fontWeight: 900,
                color: "transparent",
                WebkitTextStroke: isDark ? "1.5px #f1f5f9" : `1.5px ${th.text}`,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)"
              }}>
                KARIMOV
              </span>
            </div>

            {/* Centered glassmorphic portrait card */}
            <div className="hero-portrait-card-wrap" style={{
              position: "absolute",
              zIndex: 2,
              transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)"
            }}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", inset: -40, background: `radial-gradient(ellipse, ${th.accent}${isDark ? "1c" : "0c"} 0%, transparent 70%)`, filter: "blur(24px)", pointerEvents: "none", borderRadius: "50%", zIndex: 0 }} />

                <div className={`hero-photo ${isDark ? "pg-dark" : "pg-light"}`} style={{
                  position: "relative",
                  width: 290,
                  height: 360,
                  borderRadius: 24,
                  border: isDark ? "1px solid rgba(59, 130, 246, 0.18)" : "1px solid rgba(99, 102, 241, 0.12)",
                  background: isDark ? "rgba(255, 255, 255, 0.01)" : "rgba(255, 255, 255, 0.45)",
                  backdropFilter: "blur(16px)",
                  padding: 12,
                  boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.5)" : "0 10px 30px rgba(99, 102, 241, 0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  zIndex: 2,
                  transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)"
                }}>
                  <img
                    src="/umidbek_photo.jpg"
                    alt="Umidbek Karimov"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 16,
                      objectPosition: "center 15%"
                    }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Explore button (Stage 0 only) */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 40,
            opacity: stage === 0 ? 1 : 0,
            transform: stage === 0 ? "translateY(0)" : "translateY(30px)",
            pointerEvents: stage === 0 ? "all" : "none",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)"
          }}>
            <button onClick={() => {
              window.scrollTo({ top: 180, behavior: "smooth" });
            }} className="dm" style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 36px",
              borderRadius: 100,
              background: isDark ? "#ffffff" : th.text,
              color: isDark ? "#000000" : th.bgSec,
              fontWeight: 800,
              fontSize: 14,
              border: "none",
              letterSpacing: "0.08em",
              cursor: "pointer",
              boxShadow: `0 8px 30px ${th.accent}33`,
              animation: "bo 2s ease-in-out infinite"
            }}>
              EXPLORE PORTFOLIO
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </div>

        </div>

        {/* Elegant neon split line divider (Visible in Stage 1 & 2) */}
        <div className="hero-split-line" style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1.5,
          background: `linear-gradient(to right, transparent, ${th.accent}, transparent)`,
          zIndex: 10,
          opacity: stage >= 1 ? 1 : 0,
          transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1)"
        }} />

      </section>
    </>
  );
}
