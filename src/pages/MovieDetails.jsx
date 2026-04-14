import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moviesData from '../data/movies.json';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      const found = moviesData.find((m) => m.id === parseInt(id));
      setMovie(found || null);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [id]);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      showToast({ type: 'info', title: 'Login Required', subtitle: 'Please log in to book tickets.', duration: 3500 });
      navigate('/login', { state: { from: `/movie/${id}` } });
      return;
    }
    if (!selectedShow) {
      showToast({ type: 'error', title: 'Oops!', subtitle: 'Please select a showtime first.' });
      return;
    }
    navigate(`/booking/${id}`, {
      state: { show: selectedShow },
    });
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
      <div className="container text-center py-5 animate-fade-up" style={{ minHeight: '60vh' }}>
        <div style={{ fontSize: '5rem', marginBottom: '16px' }}>🎬</div>
        <h2>Movie Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          The movie you're looking for doesn't exist or has been removed.
        </p>
        <button className="btn-primary-cv" onClick={() => navigate('/')}>
          🏠 Back to Home
        </button>
      </div>
    );
  }

  return (
    <main id="movie-details-page">
      {/* ─── Hero Backdrop ─── */}
      <section className="movie-detail-hero">
        <div className="movie-detail-bg">
          <img src={movie.backdrop} alt={movie.title} />
        </div>
        <div className="container movie-detail-content">
          <div className="row align-items-end g-4">
            {/* Poster */}
            <div className="col-md-3 animate-fade-up">
              <img
                src={movie.poster}
                alt={movie.title}
                style={{
                  width: '100%',
                  maxWidth: '260px',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              />
            </div>

            {/* Details */}
            <div className="col-md-9 animate-fade-up animate-delay-1">
              <div className="d-flex gap-2 mb-3 flex-wrap">
                {movie.genre.map((g) => (
                  <span key={g} className="genre-pill">
                    {g}
                  </span>
                ))}
              </div>
              <h1
                style={{
                  fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  color: '#fff',
                  textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                }}
              >
                {movie.title}
              </h1>
              <div
                className="d-flex flex-wrap gap-3 mt-3 align-items-center"
                style={{ fontSize: '0.95rem' }}
              >
                <span className="rating-stars" style={{ fontSize: '1.1rem' }}>
                  ⭐ {movie.rating}/10
                </span>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>
                  🌐 {movie.language}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>
                  ⏱️ {movie.duration}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>
                  📜 {movie.certificate}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>
                  📅 {movie.releaseDate}
                </span>
              </div>
              <p
                className="mt-4"
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  maxWidth: '720px',
                }}
              >
                {movie.description}
              </p>
              <div className="mt-3" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                <strong style={{ color: '#fff' }}>Director:</strong> {movie.director}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginTop: '6px' }}>
                <strong style={{ color: '#fff' }}>Cast:</strong> {movie.cast.join(', ')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Showtimes ─── */}
      <section className="container py-5 mt-3" id="showtimes-section">
        <div className="section-header">
          <h2 className="section-title">🎬 Select <span>Showtime</span></h2>
        </div>

        <div className="row g-3 animate-fade-up animate-delay-2 mt-2">
          {movie.shows.map((show, idx) => (
            <div className="col-6 col-md-4 col-lg-3" key={idx}>
              <button
                className={`show-btn ${selectedShow?.time === show.time ? 'selected' : ''}`}
                onClick={() => setSelectedShow(show)}
                id={`show-${idx}`}
              >
                <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '4px' }}>
                  {show.time}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  📍 {show.theater}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)' }}>
                  ₹{show.price}
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Book Button */}
        <div className="mt-5 animate-fade-up animate-delay-3" style={{ maxWidth: '400px' }}>
          <button
            className="btn-accent-cv w-100"
            onClick={handleBookNow}
            disabled={!selectedShow}
            id="book-now-btn"
            style={{
              padding: '16px',
              fontSize: '1.08rem',
              opacity: selectedShow ? 1 : 0.5,
              justifyContent: 'center'
            }}
          >
            🎟️ {selectedShow ? `Book Tickets • ₹${selectedShow.price}` : 'Select a Showtime'}
          </button>
          {!isAuthenticated && (
            <p className="mt-3 text-center" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              ⚠️ You must be logged in to book tickets
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default MovieDetails;
