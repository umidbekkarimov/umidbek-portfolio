import React from "react";
import { ChevronDown, Play, Box, Clock, Sparkles, ArrowRight, Compass, Video, Activity } from "lucide-react";
import { SW_DATA } from "./About";
export default function Hero({ t, th, isDark, lang, typed, heroReady, cur, scrollTo, handleShowreel }) {
  // Helper for stats translations
  const getStatLabels = () => {
    if (lang === "en") {
      return { projects: "All Projects", experience: "Practice Hours", passion: "Quality Focus" };
    } else if (lang === "ru") {
      return { projects: "Все Проекты", experience: "Часов Практики", passion: "Фокус на Качество" };
    } else {
      return { projects: "Barcha Loyihalar", experience: "Amaliyot Soatlari", passion: "Sifatga Yo'naltirilgan" };
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
          <span style={{ color: "#3b82f6", fontWeight: 600 }}>bring ideas to life</span> and deliver{" "}
          <span style={{ color: "#8b5cf6", fontWeight: 600 }}>real impact</span>.
        </>
      );
    } else if (lang === "ru") {
      return (
        <>
          Я создаю высококлассную 3D-анимацию и моушн-дизайн, которые{" "}
          <span style={{ color: "#3b82f6", fontWeight: 600 }}>оживляют идеи</span> и приносят{" "}
          <span style={{ color: "#8b5cf6", fontWeight: 600 }}>реальный результат</span>.
        </>
      );
    } else {
      return (
        <>
          Men <span style={{ color: "#3b82f6", fontWeight: 600 }}>g'oyalarni jonlantiradigan</span> va{" "}
          <span style={{ color: "#8b5cf6", fontWeight: 600 }}>haqiqiy natija</span> beradigan 3D animatsiyalar va motion dizaynlar yarataman.
        </>
      );
    }
  };

  const stats = getStatLabels();
  const cards = getCardLabels();

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className={isDark ? "gd-dark" : "gd-light"} style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80, paddingBottom: 40 }}>

        {/* ── 3D Animated Elements (BEHIND photo) ── */}
        
        {/* Motion Trail Lines - Background */}
        <div className="motion-trails" style={{ position: "absolute", top: "20%", left: "10%", width: "80%", height: "60%", pointerEvents: "none", zIndex: 0, opacity: 0.10 }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400" fill="none" style={{ position: "absolute" }}>
            <path d="M0 200 Q200 100 400 200 T800 200" stroke={th.accent} strokeWidth="1.5" strokeDasharray="8 12" className="motion-trail-1" style={{ opacity: 0.6 }} />
            <path d="M0 180 Q250 280 500 180 T800 180" stroke={th.accent} strokeWidth="1" strokeDasharray="6 10" className="motion-trail-2" style={{ opacity: 0.4 }} />
            <path d="M0 220 Q300 120 600 220 T800 220" stroke={th.accent} strokeWidth="1" strokeDasharray="4 8" className="motion-trail-3" style={{ opacity: 0.3 }} />
          </svg>
        </div>

        {/* Maya Move/Rotate Gizmo */}
        <div className="maya-gizmo" style={{ position: "absolute", top: "25%", right: "8%", width: 160, height: 160, pointerEvents: "none", zIndex: 0, opacity: 0.14 }}>
          <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", animation: "gizmoRotate 20s linear infinite" }}>
            <line x1="50" y1="50" x2="90" y2="50" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="90,50 82,46 82,54" fill="#ef4444" />
            <line x1="50" y1="50" x2="50" y2="10" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="50,10 46,18 54,18" fill="#22c55e" />
            <line x1="50" y1="50" x2="25" y2="75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="25,75 33,72 30,64" fill="#3b82f6" />
            <circle cx="50" cy="50" r="6" fill="none" stroke="#fbbf24" strokeWidth="2" />
            <ellipse cx="50" cy="50" rx="30" ry="12" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.5" />
            <ellipse cx="50" cy="50" rx="12" ry="30" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>

        {/* Rig Control Circle */}
        <div className="rig-control" style={{ position: "absolute", top: "35%", left: "5%", width: 120, height: 120, pointerEvents: "none", zIndex: 0, opacity: 0.12 }}>
          <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", animation: "rigFloat 6s ease-in-out infinite" }}>
            <circle cx="50" cy="50" r="35" fill="none" stroke={th.accent} strokeWidth="2" />
            <circle cx="50" cy="50" r="25" fill="none" stroke={th.accent} strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="50" cy="15" r="4" fill={th.accent} />
            <circle cx="50" cy="85" r="4" fill={th.accent} />
            <circle cx="15" cy="50" r="4" fill={th.accent} />
            <circle cx="85" cy="50" r="4" fill={th.accent} />
            <line x1="50" y1="30" x2="50" y2="70" stroke={th.accent} strokeWidth="1" />
            <line x1="30" y1="50" x2="70" y2="50" stroke={th.accent} strokeWidth="1" />
            <path d="M65 35 A21 21 0 0 1 65 65" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
            <polygon points="65,65 60,60 68,58" fill="#fbbf24" />
          </svg>
        </div>

        {/* Secondary Rig Control */}
        <div className="rig-control-2" style={{ position: "absolute", bottom: "20%", left: "12%", width: 80, height: 80, pointerEvents: "none", zIndex: 0, opacity: 0.10 }}>
          <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", animation: "rigFloat 8s ease-in-out infinite reverse" }}>
            <circle cx="50" cy="50" r="40" fill="none" stroke={th.accent} strokeWidth="2" />
            <circle cx="50" cy="50" r="20" fill="none" stroke={th.accent} strokeWidth="1" />
            <circle cx="50" cy="10" r="3" fill={th.accent} />
            <circle cx="50" cy="90" r="3" fill={th.accent} />
            <circle cx="10" cy="50" r="3" fill={th.accent} />
            <circle cx="90" cy="50" r="3" fill={th.accent} />
          </svg>
        </div>

        {/* Ambient decorative elements */}
        <div className="hero-ring" style={{ position: "absolute", top: "6%", right: "-4%", width: 320, height: 320, borderRadius: "50%", border: `1px dashed ${isDark ? "rgba(59,130,246,0.22)" : "rgba(37,99,235,0.18)"}`, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 220, height: 220, borderRadius: "50%", border: `1px solid ${isDark ? "rgba(59,130,246,0.1)" : "rgba(37,99,235,0.08)"}` }} />
          <div style={{ position: "absolute", top: "18%", left: "18%", width: 8, height: 8, borderRadius: "50%", background: th.accent, opacity: 0.6, boxShadow: `0 0 8px ${th.accent}` }} />
        </div>

        <div className="hero-dot-grid" style={{ position: "absolute", bottom: "14%", left: "2%", pointerEvents: "none", zIndex: 0 }}>
          {[0, 1, 2, 3].map(row => (
            <div key={row} style={{ display: "flex", gap: 14, marginBottom: 14 }}>
              {[0, 1, 2, 3].map(col => (
                <div key={col} style={{ width: 3, height: 3, borderRadius: "50%", background: th.accent, opacity: 0.2 + (row + col) * 0.04 }} />
              ))}
            </div>
          ))}
        </div>

        <div className="hero-line" style={{ position: "absolute", top: "42%", left: 0, pointerEvents: "none", zIndex: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {[80, 50, 30].map((w, i) => (
            <div key={i} style={{ width: w, height: 1, background: `linear-gradient(to right, ${th.accent}${["80", "50", "30"][i]}, transparent)`, borderRadius: 2 }} />
          ))}
        </div>

        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "40px 28px 20px", width: "100%", position: "relative", zIndex: 1 }}>
          <div className="tc" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 60, alignItems: "center" }}>

            {/* LEFT COLUMN: TEXT */}
            <div className="hero-text" style={{ position: "relative", zIndex: 2 }}>
              {/* Greeting with horizontal line */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateY(0)" : "translateY(44px) scale(0.96)",
                transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.05s"
              }}>
                <span className="dm" style={{ fontSize: 13, letterSpacing: "0.22em", color: th.textSub, textTransform: "uppercase", fontWeight: 500 }}>
                  {t.hero.greeting}
                </span>
                <span style={{ display: "inline-block", width: 30, height: 1.5, background: th.accent, borderRadius: 2 }} />
              </div>

              {/* Heading */}
              <h1 className="rl hn" style={{
                fontSize: 84,
                lineHeight: 0.88,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                marginBottom: 20,
                color: th.text,
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateY(0)" : "translateY(44px) scale(0.96)",
                transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s"
              }}>
                {t.hero.name.split(" ")[0]}
                <br />
                <span style={{
                  background: "linear-gradient(135deg, #3b82f6 20%, #8b5cf6 95%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "none"
                }}>
                  {t.hero.name.split(" ").slice(1).join(" ")}
                </span>
              </h1>

              {/* Role pill badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 100,
                border: isDark ? "1px solid rgba(59, 130, 246, 0.18)" : "1px solid rgba(37, 99, 235, 0.12)",
                background: isDark ? "rgba(59, 130, 246, 0.05)" : "rgba(37, 99, 235, 0.04)",
                marginBottom: 24,
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateY(0)" : "translateY(44px) scale(0.96)",
                transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.3s"
              }}>
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#3b82f6",
                  boxShadow: "0 0 10px #3b82f6",
                  display: "inline-block"
                }} />
                <span className="dm" style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: isDark ? "#60a5fa" : th.accent,
                  letterSpacing: "0.02em"
                }}>
                  {t.hero.role}
                </span>
              </div>

              {/* Biography paragraph */}
              <p className="dm" style={{
                fontSize: 16,
                color: th.textSub,
                lineHeight: 1.8,
                maxWidth: 480,
                marginBottom: 36,
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateY(0)" : "translateY(44px) scale(0.96)",
                transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.45s"
              }}>
                {renderBio()}
              </p>

              {/* Action Buttons */}
              <div className="hero-btns" style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                marginBottom: 52,
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateY(0)" : "translateY(44px) scale(0.96)",
                transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.6s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.6s"
              }}>
                {/* View Showreel button with inline icon circle */}
                <button onClick={handleShowreel} className="dm" style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 24px 10px 12px",
                  borderRadius: 100,
                  background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 15,
                  border: "none",
                  boxShadow: "0 6px 24px rgba(59, 130, 246, 0.35)",
                  cursor: "pointer",
                  transition: "all 0.3s"
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 10px 32px rgba(59, 130, 246, 0.5)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(59, 130, 246, 0.35)";
                  }}
                >
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Play style={{ width: 11, height: 11, fill: "#3b82f6", color: "#3b82f6", transform: "translateX(1px)" }} />
                  </div>
                  {t.hero.cta1}
                </button>

                {/* Contact Me outline button */}
                <button onClick={() => scrollTo("contact")} className="dm" style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 28px",
                  borderRadius: 100,
                  border: `1.5px solid ${th.border}`,
                  color: th.text,
                  fontSize: 15,
                  fontWeight: 600,
                  transition: "all 0.3s",
                  background: "transparent",
                  cursor: "pointer"
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = th.accent;
                    e.currentTarget.style.background = `${th.accent}0a`;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = th.border;
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  {t.hero.cta2}
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </button>
              </div>

              {/* Stats Row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 20,
                borderTop: `1px solid ${th.divider}`,
                paddingTop: 24,
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateY(0)" : "translateY(44px) scale(0.96)",
                transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.75s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.75s"
              }}>
                {/* Stat 1 */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ marginTop: 4, color: "#3b82f6" }}>
                    <Box style={{ width: 22, height: 22 }} />
                  </div>
                  <div>
                    <div className="rl" style={{ fontSize: 24, fontWeight: 800, color: th.text, lineHeight: 1.2 }}>10+</div>
                    <div className="dm" style={{ fontSize: 13, color: th.textMuted, fontWeight: 500 }}>{stats.projects}</div>
                  </div>
                </div>

                {/* Stat 2 */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ marginTop: 4, color: "#3b82f6" }}>
                    <Clock style={{ width: 22, height: 22 }} />
                  </div>
                  <div>
                    <div className="rl" style={{ fontSize: 24, fontWeight: 800, color: th.text, lineHeight: 1.2 }}>1000+</div>
                    <div className="dm" style={{ fontSize: 13, color: th.textMuted, fontWeight: 500 }}>{stats.experience}</div>
                  </div>
                </div>

                {/* Stat 3 */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ marginTop: 4, color: "#3b82f6" }}>
                    <Sparkles style={{ width: 22, height: 22 }} />
                  </div>
                  <div>
                    <div className="rl" style={{ fontSize: 24, fontWeight: 800, color: th.text, lineHeight: 1.2 }}>100%</div>
                    <div className="dm" style={{ fontSize: 13, color: th.textMuted, fontWeight: 500 }}>{stats.passion}</div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: PORTRAIT AND FLOATING ELEMENTS */}
            <div className="hero-right-col" style={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 1 }}>
              <div style={{
                position: "relative",
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateX(0) scale(1)" : "translateX(60px) scale(0.93)",
                transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.35s",
                width: 380,
                height: 380,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {/* Radial ambient background glow */}
                <div style={{ position: "absolute", inset: -40, background: `radial-gradient(ellipse, ${th.accent}${isDark ? "28" : "14"} 0%, transparent 70%)`, filter: "blur(24px)", pointerEvents: "none", borderRadius: "50%", zIndex: 0 }} />

                {/* Circular Portal Behind the Portrait */}
                <div style={{
                  position: "absolute",
                  width: 380,
                  height: 380,
                  borderRadius: "50%",
                  border: isDark ? "2px solid rgba(59, 130, 246, 0.45)" : "2px solid rgba(59, 130, 246, 0.25)",
                  boxShadow: "0 0 35px rgba(59, 130, 246, 0.25), inset 0 0 35px rgba(59, 130, 246, 0.25)",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                  pointerEvents: "none"
                }} />

                {/* Rotating Dashed Outer Portal Ring */}
                <div style={{
                  position: "absolute",
                  width: 430,
                  height: 430,
                  borderRadius: "50%",
                  border: isDark ? "1.5px dashed rgba(139, 92, 246, 0.25)" : "1.5px dashed rgba(139, 92, 246, 0.15)",
                  top: -25,
                  left: -25,
                  zIndex: 0,
                  pointerEvents: "none",
                  animation: "gizmoRotate 32s linear infinite"
                }} />

                {/* Main Portrait Mask Container */}
                <div className={`hero-photo ${isDark ? "pg-dark" : "pg-light"}`} style={{
                  position: "relative",
                  width: 310,
                  height: 310,
                  borderRadius: "50%",
                  overflow: "hidden",
                  zIndex: 1,
                  boxShadow: "0 10px 40px rgba(0,0,0,0.4)"
                }}>
                  {/* Grid background behind user photo inside circle */}
                  <div style={{ position: "absolute", inset: 0, background: th.photoBg }} />
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${th.photoGrid} 1.5px,transparent 1.5px),linear-gradient(90deg,${th.photoGrid} 1.5px,transparent 1.5px)`, backgroundSize: "36px 36px" }} />
                  
                  {/* Photo image */}
                  <img
                    src="/umidbek_photo.jpg"
                    alt="Umidbek Karimov"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center 15%",
                      position: "relative",
                      zIndex: 2
                    }}
                  />
                  
                  {/* Bottom shadow fade to blend image edges */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "25%",
                    background: `linear-gradient(to top, ${th.bgSec} 0%, transparent 100%)`,
                    zIndex: 3,
                    opacity: 0.8
                  }} />
                </div>

                {/* Curved Ribbon in front of photo */}
                <div style={{
                  position: "absolute",
                  bottom: 12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: isDark ? "linear-gradient(135deg, rgba(59, 130, 246, 0.85) 0%, rgba(139, 92, 246, 0.85) 100%)" : "linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(139, 92, 246, 0.95) 100%)",
                  border: "1.5px solid rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  padding: "8px 28px",
                  borderRadius: 100,
                  zIndex: 5,
                  boxShadow: "0 8px 30px rgba(59, 130, 246, 0.4), inset 0 0 12px rgba(255, 255, 255, 0.2)",
                  whiteSpace: "nowrap"
                }}>
                  <span className="rl" style={{
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    color: "#fff",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    textShadow: "0 0 10px rgba(255,255,255,0.6)"
                  }}>
                    {getRibbonText()}
                  </span>
                </div>

                {/* FLOATING CARD 1: 3D Animation (Floating Left) */}
                <div className="float-card-1 glass-panel" style={{
                  position: "absolute",
                  top: "35%",
                  left: "-130px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 18px",
                  borderRadius: 16,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                  zIndex: 4
                }}>
                  <div style={{ color: "#3b82f6", display: "flex", alignItems: "center" }}>
                    <Box style={{ width: 22, height: 22 }} />
                  </div>
                  <div>
                    <div className="rl" style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{cards.anim.title}</div>
                    <div className="dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 500, whiteSpace: "nowrap" }}>{cards.anim.sub}</div>
                  </div>
                </div>

                {/* FLOATING CARD 2: Motion Design (Floating Top Right) */}
                <div className="float-card-2 glass-panel" style={{
                  position: "absolute",
                  top: "10%",
                  right: "-110px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 18px",
                  borderRadius: 16,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                  zIndex: 4
                }}>
                  <div style={{ color: "#3b82f6", display: "flex", alignItems: "center" }}>
                    <Activity style={{ width: 20, height: 20 }} />
                  </div>
                  <div>
                    <div className="rl" style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{cards.motion.title}</div>
                    <div className="dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 500, whiteSpace: "nowrap" }}>{cards.motion.sub}</div>
                  </div>
                </div>


                {/* FLOATING MAYA LOGO */}
                <div className="float-maya" style={{
                  position: "absolute",
                  top: "35px",
                  left: "25px",
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "rgba(12, 14, 24, 0.6)",
                  border: "1.5px solid #00ffd8",
                  boxShadow: "0 0 15px rgba(0, 255, 216, 0.45)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 3,
                  overflow: "hidden"
                }}>
                  <div style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {SW_DATA["Autodesk Maya"]?.logo}
                  </div>
                </div>

                {/* FLOATING BLENDER LOGO */}
                <div className="float-blender" style={{
                  position: "absolute",
                  bottom: "35px",
                  left: "25px",
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "rgba(12, 14, 24, 0.6)",
                  border: "1.5px solid #ff7a00",
                  boxShadow: "0 0 15px rgba(255, 122, 0, 0.45)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 3,
                  overflow: "hidden"
                }}>
                  <div style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {SW_DATA.Blender?.logo}
                  </div>
                </div>

                {/* FLOATING AE LOGO */}
                <div className="float-ae" style={{
                  position: "absolute",
                  bottom: "35px",
                  right: "25px",
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "rgba(12, 14, 24, 0.6)",
                  border: "1.5px solid #00f0ff",
                  boxShadow: "0 0 15px rgba(0, 240, 255, 0.45)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 3,
                  overflow: "hidden"
                }}>
                  <div style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {SW_DATA["After Effects"]?.logo}
                  </div>
                </div>

                {/* FLOATING BLUE SPHERE */}
                <div className="float-sphere" style={{
                  position: "absolute",
                  top: "22%",
                  left: "-25px",
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 30% 30%, #60a5fa 0%, #1e3a8a 85%)",
                  boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
                  zIndex: 2
                }} />

                {/* FLOATING BLUE TETRAHEDRON/PYRAMID */}
                <div className="float-pyramid" style={{
                  position: "absolute",
                  bottom: "65px",
                  left: "-15px",
                  width: 32,
                  height: 32,
                  zIndex: 2,
                  filter: "drop-shadow(0 4px 10px rgba(59, 130, 246, 0.45))"
                }}>
                  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                    <polygon points="50,15 15,75 85,75" fill="rgba(59, 130, 246, 0.75)" stroke="#60a5fa" strokeWidth="3" />
                    <line x1="50" y1="15" x2="50" y2="75" stroke="#93c5fd" strokeWidth="2.5" />
                  </svg>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
