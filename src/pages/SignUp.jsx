import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

export default function SignUp({ setUser }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim().toLowerCase();
    const password = e.target.password.value;
    const stored = JSON.parse(localStorage.getItem('livewellUser'));
    if (stored && stored.email === email) {
      setError('An account with this email already exists. Please login.');
      return;
    }
    const user = { name, email, password };
    localStorage.setItem('livewellUser', JSON.stringify(user));
    setSuccess('Sign up successful! Please login.');
    setTimeout(() => {
      navigate('/login');
    }, 1200);
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <h2>Sign Up</h2>
        <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
          <input name="name" type="text" placeholder="Name" required />
          <input name="email" type="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" required />
          <button type="submit" className="auth-btn primary">Create Account</button>
        </form>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
} 