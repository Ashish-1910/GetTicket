import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import moviesData from '../data/movies.json';

const getSuggestions = (query) => {
  if (!query) return [];
  const q = query.toLowerCase();
  const matchedMovies = moviesData.filter(m => m.title.toLowerCase().includes(q)).slice(0, 4);
  return matchedMovies;
}
const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'];

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const [searchFocused, setSearchFocused] = useState(false);

  const sidebarLinks = [
    { label: '🏠 Home', path: '/' },
    { label: '🎬 Movies', path: '/movies' },
    { label: '📺 Stream', path: '/stream' },
    { label: '🎭 Events', path: '/events' },
    { label: '🏏 Sports', path: '/sports' },
    { label: '🏆 IPL 2026', path: '/ipl' },
    { label: '🏷️ Offers', path: '/offers' },
    { label: '🎁 Gift Cards', path: '/giftcards' },
    { label: '👤 My Profile', path: '/profile' },
    { label: '🎟️ My Bookings', path: '/my-bookings' },
    { label: '🛠️ Admin Dashboard', path: '/admin' },
  ];

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchFocused(false);
      setShowMobileSearch(false);
    }
  };

  const handleSuggestionClick = (id) => {
    setSearchQuery('');
    setSearchFocused(false);
    setShowMobileSearch(false);
    navigate(`/movie/${id}`);
  };

  const renderSuggestions = () => {
    if (!searchFocused || searchQuery.trim().length === 0) return null;
    const suggestions = getSuggestions(searchQuery);
    
    return (
      <div style={{
        position: 'absolute', top: '110%', left: 0, right: 0,
        background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-strong)', padding: '8px 0', zIndex: 1000,
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        {suggestions.map(m => (
          <div key={m.id} onMouseDown={() => handleSuggestionClick(m.id)}
               style={{ padding: '8px 16px', display: 'flex', gap: '12px', cursor: 'pointer' }}
               className="hover-bg">
            <img src={m.poster} alt={m.title} style={{ width: 30, height: 40, objectFit: 'cover', borderRadius: 4 }} />
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{m.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.language} • {m.genre[0]}</div>
            </div>
          </div>
        ))}
        {suggestions.length === 0 && (
           <div style={{ padding: '8px 16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>No matches found</div>
        )}
        {suggestions.length > 0 && (
          <div 
            onMouseDown={() => handleSearch()}
            style={{ padding: '8px 16px', fontSize: '0.85rem', color: 'var(--primary)', textAlign: 'center', cursor: 'pointer', borderTop: '1px solid var(--border)' }}
            className="hover-bg"
          >
            View all results
          </div>
        )}
      </div>
    );
  };

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
    showToast({
      type: 'logout',
      title: '👋 Signed out successfully',
      subtitle: 'See you at the movies!',
      duration: 3500,
    });
    navigate('/');
  };

  return (
    <>
      <header className="navbar-top" id="main-navbar">
        <div className="container">
          <div className="d-flex align-items-center gap-3">

            {/* Logo */}
            <Link to="/" className="navbar-brand-text" id="nav-logo" style={{ minWidth: 'fit-content' }}>
              🎬 GetTickets
            </Link>

            {/* Home icon */}
            <Link to="/" className="nav-icon-btn d-none d-md-flex" title="Home" id="nav-home">
              🏠
            </Link>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="nav-search-bar d-none d-md-block"
              style={{ flex: 1, maxWidth: '460px', position: 'relative' }}
            >
              <span className="nav-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                id="global-search-input"
              />
              {renderSuggestions()}
            </form>

            {/* Mobile search toggle */}
            <button
              className="nav-icon-btn d-flex d-md-none"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              id="mobile-search-toggle"
            >
              🔍
            </button>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Location Selector */}
            <div className="position-relative d-none d-lg-block">
              <button
                className="location-selector"
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                id="location-selector-btn"
              >
                📍 {selectedCity} ▾
              </button>
              {showCityDropdown && (
                <div
                  className="user-dropdown"
                  style={{ minWidth: '160px' }}
                  id="city-dropdown"
                >
                  {CITIES.map(city => (
                    <div
                      key={city}
                      className="dropdown-item-cv"
                      onClick={() => { setSelectedCity(city); setShowCityDropdown(false); }}
                    >
                      📍 {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light' : 'Switch to Dark'}
              id="theme-toggle-btn"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="user-menu">
                <button
                  className="user-avatar-btn"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  id="user-avatar-btn"
                  title={user.name}
                >
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </button>
                {showUserDropdown && (
                  <div className="user-dropdown" id="user-dropdown">
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)' }}>{user.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{user.email}</div>
                    </div>
                    <div className="dropdown-item-cv" onClick={() => { navigate('/my-bookings'); setShowUserDropdown(false); }}>
                      🎟️ My Bookings
                    </div>
                    <div className="dropdown-item-cv" onClick={() => { navigate('/profile'); setShowUserDropdown(false); }}>
                      👤 Profile
                    </div>
                    <div className="dropdown-item-cv danger" onClick={handleLogout} id="logout-btn">
                      🚪 Sign Out
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="sign-in-btn" id="sign-in-btn">
                Sign In
              </Link>
            )}

            {/* Hamburger */}
            <button 
              className="nav-icon-btn" 
              id="menu-btn" 
              title="Menu"
              onClick={() => setShowSidebar(true)}
            >
              ☰
            </button>
          </div>

          {/* Mobile search bar */}
          {showMobileSearch && (
            <form onSubmit={handleSearch} style={{ marginTop: '10px', position: 'relative' }}>
              <div className="nav-search-bar" style={{ maxWidth: '100%' }}>
                <span className="nav-search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                  autoFocus
                  id="mobile-search-input"
                />
              </div>
              {renderSuggestions()}
            </form>
          )}
        </div>
      </header>

      {/* Sidebar Overlay */}
      {showSidebar && (
        <div 
          className="sidebar-overlay"
          onClick={() => setShowSidebar(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)', zIndex: 2000,
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div 
            className="sidebar-content"
            onClick={e => e.stopPropagation()}
            style={{
              position: 'fixed', right: 0, top: 0, bottom: 0,
              width: '300px', background: 'var(--bg-secondary)',
              borderLeft: '1px solid var(--border)', padding: '40px 24px',
              animation: 'slideInRight 0.3s ease',
              display: 'flex', flexDirection: 'column'
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="navbar-brand-text">🎬 GetTickets</div>
              <button 
                onClick={() => setShowSidebar(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '1.5rem' }}
              >✕</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {sidebarLinks.map(link => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className="dropdown-item-cv"
                  onClick={() => setShowSidebar(false)}
                  style={{ fontSize: '1rem', padding: '14px 16px', borderRadius: 'var(--radius-md)', marginBottom: '4px' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={{ padding: '20px 0', borderTop: '1px solid var(--border)', marginTop: '20px' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Version 1.0.4 • 2026<br/>
                Made with ❤️ for Movie Lovers
              </p>
            </div>
          </div>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
          `}</style>
        </div>
      )}
    </>
  );
};

export default Navbar;
