import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import { useScrollY, useInView, useTypewriter } from "./hooks/useScroll";
import "./index.css";
// ── EmailJS sozlamalari — emailjs.com da hisob oching ────────
// 1. emailjs.com ga kiring → Email Services → Service ID
// 2. Email Templates → Template ID (o'zgaruvchilar: {{from_name}}, {{from_email}}, {{message}})
// 3. Account → API Keys → Public Key
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";

// ── Translations ──────────────────────────────────────────────
const T = {
  en: {
    nav: ["Work", "About", "Contact"],
    hero: { greeting: "Hello, I'm", name: "Umidbek Karimov", role: "Junior 3D Animator | Motion Designer", bio: "Character-driven 3D Animator & Motion Designer specializing in fluid, performance-based animations and dynamic video content. My workflow is strictly rooted in the fundamentals of motion—weight, timing, and storytelling—harnessed within Autodesk Maya and Adobe After Effects to deliver high-quality visual solutions. Open to full-time and freelance opportunities in game studios, animation productions, and creative agencies.", cta1: "View Showreel", cta2: "Contact Me", badge: "Available for hire", scroll: "Scroll" },
    work: { label: "My Portfolio", heading: "Giving Life to\n3D Characters", showreelTitle: "Production Showreel 2026", showreelMeta: "2 min 30 sec  ·  HD 1080p", projects: [{ title: "Post - Production & Commercial Motion", category: "Motion Capture · Post-Production" }, { title: "Soon..", category: "3D · CGI" }] },
    about: { label: "About Me", heading: "Timing. Weight.\nCharacter", bio1: "I'm a Junior 3D Animator dedicated to mastering character motion. I focus on creating believable movement using Autodesk Maya.", bio2: "I enjoy the process of bringing characters to life through physics-based animation.", software: "Software", skills: "Specialisations", softwareList: ["Autodesk Maya", "Blender", "After Effects"], skillsList: ["Character Animation", "Motion Editing", "Motion Design"], statsExp: "Learning Mindset", statsProj: "Autodesk Maya", statsStyle: "Character Animation", labelExp: "Approach", labelProj: "Main Tool", labelStyle: "Focus", openToWork: "Open to Work", openToWorkDesc: "Currently looking for Junior 3D Animation roles or freelance opportunities to bring characters to life." },
    contact: { label: "Contact", heading: "Let's Create\nSomething Great", sub: "Open to freelance, full-time roles, and creative collaborations.", resume: "Download Résumé", telegram: "Telegram", linkedin: "LinkedIn", instagram: "Instagram", gmail: "Send Email", formTitle: "Quick Message", namePh: "Your Name", emailPh: "Your Email", msgPh: "Your Message", send: "Send Message", sending: "Sending…", sent: "Message Sent ✓" },
    footer: "Crafted with obsession. All rights reserved.",
  },
  ru: {
    nav: ["Работы", "Обо мне", "Контакты"],
    hero: { greeting: "Привет, я", name: "Умидбек Каримов", role: "Junior 3D Animator | Motion Designer", bio: "3D-аниматор и Motion Designer. Специализируюсь на создании плавной, выразительной анимации персонажей и динамичного видеоконтента. В работе строго опираюсь на фундаментальные принципы движения — механику тела, вес, тайминг и сторителлинг в среде Autodesk Maya и After Effects для создания качественных визуальных решений. Открыт к долгосрочному сотрудничеству (full-time) и проектной работе (freelance) с игровыми студиями, анимационными производствах и видеоагентствами.", cta1: "Смотреть Showreel", cta2: "Написать", badge: "Открыт к работе", scroll: "Вниз" },
    work: { label: "Моё портфолио", heading: "Оживляя\n3D-персонажей", showreelTitle: "Шоурил 2026", showreelMeta: "2 мин 30 сек  ·  HD 1080p", projects: [{ title: "Пост-продакшн и коммерческий моушн", category: "Захват движения · Пост-продакшн" }, { title: "Скоро...", category: "3D · CGI" }] },
    about: { label: "Обо мне", heading: "Тайминг. Вес.\nПерсонаж.", bio1: "Я Junior 3D-аниматор, посвятивший себя изучению движения персонажей. Я фокусируюсь на создании правдоподобных движений в Autodesk Maya.", bio2: "Мне нравится процесс оживления персонажей через физически корректную анимацию.", software: "Инструменты", skills: "Специализации", softwareList: ["Autodesk Maya", "Blender", "After Effects"], skillsList: ["Character Animation", "Motion Editing", "Motion Design"], statsExp: "Learning Mindset", statsProj: "Autodesk Maya", statsStyle: "Character Animation", labelExp: "Подход", labelProj: "Инструмент", labelStyle: "Фокус", openToWork: "Открыт к работе", openToWorkDesc: "Ищу позиции Junior 3D Animator или фриланс-проекты для оживления персонажей." },
    contact: { label: "Контакты", heading: "Создадим\nЧто-то Великое", sub: "Открыт для фриланса, постоянной работы и коллабораций.", resume: "Скачать Резюме", telegram: "Telegram", linkedin: "LinkedIn", instagram: "Instagram", gmail: "Написать Email", formTitle: "Быстрое сообщение", namePh: "Ваше имя", emailPh: "Ваш Email", msgPh: "Ваше сообщение", send: "Отправить", sending: "Отправляется…", sent: "Отправлено ✓" },
    footer: "Создано с одержимостью. Все права защищены.",
  },
  uz: {
    nav: ["Ishlar", "Men haqimda", "Aloqa"],
    hero: { greeting: "Salom, men", name: "Umidbek Karimov", role: "Junior 3D Animator | Motion Designer", bio: "3D Animator va Motion Designer. Qahramonlar animatsiyasi hamda dinamik video kontentlar yaratishga ixtisoslashganman. Ish jarayonimda animatsiyaning fundamental prinsiplari — tana mexanikasi, ogʻirlik, tayming va vizual hikoyachilik qonuniyatlariga qatʼiy eʼtibor qaratgan holda, Autodesk Maya va After Effects muhitida yuqori sifatli vizual yechimlar ishlab chiqaman. Geymdev studiyalari, animatsiya ishlab chiqarish jamoalari va video agentliklarda shtatdagi (full-time) hamda frilans loyihalarda ishlashga tayyorman.", cta1: "Showreelni ko'rish", cta2: "Bog'lanish", badge: "Ishga tayyor", scroll: "Pastga" },
    work: { label: "Mening ishlarim", heading: "3D qahramonlarni\njonlantirish", showreelTitle: "Showreel 2026", showreelMeta: "2 daqiqa 30 soniya  ·  HD 1080p", projects: [{ title: "Post-production va tijoriy motion", category: "Harakatni yozib olish · Post-production" }, { title: "Tez kunda...", category: "3D · CGI" }] },
    about: { label: "Men haqimda", heading: "Vaqt, Og'irlik,\nXarakter", bio1: "Men belgi harakatini o'rganishga bag'ishlangan Junior 3D animatorman. Autodesk Maya yordamida ishonchli harakatlar yaratishga e'tibor qarataman.", bio2: "Fizikaga asoslangan animatsiya orqali qahramonlarga hayot bag'ishlash jarayonidan zavqlanaman.", software: "Dasturlar", skills: "Ixtisosliklar", softwareList: ["Autodesk Maya", "Blender", "After Effects"], skillsList: ["Character Animation", "Motion Editing", "Motion Design"], statsExp: "Learning Mindset", statsProj: "Autodesk Maya", statsStyle: "Character Animation", labelExp: "Yondashuv", labelProj: "Asosiy vosita", labelStyle: "Yo'nalish", openToWork: "Ishga tayyor", openToWorkDesc: "Junior 3D Animation yoki freelance imkoniyatlar uchun ochiqman — qahramonlarga hayot bag'ishlash." },
    contact: { label: "Aloqa", heading: "Ajoyib Narsa\nBirga Yarataylik", sub: "Frilanс, to'liq kunlik ish va ijodiy hamkorlik uchun ochiqman.", resume: "Rezyume yuklab olish", telegram: "Telegram", linkedin: "LinkedIn", instagram: "Instagram", gmail: "Email yuborish", formTitle: "Tezkor xabar", namePh: "Ismingiz", emailPh: "Emailingiz", msgPh: "Xabaringiz", send: "Yuborish", sending: "Yuborilmoqda…", sent: "Yuborildi ✓" },
    footer: "Ehtiros bilan yaratilgan. Barcha huquqlar himoyalangan.",
  },
};

