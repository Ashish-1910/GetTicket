import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ConfettiAnimation from '../components/ConfettiAnimation';

const Login = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const from = location.state?.from || '/';

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 800)); // Simulate async

    const result = login(form.email, form.password);
    setLoading(false);

    if (result.success) {
      setShowConfetti(true);
      setSuccessMsg(true);
      showToast({
        type: 'success',
        title: `🎉 Welcome back, ${result.user?.name?.split(' ')[0]}!`,
        subtitle: 'You\'re now signed in. Enjoy the show!',
        duration: 4000,
      });
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 2000);
    } else {
      setErrors({ general: result.message || 'Invalid email or password' });
      showToast({ type: 'error', title: 'Login Failed', subtitle: result.message, duration: 3500 });
    }
  };

  return (
    <div className="auth-wrap" id="login-page">
      <ConfettiAnimation active={showConfetti} onDone={() => setShowConfetti(false)} />

      <div className="auth-box animate-fade-up">

        {/* Success Message */}
        {successMsg ? (
          <div className="text-center" style={{ padding: '20px 0' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'var(--gradient-brand)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '2.5rem',
              animation: 'popIn 0.5s ease both',
              boxShadow: '0 0 40px rgba(0,200,150,0.4)',
            }}>
              ✅
            </div>
            <h2 style={{ fontWeight: 800, marginBottom: '8px', color: 'var(--primary)' }}>You're in! 🎉</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Redirecting you now...</p>
            <div style={{ marginTop: '16px', display: 'flex', gap: '6px', justifyContent: 'center' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)',
                  animation: `bounce 0.8s ${i * 0.15}s ease infinite alternate`,
                }} />
              ))}
            </div>
            <style>{`
              @keyframes bounce { from { transform: translateY(0) } to { transform: translateY(-8px) } }
              @keyframes popIn { 0%{opacity:0;transform:scale(.4)} 70%{transform:scale(1.1)} 100%{opacity:1;transform:scale(1)} }
            `}</style>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center" style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎬</div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '6px' }}>Welcome Back!</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Sign in to continue booking amazing experiences
              </p>
            </div>

            {/* General Error */}
            {errors.general && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                color: '#ef4444', borderRadius: 'var(--radius-sm)', padding: '12px 16px',
                fontSize: '0.88rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                ❌ {errors.general}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} id="login-form" noValidate>
              {/* Email */}
              <div style={{ marginBottom: '18px' }}>
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="cv-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  id="login-email"
                  autoComplete="email"
                />
                {errors.email && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '5px' }}>⚠ {errors.email}</div>}
              </div>

              {/* Password */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ margin: 0 }}>Password</label>
                  <a href="#" style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Forgot password?</a>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="cv-input"
                    placeholder="Your password"
                    value={form.password}
                    onChange={handleChange}
                    id="login-password"
                    autoComplete="current-password"
                    style={{ paddingRight: '44px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem',
                    }}
                    id="toggle-password-login"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '5px' }}>⚠ {errors.password}</div>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-primary-cv"
                style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '1rem' }}
                disabled={loading}
                id="login-submit-btn"
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="cv-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Signing in...
                  </span>
                ) : '🚀 Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div style={{ textAlign: 'center', margin: '20px 0', color: 'var(--text-muted)', fontSize: '0.85rem', position: 'relative' }}>
              <span style={{ background: 'var(--bg-card)', padding: '0 12px', position: 'relative', zIndex: 1 }}>or</span>
              <div style={{ position: 'absolute', inset: '50% 0 auto', height: '1px', background: 'var(--border)' }} />
            </div>

            {/* Social Login (UI only) */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              {['🔵 Google', '📘 Facebook'].map(provider => (
                <button
                  key={provider}
                  onClick={() => showToast({ type: 'info', title: 'Coming Soon!', subtitle: `${provider.split(' ')[1]} login will be available soon.`, duration: 3000 })}
                  style={{
                    flex: 1, background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                    color: 'var(--text)', borderRadius: 'var(--radius-sm)', padding: '10px',
                    fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s',
                    fontFamily: 'var(--font-body)',
                  }}
                >{provider}</button>
              ))}
            </div>

            {/* Link to Signup */}
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              New to GetTickets?{' '}
              <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 700 }}>Create Account →</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
