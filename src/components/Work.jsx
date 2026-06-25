import { useState, useEffect, useRef } from "react";
import { Play, X, Pause, Volume2, VolumeX, Maximize2, Clock, Share2, ExternalLink, Zap, Users, ShieldCheck, Settings } from "lucide-react";

export default function Work({ t, th, isDark, activeVideo, setActiveVideo, workRef, showreelRef, SL, Reveal, stage }) {
  return (
    <>
      {/* ═══ WORK ═══ */}
      <section id="work" ref={workRef} style={{ position:"relative", zIndex:1, padding:"70px 0", borderTop:`1px solid ${th.divider}` }}>
        <div className="section-inner" style={{ maxWidth:1240, margin:"0 auto", padding:"0 28px" }}>
          <Reveal direction="left">
            <SL text={t.work.label} th={th} />
            <h2 className="rl sh2" style={{ fontSize:78, fontWeight:800, lineHeight:0.9, letterSpacing:"-0.01em", marginBottom:52, whiteSpace:"pre-line", color: th.text }}>{t.work.heading}</h2>
          </Reveal>
          <Reveal delay={120} direction="up"><Showreel activeVideo={activeVideo} setActiveVideo={setActiveVideo} th={th} isDark={isDark} showreelRef={showreelRef} /></Reveal>
          
          {/* Interactive Fanned Projects Card Stack */}
          <div className="projects-card-stack" style={{
            position: "relative",
            minHeight: 380,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
            marginBottom: 20,
            width: "100%"
          }}>
            {t.work.projects.map((p,i)=>{
              const playing = activeVideo === `project-${i}`;
              return (
                <div 
                  key={i} 
                  className={`stack-card card-index-${i} ${playing ? "active-playing" : ""}`} 
                  style={{
                    position: "absolute",
                    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    zIndex: playing ? 100 : (i + 1),
                    width: "380px",
                    maxWidth: "90%"
                  }}
                >
                  <PCard title={p.title} category={p.category} videoUrl={p.video} poster={p.poster} idx={i} th={th} isDark={isDark} activeVideo={activeVideo} setActiveVideo={setActiveVideo} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

const DARK_BGPAIRS = [
  ["#0a1628","#0f2040"],  // blue
  ["#0d1f12","#0f2a18"],  // green
  ["#1a0d28","#220f35"],  // purple
];
const LIGHT_BGPAIRS = [["#e0f2fe", "#f0f9ff"], ["#dcfce7", "#f0fdf4"], ["#f3e8ff", "#faf5ff"]];

const CARD_ACCENTS = ["#3b82f6","#22c55e","#a855f7"];

const PCard = ({ title, category, videoUrl, poster, idx, th, isDark, activeVideo, setActiveVideo }) => {
  const [h, setH] = useState(false);
  const playing = activeVideo === `project-${idx}`;
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showVolSlider, setShowVolSlider] = useState(false);
  const [isDraggingVol, setIsDraggingVol] = useState(false);
  const [prog, setProg] = useState(0);
  const [muteHov, setMuteHov] = useState(false);
  const [fsHov, setFsHov] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const pairs = isDark ? DARK_BGPAIRS : LIGHT_BGPAIRS;
  const [g1,g2] = pairs[idx % pairs.length];
  const accentColor = isDark ? CARD_ACCENTS[idx % CARD_ACCENTS.length] : th.accent;

  const getBtnStyle = (isHov) => ({
    width: 26,
    height: 26,
    borderRadius: "50%",
    border: isHov ? "1px solid rgba(255,255,255,0.45)" : "1px solid rgba(255,255,255,0.22)",
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(6px)",
    color: isHov ? "#fff" : "#94a3b8",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  });

  const doStart = () => {
    setActiveVideo(`project-${idx}`);
    setPaused(false);
  };
  const doPause = () => {
    setPaused(true);
  };
  const doResume = () => {
    setPaused(false);
  };
  const doClose = (e) => {
    e.stopPropagation();
    setActiveVideo(null);
    setPaused(false);
  };

  // Sync volume and muted state to video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
      videoRef.current.muted = muted;
    }
  }, [volume, muted]);

  // Control playback based on playing and paused states
  useEffect(() => {
    if (!videoRef.current) return;
    if (playing) {
      if (paused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          console.log("PCard play failed:", err);
          if (!muted) {
            setMuted(true);
          }
        });
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [playing, paused, muted]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      if (videoRef.current && videoRef.current.duration)
        setProg((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }, 300);
    return () => {
      clearInterval(id);
      setProg(0);
    };
  }, [playing]);

  // Spacebar play/pause
  useEffect(() => {
    if (!playing) return;
    const onKey = (e) => {
      if ((e.key === " " || e.code === "Space") && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
        if (document.activeElement) document.activeElement.blur();
        setPaused(prev => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      setPaused(false);
    };
  }, [playing]);

  return (
    <div ref={containerRef} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onContextMenu={e => e.preventDefault()}
      style={{ position:"relative", overflow:"hidden", borderRadius:16, aspectRatio:"4/3",
        background:`linear-gradient(145deg,${g1},${g2})`,
        border:`1px solid ${h ? accentColor+"60" : th.border}`,
        boxShadow: h ? `0 20px 50px rgba(0,0,0,0.3), 0 0 30px ${accentColor}22` : "0 4px 16px rgba(0,0,0,0.12)",
        transform: h?"translateY(-6px) scale(1.02)":"translateY(0) scale(1)",
        transition:"all 0.4s cubic-bezier(0.34,1.2,0.64,1)"
      }}>

      {/* Grid overlay */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:`linear-gradient(${accentColor}22 1px,transparent 1px),linear-gradient(90deg,${accentColor}22 1px,transparent 1px)`,
        backgroundSize:"32px 32px", opacity: h?0.18:0.06, transition:"opacity 0.4s" }} />
      {/* Radial glow */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        background: h ? `radial-gradient(ellipse at center, ${accentColor}18 0%, transparent 65%)` : "transparent",
        transition:"background 0.4s" }} />

      {/* Video — ALWAYS pointerEvents:none */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={poster}
        muted={muted}
        playsInline
        preload={playing ? "auto" : "none"}
        controlsList="nodownload"
        disablePictureInPicture
        onError={(e) => console.log("Video loading error:", e)}
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", zIndex:1,
          opacity: playing ? 1 : 0, transition:"opacity 0.4s", pointerEvents:"none" }}
        onTimeUpdate={e=>{ if(e.target.duration) setProg((e.target.currentTime/e.target.duration)*100); }}
        onEnded={()=>{ setActiveVideo(null); setPaused(false); }}
      />

      {/* ── Play overlay (NOT playing) ── */}
      {!playing && (
        <div onClick={doStart}
          style={{ position:"absolute", inset:0, zIndex:2, cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:52, height:52, borderRadius:"50%", pointerEvents:"none",
            border:`1.5px solid ${h ? accentColor : accentColor+"55"}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            background: h ? `${accentColor}22` : "rgba(255,255,255,0.06)",
            backdropFilter:"blur(8px)",
            boxShadow: h ? `0 0 20px ${accentColor}44` : "none",
            transform: h ? "scale(1.18)" : "scale(1)",
            transition:"all 0.4s cubic-bezier(0.34,1.4,0.64,1)"
          }}>
            <Play style={{ width:16, height:16, color: h ? accentColor : "#fff", marginLeft:2 }} fill={h ? accentColor : "white"} />
          </div>
        </div>
      )}

      {/* ── Pause overlay (playing & not paused) ── */}
      {playing && !paused && (
        <div onClick={doPause}
          style={{ position:"absolute", inset:0, zIndex:2, cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:52, height:52, borderRadius:"50%", pointerEvents:"none",
            border:"1.5px solid rgba(255,255,255,0.4)",
            display:"flex", alignItems:"center", justifyContent:"center",
            background:"rgba(0,0,0,0.5)", backdropFilter:"blur(8px)",
            opacity: h ? 1 : 0,
            transform: h ? "scale(1.0)" : "scale(0.85)",
            transition:"opacity 0.25s ease, transform 0.25s ease",
          }}>
            <Pause style={{ width:16, height:16, color:"#fff" }} fill="white" />
          </div>
        </div>
      )}

      {/* ── Resume overlay (playing & paused) ── */}
      {playing && paused && (
        <div onClick={doResume}
          style={{ position:"absolute", inset:0, zIndex:2, cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:52, height:52, borderRadius:"50%", pointerEvents:"none",
            border:`1.5px solid ${accentColor}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            background:`${accentColor}22`, backdropFilter:"blur(8px)",
            boxShadow:`0 0 20px ${accentColor}44`,
          }}>
            <Play style={{ width:16, height:16, color:"#fff", marginLeft:2 }} fill="white" />
          </div>
        </div>
      )}

      {/* Close button */}
      {playing && (
        <button onClick={doClose}
          style={{ position:"absolute", top:10, right:10, width:28, height:28, borderRadius:"50%",
            border:"1px solid rgba(255,255,255,0.25)", background:"rgba(0,0,0,0.5)",
            backdropFilter:"blur(8px)", color:"#fff", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center", zIndex:10 }}>
          <X style={{width:12,height:12}}/>
        </button>
      )}

      {/* Bottom info + controls */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"14px 18px", zIndex:3,
        background: (isDark || playing)
          ? "linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.4) 60%, transparent 100%)"
          : "linear-gradient(to top,rgba(248,250,252,0.95) 0%,rgba(248,250,252,0.55) 60%, transparent 100%)",
        pointerEvents:"none" }}>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom: playing ? 8 : 0 }}>
          <div style={{ minWidth:0 }}>
            <p style={{ fontFamily:"DM Sans,sans-serif", fontSize:"clamp(16px, 2.2vw, 19px)", fontWeight:700, color: (isDark || playing) ? "#f1f5f9" : th.text, marginBottom:4 }}>{title}</p>
            <p style={{ fontFamily:"DM Sans,sans-serif", fontSize:12, color: (isDark || playing) ? accentColor : th.textSub }}>{category}</p>
          </div>
          {/* Controls */}
          {playing && (
            <div style={{ display:"flex", gap:6, pointerEvents:"auto", alignItems:"center" }}>
              {/* Volume */}
              <div style={{ position:"relative", display:"flex", alignItems:"center" }}
                onMouseEnter={e=>{e.stopPropagation(); setShowVolSlider(true);}}
                onMouseLeave={e=>{e.stopPropagation(); setShowVolSlider(false);}}
              >
                {(showVolSlider || isDraggingVol) && (
                  <div onClick={e=>e.stopPropagation()} style={{ position:"absolute", bottom:"100%", left:"50%", transform:"translateX(-50%)", background:"rgba(10,16,26,0.95)", border:"1px solid rgba(255,255,255,0.12)", borderBottom:"8px solid transparent", backgroundClip:"padding-box", borderRadius:10, padding:"10px 6px", display:"flex", flexDirection:"column", alignItems:"center", gap:4, backdropFilter:"blur(14px)", zIndex:20, minHeight:72 }}>
                    <span style={{ fontFamily:"Inter,sans-serif", fontSize:9, fontWeight:600, color:"#94a3b8" }}>{muted?0:volume}</span>
                    <div style={{ position:"relative", width:20, height:56, cursor:"pointer", display:"flex", justifyContent:"center" }}
                      onMouseDown={e=>{
                        e.preventDefault(); e.stopPropagation();
                        setIsDraggingVol(true);
                        const wrapper = e.currentTarget;
                        const updateVol = (clientY) => {
                          const rect = wrapper.getBoundingClientRect();
                          const pct = Math.max(0, Math.min(1, 1-(clientY-rect.top)/rect.height));
                          const newVol = Math.round(pct*100);
                          setVolume(newVol); setMuted(newVol===0);
                          if(videoRef.current){ videoRef.current.volume=newVol/100; videoRef.current.muted=newVol===0; }
                        };
                        updateVol(e.clientY);
                        const onMove = (me) => { me.preventDefault(); updateVol(me.clientY); };
                        const onUp = () => { 
                          document.removeEventListener("mousemove",onMove); 
                          document.removeEventListener("mouseup",onUp);
                          setIsDraggingVol(false);
                        };
                        document.addEventListener("mousemove",onMove); document.addEventListener("mouseup",onUp);
                      }}
                    >
                      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:3, height:"100%", borderRadius:3, background:"rgba(255,255,255,0.15)" }}>
                        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:`${muted?0:volume}%`, background:"linear-gradient(to top,#3b82f6,#60a5fa)", borderRadius:3 }} />
                      </div>
                      <div style={{ position:"absolute", left:"50%", bottom:`calc(${muted?0:volume}% - 5px)`, transform:"translateX(-50%)", width:10, height:10, borderRadius:"50%", background:"#fff", boxShadow:"0 0 5px rgba(59,130,246,0.7)", border:"1.5px solid #3b82f6", pointerEvents:"none" }} />
                    </div>
                  </div>
                )}
                <button onClick={e=>{e.stopPropagation(); e.currentTarget.blur(); const nm=!muted; setMuted(nm); if(videoRef.current){videoRef.current.muted=nm; if(!nm&&volume===0){setVolume(50);videoRef.current.volume=0.5;} else if(!nm){videoRef.current.volume=volume/100;}}}}
                  style={getBtnStyle(muteHov)}
                  onMouseEnter={() => setMuteHov(true)}
                  onMouseLeave={() => setMuteHov(false)}
                >
                  {(muted||volume===0)?<VolumeX style={{width:11,height:11}}/>:<Volume2 style={{width:11,height:11}}/>}
                </button>
              </div>
              {/* Fullscreen */}
              <button onClick={e=>{e.stopPropagation(); e.currentTarget.blur(); try{const el=containerRef.current||videoRef.current; if(document.fullscreenElement){document.exitFullscreen();} else if(el){el.requestFullscreen().catch(()=>{if(videoRef.current)videoRef.current.requestFullscreen().catch(()=>{});});}}catch(err){console.warn("Fullscreen toggle failed:", err);}}}
                style={getBtnStyle(fsHov)}
                onMouseEnter={() => setFsHov(true)}
                onMouseLeave={() => setFsHov(false)}
              >
                <Maximize2 style={{width:11,height:11}}/>
              </button>
            </div>
          )}
        </div>
        {/* Progress bar */}
        {playing && (
          <div onClick={e=>{e.stopPropagation(); if(!videoRef.current?.duration) return; const r=e.currentTarget.getBoundingClientRect(); const p=((e.clientX-r.left)/r.width)*100; setProg(p); videoRef.current.currentTime=(p/100)*videoRef.current.duration;}}
            style={{ height:2, background:"rgba(255,255,255,0.18)", borderRadius:3, overflow:"hidden", cursor:"pointer", pointerEvents:"auto" }}
          >
            <div style={{ height:"100%", width:`${prog}%`, background:`linear-gradient(90deg,${accentColor},${accentColor}bb)`, borderRadius:3, transition:"width 0.3s" }} />
          </div>
        )}
      </div>
    </div>
  );
};

