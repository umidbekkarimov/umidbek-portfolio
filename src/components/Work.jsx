import { useState, useEffect, useRef } from "react";
import { Play, X, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

export default function Work({ t, th, isDark, activeVideo, setActiveVideo, workRef, showreelRef, SL, Reveal }) {
  const showVideo = activeVideo === "showreel";

  return (
    <>
      {/* ═══ WORK ═══ */}
      <section id="work" ref={workRef} style={{ position:"relative", zIndex:1, padding:"110px 0", borderTop:`1px solid ${th.divider}` }}>
        <div className="section-inner" style={{ maxWidth:1240, margin:"0 auto", padding:"0 28px" }}>
          <Reveal direction="left">
            <SL text={t.work.label} th={th} />
            <h2 className="rl sh2" style={{ fontSize:78, fontWeight:800, lineHeight:0.9, letterSpacing:"-0.01em", marginBottom:52, whiteSpace:"pre-line", color: th.text }}>{t.work.heading}</h2>
          </Reveal>
          <Reveal delay={120} direction="up"><Showreel title={t.work.showreelTitle} meta={t.work.showreelMeta} showVideo={showVideo} onToggle={()=>setActiveVideo(activeVideo === "showreel" ? null : "showreel")} th={th} isDark={isDark} showreelRef={showreelRef} /></Reveal>
          <div className="thr" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:15, marginTop:15 }}>
            {t.work.projects.map((p,i)=>(
              <Reveal key={i} delay={i*120} direction="up"><PCard title={p.title} category={p.category} videoUrl={p.video} poster={p.poster} idx={i} th={th} isDark={isDark} activeVideo={activeVideo} setActiveVideo={setActiveVideo} /></Reveal>
            ))}
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

const Showreel = ({ title, meta, showVideo, onToggle, th, isDark, showreelRef }) => {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showVolSlider, setShowVolSlider] = useState(false);
  const [isDraggingVol, setIsDraggingVol] = useState(false);
  const [hov, setHov] = useState(false);
  const [prog, setProg] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muteHov, setMuteHov] = useState(false);
  const [fsHov, setFsHov] = useState(false);
  const [closeHov, setCloseHov] = useState(false);
  const videoRef = useRef(null);

  // Progress tracker
  useEffect(() => {
    if (!showVideo) return;
    const id = setInterval(() => {
      if (videoRef.current && videoRef.current.duration)
        setProg((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }, 300);
    return () => {
      clearInterval(id);
      setProg(0);
    };
  }, [showVideo]);

  // Sync volume and muted state to video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
      videoRef.current.muted = muted;
    }
  }, [volume, muted]);

  // Control playback based on showVideo and paused states
  useEffect(() => {
    if (!videoRef.current) return;
    if (showVideo) {
      if (paused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          console.log("Play failed, attempting muted play...", err);
          if (!muted) {
            setMuted(true);
          }
        });
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [showVideo, paused, muted]);

  // Spacebar play/pause
  useEffect(() => {
    if (!showVideo) return;
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
  }, [showVideo]);

  const getBtnStyle = (isHov) => ({
    width:32, height:32, borderRadius:"50%",
    border: (isDark || showVideo)
      ? (isHov ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.12)")
      : (isHov ? "1px solid rgba(15,23,42,0.4)" : "1px solid rgba(15,23,42,0.20)"),
    background: (isDark || showVideo)
      ? (isHov ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.4)")
      : (isHov ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.75)"),
    backdropFilter: "blur(8px)",
    color: (isDark || showVideo)
      ? (isHov ? "#fff" : "#94a3b8")
      : (isHov ? th.text : "#475569"),
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all 0.2s", flexShrink: 0,
  });

  return (
    <div
      ref={showreelRef}
      className="showreel-panel"
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      onContextMenu={e => e.preventDefault()}
      style={{
        position:"relative", width:"100%", aspectRatio:"16/8",
        borderRadius:18, overflow:"hidden",
        border:`1px solid ${hov?"rgba(59,130,246,0.45)":th.border}`,
        boxShadow: isDark ? (hov?"0 0 80px rgba(59,130,246,0.15), 0 30px 60px rgba(0,0,0,0.3)":"0 20px 50px rgba(0,0,0,0.2)") : (hov?"0 0 60px rgba(59,130,246,0.20), 0 20px 40px rgba(37,99,235,0.15)":"0 8px 32px rgba(37,99,235,0.12)"),
        transition:"border 0.45s ease, box-shadow 0.45s ease",
        cursor: showVideo ? "default" : "pointer",
      }}
    >
      {/* Thumbnail background */}
      <div style={{ position:"absolute", inset:0, background: isDark ? "linear-gradient(145deg,#0e1520,#111827,#0a1018)" : "linear-gradient(145deg,#dbeafe,#e0f2fe,#eff6ff)", zIndex:0 }}>
        <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"55%", backgroundImage: isDark ? "linear-gradient(rgba(59,130,246,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.12) 1px,transparent 1px)" : "linear-gradient(rgba(37,99,235,0.20) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.20) 1px,transparent 1px)", backgroundSize:"55px 55px", transform:"perspective(500px) rotateX(52deg) scaleX(2)", transformOrigin:"bottom center" }} />
          <div style={{ position:"absolute", inset:0, background: isDark ? "linear-gradient(to bottom,#0e1520 0%,transparent 30%,transparent 70%,#0e1520 100%)" : "linear-gradient(to bottom,#dbeafe 0%,transparent 30%,transparent 70%,#dbeafe 100%)" }} />
        </div>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:400, height:180, background:"#3b82f6", borderRadius:"50%", filter:"blur(80px)", opacity: isDark?(hov?0.14:0.05):(hov?0.25:0.10), transition:"opacity 0.5s", pointerEvents:"none" }} />
      </div>

      {/* Video — pointerEvents:none so clicks go to overlay */}
      <video
        ref={videoRef}
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        poster="/showreel-poster.png"
        autoPlay={showVideo}
        muted={muted}
        playsInline
        preload={showVideo ? "auto" : "none"}
        controlsList="nodownload"
        disablePictureInPicture
        onError={(e) => console.log("Showreel video loading error:", e)}
        style={{
          position:"absolute", inset:0, width:"100%", height:"100%",
          objectFit:"cover", zIndex:1,
          opacity: showVideo ? 1 : 0,
          transition:"opacity 0.5s ease",
          pointerEvents:"none",
        }}
        onTimeUpdate={e=>{ if(e.target.duration) setProg((e.target.currentTime/e.target.duration)*100); }}
      />

      {/* ── Click overlay (whole area) ── */}
      {!showVideo && (
        <div
          onClick={onToggle}
          style={{ position:"absolute", inset:0, zIndex:2, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}
        >
          <div style={{
            width:76, height:76, borderRadius:"50%",
            display:"flex", alignItems:"center", justifyContent:"center",
            background:"rgba(59,130,246,0.12)",
            border:"2px solid rgba(59,130,246,0.55)",
            backdropFilter:"blur(14px)",
            transform: hov ? "scale(1.08)" : "scale(1)",
            transition:"all 0.35s cubic-bezier(0.34,1.4,0.64,1)",
            boxShadow: hov ? "0 0 50px rgba(59,130,246,0.35)" : "none",
            position:"relative",
          }}>
            <Play style={{ width:28, height:28, color:"#fff", marginLeft:4 }} fill="white" />
            {hov && <div style={{ position:"absolute", inset:-10, borderRadius:"50%", border:"2px solid rgba(59,130,246,0.35)", animation:"rp 1.8s cubic-bezier(0,0,0.2,1) infinite" }} />}
          </div>
        </div>
      )}

      {/* ── Pause / Resume overlay (only when playing) ── */}
      {showVideo && (
        <div
          onClick={() => setPaused(prev => !prev)}
          style={{
            position:"absolute", inset:0, zIndex:2,
            display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer",
          }}
        >
          {/* Icon — visible when paused OR on hover */}
          <div style={{
            width:76, height:76, borderRadius:"50%",
            display:"flex", alignItems:"center", justifyContent:"center",
            background: isDark ? "rgba(0,0,0,0.55)" : "rgba(15,23,42,0.55)",
            border:"2px solid rgba(255,255,255,0.25)",
            backdropFilter:"blur(14px)",
            opacity: paused ? 1 : hov ? 1 : 0,
            transform: (paused || hov) ? "scale(1.0)" : "scale(0.85)",
            transition:"opacity 0.25s ease, transform 0.25s ease",
            pointerEvents:"none",
          }}>
            {paused
              ? <Play  style={{ width:28, height:28, color:"#fff", marginLeft:4 }} fill="white" />
              : <Pause style={{ width:26, height:26, color:"#fff" }} fill="white" />
            }
          </div>
        </div>
      )}

      {/* ── Bottom HUD ── */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 20px 16px",
        background: (isDark || showVideo)
          ? "linear-gradient(to top, rgba(5,10,20,0.98) 0%, rgba(5,10,20,0.85) 40%, rgba(5,10,20,0.4) 70%, transparent 100%)"
          : "linear-gradient(to top, rgba(248,250,252,0.95) 0%, rgba(248,250,252,0.55) 60%, transparent 100%)",
        zIndex:3, pointerEvents:"none" }}>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:10, flexWrap:"wrap", gap:12 }}>
          <div style={{ minWidth:0, flex:"1 1 auto" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background: showVideo?(paused?"#f59e0b":"#ef4444"):(isDark?"#3b82f6":th.accent), display:"block", animation: showVideo&&!paused?"blink 1.2s ease-in-out infinite":"none", boxShadow: showVideo&&!paused?"0 0 12px #ef4444":`0 0 10px ${isDark?"#3b82f6":th.accent}` }} />
              <span style={{ fontFamily:"Inter,system-ui,sans-serif", fontSize:10, fontWeight:600, letterSpacing:"0.15em", color: showVideo?(paused?"#fbbf24":"#f87171"):(isDark?"#60a5fa":th.accent), textTransform:"uppercase" }}>
                {showVideo ? (paused ? "Paused" : "Now Playing") : "Featured Reel"}
              </span>
            </div>
            <h3 style={{ fontFamily:"Inter,system-ui,sans-serif", fontSize:"clamp(18px, 5vw, 26px)", fontWeight:700, letterSpacing:"-0.02em", color: (isDark || showVideo) ? "#fff" : th.text, lineHeight:1.2, textShadow: (isDark || showVideo) ? "0 2px 20px rgba(0,0,0,0.5)" : "none" }}>{title}</h3>
            <p style={{ fontFamily:"Inter,system-ui,sans-serif", fontSize:11, color: (isDark || showVideo) ? "#94a3b8" : th.textSub, marginTop:4, fontWeight:500, letterSpacing:"0.02em" }}>{meta}</p>
          </div>
          {/* Buttons — pointerEvents:auto override */}
          <div style={{ display:"flex", gap:8, pointerEvents:"auto" }}>
            {/* Volume control with slider */}
            <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center" }}
              onMouseEnter={e=>{e.stopPropagation();setShowVolSlider(true);}}
              onMouseLeave={e=>{e.stopPropagation();setShowVolSlider(false);}}
            >
              {/* Vertical volume slider popup */}
              {(showVolSlider || isDraggingVol) && (
                <div onClick={e=>e.stopPropagation()} style={{ position:"absolute", bottom:"100%", left:"50%", transform:"translateX(-50%)", background: isDark?"rgba(10,16,26,0.92)":"rgba(255,255,255,0.95)", border: isDark?"1px solid rgba(255,255,255,0.12)":"1px solid rgba(15,23,42,0.15)", borderBottom:"10px solid transparent", backgroundClip:"padding-box", borderRadius:12, padding:"12px 8px", display:"flex", flexDirection:"column", alignItems:"center", gap:6, backdropFilter:"blur(14px)", zIndex:10, minHeight:90 }}>
                  {/* Volume percentage */}
                  <span style={{ fontFamily:"Inter,sans-serif", fontSize:10, fontWeight:600, color: isDark?"#94a3b8":"#64748b", letterSpacing:"0.05em" }}>{muted?0:volume}</span>
                  {/* Vertical slider */}
                  <div style={{ position:"relative", width:24, height:70, cursor:"pointer", display:"flex", justifyContent:"center" }}
                    onMouseDown={e=>{
                      e.preventDefault(); e.stopPropagation();
                      setIsDraggingVol(true);
                      const wrapper = e.currentTarget;
                      const updateVol = (clientY) => {
                        const rect = wrapper.getBoundingClientRect();
                        const pct = Math.max(0, Math.min(1, 1-(clientY-rect.top)/rect.height));
                        const newVol = Math.round(pct*100);
                        setVolume(newVol);
                        setMuted(newVol===0);
                      };
                      updateVol(e.clientY);
                      const onMove = (me) => { me.preventDefault(); updateVol(me.clientY); };
                      const onUp = () => { 
                        document.removeEventListener("mousemove",onMove); 
                        document.removeEventListener("mouseup",onUp); 
                        setIsDraggingVol(false);
                      };
                      document.addEventListener("mousemove",onMove);
                      document.addEventListener("mouseup",onUp);
                    }}
                  >
                    {/* Track */}
                    <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:4, height:"100%", borderRadius:4, background: isDark?"rgba(255,255,255,0.15)":"rgba(15,23,42,0.15)" }}>
                      {/* Fill */}
                      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:`${muted?0:volume}%`, background:"linear-gradient(to top,#3b82f6,#60a5fa)", borderRadius:4 }} />
                    </div>
                    {/* Thumb */}
                    <div style={{ position:"absolute", left:"50%", bottom:`calc(${muted?0:volume}% - 6px)`, transform:"translateX(-50%)", width:12, height:12, borderRadius:"50%", background:"#fff", boxShadow:"0 0 6px rgba(59,130,246,0.6)", border:"2px solid #3b82f6", pointerEvents:"none" }} />
                  </div>
                  {/* Min/Max indicators */}
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                    <div style={{ width:4, height:2, background: isDark?"rgba(255,255,255,0.2)":"rgba(15,23,42,0.15)", borderRadius:2 }} />
                  </div>
                </div>
              )}
              {/* Mute toggle button */}
              <button onClick={e=>{ e.stopPropagation(); e.currentTarget.blur(); const newMuted=!muted; setMuted(newMuted); if(!newMuted&&volume===0){setVolume(50);} }}
                style={getBtnStyle(muteHov)}
                onMouseEnter={() => setMuteHov(true)}
                onMouseLeave={() => setMuteHov(false)}
              >
                {(muted||volume===0)?<VolumeX style={{width:13,height:13}}/>:<Volume2 style={{width:13,height:13}}/>}
              </button>
            </div>
            {showVideo && (
              <button onClick={e=>{ e.stopPropagation(); e.currentTarget.blur(); try{ const el = showreelRef.current || videoRef.current; if(document.fullscreenElement){ document.exitFullscreen(); } else if(el){ el.requestFullscreen().catch(()=>{ if(videoRef.current) videoRef.current.requestFullscreen().catch(()=>{}); }); } }catch(err){console.warn("Fullscreen toggle failed:", err);} }}
                style={getBtnStyle(fsHov)}
                onMouseEnter={() => setFsHov(true)}
                onMouseLeave={() => setFsHov(false)}
              >
                <Maximize2 style={{width:13,height:13}}/>
              </button>
            )}
            {showVideo && (
              <button onClick={e=>{ e.stopPropagation(); e.currentTarget.blur(); setPaused(false); onToggle(); }}
                style={getBtnStyle(closeHov)}
                onMouseEnter={() => setCloseHov(true)}
                onMouseLeave={() => setCloseHov(false)}
              >
                <X style={{width:13,height:13}}/>
              </button>
            )}
          </div>
        </div>
        {/* Progress bar */}
        <div
          style={{ height:2, background: isDark ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.15)", borderRadius:4, overflow:"hidden", cursor:"pointer", pointerEvents:"auto" }}
          onClick={e=>{ e.stopPropagation(); if(!showVideo) return; const r=e.currentTarget.getBoundingClientRect(); const p=((e.clientX-r.left)/r.width)*100; setProg(p); if(videoRef.current?.duration) videoRef.current.currentTime=(p/100)*videoRef.current.duration; }}
        >
          <div style={{ height:"100%", width:`${prog}%`, background:"linear-gradient(90deg,#3b82f6,#60a5fa)", borderRadius:4, transition:"width 0.3s" }} />
        </div>
      </div>
    </div>
  );
};

