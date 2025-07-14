import { useEffect, useState } from "react";
import './WaterTracker.css';

const WaterTracker = () => {
  const today = new Date().toLocaleDateString();
  const saved = JSON.parse(localStorage.getItem("waterTracker") || '{}');
  const [count, setCount] = useState(
    saved.date === today ? saved.count : 0
  );
  const goal = 8;
  const percent = Math.round((count / goal) * 100);

  useEffect(() => {
    localStorage.setItem("waterTracker", JSON.stringify({ date: today, count }));
  }, [count, today]);

  return (
    <div className="dashboard-card water-card">
      <div className="card-icon water">💧</div>
      <h2 className="card-title water">Hydration Tracker</h2>
      <div className="card-progress-labels">
        <span>{count}/{goal} glasses</span>
        <span>{percent}%</span>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{width: `${percent}%`}}></div>
      </div>
      <div className="card-btn-row">
        <button onClick={() => setCount(prev => Math.min(prev + 1, goal))} className="card-btn add">➕ 1 Glass</button>
        <button onClick={() => setCount(0)} className="card-btn reset">🔄 Reset</button>
      </div>
    </div>
  );
};
export default WaterTracker; 