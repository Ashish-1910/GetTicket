import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import moviesData from '../data/movies.json';

const GENRES = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'];
const LANGUAGES = ['All', 'Hindi', 'English'];
const RATINGS = ['All', '7+', '8+', '9+'];
const SORTS = ['Popularity', 'Rating (High)', 'Rating (Low)', 'Newest', 'A-Z'];

const MovieCard = ({ movie, index }) => {
  const navigate = useNavigate();
  return (
    <div
      className="animate-fade-up"
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.2s ease',
        }}
        onClick={() => navigate(`/movie/${movie.id}`)}
        id={`movie-grid-card-${movie.id}`}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.4)';
          e.currentTarget.style.borderColor = 'var(--primary)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '';
          e.currentTarget.style.borderColor = '';
        }}
      >
        {/* Poster */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={movie.poster}
            alt={movie.title}
            style={{ width: '100%', height: '260px', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            loading="lazy"
          />
          <div style={{
            position: 'absolute', top: 8, left: 8,
            background: 'rgba(0,0,0,0.8)', color: '#fff',
            fontSize: '0.62rem', fontWeight: 700,
            padding: '2px 7px', borderRadius: 'var(--radius-xs)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            {movie.certificate}
          </div>
          {movie.trending && (
            <div style={{
              position: 'absolute', top: 8, right: 8,
              background: 'linear-gradient(135deg, #ff6b35, #e55a25)',
              color: '#fff', fontSize: '0.62rem', fontWeight: 700,
              padding: '3px 8px', borderRadius: 'var(--radius-xs)',
            }}>
              🔥 TRENDING
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '14px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text)', lineHeight: 1.3 }}>
            {movie.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span className="rating-stars">⭐ {movie.rating}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({movie.votes})</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
            {movie.genre.map(g => (
              <span key={g} className="genre-pill" style={{ fontSize: '0.68rem' }}>{g}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              🌐 {movie.language} • ⏱ {movie.duration}
            </span>
            <button
              className="btn-accent-cv"
              style={{ padding: '6px 14px', fontSize: '0.78rem' }}
              onClick={(e) => { e.stopPropagation(); navigate(`/movie/${movie.id}`); }}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Movies = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [genre, setGenre] = useState('All');
  const [language, setLanguage] = useState('All');
  const [rating, setRating] = useState('All');
  const [sort, setSort] = useState('Popularity');

  useEffect(() => {
    const q = searchParams.get('search');
    if (q) setSearch(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...moviesData];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q) ||
        m.cast.some(c => c.toLowerCase().includes(q)) ||
        m.genre.some(g => g.toLowerCase().includes(q))
      );
    }
    if (genre !== 'All') result = result.filter(m => m.genre.includes(genre));
    if (language !== 'All') result = result.filter(m => m.language === language);
    if (rating !== 'All') result = result.filter(m => m.rating >= parseFloat(rating.replace('+', '')));

    if (sort === 'Rating (High)') result.sort((a, b) => b.rating - a.rating);
    else if (sort === 'Rating (Low)') result.sort((a, b) => a.rating - b.rating);
    else if (sort === 'A-Z') result.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === 'Newest') result.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    else result.sort((a, b) => parseInt(b.votes) - parseInt(a.votes));

    return result;
  }, [search, genre, language, rating, sort]);

  const clearFilters = () => {
    setSearch(''); setGenre('All'); setLanguage('All');
    setRating('All'); setSort('Popularity');
  };

  const hasActiveFilters = search || genre !== 'All' || language !== 'All' || rating !== 'All';

  return (
    <main id="movies-page" style={{ padding: '32px 0 60px' }}>
      <div className="container">
        {/* Page Header */}
        <div className="animate-fade-up" style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            🎬 <span style={{ color: 'var(--primary)' }}>Movies</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Discover and book tickets for the latest blockbusters
          </p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar animate-fade-up animate-delay-1" id="filter-bar">
          <div className="row g-3 align-items-end">
            {/* Search */}
            <div className="col-md-4">
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                🔍 Search
              </label>
              <input
                type="text"
                placeholder="Movie, Director, Cast..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                id="movies-search-input"
              />
            </div>

            {/* Genre */}
            <div className="col-6 col-md-2">
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                🎭 Genre
              </label>
              <select value={genre} onChange={e => setGenre(e.target.value)} id="genre-select">
                {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            {/* Language */}
            <div className="col-6 col-md-2">
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                🌐 Language
              </label>
              <select value={language} onChange={e => setLanguage(e.target.value)} id="language-select">
                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            {/* Rating */}
            <div className="col-6 col-md-2">
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                ⭐ Min Rating
              </label>
              <select value={rating} onChange={e => setRating(e.target.value)} id="rating-select">
                {RATINGS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* Sort */}
            <div className="col-6 col-md-2">
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                📊 Sort By
              </label>
              <select value={sort} onChange={e => setSort(e.target.value)} id="sort-select">
                {SORTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Results + Clear */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Showing <strong style={{ color: 'var(--primary)' }}>{filtered.length}</strong> of {moviesData.length} movies
            </span>
            {hasActiveFilters && (
              <button className="btn-outline-cv" style={{ padding: '6px 16px', fontSize: '0.82rem' }} onClick={clearFilters} id="clear-filters-btn">
                ✕ Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Genre Quick-Select Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {GENRES.map(g => (
            <button
              key={g}
              className={`interest-chip ${genre === g ? 'selected' : ''}`}
              onClick={() => setGenre(g)}
              id={`genre-pill-${g.toLowerCase()}`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Movie Grid */}
        {filtered.length > 0 ? (
          <div className="row g-3 g-md-4">
            {filtered.map((movie, i) => (
              <div className="col-6 col-md-4 col-lg-3" key={movie.id}>
                <MovieCard movie={movie} index={i} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 animate-fade-up" id="no-movies-found">
            <div style={{ fontSize: '4rem', marginBottom: '12px' }}>🎭</div>
            <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>No movies found</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Try adjusting your filters or search term
            </p>
            <button className="btn-outline-cv" onClick={clearFilters}>Clear All Filters</button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Movies;
