import React from 'react';

const AboutUs = () => {
  return (
    <div className="container py-5 animate-fade-up" style={{ minHeight: '70vh', maxWidth: '800px' }}>
      <div className="text-center mb-5">
        <h1 style={{ fontWeight: 800, fontSize: '3rem' }}>🍿 About GetTickets</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Revolutionizing the way you experience entertainment.</p>
      </div>

      <div className="p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
        <h3 style={{ fontWeight: 700, marginBottom: '20px', color: 'var(--primary)' }}>Our Story</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '32px' }}>
          Founded in 2026, GetTickets started with a simple belief: booking tickets should be as magical as the movies themselves. 
          We noticed that users were tired of clunky, outdated interfaces. Enter GetTickets—a bold, dark-themed, glass-morphic platform that makes 
          planning your night out a seamless experience.
        </p>

        <h3 style={{ fontWeight: 700, marginBottom: '20px', color: 'var(--primary)' }}>What We Do</h3>
        <ul className="mb-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
          <li>🎟️ <strong>Movies:</strong> Seamlessly book your favorite Blockbusters.</li>
          <li>🎭 <strong>Events:</strong> Find the best local comedy, music, and theater shows.</li>
          <li>🏏 <strong>Sports:</strong> Secure your front-row seat to IPL and international leagues.</li>
        </ul>

        <h3 style={{ fontWeight: 700, marginBottom: '20px', color: 'var(--primary)' }}>Our Vision</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
          We aspire to be the ultimate global hub for live entertainment, combining beautiful user experiences with cutting-edge ticketing infrastructure.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
