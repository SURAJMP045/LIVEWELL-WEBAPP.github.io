import { useEffect, useRef, useState } from "react";
import tipsData from "../data/tips.json";
import './HealthTips.css';

const HealthTips = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="dashboard-card tips-card">
      <div className="card-icon tips">💡</div>
      <h2 className="card-title tips">Health Tips</h2>
      {visible && (
        <ul className="tips-list">
          {tipsData.map((tip) => <li key={tip.id}>{tip.text}</li>)}
        </ul>
      )}
    </div>
  );
};

export default HealthTips;
