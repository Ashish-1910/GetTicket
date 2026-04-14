import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import moviesData from '../data/movies.json';
import SeatMap from '../components/SeatMap';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';

const BookingPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addBooking, getBookings, globalBookedSeats } = useBooking();
  const { showToast } = useToast();

  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Promo and Discount state
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState(null);

  const show = location.state?.show;
  const showKey = `${id}_${show?.time}`;
  const movieBookedSeats = globalBookedSeats[showKey] || [];

  const userBookings = getBookings(user?.email);
  const isFirstTimeUser = userBookings.length === 0;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAuthenticated) {
      showToast({ type: 'info', title: 'Login Required', subtitle: 'Please log in to book tickets.' });
      navigate('/login', { state: { from: `/movie/${id}` } });
      return;
    }
    if (!show) {
      navigate(`/movie/${id}`);
      return;
    }
    // Auto-apply BOGO for first time user
    if (isFirstTimeUser && selectedSeats.length >= 2 && !appliedPromo) {
        setAppliedPromo('FIRSTBOGO');
        showToast({ type: 'success', title: 'Gift Unlocked! 🎁', subtitle: 'First-time user BOGO applied! You get 1 seat for free.', duration: 5000 });
    }

    const timer = setTimeout(() => {
      const found = moviesData.find((m) => m.id === parseInt(id));
      setMovie(found || null);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [id, isAuthenticated, navigate, show, showToast, isFirstTimeUser, selectedSeats.length]);

  const baseAmount = selectedSeats.length * (show?.price || 0);
  
  // Calculate discount logic
  let finalDiscount = discount;
  if (appliedPromo === 'FIRSTBOGO' && selectedSeats.length >= 2) {
    finalDiscount = show.price; // Discount one seat price
  }

  const finalAmount = Math.max(0, baseAmount - finalDiscount);

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase();
    if (code === 'GET25') {
        setDiscount(baseAmount * 0.25);
        setAppliedPromo('GET25');
        showToast({ type: 'success', title: 'Promo Applied', subtitle: '25% discount successfully applied!' });
    } else if (code === 'WELCOME50') {
        setDiscount(50);
        setAppliedPromo('WELCOME50');
        showToast({ type: 'success', title: 'Promo Applied', subtitle: '₹50 discount successfully applied!' });
    } else {
        showToast({ type: 'error', title: 'Invalid Code', subtitle: 'This promo code does not exist or has expired.' });
    }
    setPromoCode('');
  };

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      showToast({ type: 'error', title: 'Action needed', subtitle: 'Please select at least one seat!' });
      return;
    }

    const booking = addBooking({
      movieId: movie.id,
      movieTitle: movie.title,
      moviePoster: movie.poster,
      showTime: show.time,
      theater: show.theater,
      pricePerSeat: show.price,
      seats: selectedSeats,
      totalAmount: finalAmount,
      discount: finalDiscount,
      userEmail: user.email,
      userName: user.name,
    });

    navigate('/booking-confirmation', { state: { booking } });
  };

  if (loading) {
    return (
      <div className="spinner-wrap">
        <div className="cv-spinner" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container text-center py-5">
        <h2>Movie not found</h2>
        <button className="btn-primary-cv mt-3" onClick={() => navigate('/')}>
          🏠 Go Home
        </button>
      </div>
    );
  }

  return (
    <main className="container py-5" id="booking-page">
      <div className="row g-4">
        {/* Seat Selection */}
        <div className="col-lg-8">
          <div className="animate-fade-up" style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)', padding: '32px',
          }}>
            <div className="d-flex align-items-center gap-4 mb-4">
              <img
                src={movie.poster}
                alt={movie.title}
                style={{
                  width: 80, height: 110, objectFit: 'cover',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
                }}
              />
              <div>
                <h3 className="mb-2" style={{ fontWeight: 800 }}>{movie.title}</h3>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', display: 'flex', gap: '15px' }}>
                  <span>📍 {show.theater}</span>
                  <span>🕒 {show.time}</span>
                  <span className="text-primary-cv">🎟️ ₹{show.price}/seat</span>
                </div>
              </div>
            </div>

            <div className="divider-line" />

            {isFirstTimeUser && (
                <div style={{ background: 'var(--gradient-brand)', color: '#000', padding: '12px 20px', borderRadius: 'var(--radius-md)', marginBottom: '24px', fontWeight: 700, fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>🎁 FIRST TIME USER OFFER: Select 2 or more seats to get 1 FREE!</span>
                    <span style={{ background: '#000', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>AUTO-APPLIED</span>
                </div>
            )}

            <div className="my-4" style={{ overflowX: 'auto' }}>
              <SeatMap
                selectedSeats={selectedSeats}
                onSeatToggle={setSelectedSeats}
                movieBookedSeats={movieBookedSeats}
                maxSeats={10}
              />
            </div>
            
            <div className="d-flex justify-content-center gap-4 mt-4" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: 18, height: 18, border: '1.5px solid var(--border-strong)', background: 'var(--bg-elevated)', borderRadius: 4 }}></div>
                Available
              </div>
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: 18, height: 18, background: 'var(--primary)', borderRadius: 4, boxShadow: '0 0 10px var(--primary)' }}></div>
                Selected
              </div>
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: 18, height: 18, background: 'rgba(255,255,255,0.08)', borderRadius: 4 }}></div>
                Booked
              </div>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="col-lg-4">
          <div
            className="animate-fade-up animate-delay-1"
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)', padding: '32px',
              position: 'sticky', top: '100px',
              boxShadow: '0 20px 50px var(--shadow)'
            }}
          >
            <h5 className="mb-4" style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem' }}>🎟️</span> Order Summary
            </h5>

            <div className="mb-4">
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 12, fontWeight: 600 }}>
                SELECTED SEATS ({selectedSeats.length})
              </div>
              {selectedSeats.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  {selectedSeats.sort().map((seat) => (
                    <span key={seat} style={{ background: 'rgba(0, 200, 150, 0.1)', color: 'var(--primary)', padding: '6px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 700, border: '1px solid rgba(0, 200, 150, 0.2)' }}>
                      {seat}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>Pick your favorite spots!</p>
              )}
            </div>

            <div className="divider-line" />

            {/* Promo Code Input */}
            <div className="mb-4">
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>HAVE A PROMO CODE?</label>
              <div className="d-flex gap-2">
                <input 
                  type="text" 
                  className="cv-input" 
                  style={{ padding: '8px 12px', fontSize: '0.9rem', flex: 1 }} 
                  placeholder="Enter code..." 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button 
                  className="btn-primary-cv" 
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                  onClick={handleApplyPromo}
                >Apply</button>
              </div>
              {appliedPromo && (
                <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>
                  ✨ Promo "{appliedPromo}" applied!
                </div>
              )}
            </div>

            <div className="divider-line" />

            <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.92rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Ticket Price ({selectedSeats.length} × ₹{show.price})</span>
              <span>₹{baseAmount}</span>
            </div>
            
            {finalDiscount > 0 && (
              <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.92rem', color: 'var(--primary)' }}>
                <span>Discount Applied</span>
                <span>- ₹{finalDiscount}</span>
              </div>
            )}
            
            <div className="d-flex justify-content-between mb-4 align-items-center mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
              <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>Total Amount</span>
              <span style={{ fontWeight: 900, fontSize: '1.8rem', color: 'var(--primary)' }}>₹{finalAmount}</span>
            </div>

            <button
              className="btn-accent-cv w-100"
              onClick={handleConfirmBooking}
              disabled={selectedSeats.length === 0}
              style={{
                padding: '18px',
                fontSize: '1.1rem',
                justifyContent: 'center',
                boxShadow: selectedSeats.length > 0 ? '0 10px 30px rgba(255,107,53,0.3)' : 'none'
              }}
            >
              {selectedSeats.length > 0 ? `Pay ₹${finalAmount} & Book` : 'Select Seats'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingPage;