// ── Theme tokens ──────────────────────────────────────────────
const DARK = {
  bg:         "#0c1018",
  bgSec:      "#0f1520",
  surface:    "rgba(255,255,255,0.03)",
  surfaceHov: "rgba(255,255,255,0.06)",
  border:     "rgba(255,255,255,0.07)",
  borderHov:  "rgba(255,255,255,0.14)",
  text:       "#f1f5f9",
  textSub:    "#94a3b8",
  textMuted:  "#475569",
  textFaint:  "#1e293b",
  navBg:      "rgba(12,16,24,0.88)",
  cardBg:     "rgba(255,255,255,0.025)",
  inputBg:    "rgba(255,255,255,0.03)",
  inputColor: "#e2e8f0",
  divider:    "rgba(255,255,255,0.05)",
  accent:     "#3b82f6",
  accentHov:  "#60a5fa",
  gridLine:   "rgba(59,130,246,0.03)",
  orbOp:      0.08,
  shimmer:    "linear-gradient(90deg,#3b82f6 0%,#93c5fd 50%,#3b82f6 100%)",
  photoBg:    "linear-gradient(160deg,#0d1b3e 0%,#0a1020 55%,#111827 100%)",
  photoGrid:  "rgba(59,130,246,0.06)",
};

const LIGHT = {
  bg:         "#f6f8fa",
  bgSec:      "#ffffff",
  surface:    "rgba(255,255,255,0.7)",
  surfaceHov: "rgba(255,255,255,0.95)",
  border:     "rgba(99,102,241,0.08)",
  borderHov:  "rgba(99,102,241,0.2)",
  text:       "#0f172a",
  textSub:    "#334155",
  textMuted:  "#64748b",
  textFaint:  "#94a3b8",
  navBg:      "rgba(246,248,250,0.8)",
  cardBg:     "rgba(255,255,255,0.75)",
  inputBg:    "#ffffff",
  inputColor: "#0f172a",
  divider:    "rgba(0,0,0,0.05)",
  accent:     "#4f46e5",
  accentHov:  "#3730a3",
  gridLine:   "rgba(99,102,241,0.03)",
  orbOp:      0.06,
  shimmer:    "linear-gradient(90deg,#4f46e5 0%,#818cf8 50%,#4f46e5 100%)",
  photoBg:    "linear-gradient(165deg,#e0e7ff 0%,#f1f5f9 60%,#ffffff 100%)",
  photoGrid:  "rgba(99,102,241,0.08)",
};

