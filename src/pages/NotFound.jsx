import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main
      className="container text-center py-5 animate-fade-up"
      id="not-found-page"
      style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ fontSize: '6rem', marginBottom: '16px', animation: 'float 3s ease-in-out infinite' }}>
        🎬
      </div>
      <h1
        style={{ fontSize: '6rem', fontWeight: 800, lineHeight: 1, marginBottom: '8px', color: 'var(--primary)' }}
      >
        404
      </h1>
      <h2 style={{ fontWeight: 800, marginBottom: '12px' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '400px', marginBottom: '32px' }}>
        Looks like this scene was cut from the final edit. The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn-primary-cv" style={{ padding: '14px 32px' }}>
        🏠 Back to Home
      </Link>
    </main>
  );
};

export default NotFound;
