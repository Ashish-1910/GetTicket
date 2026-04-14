import React from 'react';

const SearchFilter = ({ filters, setFilters, genres, languages }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', genre: '', language: '', rating: '' });
  };

  const hasActiveFilters =
    filters.search || filters.genre || filters.language || filters.rating;

  return (
    <div className="search-filter-bar fade-in" id="search-filter-bar">
      <div className="row g-3 align-items-end">
        {/* Search */}
        <div className="col-md-4">
          <label className="form-label" style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>
            🔍 Search Movies
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Type a movie name..."
            name="search"
            value={filters.search}
            onChange={handleChange}
            id="search-input"
          />
        </div>

        {/* Genre */}
        <div className="col-md-2">
          <label className="form-label" style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>
            🎭 Genre
          </label>
          <select
            className="form-select"
            name="genre"
            value={filters.genre}
            onChange={handleChange}
            id="filter-genre"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div className="col-md-2">
          <label className="form-label" style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>
            🌐 Language
          </label>
          <select
            className="form-select"
            name="language"
            value={filters.language}
            onChange={handleChange}
            id="filter-language"
          >
            <option value="">All Languages</option>
            {languages.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div className="col-md-2">
          <label className="form-label" style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>
            ⭐ Rating
          </label>
          <select
            className="form-select"
            name="rating"
            value={filters.rating}
            onChange={handleChange}
            id="filter-rating"
          >
            <option value="">Any Rating</option>
            <option value="7">7+ ⭐</option>
            <option value="8">8+ ⭐</option>
            <option value="9">9+ ⭐</option>
          </select>
        </div>

        {/* Clear */}
        <div className="col-md-2 d-flex align-items-end">
          {hasActiveFilters && (
            <button
              className="btn-outline-cv w-100"
              onClick={clearFilters}
              id="clear-filters-btn"
              style={{ padding: '10px', fontSize: '0.85rem' }}
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
