import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Login({ setUser }) {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const email = e.target.email.value.trim().toLowerCase();
    const password = e.target.password.value;
    const stored = JSON.parse(localStorage.getItem('livewellUser'));
    if (!stored || stored.email !== email) {
      setError('No account found with this email.');
      return;
    }
    if (stored.password !== password) {
      setError('Incorrect password.');
      return;
    }
    setUser(stored);
    navigate('/dashboard');
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <h2>Login</h2>
        <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
          <input name="email" type="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" required />
          <button type="submit" className="auth-btn primary">Login</button>
        </form>
        {error && <div className="auth-error">{error}</div>}
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
} 