// ── Hooks ─────────────────────────────────────────────────────
// ── Shared components ─────────────────────────────────────────
const Reveal = ({ children, delay = 0, direction = "up" }) => {
  const ref = useRef(null); const v = useInView(ref);
  const getTransform = () => {
    if (v) return "translate(0,0) scale(1)";
    if (direction === "up") return "translateY(40px) scale(0.97)";
    if (direction === "left") return "translateX(-50px) scale(0.97)";
    if (direction === "right") return "translateX(50px) scale(0.97)";
    return "translateY(40px) scale(0.97)";
  };
  return (
    <div ref={ref} style={{
      opacity: v?1:0,
      transform: getTransform(),
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
    }}>{children}</div>
  );
};

// ── Stagger reveal for multiple children ──────────────────────
const RevealGroup = ({ children, baseDelay = 0, stagger = 100 }) => {
  const ref = useRef(null); const v = useInView(ref);
  return (
    <div ref={ref}>
      {React.Children.map(children, (child, i) => (
        <div key={i} style={{
          opacity: v?1:0,
          transform: v?"translateY(0)":"translateY(30px)",
          transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i*stagger}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i*stagger}ms`
        }}>{child}</div>
      ))}
    </div>
  );
};

const SL = ({ text, th }) => (
  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
    <span style={{ display:"block", width:22, height:1.5, background: th.accent, borderRadius:2 }} />
    <span style={{ fontFamily:"Raleway,sans-serif", fontSize:11, letterSpacing:"0.32em", color: th.accent, textTransform:"uppercase", fontWeight:600 }}>{text}</span>
  </div>
);

// ── Software logos & data ──────────────────────────────────────


import { FlagEN, FlagRU, FlagUZ } from "./components/icons";
const FLAG_COMPONENTS = { en: <FlagEN/>, ru: <FlagRU/>, uz: <FlagUZ/> };
const LANG_LABELS = { en: "English", ru: "Русский", uz: "O'zbek" };

// ── Main Export ───────────────────────────────────────────────
export default function Portfolio() {
  const [lang, setLang] = useState("en");
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    if (!langOpen) return;
    const handleOutside = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [langOpen]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [form, setForm] = useState({ name:"", email:"", msg:"" });
  const [fs, setFs] = useState("idle");
  const [cur, setCur] = useState(true);
  const [heroReady, setHeroReady] = useState(false);
  const scrollY = useScrollY();

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 80);
    return () => clearTimeout(timer);
  }, []);
  const t = T[lang];
  const th = isDark ? DARK : LIGHT;
  const typed = useTypewriter(t.hero.role, 65);
  const workRef = useRef(null);
  const showreelRef = useRef(null);

  useEffect(() => { const id = setInterval(()=>setCur(v=>!v), 530); return ()=>clearInterval(id); }, []);

  const handleShowreel = () => {
    const next = activeVideo === "showreel" ? null : "showreel";
    setActiveVideo(next);
    if (next === "showreel") {
      setTimeout(() => {
        if (showreelRef.current) {
          const top = showreelRef.current.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 120);
    }
  };

  const send = async () => {
    if (!form.name || !form.email || !form.msg) return;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailOk) return;
    setFs("sending");
    const doMailto = () => {
      const emailUser = "umidbekkarimov328";
      const emailDomain = "gmail.com";
      const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
      const body = encodeURIComponent(`From: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.msg}`);
      window.location.href = `mailto:${emailUser}@${emailDomain}?subject=${subject}&body=${body}`;
      setFs("sent");
      setForm({ name: "", email: "", msg: "" });
      setTimeout(() => setFs("idle"), 3500);
    };
    try {
      if (EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID") {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id:      EMAILJS_SERVICE_ID,
            template_id:     EMAILJS_TEMPLATE_ID,
            user_id:         EMAILJS_PUBLIC_KEY,
            template_params: { from_name: form.name, from_email: form.email, message: form.msg, to_email: ["umidbekkarimov328", "gmail.com"].join("@") },
          }),
        });
        if (res.ok) {
          setFs("sent");
          setForm({ name: "", email: "", msg: "" });
          setTimeout(() => setFs("idle"), 3500);
          return;
        }
      }
      doMailto();
    } catch {
      doMailto();
    }
  };

  const sc = scrollY > 60;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 66;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div style={{ background: th.bg, minHeight:"100vh", color: th.text, overflowX:"hidden", transition:"background 0.4s, color 0.4s" }}>
      {/* Right vertical decorative line */}
      <div style={{ position:"fixed", right:18, top:0, height:"100vh", width:1, background:`linear-gradient(to bottom, transparent 0%, ${th.accent}30 25%, ${th.accent}55 50%, ${th.accent}30 75%, transparent 100%)`, zIndex:0, pointerEvents:"none" }} />
      

      {/* ORBS */}
      <div className="orb-wrap" style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden", transition:"opacity 0.5s" }}>
        <div style={{ position:"absolute", top:"-10%", left:"18%", width:700, height:700, borderRadius:"50%", background:"#3b82f6", filter:"blur(160px)", opacity: th.orbOp }} />
        <div style={{ position:"absolute", top:"58%", right:"-6%", width:500, height:500, borderRadius:"50%", background:"#6366f1", filter:"blur(140px)", opacity: th.orbOp*0.75 }} />
        <div style={{ position:"absolute", top:"33%", left:"-6%", width:400, height:400, borderRadius:"50%", background:"#0ea5e9", filter:"blur(130px)", opacity: th.orbOp*0.75 }} />
      </div>

      
      {/* NAV */}
      <Navbar t={t} th={th} isDark={isDark} setIsDark={setIsDark} lang={lang} setLang={setLang} langOpen={langOpen} setLangOpen={setLangOpen} menuOpen={menuOpen} setMenuOpen={setMenuOpen} sc={sc} scrollTo={scrollTo} langRef={langRef} FLAG_COMPONENTS={FLAG_COMPONENTS} LANG_LABELS={LANG_LABELS} />

      {/* HERO */}
      <Hero t={t} th={th} isDark={isDark} typed={typed} heroReady={heroReady} cur={cur} scrollTo={scrollTo} handleShowreel={handleShowreel} />

      {/* WORK */}
      <Work t={t} th={th} isDark={isDark} activeVideo={activeVideo} setActiveVideo={setActiveVideo} workRef={workRef} showreelRef={showreelRef} SL={SL} Reveal={Reveal} RevealGroup={RevealGroup} />

      {/* ABOUT */}
      <About t={t} th={th} isDark={isDark} SL={SL} Reveal={Reveal} RevealGroup={RevealGroup} />

      {/* CONTACT */}
      <Contact t={t} th={th} isDark={isDark} form={form} setForm={setForm} fs={fs} send={send}  Reveal={Reveal} SL={SL} lang={lang} />

      {/* FOOTER */}
      <footer style={{ position:"relative", zIndex:1, borderTop:`1px solid ${th.divider}`, padding:"34px 28px" }}>
        <div className="footer-inner" style={{ maxWidth:1240, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div>
            <span className="dm" style={{ fontSize:14, color: th.textFaint }}>Umidbek Karimov</span>
          </div>
          <p className="dm" style={{ fontSize:12, color: th.textFaint }}>{t.footer}</p>
          <p className="dm" style={{ fontSize:11, color: th.textFaint }}>© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
