import React from 'react';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import moviesData from '../data/movies.json';
import eventsData from '../data/events.json';
import HeroCarousel from '../components/HeroCarousel';
import MovieCarousel from '../components/MovieCarousel';
import EventCarousel from '../components/EventCarousel';

const Banner = ({ onDownload }) => (
  <div className="container" style={{ padding: '0 12px' }}>
    <div className="promo-banner" id="promo-banner">
      <div>
        <div className="banner-brand">🎬 GetTickets</div>
        <div className="banner-tagline" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem' }}>
          Your Screen, Your Story — Book Anytime, Anywhere.
        </div>
      </div>
      <div className="banner-tagline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '1.5rem' }}>🍿</span>
        <span style={{ fontWeight: 600 }}>
          Download the App — Get ₹150 Off Your First Booking!
        </span>
      </div>
      <button className="banner-cta" onClick={onDownload}>Download Now</button>
    </div>
  </div>
);

const SupportSection = () => {
  const cards = [
    {
      id: 'support-card',
      icon: '🎯',
      title: 'Customer Support',
      desc: '24/7 help for booking issues, cancellations, refunds, and more. We\'re always here for you.',
      action: 'Get Help',
      href: '/contact',
    },
    {
      id: 'ticket-card',
      icon: '🎟️',
      title: 'Ticket Details',
      desc: 'View your upcoming shows, download tickets, or cancel a booking from My Bookings page.',
      action: 'View Tickets',
      href: '/my-bookings',
    },
    {
      id: 'newsletter-card',
      icon: '📬',
      title: 'Movie Recommendations',
      desc: 'Subscribe to get curated picks based on your favourite genres, languages, and mood!',
      action: 'Subscribe',
      href: '#main-footer',
    },
  ];

  return (
    <div className="container section-pad" id="support-section">
      <div className="row g-4">
        {cards.map(card => (
          <div key={card.id} className="col-md-4">
            <div className="support-card animate-fade-up" id={card.id}>
              <span className="sc-icon">{card.icon}</span>
              <div className="sc-title">{card.title}</div>
              <div className="sc-desc">{card.desc}</div>
              {card.href.startsWith('/') ? (
                <Link to={card.href} className="btn-outline-cv" style={{ fontSize: '0.85rem', padding: '8px 20px' }}>
                  {card.action} →
                </Link>
              ) : (
                <a href={card.href} className="btn-outline-cv" style={{ fontSize: '0.85rem', padding: '8px 20px' }}>
                  {card.action} →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GuidelinesStrip = () => (
  <div className="guidelines-strip" id="guidelines-strip" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
    <div className="container">
      <div className="row">
        <div className="col-md-6 mb-3 mb-md-0">
          <strong style={{ color: 'var(--text-secondary)' }}>Booking & Admission Guidelines:</strong>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: 0 }}>
            <li>Tickets once booked are non-exchangeable and non-refundable unless stated otherwise.</li>
            <li>Cancellation is available up to 2 hours before showtime for select cinemas.</li>
            <li>Outside food and beverages are strictly not permitted inside the cinema premises.</li>
            <li>Please arrive at least 15 minutes prior to the showtime for a seamless entry.</li>
            <li>Item sold to persons under 18 years of age is restricted for A-certified films. Photo ID may be requested.</li>
          </ul>
        </div>
        <div className="col-md-6">
          <strong style={{ color: 'var(--text-secondary)' }}>E-Ticket & General Terms:</strong>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '12px' }}>
            <li>Digital tickets (e-tickets) shown on your mobile device are accepted at all partner venues.</li>
            <li>GetTickets acts merely as a ticketing platform and is not responsible for event cancellations or rescheduling.</li>
            <li>The management reserves the right of admission and may subject patrons to security checks.</li>
          </ul>
          <div style={{ marginTop: '12px' }}>
            <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Full Terms & Conditions</a>
            <span style={{ margin: '0 8px' }}>|</span>
            <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const { showToast } = useToast();
  const trendingMovies = moviesData.filter(m => m.trending);
  const allMovies = moviesData;

  const handleDownload = () => {
    showToast({
      type: 'info',
      title: '📱 Coming Soon',
      subtitle: 'The GetTickets app is currently in development. Stay tuned!',
      duration: 4000
    });
  };

  return (
    <main id="home-page">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Trending Movies Carousel */}
      <MovieCarousel
        movies={trendingMovies}
        title="🔥 Trending Now"
        subtitle="Most booked movies this week"
        speed={0.3}
      />

      {/* Banner */}
      <div className="section-pad" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        <Banner onDownload={handleDownload} />
      </div>

      {/* Recommended Movies */}
      <MovieCarousel
        movies={allMovies}
        title="🎬 Recommended For You"
        subtitle="Handpicked movies across all genres"
        autoScroll={false}
      />

      {/* Events Carousel */}
      <EventCarousel events={eventsData} autoScroll={false} />

      {/* Divider */}
      <div className="container">
        <div className="divider-line" />
      </div>

      {/* Support Section */}
      <SupportSection />

      <div className="container">
        <div className="divider-line" />
      </div>

      {/* Guidelines */}
      <GuidelinesStrip />
    </main>
  );
};

export default Home;
