import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import ConfettiAnimation from '../components/ConfettiAnimation';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const booking = location.state?.booking;

  const [showConfetti, setShowConfetti] = useState(true);
  const [animStep, setAnimStep] = useState(0);

  useEffect(() => {
    if (!booking) {
      navigate('/', { replace: true });
      return;
    }

    // Staggered reveal
    const timers = [
      setTimeout(() => setAnimStep(1), 300),
      setTimeout(() => setAnimStep(2), 700),
      setTimeout(() => setAnimStep(3), 1100),
    ];

    showToast({
      type: 'success',
      title: '🎟️ Booking Confirmed!',
      subtitle: `Enjoy ${booking.movieTitle}! See you at the movies.`,
      duration: 5000,
    });

    return () => timers.forEach(clearTimeout);
  }, [booking, navigate, showToast]);

  if (!booking) return null;

  const formatDate = (d) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div
      id="booking-confirmation-page"
      style={{
        minHeight: '80vh',
        padding: '40px 20px 60px',
        background: 'var(--bg)',
      }}
    >
      <ConfettiAnimation active={showConfetti} onDone={() => setShowConfetti(false)} />

      <div className="container" style={{ maxWidth: '500px' }}>
        <div className="confirm-wrap">

          {/* Success Icon with animation */}
          <div
            className="confirm-icon"
            style={{
              opacity: animStep >= 1 ? 1 : 0,
              transform: animStep >= 1 ? 'scale(1)' : 'scale(0)',
              transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
              animation: animStep >= 1 ? 'pulseGlow 2.5s ease-in-out infinite' : 'none',
            }}
          >
            🎉
          </div>

          <style>{`
            @keyframes pulseGlow {
              0%,100% { box-shadow: 0 0 30px rgba(0,200,150,0.35); }
              50% { box-shadow: 0 0 70px rgba(0,200,150,0.7); }
            }
          `}</style>

          <h1
            style={{
              fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary)',
              marginBottom: '6px',
              opacity: animStep >= 1 ? 1 : 0,
              transform: animStep >= 1 ? 'none' : 'translateY(16px)',
              transition: 'all 0.45s ease 0.2s',
            }}
          >
            Booking Confirmed! 🎊
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '28px',
              opacity: animStep >= 1 ? 1 : 0,
              transition: 'all 0.45s ease 0.3s',
            }}
          >
            Your ticket has been booked successfully. Check your inbox for confirmation.
          </p>

          {/* Ticket Card */}
          <div
            className="ticket-stub"
            style={{
              opacity: animStep >= 2 ? 1 : 0,
              transform: animStep >= 2 ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.5s ease 0.2s',
            }}
          >
            {/* Ticket Header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '18px', paddingBottom: '14px',
              borderBottom: '1px dashed var(--border-strong)',
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '4px' }}>
                  Booking ID
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px' }}>
                  #{booking.id?.toUpperCase?.() || booking.id}
                </div>
              </div>
              <div style={{
                background: 'var(--gradient-brand)',
                color: '#000', fontWeight: 800, fontSize: '0.7rem',
                padding: '6px 14px', borderRadius: 'var(--radius-full)', letterSpacing: 1,
              }}>
                CONFIRMED
              </div>
            </div>

            {/* Movie Info */}
            <h2 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '6px', color: 'var(--text)' }}>
              {booking.movieTitle}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '18px' }}>
              {booking.language}
            </p>

            {/* Details Grid */}
            {[
              ['🎭 Theater', booking.theater],
              ['📅 Date', formatDate(booking.bookedAt)],
              ['⏰ Show Time', booking.showTime],
              ['💺 Seats', booking.seats?.join(', ')],
            ].map(([label, value]) => (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '9px 0', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: '4px',
              }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)' }}>{value}</span>
              </div>
            ))}

            {/* Total */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginTop: '16px', paddingTop: '16px',
              borderTop: '2px dashed var(--border-strong)',
            }}>
              <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>Total Paid</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--primary)' }}>
                ₹{booking.totalAmount?.toLocaleString()}
              </span>
            </div>

            {/* Booked by */}
            <div style={{
              marginTop: '12px', textAlign: 'center',
              fontSize: '0.75rem', color: 'var(--text-muted)',
            }}>
              Booked by {booking.userName} ({booking.userEmail})
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap',
              opacity: animStep >= 3 ? 1 : 0,
              transform: animStep >= 3 ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.45s ease 0.2s',
            }}
          >
            <Link to="/my-bookings" className="btn-primary-cv" id="view-bookings-btn">
              🎟️ My Bookings
            </Link>
            <Link to="/" className="btn-outline-cv" id="back-home-btn">
              🏠 Go Home
            </Link>
          </div>

          {/* Fun message */}
          <div
            style={{
              marginTop: '20px', padding: '14px 20px',
              background: 'rgba(0,200,150,0.07)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem', color: 'var(--text-secondary)',
              lineHeight: 1.6,
              opacity: animStep >= 3 ? 1 : 0,
              transition: 'all 0.45s ease 0.35s',
            }}
          >
            🍿 <strong>Pro Tip:</strong> Arrive 15 minutes early to grab your favorite seats!
            Outside food is not permitted. Please carry a valid ID for A-rated films.
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
