import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ t, th, isDark, setIsDark, lang, setLang, langOpen, setLangOpen, menuOpen, setMenuOpen, sc, scrollTo, langRef, FLAG_COMPONENTS, LANG_LABELS }) {
  return (
    <>
      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backdropFilter: sc?"blur(24px) saturate(180%)":"none", background: sc?th.navBg:"transparent", borderBottom: sc?`1px solid ${th.divider}`:"none", transition:"all 0.4s ease" }}>
        <div style={{ maxWidth:1240, margin:"0 auto", padding:"0 28px", height:66, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ width:40 }} />

          {/* Nav links */}
          <div className="nl" style={{ display:"flex", gap:40 }}>
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
              <button onClick={()=>setLangOpen(o=>!o)} className="dm" style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 14px", borderRadius:100, border:`1px solid ${th.border}`, background: th.surface, color: th.textMuted, cursor:"pointer", fontSize:13, transition:"all 0.2s", backdropFilter:"blur(8px)" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=th.borderHov; e.currentTarget.style.color=th.text;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border; e.currentTarget.style.color=th.textMuted;}}
              >
                {FLAG_COMPONENTS[lang]}
                <span>{LANG_LABELS[lang]}</span>
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

        {menuOpen && (
          <div style={{ background: th.navBg, backdropFilter:"blur(24px)", borderTop:`1px solid ${th.divider}`, padding:"18px 28px 24px" }}>
            {t.nav.map((n,i)=>(
              <button key={i} onClick={()=>{setMenuOpen(false); scrollTo(["work","about","contact"][i]);}} className="dm"
                style={{ display:"block", width:"100%", textAlign:"left", padding:"13px 0", fontSize:16, color: th.textSub, background:"none", border:"none", borderBottom:`1px solid ${th.divider}`, cursor:"pointer" }}
              >{n}</button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
