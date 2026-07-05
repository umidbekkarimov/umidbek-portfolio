import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ t, th, isDark, setIsDark, lang, setLang, langOpen, setLangOpen, menuOpen, setMenuOpen, scrollTo, langRef, FLAG_COMPONENTS, LANG_LABELS }) {
  const [logoHover, setLogoHover] = useState(false);

  return (
    <>
      {/* NAV */}
      <nav style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 100, 
        display: "flex", 
        justifyContent: "center", 
        padding: "16px 24px", 
        background: "transparent", 
        pointerEvents: "none" 
      }}>
        <div style={{ 
          width: "100%", 
          maxWidth: 1100, 
          padding: "8px 24px", 
          borderRadius: menuOpen ? 24 : 100, 
          border: `1px solid ${th.border}`, 
          background: th.surface, 
          backdropFilter: "blur(24px) saturate(180%)", 
          boxShadow: isDark ? "0 10px 30px rgba(0,0,0,0.35)" : "0 10px 30px rgba(37,99,235,0.05)", 
          display: "flex", 
          flexDirection: "column",
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)", 
          pointerEvents: "auto",
          overflow: "visible"
        }}>
          {/* Main Row */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            height: 48, 
            position: "relative" 
          }}>
            {/* Logo / Name */}
            <div>
              <button 
                onClick={() => scrollTo("hero")} 
                className="navbar-logo-btn"
                onMouseEnter={() => setLogoHover(true)}
                onMouseLeave={() => setLogoHover(false)}
                style={{ 
                  background: "none", 
                  border: "none", 
                  cursor: "pointer", 
                  padding: 0,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {/* Circular Avatar with initials UK */}
                  <span className="bg-font" style={{ 
                    display: "grid", 
                    placeItems: "center", 
                    width: 28, 
                    height: 28, 
                    borderRadius: "50%", 
                    background: isDark ? (logoHover ? th.accent : "#000000") : (logoHover ? th.accent : "#ffffff"), 
                    color: isDark ? (logoHover ? "#000000" : "#ffffff") : (logoHover ? "#ffffff" : "#000000"), 
                    border: `1px solid ${th.border}`,
                    fontSize: 11, 
                    fontWeight: "bold",
                    letterSpacing: "0.05em",
                    transition: "all 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: logoHover ? "scale(1.05)" : "none"
                  }}>
                    UK
                  </span>
                  <span className="inter-font" style={{ 
                    fontSize: 14, 
                    fontWeight: 700, 
                    color: logoHover ? th.text : th.textSub, 
                    letterSpacing: "-0.02em",
                    transition: "color 0.28s"
                  }}>
                    umidbekkarimov
                  </span>
                </div>
              </button>
            </div>

            {/* Nav links */}
            <div className="nl" style={{ display:"flex", gap:40, position:"absolute", left:"50%", transform:"translateX(-50%)" }}>
              {t.nav.map((n,i) => (
                <button key={i} onClick={()=>scrollTo(["work","about","contact"][i])} className="dm nav-link"
                  style={{ fontSize:13, letterSpacing:"0.1em", color: th.textSub, transition:"color 0.3s, text-shadow 0.3s", background:"none", border:"none", cursor:"pointer", padding:"4px 0", position:"relative" }}
                  onMouseEnter={e=>{
                    e.currentTarget.style.color=th.text;
                    e.currentTarget.style.textShadow=isDark?`0 0 18px ${th.accent}99`:"none";
                    const bar = e.currentTarget.querySelector('.nav-bar');
                    if(bar){bar.style.width="100%"; bar.style.opacity="1";}
                  }}
                  onMouseLeave={e=>{
                    e.currentTarget.style.color=th.textSub;
                    e.currentTarget.style.textShadow="none";
                    const bar = e.currentTarget.querySelector('.nav-bar');
                    if(bar){bar.style.width="0%"; bar.style.opacity="0";}
                  }}
                >
                  {n}
                  <span className="nav-bar" style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:"0%", height:"1.5px", background:`linear-gradient(90deg, transparent, ${th.accent}, transparent)`, borderRadius:2, opacity:0, transition:"width 0.35s cubic-bezier(0.34,1.2,0.64,1), opacity 0.3s", boxShadow:`0 0 8px ${th.accent}88` }} />
                </button>
              ))}
            </div>

            {/* Controls */}
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <ThemeToggle isDark={isDark} onToggle={()=>setIsDark(d=>!d)} th={th} />

              {/* Lang */}
              <div style={{ position:"relative" }} ref={langRef}>
                <button onClick={()=>setLangOpen(o=>!o)} className="dm" style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px", borderRadius:100, border:`1px solid ${th.border}`, background: th.surface, color: th.textSub, cursor:"pointer", fontSize:12, fontWeight: 700, transition:"all 0.2s", backdropFilter:"blur(8px)" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=th.borderHov; e.currentTarget.style.color=th.text;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border; e.currentTarget.style.color=th.textSub;}}
                >
                  <span>{lang.toUpperCase()}</span>
                  <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ transform: langOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                    <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {langOpen && (
                  <div style={{ position:"absolute", top:"calc(100% + 10px)", right:0, background: isDark?"#111825":th.surface, border:`1px solid ${th.border}`, borderRadius:14, overflow:"hidden", zIndex:200, boxShadow:"0 20px 50px rgba(0,0,0,0.2)", backdropFilter:"blur(16px)", minWidth:160 }}>
                    {(["en","ru","uz"]).map((l) => (
                      <button key={l} onClick={()=>{setLang(l);setLangOpen(false);}} className="dm"
                        style={{ display:"flex", alignItems:"center", gap:12, width:"100%", padding:"12px 20px", background: lang===l?`${th.accent}18`:"transparent", color: lang===l?th.accent:th.textSub, fontSize:14, border:"none", cursor:"pointer", transition:"all 0.15s", whiteSpace:"nowrap" }}
                        onMouseEnter={e=>{ if(lang!==l) e.currentTarget.style.background=th.surfaceHov; }}
                        onMouseLeave={e=>{ if(lang!==l) e.currentTarget.style.background="transparent"; }}
                      >
                        {FLAG_COMPONENTS[l]}
                        <span style={{ fontWeight: lang===l?600:400 }}>{LANG_LABELS[l]}</span>
                        {lang===l && <span style={{marginLeft:"auto",fontSize:10,color:th.accent}}>✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="mb" onClick={()=>setMenuOpen(o=>!o)} style={{ display:"none", background:"none", border:"none", color: th.textSub, cursor:"pointer", alignItems:"center" }}>
                {menuOpen?<X style={{width:22,height:22}}/>:<Menu style={{width:22,height:22}}/>}
              </button>
            </div>
          </div>

          {/* Mobile navigation links */}
          {menuOpen && (
            <div style={{ borderTop:`1px solid ${th.border}`, padding:"12px 4px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
              {t.nav.map((n,i)=>(
                <button key={i} onClick={()=>{setMenuOpen(false); scrollTo(["work","about","contact"][i]);}} className="dm"
                  style={{ display:"block", width:"100%", textAlign:"left", padding:"12px 16px", borderRadius:10, fontSize:15, fontWeight:600, color: th.textSub, background:"none", border:"none", cursor:"pointer", transition:"all 0.2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.background=th.surfaceHov; e.currentTarget.style.color=th.text;}}
                  onMouseLeave={e=>{e.currentTarget.style.background="none"; e.currentTarget.style.color=th.textSub;}}
                >{n}</button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
