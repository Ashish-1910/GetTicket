import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';

const MyBookings = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getBookings, cancelBooking } = useBooking();
  const { showToast } = useToast();
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="container text-center py-5 animate-fade-up" style={{ minHeight: '60vh' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔒</div>
        <h2 style={{ fontWeight: 800 }}>Please Login</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          You need to be logged in to view your bookings
        </p>
        <button className="btn-primary-cv" onClick={() => navigate('/login')}>
          Sign In Now
        </button>
      </div>
    );
  }

  const userBookings = getBookings(user.email);

  const handleCancel = (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) return;
    setCancellingId(bookingId);
    setTimeout(() => {
      cancelBooking(bookingId);
      setCancellingId(null);
      showToast({
        type: 'info',
        title: 'Booking Cancelled',
        subtitle: 'Your ticket has been cancelled successfully.',
        duration: 3500,
      });
    }, 600);
  };

  return (
    <main className="container py-5" id="my-bookings-page" style={{ minHeight: '70vh' }}>
      <h2 className="mb-4 animate-fade-up" style={{ fontWeight: 800 }}>
        🎟️ My Bookings
      </h2>

      {userBookings.length === 0 ? (
        <div className="text-center py-5 animate-fade-up animate-delay-1">
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎬</div>
          <h4 style={{ fontWeight: 700, marginBottom: '8px' }}>No bookings yet!</h4>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Start by browsing movies or events and booking your first show
          </p>
          <button className="btn-primary-cv mt-2" onClick={() => navigate('/')}>
            🍿 Browse Movies
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {userBookings.map((booking, idx) => (
            <div className="col-md-6 col-lg-4" key={booking.id}>
              <div
                className={`animate-fade-up animate-delay-${(idx % 4) + 1}`}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: cancellingId === booking.id ? 0.5 : 1,
                  transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  if (cancellingId !== booking.id) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                {/* Decorative cutouts for ticket look */}
                <div style={{ position: 'absolute', width: 20, height: 20, background: 'var(--bg)', borderRadius: '50%', left: -10, top: '55%' }} />
                <div style={{ position: 'absolute', width: 20, height: 20, background: 'var(--bg)', borderRadius: '50%', right: -10, top: '55%' }} />

                <div className="d-flex gap-3 mb-3">
                  <img
                    src={booking.moviePoster}
                    alt={booking.movieTitle}
                    style={{
                      width: 70,
                      height: 95,
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  />
                  <div>
                    <h6 className="mb-1" style={{ fontWeight: 800, fontSize: '1rem', lineHeight: 1.3 }}>
                      {booking.movieTitle}
                    </h6>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: 4 }}>
                      🎬 {booking.theater}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      🕐 {booking.showTime}
                    </div>
                  </div>
                </div>

                <div className="divider-line" style={{ borderStyle: 'dashed' }} />

                <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Seats</span>
                  <span style={{ fontWeight: 600 }}>{booking.seats.sort().join(', ')}</span>
                </div>
                <div className="d-flex justify-content-between mb-3" style={{ fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Amount</span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.95rem' }}>
                    ₹{booking.totalAmount}
                  </span>
                </div>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ fontSize: '0.8rem' }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>Booking ID</span>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      color: 'var(--text-muted)',
                      fontSize: '0.75rem',
                      background: 'var(--bg-elevated)',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-xs)',
                    }}
                  >
                    {booking.id?.toUpperCase() || booking.id}
                  </span>
                </div>

                <button
                  className="btn-outline-cv w-100 mt-4"
                  onClick={() => handleCancel(booking.id)}
                  disabled={cancellingId === booking.id}
                  style={{ padding: '8px', fontSize: '0.85rem', borderColor: 'var(--border-strong)', color: 'var(--text-secondary)' }}
                >
                  {cancellingId === booking.id ? (
                      <span className="d-flex align-items-center justify-content-center gap-2">
                          <span className="cv-spinner" style={{width: 14, height: 14, borderWidth: 2}}></span> Cancelling...
                      </span>
                  ) : '✕ Cancel Booking'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MyBookings;
