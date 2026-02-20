import { useState } from "react";
import "./index.css";

const MOODS = [
  { emoji: "😄", label: "Happy", color: "#FFD93D", bg: "#2a2300" },
  { emoji: "😌", label: "Calm", color: "#6BCB77", bg: "#0a2310" },
  { emoji: "😔", label: "Sad", color: "#4D96FF", bg: "#001a3a" },
  { emoji: "😠", label: "Angry", color: "#FF6B6B", bg: "#2a0a0a" },
  { emoji: "😰", label: "Anxious", color: "#FF922B", bg: "#2a1500" },
  { emoji: "🥳", label: "Excited", color: "#CC5DE8", bg: "#1e0a2a" },
];

function formatTime(date) {
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
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
    <div className="app">
      {toast && <div className="toast">Mood saved! 🎉</div>}

      <div className="container">
        <header>
          <div className="header-tag">DAILY CHECK-IN</div>
          <h1>How are you<br /><span>feeling today?</span></h1>
          <p className="subtitle">Track your emotional rhythm, one day at a time.</p>
        </header>

        <div className="mood-grid">
          {MOODS.map((mood, i) => (
            <button
              key={i}
              className={`mood-card ${selected === i ? "selected" : ""}`}
              style={{
                "--mood-color": mood.color,
                "--mood-bg": mood.bg,
              }}
              onClick={() => setSelected(i)}
            >
              <span className="mood-emoji">{mood.emoji}</span>
              <span className="mood-label">{mood.label}</span>
              {selected === i && <div className="mood-ring" />}
            </button>
          ))}
        </div>

        <button
          className={`save-btn ${selected !== null ? "active" : ""}`}
          onClick={saveMood}
          disabled={selected === null}
        >
          {selected !== null
            ? `Save "${MOODS[selected].label}" Mood`
            : "Select a mood first"}
        </button>

        {history.length > 0 && (
          <section className="history">
            <div className="history-header">
              <h2>Your History</h2>
              <span className="history-count">{history.length} entries</span>
            </div>
            <div className="history-list">
              {history.map((entry, i) => (
                <div
                  key={i}
                  className="history-item"
                  style={{ "--mood-color": entry.mood.color }}
                >
                  <span className="history-emoji">{entry.mood.emoji}</span>
                  <div className="history-info">
                    <span className="history-label">{entry.mood.label}</span>
                    <span className="history-time">{formatTime(entry.time)}</span>
                  </div>
                  <div className="history-dot" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
