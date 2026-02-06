import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserRegister() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    username: '',
    password: '',
    businessType: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const submit = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/`, {
        username: form.username,
        password: form.password,
        business_type: form.businessType,
      });
      navigate('/financials');
    } catch {
      setError('Account creation failed. Try again.');
    }
  };

  return (
    <div className="onboard-wrapper">
      {/* LEFT */}
      <div className="onboard-left">
        <h1>Financial Health Platform</h1>
        <p>Understand your business numbers. Make smarter decisions.</p>

        <div className="steps">
          <span className={step >= 1 ? 'active' : ''}>Account</span>
          <span className={step >= 2 ? 'active' : ''}>Security</span>
          <span className={step >= 3 ? 'active' : ''}>Business</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="onboard-right">
        {step === 1 && (
          <>
            <h2>Create your account</h2>
            <input
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
            <button onClick={next} disabled={!form.username}>
              Continue
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Secure it</h2>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <div className="row">
              <button className="ghost" onClick={back}>
                Back
              </button>
              <button onClick={next} disabled={form.password.length < 6}>
                Continue
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Business category</h2>

            <div className="grid">
              {[
                'Manufacturing',
                'Retail',
                'Services',
                'E-commerce',
                'Logistics',
                'Agriculture',
              ].map((t) => (
                <div
                  key={t}
                  className={`pill ${
                    form.businessType === t ? 'selected' : ''
                  }`}
                  onClick={() =>
                    setForm({ ...form, businessType: t })
                  }
                >
                  {t}
                </div>
              ))}
            </div>

            {error && <div className="error">{error}</div>}

            <div className="row">
              <button className="ghost" onClick={back}>
                Back
              </button>
              <button onClick={submit}>Finish</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserRegister;
