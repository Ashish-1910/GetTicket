import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CATEGORIES = [
  { label: 'Movies', path: '/movies', icon: '🎬' },
  { label: 'Stream', path: '/stream', icon: '📺' },
  { label: 'Events', path: '/events', icon: '🎭' },
  { label: 'Sports', path: '/sports', icon: '🏏' },
  { label: 'IPL 2026', path: '/ipl', icon: '🏆', hot: true },
  { label: 'Offers', path: '/offers', icon: '🏷️' },
  { label: 'Gift Cards', path: '/giftcards', icon: '🎁' },
];

const CategoryNav = () => {
  const location = useLocation();

  return (
    <nav className="category-nav" id="category-nav">
      <div className="container">
        <div className="category-nav-inner">
          {CATEGORIES.map((cat) => {
            const isActive = location.pathname === cat.path ||
              (cat.path === '/movies' && location.pathname === '/');
            return (
              <Link
                key={cat.label}
                to={cat.path}
                className={`cat-link ${isActive ? 'active' : ''} ${cat.hot ? 'hot-link' : ''}`}
                id={`cat-${cat.label.toLowerCase().replace(' ', '-')}`}
              >
                {cat.icon} {cat.label}
                {cat.hot && (
                  <sup style={{
                    fontSize: '0.55rem',
                    background: 'var(--accent)',
                    color: '#fff',
                    padding: '1px 5px',
                    borderRadius: '4px',
                    marginLeft: '4px',
                    verticalAlign: 'super',
                  }}>HOT</sup>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
