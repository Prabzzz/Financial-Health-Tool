import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function UserRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/`, {
        username,
        password,
        business_type: businessType,
      });

      setSuccess(true);
      setTimeout(() => navigate('/financials'), 1800);
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        'Unable to create account. Please try again.';
      setError(msg);
    }
  };

  return (
    <div
      className="container"
      style={{ maxWidth: '640px' }}  
    >
      <div className="card">
        <div className="header">
          <h1>Financial Health Platform</h1>
          <p>Create your business account in under a minute</p>
        </div>

        <div className="form-container">
          {success ? (
            <div className="success">
              <strong>Account created successfully 🎉</strong>
              <br />
              Preparing your financial dashboard...
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>
                  Get started
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem' }}>
                  Set up your account to track financial performance and insights.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.trim())}
                    placeholder="e.g. prabhakaran_admin"
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="businessType">Business Category</label>
                  <select
                    id="businessType"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    required
                  >
                    <option value="">Choose your industry</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                    <option value="Services">Services</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Agriculture">Agriculture</option>
                  </select>
                </div>

                {error && <div className="error">{error}</div>}

                <button type="submit">Create Account</button>

                <p
                  style={{
                    textAlign: 'center',
                    marginTop: '1rem',
                    fontSize: '0.85rem',
                    color: '#64748b',
                  }}
                >
                  Secure registration · No credit card required
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
