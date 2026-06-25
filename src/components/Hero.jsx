import React from "react";
import { ChevronDown, Play, Box, Clock, Sparkles, ArrowRight, Compass, Video, Activity } from "lucide-react";
export default function Hero({ t, th, isDark, lang, typed, heroReady, cur, scrollTo, handleShowreel }) {
  // Helper for stats translations
  const getStatLabels = () => {
    if (lang === "en") {
      return { projects: "Selected Projects", experience: "Practice Hours", passion: "Quality Focus" };
    } else if (lang === "ru") {
      return { projects: "Избранные Проекты", experience: "Часов Практики", passion: "Фокус на Качество" };
    } else {
      return { projects: "Tanlangan Loyihalar", experience: "Amaliyot Soatlari", passion: "Sifatga Yo'naltirilgan" };
    }
  };

  // Helper for floating cards translations
  const getCardLabels = () => {
    if (lang === "en") {
      return {
        anim: { title: "3D Animation", sub: "Bringing ideas to life" },
        motion: { title: "Motion Design", sub: "Visuals that communicate" },
        video: { title: "Video Editing", sub: "Cut. Sync. Inspire." }
      };
    } else if (lang === "ru") {
      return {
        anim: { title: "3D-Анимация", sub: "Воплощая идеи в жизнь" },
        motion: { title: "Моушн-Дизайн", sub: "Визуальный диалог" },
        video: { title: "Видеомонтаж", sub: "Монтаж. Синхрон. Муза." }
      };
    } else {
      return {
        anim: { title: "3D Animatsiya", sub: "G'oyalarni jonlantirish" },
        motion: { title: "Motion Dizayn", sub: "Muloqot vizualizatsiyasi" },
        video: { title: "Video Montaj", sub: "Montaj. Sinxronlik. Ilhom." }
      };
    }
  };

  // Helper for curved ribbon translation
  const getRibbonText = () => {
    if (lang === "en") return "Creativity in Motion";
    if (lang === "ru") return "Творчество в Движении";
    return "Harakatdagi Ijodkorlik";
  };

  // Helper to render bio with highlighted sections
  const renderBio = () => {
    if (lang === "en") {
      return (
        <>
          I create performance-driven 3D animations and motion design that{" "}
          <span style={{ color: "#3b82f6", fontWeight: 600 }}>move with purpose</span> and{" "}
          <span style={{ color: "#8b5cf6", fontWeight: 600 }}>tell a story</span>.
        </>
      );
    } else if (lang === "ru") {
      return (
        <>
          Я создаю выразительную 3D-анимацию и моушн-дизайн, которые{" "}
          <span style={{ color: "#3b82f6", fontWeight: 600 }}>двигаются со смыслом</span> и{" "}
          <span style={{ color: "#8b5cf6", fontWeight: 600 }}>рассказывают историю</span>.
        </>
      );
    } else {
      return (
        <>
          Men har bir harakati{" "}
          <span style={{ color: "#3b82f6", fontWeight: 600 }}>aniq maqsadga yo'naltirilgan</span> va{" "}
          <span style={{ color: "#8b5cf6", fontWeight: 600 }}>hikoya so'zlaydigan</span> 3D animatsiyalar va motion dizaynlar yarataman.
        </>
      );
    }
  };

  const stats = getStatLabels();
  const cards = getCardLabels();

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80, paddingBottom: 40 }}>

        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "40px 28px 20px", width: "100%", position: "relative", zIndex: 1 }}>
          
          {/* Top Row: Name on Left, Portrait Card on Right */}
          <div className="tc" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 60, alignItems: "center" }}>

            {/* LEFT COLUMN: TYPOGRAPHY */}
            <div style={{ position: "relative", zIndex: 2 }}>
              {/* Subtitle Role */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.05s"
              }}>
                <span className="dm" style={{ fontSize: 13, letterSpacing: "0.25em", color: th.textSub, textTransform: "uppercase", fontWeight: 700 }}>
                  {t.hero.role.toUpperCase()}
                </span>
                <span style={{ display: "inline-block", width: 30, height: 1.5, background: th.accent, borderRadius: 2 }} />
              </div>

              {/* Huge Bold Title */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateY(0)" : "translateY(44px) scale(0.97)",
                transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s"
              }}>
                <span className="rl hn" style={{
                  fontSize: "clamp(54px, 8vw, 92px)",
                  lineHeight: 0.9,
                  fontWeight: 900,
                  color: th.text,
                  letterSpacing: "-0.01em",
                  textTransform: "uppercase"
                }}>
                  UMIDBEK
                </span>
                <span className="rl hn" style={{
                  fontSize: "clamp(54px, 8vw, 92px)",
                  lineHeight: 0.95,
                  fontWeight: 900,
                  color: "transparent",
                  WebkitTextStroke: isDark ? "1.5px #f1f5f9" : `1.5px ${th.text}`,
                  letterSpacing: "-0.01em",
                  textTransform: "uppercase"
                }}>
                  KARIMOV
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: PORTRAIT CARD WITH FLOATING LOGOS */}
            <div className="hero-right-col" style={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 1 }}>
              <div style={{
                position: "relative",
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateX(0) scale(1)" : "translateX(60px) scale(0.93)",
                transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.35s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {/* Radial ambient background glow */}
                <div style={{ position: "absolute", inset: -40, background: `radial-gradient(ellipse, ${th.accent}${isDark ? "24" : "12"} 0%, transparent 70%)`, filter: "blur(24px)", pointerEvents: "none", borderRadius: "50%", zIndex: 0 }} />

                {/* Glassmorphic Portrait Card */}
                <div className={`hero-photo ${isDark ? "pg-dark" : "pg-light"}`} style={{
                  position: "relative",
                  width: 310,
                  height: 380,
                  borderRadius: 24,
                  border: isDark ? "1px solid rgba(59, 130, 246, 0.18)" : "1px solid rgba(99, 102, 241, 0.12)",
                  background: isDark ? "rgba(255, 255, 255, 0.015)" : "rgba(255, 255, 255, 0.45)",
                  backdropFilter: "blur(16px)",
                  padding: 12,
                  boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(59, 130, 246, 0.05)" : "0 10px 30px rgba(99, 102, 241, 0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  zIndex: 2
                }}>
                  {/* Photo image */}
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

          {/* Bottom Row Layout (Divider + 3 Columns: Bio, Buttons, Stats) */}
          <div className="hero-bottom-grid" style={{
            borderTop: `1.5px solid ${th.divider}`,
            opacity: heroReady ? 1 : 0,
            transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0.5s"
          }}>
            
            {/* Column 1: Tagline */}
            <div style={{
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.6s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.6s"
            }}>
              <p className="dm" style={{
                fontSize: 16,
                color: th.textSub,
                lineHeight: 1.8,
                margin: 0,
                maxWidth: 420
              }}>
                {renderBio()}
              </p>
            </div>

            {/* Column 2: Stacked Buttons */}
            <div className="hero-bottom-btns" style={{
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.7s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.7s"
            }}>
              {/* Showreel Button (Solid white in dark mode, solid dark in light mode) */}
              <button onClick={handleShowreel} className="dm" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: "14px 28px",
                borderRadius: 12,
                background: isDark ? "#ffffff" : th.text,
                color: isDark ? "#000000" : th.bgSec,
                fontWeight: 800,
                fontSize: 14,
                border: "none",
                letterSpacing: "0.06em",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                transition: "all 0.3s"
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 10px 25px ${th.accent}33`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
                }}
              >
                <Play style={{ width: 12, height: 12, fill: isDark ? "#000000" : th.bgSec, color: isDark ? "#000000" : th.bgSec, transform: "translateX(1px)" }} />
                {t.hero.cta1.toUpperCase()}
              </button>

              {/* Contact Button (Outlined) */}
              <button onClick={() => scrollTo("contact")} className="dm" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "14px 28px",
                borderRadius: 12,
                border: `1.5px solid ${th.border}`,
                color: th.text,
                fontSize: 14,
                fontWeight: 700,
                transition: "all 0.3s",
                background: "transparent",
                cursor: "pointer"
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = th.accent;
                  e.currentTarget.style.background = `${th.accent}0d`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = th.border;
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "none";
                }}
              >
                {t.hero.cta2}
                <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            </div>

            {/* Column 3: Stats Stack */}
            <div className="hero-stats-stack" style={{
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.8s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.8s"
            }}>
              {/* Stat 1 */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="rl" style={{ fontSize: 32, fontWeight: 900, color: th.text, lineHeight: 1 }}>15+</span>
                <span className="dm" style={{ fontSize: 11, fontWeight: 700, color: th.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.25 }}>
                  Selected<br/>Projects
                </span>
              </div>

              {/* Stat 2 */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="rl" style={{ fontSize: 32, fontWeight: 900, color: th.text, lineHeight: 1 }}>1K+</span>
                <span className="dm" style={{ fontSize: 11, fontWeight: 700, color: th.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.25 }}>
                  Practice<br/>Hours
                </span>
              </div>

              {/* Stat 3 */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="rl" style={{ fontSize: 32, fontWeight: 900, color: th.text, lineHeight: 1 }}>100%</span>
                <span className="dm" style={{ fontSize: 11, fontWeight: 700, color: th.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.25 }}>
                  Quality<br/>Focus
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
