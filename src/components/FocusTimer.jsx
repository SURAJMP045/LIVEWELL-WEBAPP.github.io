import { useState, useEffect } from "react";
import './FocusTimer.css';

const FocusTimer = () => {
  const [seconds, setSeconds] = useState(1500);
  const [active, setActive] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    let timer;
    if (active && seconds > 0) {
      timer = setInterval(() => setSeconds(s => s - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [active, seconds]);

  const formatTime = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div
      className={`dashboard-card focus-card${flipped ? ' flipped' : ''}`}
      onClick={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ cursor: 'pointer' }}
    >
      <div className="focus-card-inner">
        <div className="focus-card-front">
          <div className="card-icon focus">⏰</div>
          <h2 className="card-title focus">Pomodoro Timer</h2>
          <div className="focus-timer-value">{formatTime(seconds)}</div>
          <div className="card-btn-row">
            <button onClick={e => { e.stopPropagation(); setActive(true); }} className="card-btn start">▶️ Start</button>
            <button onClick={e => { e.stopPropagation(); setActive(false); }} className="card-btn pause">⏸️ Pause</button>
            <button onClick={e => { e.stopPropagation(); setActive(false); setSeconds(1500); }} className="card-btn reset">🔄 Reset</button>
          </div>
        </div>
        <div className="focus-card-back">
          <h2 className="card-title focus">Stay Focused!</h2>
          <p>Pomodoro Technique: Work for 25 minutes, then take a 5-minute break. Repeat 4 times, then take a longer break.</p>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;
