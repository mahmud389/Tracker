import { useState } from "react";

const MOODS = [
  { emoji: "😄", label: "Happy", color: "#FFD93D", bg: "rgba(255,217,61,0.08)" },
  { emoji: "😌", label: "Calm", color: "#6BCB77", bg: "rgba(107,203,119,0.08)" },
  { emoji: "😔", label: "Sad", color: "#4D96FF", bg: "rgba(77,150,255,0.08)" },
  { emoji: "😠", label: "Angry", color: "#FF6B6B", bg: "rgba(255,107,107,0.08)" },
  { emoji: "😰", label: "Anxious", color: "#FF922B", bg: "rgba(255,146,43,0.08)" },
  { emoji: "🥳", label: "Excited", color: "#CC5DE8", bg: "rgba(204,93,232,0.08)" },
];

function formatTime(date) {
  return date.toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const [history, setHistory] = useState([]);
  const [toast, setToast] = useState(false);

  const saveMood = () => {
    if (selected === null) return;
    setHistory([{ mood: MOODS[selected], time: new Date() }, ...history]);
    setSelected(null);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0d0d0f", color: "#f0f0f5",
      fontFamily: "'DM Sans', system-ui, sans-serif", padding: "40px 20px 80px",
      display: "flex", justifyContent: "center",
      backgroundImage: "radial-gradient(ellipse at 20% 20%, rgba(124,106,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(255,107,107,0.04) 0%, transparent 60%)"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes slideIn { from { opacity:0; transform:translateY(-12px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(16px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
        @keyframes ringPulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        .mood-card { transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1); }
        .mood-card:hover { transform: translateY(-3px) scale(1.03) !important; }
        .save-active:hover { transform: translateY(-2px) !important; box-shadow: 0 12px 40px rgba(124,106,255,0.45) !important; }
      `}</style>

      {toast && (
        <div style={{
          position:"fixed", bottom:32, left:"50%", transform:"translateX(-50%)",
          background:"#1c1c21", border:"1px solid #2a2a30", color:"#f0f0f5",
          padding:"14px 28px", borderRadius:50, fontSize:14, fontWeight:500,
          zIndex:100, boxShadow:"0 8px 32px rgba(0,0,0,0.4)",
          animation:"toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1)"
        }}>Mood saved! 🎉</div>
      )}

      <div style={{ width:"100%", maxWidth:560 }}>
        <header style={{ marginBottom:48 }}>
          <div style={{ fontSize:11, letterSpacing:"0.2em", color:"#7c6aff", marginBottom:16, opacity:0.8, fontWeight:500 }}>
            DAILY CHECK-IN
          </div>
          <h1 style={{
            fontFamily:"'Syne', sans-serif", fontSize:"clamp(36px,8vw,52px)",
            fontWeight:800, lineHeight:1.05, letterSpacing:"-0.02em", marginBottom:16
          }}>
            How are you<br />
            <span style={{ color:"#7c6aff" }}>feeling today?</span>
          </h1>
          <p style={{ fontSize:15, color:"#6b6b7a", fontWeight:300, lineHeight:1.6 }}>
            Track your emotional rhythm, one day at a time.
          </p>
        </header>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24 }}>
          {MOODS.map((mood, i) => (
            <button
              key={i}
              className="mood-card"
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? mood.bg : "#141417",
                border: `1px solid ${selected === i ? mood.color : "#2a2a30"}`,
                borderRadius:20, padding:"24px 12px", cursor:"pointer",
                display:"flex", flexDirection:"column", alignItems:"center", gap:10,
                transform: selected === i ? "translateY(-4px) scale(1.04)" : "none",
                boxShadow: selected === i ? `0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px ${mood.color}` : "none",
                outline:"none"
              }}
            >
              <span style={{ fontSize:36, transition:"transform 0.2s", transform: selected===i?"scale(1.15)":"scale(1)" }}>
                {mood.emoji}
              </span>
              <span style={{ fontSize:13, fontWeight:500, color: selected===i ? mood.color : "#6b6b7a" }}>
                {mood.label}
              </span>
            </button>
          ))}
        </div>

        <button
          className={selected !== null ? "save-active" : ""}
          onClick={saveMood}
          disabled={selected === null}
          style={{
            width:"100%", padding:"18px 24px", borderRadius:16,
            border: `1px solid ${selected !== null ? "#7c6aff" : "#2a2a30"}`,
            background: selected !== null ? "#7c6aff" : "#141417",
            color: selected !== null ? "white" : "#6b6b7a",
            fontFamily:"inherit", fontSize:15, fontWeight:500,
            cursor: selected !== null ? "pointer" : "not-allowed",
            marginBottom:48, transition:"all 0.3s",
            boxShadow: selected !== null ? "0 8px 32px rgba(124,106,255,0.35)" : "none"
          }}
        >
          {selected !== null ? `Save "${MOODS[selected].label}" Mood` : "Select a mood first"}
        </button>

        {history.length > 0 && (
          <section>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:700, letterSpacing:"-0.01em" }}>
                Your History
              </h2>
              <span style={{
                fontSize:12, color:"#6b6b7a", background:"#1c1c21",
                padding:"4px 10px", borderRadius:20, border:"1px solid #2a2a30"
              }}>{history.length} entries</span>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {history.map((entry, i) => (
                <div key={i} style={{
                  display:"flex", alignItems:"center", gap:16,
                  background:"#141417", border:"1px solid #2a2a30",
                  borderRadius:16, padding:"16px 20px",
                  animation:"slideIn 0.3s cubic-bezier(0.34,1.56,0.64,1)"
                }}>
                  <span style={{ fontSize:28, flexShrink:0 }}>{entry.mood.emoji}</span>
                  <div style={{ flex:1, display:"flex", flexDirection:"column", gap:4 }}>
                    <span style={{ fontSize:15, fontWeight:500, color:entry.mood.color }}>{entry.mood.label}</span>
                    <span style={{ fontSize:12, color:"#6b6b7a" }}>{formatTime(entry.time)}</span>
                  </div>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:entry.mood.color, opacity:0.6 }} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
