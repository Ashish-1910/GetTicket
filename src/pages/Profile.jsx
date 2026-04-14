import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { bookings } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const userBookings = bookings.filter(b => b.userEmail === user.email);
  const totalSpent = userBookings.reduce((sum, b) => sum + b.totalAmount, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container" style={{ padding: '40px 12px 80px', maxWidth: '800px' }}>
      <div className="animate-fade-up">
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '24px' }}>
          👤 My Profile
        </h1>

        {/* Profile Card */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          marginBottom: '24px'
        }}>
          {/* Header Banner */}
          <div style={{ 
            height: '120px', 
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              bottom: '-40px',
              left: '30px',
              width: '80px',
              height: '80px',
              background: 'var(--bg-card)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              fontWeight: 800,
              color: 'var(--primary)',
              border: '4px solid var(--bg)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              {user.name?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>

          <div style={{ padding: '50px 30px 30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>{user.name}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>{user.email}</p>
              </div>
              <button onClick={handleLogout} className="btn-outline-cv" style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}>
                Sign Out
              </button>
            </div>

            <div className="row g-4" style={{ marginTop: '10px' }}>
              <div className="col-sm-6">
                <div style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '4px' }}>📞 Phone No.</div>
                  <div style={{ fontWeight: 600 }}>{user.phone || 'Not provided'}</div>
                </div>
              </div>
              <div className="col-sm-6">
                <div style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '4px' }}>📍 Location</div>
                  <div style={{ fontWeight: 600 }}>{user.city || 'Not provided'}</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>🎭 Favourite Genres</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {user.interests && user.interests.length > 0 ? (
                  user.interests.map(g => (
                    <span key={g} style={{ 
                      background: 'rgba(124, 58, 237, 0.1)', 
                      color: 'var(--primary)', 
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '0.85rem', 
                      fontWeight: 600 
                    }}>{g}</span>
                  ))
                ) : (
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No genres selected</span>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Stats Card */}
        <div className="row g-4">
          <div className="col-sm-6">
            <div style={{
              background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '16px'
            }}>
              <div style={{ fontSize: '2.5rem' }}>🎟️</div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Bookings</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{userBookings.length}</div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div style={{
              background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '16px'
            }}>
              <div style={{ fontSize: '2.5rem' }}>💰</div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Spent</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>₹{totalSpent}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
