import { useState, useEffect } from "react";
import './MoodLogger.css';

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😠", label: "Angry" }
];

const MoodLogger = () => {
  const [mood, setMood] = useState(() => localStorage.getItem("mood") || "");
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    localStorage.setItem("mood", mood);
  }, [mood]);

  return (
    <div
      className={`dashboard-card mood-card${flipped ? ' flipped' : ''}`}
      onClick={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ cursor: 'pointer' }}
    >
      <div className="mood-card-inner">
        <div className="mood-card-front">
          <div className="card-icon mood">🙂</div>
          <h2 className="card-title mood">Mood Tracker</h2>
          <div className="mood-btn-row">
            {moods.map(m => (
              <button
                key={m.emoji}
                onClick={e => { e.stopPropagation(); setMood(m.emoji); }}
                className={`mood-btn${mood === m.emoji ? ' selected' : ''}`}
                aria-label={m.label}
              >
                {m.emoji}
              </button>
            ))}
          </div>
          <div className="mood-display">Today’s Mood: <span>{mood}</span></div>
        </div>
        <div className="mood-card-back">
          <h2 className="card-title mood">Mood Matters!</h2>
          <p>Tracking your mood helps you understand patterns and improve your well-being. Check in daily!</p>
        </div>
      </div>
    </div>
  );
};

export default MoodLogger; 