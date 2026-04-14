import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCarousel = ({ movies, title, subtitle, autoScroll = true, speed = 0.6 }) => {
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const speedRef = useRef(speed);

  // If autoScroll is true, we duplicate movies for a seamless loop
  const items = autoScroll ? [...movies, ...movies] : movies;

  useEffect(() => {
    speedRef.current = speed; // Update ref if prop changes
  }, [speed]);

  useEffect(() => {
    if (!autoScroll) return;

    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      posRef.current -= speedRef.current;
      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(posRef.current) >= halfWidth) {
        posRef.current = 0;
      }
      track.style.transform = `translateX(${posRef.current}px)`;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [autoScroll]);

  const pauseScroll = () => { if (autoScroll) speedRef.current = 0; };
  const resumeScroll = () => { if (autoScroll) speedRef.current = speed; };

  return (
    <div className="section-pad" id={`carousel-${title?.replace(/\s/g, '-').toLowerCase()}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{title || 'Recommended Movies'}</h2>
          <a href="/movies" className="see-all-link">See All →</a>
        </div>
        {subtitle && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px', marginTop: '-10px' }}>
            {subtitle}
          </p>
        )}
      </div>

      {autoScroll ? (
        // Auto-scrolling infinite container
        <div className="h-scroll-wrap" onMouseEnter={pauseScroll} onMouseLeave={resumeScroll}>
          <div
            ref={trackRef}
            style={{ display: 'flex', gap: '16px', padding: '4px 24px 16px', willChange: 'transform' }}
          >
            {items.map((movie, idx) => (
              <div
                key={`${movie.id}-${idx}`}
                className="movie-card-v2"
                onClick={() => navigate(`/movie/${movie.id}`)}
                style={{ flexShrink: 0 }}
                id={idx < movies.length ? `movie-card-${movie.id}` : undefined}
              >
                <img src={movie.poster} alt={movie.title} loading="lazy" />
                <div className="cert-badge">{movie.certificate}</div>
                {movie.trending && <div className="book-now-tag">🔥 HOT</div>}
                <div className="card-overlay">
                  <div className="card-title">{movie.title}</div>
                  <div className="card-rating">⭐ {movie.rating} <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>({movie.votes})</span></div>
                  <div className="card-lang">{movie.language} • {movie.genre[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Standard overflow-x scroll container
        <div className="container">
          <div className="h-scroll-track" style={{ padding: '4px 2px 16px', margin: '0 -2px' }}>
            {items.map((movie) => (
              <div
                key={`movie-${movie.id}`}
                className="movie-card-v2"
                onClick={() => navigate(`/movie/${movie.id}`)}
                style={{ flexShrink: 0 }}
                id={`movie-card-${movie.id}`}
              >
                <img src={movie.poster} alt={movie.title} loading="lazy" />
                <div className="cert-badge">{movie.certificate}</div>
                {movie.trending && <div className="book-now-tag">🔥 HOT</div>}
                <div className="card-overlay">
                  <div className="card-title">{movie.title}</div>
                  <div className="card-rating">⭐ {movie.rating} <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>({movie.votes})</span></div>
                  <div className="card-lang">{movie.language} • {movie.genre[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCarousel;
