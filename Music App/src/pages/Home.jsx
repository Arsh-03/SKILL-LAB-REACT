import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/music');
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-card">
        <div className="signin-header">
          <i className="bi bi-music-note-beamed"></i>
          <h2>Music App</h2>
          <p>Sign in to start your journey</p>
        </div>
        <form onSubmit={handleSignIn}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="custom-input" 
              placeholder="name@example.com" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="custom-input" 
              placeholder="••••••••" 
              required 
            />
          </div>
          <button type="submit" className="signin-btn">
            Sign In
          </button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? <a href="#">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Home;