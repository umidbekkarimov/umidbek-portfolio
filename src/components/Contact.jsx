import { useState } from "react";
import { ExternalLink, Mail, Send, Download } from "lucide-react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { TGIcon } from "./icons";

export default function Contact({ t, th, isDark, form, setForm, fs, send, Reveal, SL, lang }) {
  return (
    <>
      {/* ═══ CONTACT ═══ */}
      <section id="contact" style={{ position:"relative", zIndex:1, padding:"110px 0", borderTop:`1px solid ${th.divider}` }}>
        <div className="section-inner" style={{ maxWidth:1240, margin:"0 auto", padding:"0 28px" }}>
          <Reveal direction="up">
            <SL text={t.contact.label} th={th} />
            <h2 className="rl sh2" style={{ fontSize:78, fontWeight:800, lineHeight:0.9, letterSpacing:"-0.01em", marginBottom:14, whiteSpace:"pre-line", color: th.text }}>{t.contact.heading}</h2>
            <p className="dm" style={{ fontSize:16, color: th.textSub, marginBottom:60 }}>{t.contact.sub}</p>
          </Reveal>
          <div className="tc contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80 }}>
            <Reveal delay={100} direction="left">
              <div className="contact-panels" style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <CPanel label={t.contact.resume} icon={<Download style={{width:20,height:20}}/>} color={th.accent} href="/Umidbek-Karimov-CV.pdf" th={th} />
                <CPanel label={t.contact.linkedin} icon={<FaLinkedin style={{width:20,height:20}}/>} color="#0A66C2" href="https://www.linkedin.com/in/umidbek-karimov-564581344" th={th} />
                <CPanel label={t.contact.telegram} icon={<TGIcon/>} color="#2AABEE" href="https://t.me/Umidbek_Karimovv" th={th} />
                <CPanel label={t.contact.instagram} icon={<FaInstagram style={{width:20,height:20}}/>} color="#E1306C" href="https://instagram.com/marc.3d" th={th} />
                <CPanel label={t.contact.gmail} icon={<Mail style={{width:20,height:20}}/>} color="#EA4335" isBtn onClick={(e)=>{ e.preventDefault(); const emailUser = "umidbekkarimov328"; const emailDomain = "gmail.com"; window.location.href = `mailto:${emailUser}@${emailDomain}`; }} th={th} />
              </div>
            </Reveal>
            <Reveal delay={180} direction="right">
              <div style={{ padding:36, borderRadius:24, border:`1px solid ${th.border}`, background: th.surface, backdropFilter:"blur(16px)", boxShadow: isDark?"none":"0 8px 32px rgba(37,99,235,0.06)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:26 }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:`${th.accent}20`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Send style={{width:15,height:15,color:th.accent}}/>
                  </div>
                  <h3 className="rl" style={{ fontSize:18, fontWeight:700, color: th.text }}>{t.contact.formTitle}</h3>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
                  {[{k:"name",ph:t.contact.namePh,tp:"text"},{k:"email",ph:t.contact.emailPh,tp:"email"}].map(f=>(
                    <input key={f.k} type={f.tp} placeholder={f.ph} value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})}
                      style={{ padding:"13px 17px", borderRadius:12, border:`1px solid ${th.border}`, background: th.inputBg, color: th.inputColor, fontSize:14, outline:"none", transition:"border-color 0.2s" }}
                      onFocus={e=>e.target.style.borderColor=th.accent+"70"}
                      onBlur={e=>e.target.style.borderColor=th.border}
                    />
                  ))}
                  <textarea placeholder={t.contact.msgPh} rows={5} value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})}
                    style={{ padding:"13px 17px", borderRadius:12, border:`1px solid ${th.border}`, background: th.inputBg, color: th.inputColor, fontSize:14, outline:"none", resize:"none", transition:"border-color 0.2s" }}
                    onFocus={e=>e.target.style.borderColor=th.accent+"70"}
                    onBlur={e=>e.target.style.borderColor=th.border}
                  />
                  <button onClick={send} disabled={fs!=="idle"} className="dm"
                    style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:9, padding:15, borderRadius:12, background: fs==="sent"?"linear-gradient(135deg,#10b981,#059669)":`linear-gradient(135deg,${th.accent},${isDark?"#2563eb":"#1d4ed8"})`, color:"#fff", fontSize:15, fontWeight:600, border:"none", cursor: fs!=="idle"?"not-allowed":"pointer", opacity: fs==="sending"?0.75:1, boxShadow: fs==="sent"?"0 4px 20px rgba(16,185,129,0.3)":`0 4px 20px ${th.accent}44`, transition:"all 0.3s" }}
                    onMouseEnter={e=>{if(fs==="idle")e.currentTarget.style.transform="translateY(-1px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="none";}}
                  >
                    {fs==="idle"&&<><Send style={{width:15,height:15}}/>{t.contact.send}</>}
                    {fs==="sending"&&t.contact.sending}
                    {fs==="sent"&&t.contact.sent}
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

const CPanel = ({ label, icon, color, href, isBtn, onClick, th }) => {
  const [h, setH] = useState(false);
  const s = {
    display:"flex", alignItems:"center", gap:15, padding:"15px 20px", borderRadius:16,
    border: `1px solid ${isBtn ? (h?"rgba(59,130,246,0.6)":"rgba(59,130,246,0.28)") : (h?th.borderHov:th.border)}`,
    background: isBtn ? (h?"rgba(59,130,246,0.12)":"rgba(59,130,246,0.05)") : (h?th.surfaceHov:th.surface),
    textDecoration:"none", cursor:"pointer", transition:"all 0.28s",
    transform: h?"translateX(5px)":"none", width:"100%",
    backdropFilter: "blur(8px)",
    userSelect: isBtn ? "auto" : "none",
    WebkitUserSelect: isBtn ? "auto" : "none",
    msUserSelect: isBtn ? "auto" : "none",
    MozUserSelect: isBtn ? "auto" : "none",
  };
  const inner = <>
    <span style={{ width:42, height:42, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, background: color+"22", color, transition:"transform 0.28s", transform: h?"scale(1.1)":"scale(1)" }}>{icon}</span>
    <span style={{ fontFamily:"DM Sans,sans-serif", fontSize:15, color: h?th.text:th.textSub, transition:"color 0.28s", flex:1, fontWeight:500 }}>{label}</span>
    <ExternalLink style={{ width:14, height:14, color: h?th.textMuted:th.textFaint }} />
  </>;
  if (isBtn) return <button type="button" onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={onClick} style={s}>{inner}</button>;
  return <a href={href} target="_blank" rel="noopener noreferrer" onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onContextMenu={e=>e.preventDefault()} onDragStart={e=>e.preventDefault()} onCopy={e=>e.preventDefault()} style={s}>{inner}</a>;
};
