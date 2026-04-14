import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ConfettiAnimation from '../components/ConfettiAnimation';

const GENRES = ['Action', 'Comedy', 'Drama', 'Romance', 'Sci-Fi', 'Horror', 'Thriller', 'Adventure', 'Animation'];
const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Other'];

const Signup = () => {
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '', password: '', confirmPassword: '',
  });
  const [interests, setInterests] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address';
    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone)) errs.phone = 'Enter a valid 10-digit Indian mobile number';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'At least 6 characters required';
    else if (!/[A-Z]/.test(form.password)) errs.password = 'Include at least 1 uppercase letter';
    else if (!/\d/.test(form.password)) errs.password = 'Include at least 1 number';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const toggleInterest = (genre) => {
    setInterests(prev => prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]);
  };

  const getPasswordStrength = () => {
    const p = form.password;
    if (!p) return null;
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/\d/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 1) return { label: 'Weak', color: '#ef4444', width: '25%' };
    if (score <= 2) return { label: 'Fair', color: '#f59e0b', width: '50%' };
    if (score <= 3) return { label: 'Good', color: '#3b82f6', width: '75%' };
    return { label: 'Strong 💪', color: '#00c896', width: '100%' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 900));

    const result = signup({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone,
      city: form.city,
      interests,
      password: form.password,
    });

    setLoading(false);

    if (result.success) {
      setShowConfetti(true);
      setSuccessMsg(true);
      showToast({
        type: 'success',
        title: `🎉 Welcome to GetTickets, ${form.name.split(' ')[0]}!`,
        subtitle: 'Your account has been created. Redirecting to login...',
        duration: 4000,
      });
      setTimeout(() => navigate('/login'), 2400);
    } else {
      setErrors({ general: result.message });
      showToast({ type: 'error', title: 'Signup Failed', subtitle: result.message, duration: 3500 });
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    background: 'var(--bg-elevated)',
    border: `1.5px solid ${errors[field] ? '#ef4444' : 'var(--border)'}`,
    color: 'var(--text)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    fontFamily: 'var(--font-body)',
    fontSize: '0.92rem',
    outline: 'none',
    transition: 'all 0.18s',
  });

  return (
    <div className="auth-wrap" id="signup-page">
      <ConfettiAnimation active={showConfetti} onDone={() => setShowConfetti(false)} />

      <div className="auth-box animate-fade-up" style={{ maxWidth: '520px', margin: '0 auto' }}>

        {successMsg ? (
          <div className="text-center" style={{ padding: '20px 0' }}>
            <div style={{
              width: 90, height: 90, borderRadius: '50%',
              background: 'var(--gradient-brand)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '2.8rem',
              animation: 'popIn 0.5s ease both',
              boxShadow: '0 0 50px rgba(0,200,150,0.5)',
            }}>
              🎊
            </div>
            <h2 style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>Account Created! 🎉</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Welcome to GetTickets, <strong>{form.name.split(' ')[0]}</strong>!<br />
              Redirecting you to sign in...
            </p>
            <style>{`
              @keyframes popIn { 0%{opacity:0;transform:scale(.4)} 70%{transform:scale(1.1)} 100%{opacity:1;transform:scale(1)} }
            `}</style>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center" style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>🎬</div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '4px' }}>Create Your Account</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                Join millions who love the movies!
              </p>
            </div>

            {errors.general && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                color: '#ef4444', borderRadius: 'var(--radius-sm)', padding: '12px 16px',
                fontSize: '0.88rem', marginBottom: '18px',
              }}>
                ❌ {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} id="signup-form" noValidate>
              <div className="row g-3">

                {/* Full Name */}
                <div className="col-12">
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '5px' }}>Full Name *</label>
                  <input type="text" name="name" style={inputStyle('name')} placeholder="Ashish Sharma" value={form.name} onChange={handleChange} id="signup-name" />
                  {errors.name && <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>⚠ {errors.name}</div>}
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '5px' }}>Email Address *</label>
                  <input type="email" name="email" style={inputStyle('email')} placeholder="you@example.com" value={form.email} onChange={handleChange} id="signup-email" />
                  {errors.email && <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>⚠ {errors.email}</div>}
                </div>

                {/* Phone */}
                <div className="col-md-6">
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '5px' }}>Phone Number</label>
                  <input type="tel" name="phone" style={inputStyle('phone')} placeholder="9876543210" value={form.phone} onChange={handleChange} id="signup-phone" maxLength={10} />
                  {errors.phone && <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>⚠ {errors.phone}</div>}
                </div>

                {/* City */}
                <div className="col-12">
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '5px' }}>Your City 📍</label>
                  <select name="city" value={form.city} onChange={handleChange} id="signup-city"
                    style={{ ...inputStyle('city'), appearance: 'none', cursor: 'pointer' }}>
                    <option value="">Select your city</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Interests */}
                <div className="col-12">
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    Favourite Genres 🎭 <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(pick any)</span>
                  </label>
                  <div className="interest-wrap">
                    {GENRES.map(g => (
                      <button
                        key={g}
                        type="button"
                        className={`interest-chip ${interests.includes(g) ? 'selected' : ''}`}
                        onClick={() => toggleInterest(g)}
                        id={`interest-${g.toLowerCase()}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Password */}
                <div className="col-md-6">
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '5px' }}>Password *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      style={{ ...inputStyle('password'), paddingRight: '44px' }}
                      placeholder="Min 6 chars, 1 cap, 1 num"
                      value={form.password}
                      onChange={handleChange}
                      id="signup-password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                      position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem',
                    }} id="toggle-password-signup">
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {/* Password strength */}
                  {strength && (
                    <div style={{ marginTop: '6px' }}>
                      <div style={{ height: '4px', background: 'var(--bg-elevated)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: strength.width, background: strength.color, transition: 'width 0.3s ease, background 0.3s ease', borderRadius: '4px' }} />
                      </div>
                      <div style={{ fontSize: '0.72rem', color: strength.color, marginTop: '3px', fontWeight: 600 }}>
                        {strength.label}
                      </div>
                    </div>
                  )}
                  {errors.password && <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>⚠ {errors.password}</div>}
                </div>

                {/* Confirm Password */}
                <div className="col-md-6">
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '5px' }}>Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    style={inputStyle('confirmPassword')}
                    placeholder="Repeat your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    id="signup-confirm-password"
                  />
                  {form.confirmPassword && form.confirmPassword === form.password && (
                    <div style={{ color: 'var(--primary)', fontSize: '0.78rem', marginTop: '4px' }}>✅ Passwords match</div>
                  )}
                  {errors.confirmPassword && <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>⚠ {errors.confirmPassword}</div>}
                </div>

                {/* Submit */}
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn-primary-cv"
                    style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '1rem', marginTop: '6px' }}
                    disabled={loading}
                    id="signup-submit-btn"
                  >
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className="cv-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Creating account...
                      </span>
                    ) : '🎉 Create My Account'}
                  </button>
                </div>
              </div>
            </form>

            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '20px' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>Sign In →</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
