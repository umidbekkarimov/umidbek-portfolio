import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ isDark, onToggle, th }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      title={isDark ? "Switch to Light" : "Switch to Dark"}
      style={{
        width: 38,
        height: 38,
        borderRadius: "50%",
        cursor: "pointer",
        border: `1px solid ${h ? th.borderHov : th.border}`,
        background: h ? th.surfaceHov : th.surface,
        color: isDark ? "#fbbf24" : th.accent,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s",
        backdropFilter: "blur(8px)",
      }}
    >
      {isDark ? (
        <Sun style={{ width: 16, height: 16 }} />
      ) : (
        <Moon style={{ width: 16, height: 16 }} />
      )}
    </button>
  );
}
