import { useState, useEffect, useRef } from "react";
import { Play, X, Pause, Volume2, VolumeX, Maximize2, Clock, Share2, ExternalLink, Zap, Users, ShieldCheck, Settings } from "lucide-react";

export default function Work({ t, th, isDark, activeVideo, setActiveVideo, workRef, showreelRef, SL, Reveal, stage }) {
  return (
    <>
      {/* ═══ WORK ═══ */}
      <section id="work" ref={workRef} style={{ position:"relative", zIndex:1, padding:"110px 0", borderTop:`1px solid ${th.divider}` }}>
        <div className="section-inner" style={{ maxWidth:1240, margin:"0 auto", padding:"0 28px" }}>
          <Reveal direction="left">
            <SL text={t.work.label} th={th} />
            <h2 className="rl sh2" style={{ fontSize:78, fontWeight:800, lineHeight:0.9, letterSpacing:"-0.01em", marginBottom:52, whiteSpace:"pre-line", color: th.text }}>{t.work.heading}</h2>
          </Reveal>
          <Reveal delay={120} direction="up"><Showreel activeVideo={activeVideo} setActiveVideo={setActiveVideo} th={th} isDark={isDark} showreelRef={showreelRef} /></Reveal>
          
          {/* Interactive Fanned Projects Card Stack */}
          <div className="projects-card-stack" style={{
            position: "relative",
            minHeight: 480,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
            marginBottom: 50,
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
                    zIndex: playing ? 100 : (i + 1)
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
  videoId,
  activeVideo,
  setActiveVideo,
  videoUrl,
  poster,
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
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showVolSlider, setShowVolSlider] = useState(false);
  const [isDraggingVol, setIsDraggingVol] = useState(false);
  const [hov, setHov] = useState(false);
  const [prog, setProg] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationSec, setDurationSec] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muteHov, setMuteHov] = useState(false);
  const [fsHov, setFsHov] = useState(false);
  const videoRef = useRef(null);

  const playing = activeVideo === videoId;

  // Sync volume and muted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
      videoRef.current.muted = muted;
    }
  }, [volume, muted]);

  // Playback control
  useEffect(() => {
    if (!videoRef.current) return;
    if (playing) {
      if (paused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          console.log("Play failed, attempting muted play:", err);
          setMuted(true);
        });
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setProg(0);
      setCurrentTime(0);
      setPaused(false);
    }
  }, [playing, paused]);

  // Spacebar play/pause when focused
  useEffect(() => {
    if (!playing) return;
    const onKey = (e) => {
      if ((e.key === " " || e.code === "Space") && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
        setPaused(p => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    if (playing) {
      setPaused(p => !p);
    } else {
      setActiveVideo(videoId);
      setPaused(false);
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setActiveVideo(null);
    setPaused(false);
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getBtnStyle = (isHov) => ({
    width: 32, height: 32, borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.15)",
    background: isHov ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.5)",
    backdropFilter: "blur(8px)",
    color: isHov ? "#fff" : "#94a3b8",
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all 0.2s"
  });

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: isMain ? "16/9.5" : "16/9.5",
        borderRadius: 18,
        overflow: "hidden",
        border: `1px solid ${hov ? "rgba(59,130,246,0.45)" : th.border}`,
        boxShadow: isDark 
          ? (hov ? "0 0 50px rgba(59,130,246,0.12), 0 20px 40px rgba(0,0,0,0.3)" : "0 10px 30px rgba(0,0,0,0.2)") 
          : (hov ? "0 0 40px rgba(59,130,246,0.15), 0 15px 30px rgba(37,99,235,0.1)" : "0 6px 20px rgba(37,99,235,0.06)"),
        transition: "all 0.4s ease",
        cursor: playing ? "default" : "pointer"
      }}
      onClick={!playing ? handleTogglePlay : undefined}
    >
      {/* Background Poster */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
        transform: hov && !playing ? "scale(1.03)" : "scale(1)",
        transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
      }} />

      {/* Dark overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: playing 
          ? "rgba(0,0,0,0.2)" 
          : hov 
            ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.4) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.3) 100%)",
        zIndex: 1,
        transition: "all 0.4s ease"
      }} />

      {/* Video element */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={poster}
        muted={muted}
        playsInline
        preload={playing ? "auto" : "none"}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 2,
          opacity: playing ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none"
        }}
        onTimeUpdate={e => {
          setCurrentTime(e.target.currentTime);
          if (e.target.duration) {
            setProg((e.target.currentTime / e.target.duration) * 100);
            setDurationSec(e.target.duration);
          }
        }}
        onLoadedMetadata={e => {
          setDurationSec(e.target.duration);
        }}
      />

      {/* Top Bar Overlay */}
      <div style={{
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        zIndex: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        {/* Label */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: playing ? "#ef4444" : "#3b82f6",
            boxShadow: playing ? "0 0 10px #ef4444" : "0 0 8px #3b82f6",
            animation: playing && !paused ? "blink 1.2s ease-in-out infinite" : "none"
          }} />
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "#fff",
            textTransform: "uppercase",
            textShadow: "0 1px 4px rgba(0,0,0,0.6)"
          }}>
            {label}
          </span>
        </div>

        {/* Top Right Badges/Links */}
        {isMain ? (
          <div style={{
            background: "rgba(0, 0, 0, 0.65)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: 4,
            padding: "4px 8px",
            fontSize: 10,
            fontWeight: 800,
            color: "#fff",
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
              onClick={e => e.stopPropagation()}
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
            >
              <ExternalLink style={{ width: 14, height: 14 }} />
            </a>
          )
        )}
      </div>

      {/* Center Play Overlay (when NOT playing and not Main card) */}
      {!playing && !isMain && (
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: hov ? "0 0 20px rgba(59,130,246,0.3)" : "none",
            transform: hov ? "scale(1.1)" : "scale(1)",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          }}>
            <Play style={{ width: 16, height: 16, color: "#fff", marginLeft: 2 }} fill="white" />
          </div>
        </div>
      )}

      {/* Play/Pause Area (when playing) */}
      {playing && (
        <div 
          onClick={handleTogglePlay}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* Centered Indicator */}
          <div style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.6)",
            border: "2px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: paused ? 1 : hov ? 0.8 : 0,
            transform: (paused || hov) ? "scale(1)" : "scale(0.85)",
            transition: "all 0.25s ease"
          }}>
            {paused ? (
              <Play style={{ width: 22, height: 22, color: "#fff", marginLeft: 2 }} fill="white" />
            ) : (
              <Pause style={{ width: 20, height: 20, color: "#fff" }} fill="white" />
            )}
          </div>
        </div>
      )}

      {/* Close button (when playing) */}
      {playing && (
        <button 
          onClick={handleClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 10,
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,0,0,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.6)"; }}
        >
          <X style={{ width: 14, height: 14 }} />
        </button>
      )}

      {/* Bottom Content / Controls */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: isMain ? "40px 30px 24px" : "30px 20px 20px",
        zIndex: 4,
        background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)",
        pointerEvents: "none"
      }}>
        {/* Info elements */}
        {!playing && (
          <div style={{ transform: hov && !isMain ? "translateY(-6px)" : "translateY(0)", transition: "transform 0.4s ease" }}>
            <h3 style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMain ? "clamp(24px, 4vw, 36px)" : "clamp(18px, 2.5vw, 22px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: 8,
              letterSpacing: "-0.02em"
            }}>
              {title}
            </h3>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMain ? "clamp(13px, 1.8vw, 15px)" : "clamp(11px, 1.5vw, 13px)",
              fontWeight: 500,
              color: "#94a3b8",
              lineHeight: 1.5,
              maxWidth: isMain ? 550 : "100%",
              marginBottom: isMain ? 16 : 14
            }}>
              {subtitle}
            </p>

            {/* Badges/Duration row */}
            {isMain ? (
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#94a3b8", fontSize: 12, fontWeight: 600 }}>
                  <Clock style={{ width: 14, height: 14 }} />
                  {duration}
                </div>
                <div style={{
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  borderRadius: 4,
                  padding: "2px 6px",
                  fontSize: 10,
                  fontWeight: 800,
                  color: "#94a3b8"
                }}>
                  HD 1080p
                </div>
              </div>
            ) : null}

            {/* Button trigger row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, pointerEvents: "auto" }}>
              {isMain ? (
                <>
                  <button 
                    onClick={handleTogglePlay}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "12px 28px",
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      borderRadius: 100,
                      fontWeight: 800,
                      fontSize: 14,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#2563eb"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <Play style={{ width: 14, height: 14 }} fill="white" />
                    Watch Showreel
                  </button>

                  <button 
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.2)",
                      background: "rgba(255,255,255,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                    onClick={e => {
                      e.stopPropagation();
                      if (navigator.share) {
                        navigator.share({ title: title, text: subtitle, url: window.location.href });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link copied to clipboard!");
                      }
                    }}
                  >
                    <Share2 style={{ width: 16, height: 16 }} />
                  </button>
                </>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button 
                    onClick={handleTogglePlay}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 22px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: 100,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.18)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)"; }}
                  >
                    <Play style={{ width: 12, height: 12 }} fill="white" />
                    {videoId === "motion-design" ? "Watch Motion Design" : "Watch Workflow"}
                  </button>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>{duration}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Video HUD Controls (only when playing) */}
        {playing && (
          <div style={{ pointerEvents: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, color: "#fff" }}>
                {formatTime(currentTime)}
              </span>

              {/* Player Controls */}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {/* Volume slider popup wrapper */}
                <div 
                  style={{ position: "relative", display: "flex", alignItems: "center" }}
                  onMouseEnter={() => setShowVolSlider(true)}
                  onMouseLeave={() => setShowVolSlider(false)}
                >
                  {(showVolSlider || isDraggingVol) && (
                    <div 
                      onClick={e => e.stopPropagation()}
                      style={{
                        position: "absolute",
                        bottom: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(10,16,26,0.95)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderBottom: "10px solid transparent",
                        backgroundClip: "padding-box",
                        borderRadius: 12,
                        padding: "12px 8px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                        backdropFilter: "blur(14px)",
                        zIndex: 20,
                        minHeight: 90
                      }}
                    >
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8" }}>{muted ? 0 : volume}</span>
                      <div 
                        style={{ position: "relative", width: 24, height: 70, cursor: "pointer", display: "flex", justifyContent: "center" }}
                        onMouseDown={e => {
                          e.preventDefault(); e.stopPropagation();
                          setIsDraggingVol(true);
                          const wrapper = e.currentTarget;
                          const updateVol = (clientY) => {
                            const rect = wrapper.getBoundingClientRect();
                            const pct = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height));
                            const newVol = Math.round(pct * 100);
                            setVolume(newVol); setMuted(newVol === 0);
                          };
                          updateVol(e.clientY);
                          const onMove = (me) => { me.preventDefault(); updateVol(me.clientY); };
                          const onUp = () => {
                            document.removeEventListener("mousemove", onMove);
                            document.removeEventListener("mouseup", onUp);
                            setIsDraggingVol(false);
                          };
                          document.addEventListener("mousemove", onMove);
                          document.addEventListener("mouseup", onUp);
                        }}
                      >
                        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 4, height: "100%", borderRadius: 4, background: "rgba(255,255,255,0.15)" }}>
                          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${muted ? 0 : volume}%`, background: "#3b82f6", borderRadius: 4 }} />
                        </div>
                        <div style={{ position: "absolute", left: "50%", bottom: `calc(${muted ? 0 : volume}% - 6px)`, transform: "translateX(-50%)", width: 12, height: 12, borderRadius: "50%", background: "#fff", border: "2px solid #3b82f6" }} />
                      </div>
                    </div>
                  )}
                  <button 
                    onClick={e => { e.stopPropagation(); setMuted(!muted); }}
                    style={getBtnStyle(muteHov)}
                    onMouseEnter={() => setMuteHov(true)}
                    onMouseLeave={() => setMuteHov(false)}
                  >
                    {muted ? <VolumeX style={{ width: 14, height: 14 }} /> : <Volume2 style={{ width: 14, height: 14 }} />}
                  </button>
                </div>

                <button style={getBtnStyle(false)}>
                  <Settings style={{ width: 14, height: 14 }} />
                </button>

                <button 
                  onClick={e => {
                    e.stopPropagation();
                    const el = videoRef.current;
                    if (el) {
                      if (document.fullscreenElement) {
                        document.exitFullscreen();
                      } else {
                        el.requestFullscreen().catch(() => {});
                      }
                    }
                  }}
                  style={getBtnStyle(fsHov)}
                  onMouseEnter={() => setFsHov(true)}
                  onMouseLeave={() => setFsHov(false)}
                >
                  <Maximize2 style={{ width: 14, height: 14 }} />
                </button>
              </div>
            </div>

            {/* Custom Progress bar */}
            <div
              style={{ height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 4, cursor: "pointer", position: "relative" }}
              onClick={e => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = (e.clientX - rect.left) / rect.width;
                setProg(pct * 100);
                if (videoRef.current) {
                  videoRef.current.currentTime = pct * durationSec;
                }
              }}
            >
              <div style={{ height: "100%", width: `${prog}%`, background: "#2563eb", borderRadius: 4 }} />
              <div style={{
                position: "absolute",
                left: `calc(${prog}% - 6px)`,
                top: -4,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#fff",
                boxShadow: "0 0 8px rgba(37,99,235,0.8)"
              }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Showreel = ({ activeVideo, setActiveVideo, th, isDark, showreelRef }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* 1. Main Video Card */}
      <VideoCard
        videoId="showreel"
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
        videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        poster="/showreel-poster.png"
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
          videoId="motion-design"
          activeVideo={activeVideo}
          setActiveVideo={setActiveVideo}
          videoUrl="/videos/shadow-city-animation.mp4"
          poster="/commercial-motion-poster.png"
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
          videoId="workflow"
          activeVideo={activeVideo}
          setActiveVideo={setActiveVideo}
          videoUrl="/videos/walk-cycle-animation.mp4"
          poster="/soon-project-poster.png"
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