const VideoCard = ({
  label,
  title,
  subtitle,
  duration,
  isMain,
  th,
  isDark,
  externalLink,
  cardRef
}) => {
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        width: "100%",
        borderRadius: 18,
        overflow: "hidden",
        border: `1px solid ${hov ? "rgba(59,130,246,0.45)" : th.border}`,
        background: isDark 
          ? "rgba(255, 255, 255, 0.015)" 
          : "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(12px)",
        boxShadow: isDark 
          ? (hov ? "0 0 40px rgba(59,130,246,0.08), 0 20px 40px rgba(0,0,0,0.25)" : "0 8px 24px rgba(0,0,0,0.15)") 
          : (hov ? "0 0 30px rgba(37,99,235,0.12), 0 12px 24px rgba(37,99,235,0.06)" : "0 4px 12px rgba(37,99,235,0.03)"),
        transition: "all 0.4s ease",
        padding: isMain ? "40px 35px" : "32px 28px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: isMain ? 240 : 200
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        {/* Label */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#3b82f6",
            boxShadow: "0 0 8px #3b82f6"
          }} />
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: isDark ? "#94a3b8" : th.textSub,
            textTransform: "uppercase"
          }}>
            {label}
          </span>
        </div>

        {/* Top Right Badges/Links */}
        {isMain ? (
          <div style={{
            background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
            border: `1px solid ${th.border}`,
            borderRadius: 4,
            padding: "4px 8px",
            fontSize: 10,
            fontWeight: 800,
            color: th.textSub,
            letterSpacing: "0.08em"
          }}>
            4K ULTRA HD
          </div>
        ) : (
          externalLink && (
            <a 
              href={externalLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                border: `1px solid ${th.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: th.textSub,
                transition: "all 0.2s"
              }}
              onMouseEnter={e => { e.currentTarget.style.color = th.accent; e.currentTarget.style.borderColor = th.accent; }}
              onMouseLeave={e => { e.currentTarget.style.color = th.textSub; e.currentTarget.style.borderColor = th.border; }}
            >
              <ExternalLink style={{ width: 13, height: 13 }} />
            </a>
          )
        )}
      </div>

      {/* Middle row: Text Content */}
      <div style={{ flex: 1, marginBottom: 20 }}>
        <h3 style={{
          fontFamily: "Inter, sans-serif",
          fontSize: isMain ? "clamp(22px, 3.5vw, 28px)" : "clamp(18px, 2.2vw, 22px)",
          fontWeight: 800,
          color: th.text,
          lineHeight: 1.25,
          marginBottom: 10,
          letterSpacing: "-0.01em"
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: isMain ? 14 : 13,
          fontWeight: 500,
          color: th.textSub,
          lineHeight: 1.6,
          maxWidth: isMain ? 700 : "100%",
          margin: 0
        }}>
          {subtitle}
        </p>
      </div>

      {/* Bottom row: Badges/Durations */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: th.textSub, fontSize: 12, fontWeight: 600 }}>
          <Clock style={{ width: 14, height: 14 }} />
          {duration}
        </div>
        {isMain && (
          <div style={{
            border: `1px solid ${th.border}`,
            borderRadius: 4,
            padding: "2px 6px",
            fontSize: 10,
            fontWeight: 800,
            color: th.textSub
          }}>
            HD 1080p
          </div>
        )}
      </div>
    </div>
  );
};

const Showreel = ({ th, isDark, showreelRef }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* 1. Main Info Card */}
      <VideoCard
        label="Featured Reel"
        title="Production Showreel 2026"
        subtitle="A collection of our latest 3D character work — bringing stories and characters to life."
        duration="2 min 30 sec"
        isMain={true}
        th={th}
        isDark={isDark}
        cardRef={showreelRef}
      />

      {/* 2. Sub-cards Grid */}
      <div className="showreel-grid">
        {/* Left Sub-card: Motion Design */}
        <VideoCard
          label="Motion Design - Post Production"
          title="Motion design - Post Production"
          subtitle="Bringing stories to life through dynamic motion, VFX and cinematic finishing."
          duration="1 min 42 sec"
          isMain={false}
          th={th}
          isDark={isDark}
          externalLink="#"
        />

        {/* Right Sub-card: Tech & Tools */}
        <VideoCard
          label="Tech & Tools"
          title="Our Workflow & Tools"
          subtitle="Explore the pipeline, software and techniques behind our 3D work."
          duration="2 min 12 sec"
          isMain={false}
          th={th}
          isDark={isDark}
          externalLink="#"
        />
      </div>

      {/* 3. Bottom Features Bar */}
      <div className="features-bar" style={{
        border: `1px solid ${th.border}`,
        background: isDark ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.55)",
        backdropFilter: "blur(8px)"
      }}>
        {/* Col 1 */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: isDark ? "rgba(59,130,246,0.1)" : "rgba(37,99,235,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isDark ? "#60a5fa" : "#3b82f6",
            flexShrink: 0
          }}>
            <Zap style={{ width: 20, height: 20 }} />
          </div>
          <div>
            <h4 style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: th.text, marginBottom: 2 }}>High-end Quality</h4>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: th.textSub, margin: 0 }}>Pixel-perfect 3D in stunning detail.</p>
          </div>
        </div>

        {/* Col 2 */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: isDark ? "rgba(59,130,246,0.1)" : "rgba(37,99,235,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isDark ? "#60a5fa" : "#3b82f6",
            flexShrink: 0
          }}>
            <Users style={{ width: 20, height: 20 }} />
          </div>
          <div>
            <h4 style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: th.text, marginBottom: 2 }}>Experienced Team</h4>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: th.textSub, margin: 0 }}>Passionate artists & problem solvers.</p>
          </div>
        </div>

        {/* Col 3 */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: isDark ? "rgba(59,130,246,0.1)" : "rgba(37,99,235,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isDark ? "#60a5fa" : "#3b82f6",
            flexShrink: 0
          }}>
            <ShieldCheck style={{ width: 20, height: 20 }} />
          </div>
          <div>
            <h4 style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: th.text, marginBottom: 2 }}>End-to-End Pipeline</h4>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: th.textSub, margin: 0 }}>From concept to final delivery.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
;
