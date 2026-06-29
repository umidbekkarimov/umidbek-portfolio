import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Layers, Cpu, Film, Sliders, Settings, Tv } from "lucide-react";

export default function Work({ t, th, isDark, activeVideo, setActiveVideo, workRef, showreelRef, SL, Reveal, lang }) {
  // Localized workflow stages description
  const workflowData = {
    en: {
      blocking: {
        title: "Blocking Phase",
        desc: "Establishing key poses, story beats, and character timing. Focus is entirely on composition, acting, and weight distribution without secondary actions."
      },
      splining: {
        title: "Splining & Mechanics",
        desc: "Interpolating curves, refining spacing, and smoothing body mechanics. Converting stepped keys to splines, adding arcs, and polishing weight transitions."
      },
      polish: {
        title: "Polish & Presentation",
        desc: "Adding micro-expressions, secondary motions (hair, clothes), and fine-tuning details. Staging lighting, camera movements, and exporting final renders."
      }
    },
    ru: {
      blocking: {
        title: "Этап блокинга",
        desc: "Создание ключевых поз, сюжетных моментов и тайминга персонажа. Основное внимание уделяется композиции, актерской игре и весу без вторичных движений."
      },
      splining: {
        title: "Сплайнинг и механика",
        desc: "Интерполяция кривых, уточнение спейсинга и сглаживание механики тела. Перевод ступенчатых ключей в сплайны, добавление дуг и полировка переходов веса."
      },
      polish: {
        title: "Полировка и рендер",
        desc: "Добавление микромимики, вторичной анимации (волосы, одежда) и тонкая настройка деталей. Настройка освещения, движения камеры и экспорт финального рендера."
      }
    },
    uz: {
      blocking: {
        title: "Bloking bosqichi",
        desc: "Kalit pozalar, hikoya nuqtalari va personaj taymingini o'rnatish. E'tibor faqat kompozitsiya, aktyorlik mahorati va og'irlik taqsimotiga qaratiladi."
      },
      splining: {
        title: "Splines va mexanika",
        desc: "Egriliklarni interpolatsiya qilish, spacingni aniqlashtirish va tana mexanikasini tekislash. Kalitlarni splinelarga o'tkazish, yoylarni qo'shish."
      },
      polish: {
        title: "Sayqallash va taqdimot",
        desc: "Mikro-mimikalar, ikkinchi darajali harakatlar (soch, kiyim) va detallarni sayqallash. Yorug'lik, kamera harakatlarini sozlash va render qilish."
      }
    }
  };

  // Helper variables for translations
  const currentWorkflow = workflowData[lang] || workflowData.en;

  // Build the list of projects dynamically
  const showreelItem = {
    title: t.work.showreelTitle || "Production Showreel 2026",
    category: lang === "uz" ? "Asosiy Showreel" : lang === "ru" ? "Главный шоурил" : "Featured Reel",
    video: "/videos/animation_showreel.mp4",
    poster: "/showreel-poster.png",
    duration: t.work.showreelMeta || "2 min 30 sec",
    software: "Maya & Blender",
    fps: "24 fps",
    resolution: "1080p",
    codec: "H.264"
  };

  const projects = [
    showreelItem,
    ...(t.work.projects || []).map((proj, idx) => {
      let software = "Autodesk Maya";
      if (proj.category.toLowerCase().includes("blender")) {
        software = "Blender";
      } else if (proj.category.toLowerCase().includes("after effects")) {
        software = "After Effects";
      }
      return {
        title: proj.title,
        category: proj.category,
        video: proj.video,
        poster: proj.poster,
        duration: idx === 0 ? "0:45" : idx === 1 ? "0:12" : idx === 2 ? "0:08" : "0:30",
        software: software,
        fps: "24 fps",
        resolution: "1080p",
        codec: "H.264"
      };
    })
  ];

  // Active project tab state
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const activeProject = projects[activeProjectIdx] || showreelItem;
  const isVertical = activeProject.video?.includes("Sequence_01") || activeProject.video?.includes("motion_showreel") || activeProject.category?.toLowerCase().includes("after effects");

  // Video player control states
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);

  // Active production stage state
  const [activeStage, setActiveStage] = useState("blocking");

  // Refs
  const videoRef = useRef(null);
  const monitorContainerRef = useRef(null);

  // Restart video when active project changes
  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [activeProjectIdx]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play().catch(err => {
        console.log("Audio contexts might be blocked, playing muted first:", err);
        setMuted(true);
        videoRef.current.play();
      });
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMute = !muted;
    setMuted(nextMute);
    videoRef.current.muted = nextMute;
  };

  const handleFullscreen = () => {
    const el = monitorContainerRef.current;
    if (el) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        el.requestFullscreen().catch(() => {});
      }
    }
  };

  // Convert current playhead position to frame index (0-120)
  const currentFrame = duration ? Math.floor((currentTime / duration) * 120) : 0;

  const handleScrubChange = (e) => {
    if (!videoRef.current || !duration) return;
    const targetFrame = parseInt(e.target.value);
    const targetPct = targetFrame / 120;
    const targetTime = targetPct * duration;
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="work" ref={workRef} style={{ position: "relative", zIndex: 1, padding: "100px 0", background: th.bg, borderTop: `1px solid ${th.divider}` }}>
      
      {/* Animation Styles Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes eqBarAnimation {
          0%, 100% { height: 4px; }
          50% { height: 22px; }
        }
        @keyframes scanlineAnim {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes liveBlink {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .eq-bar {
          width: 3px;
          border-radius: 2px;
          background-color: ${th.accent};
          transition: height 0.15s ease;
        }
        .eq-bar-animating {
          animation: eqBarAnimation 0.8s ease infinite;
        }
        .scanline-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.25) 50%
          ), linear-gradient(
            90deg,
            rgba(255, 0, 0, 0.06),
            rgba(0, 255, 0, 0.02),
            rgba(0, 0, 255, 0.06)
          );
          background-size: 100% 4px, 6px 100%;
          z-index: 2;
          opacity: 0.15;
        }
        .viewfinder-corner {
          position: absolute;
          width: 16px;
          height: 16px;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          pointer-events: none;
          z-index: 3;
        }
        .work-grid-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
        }
        @media(min-width: 992px) {
          .work-grid-layout {
            grid-template-columns: 1fr 2.2fr;
          }
        }
      `}} />

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 28px" }}>
        
        {/* Header Section */}
        <Reveal direction="left">
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 48 }}>
            <SL text={t.work.label} th={th} />
            <h2 className="bg-font sh2" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.1, margin: 0, color: th.text }}>
              {t.work.heading}
            </h2>
          </div>
        </Reveal>

        {/* Studio Workstation Dashboard Grid */}
        <div className={projects.length > 1 ? "work-grid-layout" : ""} style={projects.length > 1 ? {} : { maxWidth: isVertical ? 450 : 960, margin: "0 auto" }}>
          
          {/* LEFT COLUMN: Project Directory Selector */}
          {projects.length > 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 10, borderBottom: `1px dashed ${th.divider}` }}>
                <span className="inter-font" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: th.textSub, opacity: 0.7 }}>
                  DIRECTORIES // PROJECT_FILES
                </span>
                <span className="inter-font" style={{ fontSize: 10, fontWeight: 800, color: th.accent }}>
                  [{projects.length}] ITEMS
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {projects.map((proj, idx) => {
                  const isActive = activeProjectIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveProjectIdx(idx)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: "16px 20px",
                        borderRadius: 16,
                        background: isActive ? (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)") : "transparent",
                        border: `1px solid ${isActive ? th.borderHov : "transparent"}`,
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                        position: "relative",
                        overflow: "hidden"
                      }}
                    >
                      {/* Active highlight bar */}
                      {isActive && (
                        <div style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: 3, background: th.accent, borderRadius: "0 2px 2px 0" }} />
                      )}

                      {/* Numeric Index */}
                      <span className="bg-font" style={{ fontSize: 13, fontWeight: 800, color: isActive ? th.accent : th.textSub, opacity: isActive ? 1 : 0.4 }}>
                        0{idx + 1}
                      </span>

                      {/* Project meta description */}
                      <div style={{ flex: 1 }}>
                        <h4 className="bg-font" style={{ fontSize: 15, fontWeight: 700, color: isActive ? th.text : th.textSub, margin: "0 0 4px 0" }}>
                          {proj.title}
                        </h4>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span className="inter-font" style={{ fontSize: 11, color: th.textSub, opacity: 0.6 }}>{proj.category.split(" · ")[0]}</span>
                          <span style={{ width: 3, height: 3, borderRadius: "50%", background: th.divider }} />
                          <span className="inter-font" style={{ fontSize: 10, fontWeight: 600, color: th.accent }}>{proj.software}</span>
                        </div>
                      </div>

                      {/* Badge showing playtime */}
                      <span className="inter-font" style={{ fontSize: 11, color: th.textSub, opacity: 0.5 }}>
                        {proj.duration.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* RIGHT COLUMN: Cinematic Studio Monitor Player & Control HUD */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              maxWidth: isVertical ? 420 : "100%",
              width: "100%",
              margin: isVertical ? "0 auto" : "0",
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            
            {/* Studio Monitor Screen */}
            <div
              ref={monitorContainerRef}
              style={{
                position: "relative",
                aspectRatio: isVertical ? "9/16" : "16/9",
                background: "#080a10",
                borderRadius: 24,
                overflow: "hidden",
                border: `1px solid ${playing ? th.accent + "50" : th.border}`,
                boxShadow: playing ? `0 24px 60px ${th.accent}12` : "none",
                transition: "all 0.5s ease"
              }}
            >
              {/* Scanline CRT simulation */}
              <div className="scanline-overlay" />

              {/* Viewfinder HUD corners */}
              <div className="viewfinder-corner" style={{ top: 20, left: 20, borderRight: "none", borderBottom: "none" }} />
              <div className="viewfinder-corner" style={{ top: 20, right: 20, borderLeft: "none", borderBottom: "none" }} />
              <div className="viewfinder-corner" style={{ bottom: 20, left: 20, borderRight: "none", borderTop: "none" }} />
              <div className="viewfinder-corner" style={{ bottom: 20, right: 20, borderLeft: "none", borderTop: "none" }} />

              {/* Framing center marks */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 10, height: 10, pointerEvents: "none", zIndex: 3 }}>
                <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.2)" }} />
                <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.2)" }} />
              </div>

              {/* Video elements */}
              <video
                ref={videoRef}
                src={activeProject.video}
                poster={activeProject.poster}
                playsInline
                onClick={togglePlay}
                onTimeUpdate={e => setCurrentTime(e.target.currentTime)}
                onLoadedMetadata={e => setDuration(e.target.duration)}
                onEnded={() => setPlaying(false)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  cursor: "pointer",
                  zIndex: 1,
                  position: "relative"
                }}
              />

              {/* Play overlay trigger (when paused) */}
              {!playing && (
                <div 
                  onClick={togglePlay}
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 4,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0, 0, 0, 0.45)",
                    backdropFilter: "blur(4px)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    border: `1.5px solid ${th.accent}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${th.accent}1a`,
                    boxShadow: `0 0 24px ${th.accent}33`,
                    transition: "all 0.3s ease"
                  }}>
                    <Play style={{ width: 22, height: 22, color: "#fff", marginLeft: 4 }} fill="#fff" />
                  </div>
                </div>
              )}

              {/* TOP HUD OVERLAY: Technical specs */}
              <div 
                style={{ 
                  position: "absolute", 
                  top: 24, 
                  left: 28, 
                  right: 28, 
                  zIndex: 4, 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  pointerEvents: "none"
                }}
              >
                {/* Live indicators */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: playing ? "#ef4444" : th.accent,
                    boxShadow: playing ? "0 0 10px #ef4444" : `0 0 8px ${th.accent}`,
                    animation: playing ? "liveBlink 1s infinite" : "none"
                  }} />
                  <span className="bg-font" style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", color: "#fff", textTransform: "uppercase", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                    {playing ? "REC PLAY" : "MONITOR ACTIVE"}
                  </span>
                </div>

                {/* Video resolution / frame telemetry */}
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 4, padding: "4px 8px", fontSize: 9, fontWeight: 800, color: "#fff", letterSpacing: "0.05em" }}>
                    {activeProject.resolution}
                  </div>
                  <div style={{ background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 4, padding: "4px 8px", fontSize: 9, fontWeight: 800, color: "#fff", letterSpacing: "0.05em" }}>
                    {activeProject.codec}
                  </div>
                </div>
              </div>

              {/* BOTTOM HUD OVERLAY: Playback status / sound visualizer */}
              <div 
                style={{ 
                  position: "absolute", 
                  bottom: 24, 
                  left: 28, 
                  right: 28, 
                  zIndex: 4, 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "flex-end",
                  pointerEvents: "none"
                }}
              >
                {/* Time Indicator */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span className="inter-font" style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>TIMECODE</span>
                  <span className="bg-font" style={{ fontSize: 15, fontWeight: 800, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* CSS Equalizer Audio Visualizer (plays when video plays) */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 26, background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.1)", padding: "4px 8px", borderRadius: 8 }}>
                  <div className={`eq-bar ${playing ? "eq-bar-animating" : ""}`} style={{ animationDelay: "0.1s", height: playing ? undefined : 6 }} />
                  <div className={`eq-bar ${playing ? "eq-bar-animating" : ""}`} style={{ animationDelay: "0.4s", height: playing ? undefined : 12 }} />
                  <div className={`eq-bar ${playing ? "eq-bar-animating" : ""}`} style={{ animationDelay: "0.2s", height: playing ? undefined : 8 }} />
                  <div className={`eq-bar ${playing ? "eq-bar-animating" : ""}`} style={{ animationDelay: "0.6s", height: playing ? undefined : 16 }} />
                  <div className={`eq-bar ${playing ? "eq-bar-animating" : ""}`} style={{ animationDelay: "0.3s", height: playing ? undefined : 10 }} />
                </div>
              </div>
            </div>

            {/* Custom Interactive Widescreen HUD Control Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                borderRadius: 20,
                background: isDark ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.6)",
                border: `1px solid ${th.border}`
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: th.accent,
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = th.accentHov}
                  onMouseLeave={e => e.currentTarget.style.background = th.accent}
                >
                  {playing ? <Pause style={{ width: 16, height: 16 }} fill="#fff" /> : <Play style={{ width: 16, height: 16, marginLeft: 2 }} fill="#fff" />}
                </button>

                {/* Local telemetry specs */}
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span className="bg-font" style={{ fontSize: 14, fontWeight: 700, color: th.text }}>
                    {activeProject.title}
                  </span>
                  <span className="inter-font" style={{ fontSize: 11, color: th.textSub }}>
                    {activeProject.category}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {/* Volume Button */}
                <button
                  onClick={toggleMute}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.03)",
                    border: `1px solid ${th.border}`,
                    color: th.textSub,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = th.text}
                  onMouseLeave={e => e.currentTarget.style.color = th.textSub}
                >
                  {muted ? <VolumeX style={{ width: 15, height: 15 }} /> : <Volume2 style={{ width: 15, height: 15 }} />}
                </button>

                {/* Fullscreen Button */}
                <button
                  onClick={handleFullscreen}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.03)",
                    border: `1px solid ${th.border}`,
                    color: th.textSub,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = th.text}
                  onMouseLeave={e => e.currentTarget.style.color = th.textSub}
                >
                  <Maximize2 style={{ width: 15, height: 15 }} />
                </button>
              </div>
            </div>

            {/* PIPELINE BREAKDOWN CONSOLE */}
            <div
              style={{
                padding: "28px",
                borderRadius: 24,
                background: isDark ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.6)",
                border: `1px solid ${th.border}`
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span className="inter-font" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: th.textSub, opacity: 0.6 }}>
                  ANALYTICS // WORKFLOW_PIPELINE
                </span>
                <span className="inter-font" style={{ fontSize: 10, fontWeight: 800, color: th.accent }}>
                  24 FPS TIMELINE
                </span>
              </div>

              {/* Stage switch tabs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
                {["blocking", "splining", "polish"].map(stageKey => {
                  const isActive = activeStage === stageKey;
                  const labels = {
                    blocking: "01. Blocking",
                    splining: "02. Splining",
                    polish: "03. Polish"
                  };
                  return (
                    <button
                      key={stageKey}
                      onClick={() => setActiveStage(stageKey)}
                      className="bg-font"
                      style={{
                        padding: "12px 6px",
                        borderRadius: 10,
                        border: `1px solid ${isActive ? th.accent + "50" : th.border}`,
                        background: isActive ? th.accent + "12" : "transparent",
                        color: isActive ? th.text : th.textSub,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                      }}
                    >
                      {labels[stageKey]}
                    </button>
                  );
                })}
              </div>

              {/* Stage description text */}
              <div style={{ minHeight: 64, marginBottom: 24 }}>
                <h5 className="bg-font" style={{ fontSize: 14, fontWeight: 700, color: th.text, margin: "0 0 6px 0" }}>
                  {currentWorkflow[activeStage]?.title}
                </h5>
                <p className="inter-font" style={{ fontSize: 13, color: th.textSub, lineHeight: 1.6, margin: 0 }}>
                  {currentWorkflow[activeStage]?.desc}
                </p>
              </div>

              {/* TIMELINE KEYFRAME SCRUBBER */}
              <div style={{ borderTop: `1px dashed ${th.divider}`, paddingTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span className="inter-font" style={{ fontSize: 9, fontWeight: 700, color: th.textSub, opacity: 0.5 }}>KEYFRAME TRACK</span>
                  <span className="bg-font" style={{ fontSize: 10, fontWeight: 800, color: th.accent }}>
                    FRAME {currentFrame} / 120
                  </span>
                </div>
                
                {/* Scrub range slider */}
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <input
                    type="range"
                    min="0"
                    max="120"
                    value={currentFrame}
                    onChange={handleScrubChange}
                    style={{
                      width: "100%",
                      height: 6,
                      borderRadius: 3,
                      background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.08)",
                      outline: "none",
                      appearance: "none",
                      cursor: "ew-resize"
                    }}
                  />
                </div>

                {/* Keyframe ticks indicator */}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 2px 0", pointerEvents: "none" }}>
                  {[0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120].map(tick => (
                    <div key={tick} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                      <div style={{ width: 1.5, height: tick % 24 === 0 ? 6 : 4, background: tick === currentFrame ? th.accent : th.divider }} />
                      {tick % 24 === 0 && (
                        <span className="inter-font" style={{ fontSize: 8, color: th.textSub, opacity: 0.4 }}>{tick}f</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
