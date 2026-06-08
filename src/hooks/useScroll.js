import { useState, useEffect } from "react";

export function useScrollY() {
  const [y, setY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const updateScrollY = () => {
      setY(window.scrollY);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollY);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return y;
}

export function useInView(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setV(true);
      },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return v;
}

export function useTypewriter(text, speed = 65) {
  const [prevText, setPrevText] = useState(text);
  const [out, setOut] = useState("");

  if (text !== prevText) {
    setPrevText(text);
    setOut("");
  }

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return out;
}
