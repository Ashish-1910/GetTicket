import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import moviesData from '../data/movies.json';

// Get the top 5 trending movies for the hero carousel
const SLIDES = moviesData.filter(m => m.trending).slice(0, 5);

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const goTo = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 150);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo, SLIDES.length]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo, SLIDES.length]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  if (!SLIDES.length) return null;

  const slide = SLIDES[current];

  return (
    <div className="hero-carousel" id="hero-carousel">
      {/* Background */}
      <div
        className="hero-slide-bg"
        style={{
          position: 'absolute', inset: 0,
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
        <img src={slide.backdrop} alt={slide.title} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(90deg, rgba(12,12,12,0.95) 0%, rgba(12,12,12,0.6) 50%, rgba(12,12,12,0.2) 100%)`,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(0deg, #0c0c0c 0%, transparent 50%)',
        }} />
      </div>

      {/* Content */}
      <div className="hero-slide" style={{ minHeight: '520px', position: 'relative', zIndex: 2 }}>
        <div className="container hero-slide-content">
          <div
            style={{
              maxWidth: '600px',
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            <div className="hero-meta">
              {slide.genre.map(t => (
                <span key={t} className="hero-tag">{t}</span>
              ))}
            </div>
            <h1 className="hero-movie-title">{slide.title}</h1>
            <p className="hero-desc">{slide.description.length > 120 ? slide.description.substring(0, 120) + '...' : slide.description}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <span className="hero-rating">⭐ {slide.rating}/10</span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{slide.votes} votes</span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{slide.language}</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                className="btn-accent-cv"
                onClick={() => navigate(`/movie/${slide.id}`)}
                id={`hero-book-${slide.id}`}
              >
                🎟️ Book Tickets
              </button>
              <button
                className="btn-outline-cv"
                onClick={() => navigate(`/movie/${slide.id}`)}
                style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}
              >
                ▶ More Info
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button className="carousel-arrow prev" onClick={prev} aria-label="Previous">‹</button>
      <button className="carousel-arrow next" onClick={next} aria-label="Next">›</button>

      {/* Dots */}
      <div className="carousel-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
