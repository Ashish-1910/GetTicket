import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const Footer = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    showToast({
      type: 'success',
      title: 'Subscribed!',
      subtitle: `You'll now receive updates at ${email}.`,
      duration: 4000
    });
    setEmail('');
  };

  return (
    <footer className="footer-main" id="main-footer">
      <div className="container">
        <div className="row g-4">

          {/* Brand Column */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-brand">🎬 GetTickets</div>
            <p className="footer-desc">
              India's premier movie and events booking platform. Book tickets for movies, concerts, sports, workshops, and more!
            </p>
            <div className="footer-social mt-3">
              <a href="#" className="social-btn" title="Facebook" aria-label="Facebook">📘</a>
              <a href="#" className="social-btn" title="Instagram" aria-label="Instagram">📸</a>
              <a href="#" className="social-btn" title="Twitter" aria-label="Twitter">🐦</a>
              <a href="#" className="social-btn" title="YouTube" aria-label="YouTube">▶️</a>
            </div>
          </div>

          {/* Movies & Events */}
          <div className="col-lg-2 col-md-6">
            <div className="footer-col-title">Explore</div>
            <ul className="footer-links">
              <li><Link to="/movies">🎬 Movies</Link></li>
              <li><Link to="/events">🎭 Events</Link></li>
              <li><Link to="/sports">🏏 Sports</Link></li>
              <li><Link to="/ipl">🏆 IPL 2026</Link></li>
              <li><Link to="/stream">📺 Stream</Link></li>
              <li><Link to="/offers">🏷️ Offers</Link></li>
              <li><Link to="/giftcards">🎁 Gift Cards</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="col-lg-2 col-md-6">
            <div className="footer-col-title">Help</div>
            <ul className="footer-links">
              <li><Link to="/contact">Customer Support</Link></li>
              <li><Link to="/contact">Booking FAQ</Link></li>
              <li><Link to="/contact">Cancellation Policy</Link></li>
              <li><Link to="/contact">Report an Issue</Link></li>
              <li><Link to="/my-bookings">My Bookings</Link></li>
              <li><Link to="/my-bookings">Ticket Details</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-lg-2 col-md-6">
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/about">Careers</Link></li>
              <li><a href="#">Press / Media</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Partners</a></li>
              <li><a href="#">Advertise</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-col-title">Stay Updated</div>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.6 }}>
              Subscribe to get exclusive deals, early access to tickets, and personalized movie recommendations.
            </p>
            <form
              onSubmit={handleSubscribe}
              style={{ display: 'flex', gap: '8px' }}
              id="newsletter-form"
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-strong)',
                  color: 'var(--text)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '9px 12px',
                  fontSize: '0.82rem',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                }}
                id="newsletter-email"
                required
              />
              <button
                type="submit"
                className="btn-primary-cv"
                style={{ padding: '9px 16px', fontSize: '0.82rem' }}
              >
                Subscribe
              </button>
            </form>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © 2026 GetTickets™. All rights reserved. | A Demo Project — Not affiliated with BookMyShow.
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.78rem', transition: 'color 0.18s' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.78rem', transition: 'color 0.18s' }}>Terms of Use</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.78rem', transition: 'color 0.18s' }}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
