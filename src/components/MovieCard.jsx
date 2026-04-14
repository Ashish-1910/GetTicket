import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`movie-card fade-in fade-in-delay-${(index % 4) + 1}`}
      onClick={() => navigate(`/movie/${movie.id}`)}
      id={`movie-card-${movie.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/movie/${movie.id}`)}
    >
      {/* Poster Image */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="movie-poster"
        loading="lazy"
      />

      {/* Overlay Content */}
      <div className="card-img-overlay">
        {/* Rating */}
        <div className="mb-2">
          <span className="movie-rating-badge">
            ⭐ {movie.rating}/10
          </span>
        </div>

        {/* Title */}
        <h5
          className="mb-1"
          style={{
            color: '#fff',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.1rem',
          }}
        >
          {movie.title}
        </h5>

        {/* Genre Tags */}
        <div className="mb-2">
          {movie.genre.map((g) => (
            <span key={g} className="genre-tag">
              {g}
            </span>
          ))}
        </div>

        {/* Meta Info */}
        <div
          className="d-flex align-items-center gap-3"
          style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}
        >
          <span>🌐 {movie.language}</span>
          <span>⏱️ {movie.duration}</span>
          <span>📜 {movie.certificate}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
