import { Link } from 'react-router-dom';
import './GetStarted.css';

export default function GetStarted() {
  return (
    <div className="getstarted-bg">
      <div className="getstarted-container">
        <h1>Welcome to LiveWell</h1>
        <p>Your personal health & lifestyle dashboard.</p>
        <div className="getstarted-actions">
          <Link to="/signup" className="getstarted-btn primary">Get Started</Link>
          <Link to="/login" className="getstarted-btn">Login</Link>
        </div>
      </div>
    </div>
  );
} 