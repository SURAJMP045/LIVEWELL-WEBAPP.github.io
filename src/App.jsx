import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Greeting from './components/Greeting';
import WaterTracker from './components/WaterTracker';
import MoodLogger from './components/MoodLogger';
import FocusTimer from './components/FocusTimer';
import HealthTips from './components/HealthTips';
import LiteModeSwitch from './components/LiteModeSwitch';
import GetStarted from './pages/GetStarted';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import './App.css';

function ProfilePopover({ user, open, onClose }) {
  if (!user || !open) return null;
  return (
    <div className="profile-popover" onClick={onClose}>
      <div className="profile-popover-content" onClick={e => e.stopPropagation()}>
        <div className="profile-popover-name">{user.name}</div>
        <div className="profile-popover-email">{user.email}</div>
      </div>
    </div>
  );
}

function Dashboard({ liteMode, setLiteMode, user, handleLogout, theme, setTheme }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const initial = user && user.name ? user.name[0].toUpperCase() : 'S';

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <div className="app-header">
        <span className="logo" role="img" aria-label="logo">🌱</span>
        <span className="title">LiveWell Dashboard</span>
        <div className="header-profile-group">
          <button className="theme-toggle-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
          <button className="profile-initial-btn" onClick={() => setPopoverOpen(v => !v)}>{initial}</button>
          <ProfilePopover user={user} open={popoverOpen} onClose={() => setPopoverOpen(false)} />
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="dashboard-container">
        <button
          className={`lite-toggle-btn${liteMode ? ' lite' : ''}`}
          onClick={() => setLiteMode((prev) => !prev)}
        >
          {liteMode ? 'Disable Lite Mode' : 'Enable Lite Mode'}
        </button>
        {!liteMode && <Greeting user={user} />}
        <div className="dashboard-grid">
          <WaterTracker />
          <FocusTimer />
          <MoodLogger />
          <HealthTips />
        </div>
        {liteMode && (
          <div className="lite-mode-message">
            Lite Mode enabled due to slow network. Some features are hidden for better performance.
          </div>
        )}
      </div>
      <div className="app-footer">
        © {new Date().getFullYear()} LiveWell. Made with ❤️ for your health.
      </div>
    </>
  );
}

function App() {
  const [liteMode, setLiteMode] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('livewellUser')) || null;
    } catch {
      return null;
    }
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem('livewellUser');
    setUser(null);
    window.location.href = '/getstarted';
  };

  const PrivateRoute = ({ children }) => user ? children : <Navigate to="/login" replace />;

  const AuthRoute = ({ children }) => user ? <Navigate to="/dashboard" replace /> : children;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/getstarted" replace />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/login" element={<AuthRoute><Login setUser={setUser} /></AuthRoute>} />
        <Route path="/signup" element={<AuthRoute><SignUp setUser={setUser} /></AuthRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard liteMode={liteMode} setLiteMode={setLiteMode} user={user} handleLogout={handleLogout} theme={theme} setTheme={setTheme} /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
