import React, { useRef, useEffect, useState } from 'react';

const EVENT_CATEGORIES = [
  { label: 'All', icon: '🎪' },
  { label: 'Comedy Shows', icon: '😂' },
  { label: 'Parks', icon: '🎡' },
  { label: 'Theater', icon: '🎭' },
  { label: 'Kids', icon: '🧒' },
  { label: 'Music Shows', icon: '🎵' },
  { label: 'Workshop', icon: '🎨' },
  { label: 'Training', icon: '💻' },
  { label: 'Adventure', icon: '🏕️' },
];

const EventCarousel = ({ events, autoScroll = true }) => {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const speedRef = useRef(0.5);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? events
    : events.filter(e => e.category === activeCategory);

  const items = autoScroll ? [...filtered, ...filtered] : filtered;

  useEffect(() => {
    if (!autoScroll) return;
    
    const track = trackRef.current;
    if (!track || items.length === 0) return;

    posRef.current = 0;

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
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [filtered.length, activeCategory, autoScroll, items.length]);

  const pause = () => { if (autoScroll) speedRef.current = 0; };
  const resume = () => { if (autoScroll) speedRef.current = 0.5; };

  return (
    <div className="section-pad" id="events-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">🎭 Events <span>Near You</span></h2>
          <a href="/events" className="see-all-link">See All →</a>
        </div>

        {/* Category Chips */}
        <div className="event-categories">
          {EVENT_CATEGORIES.map(cat => (
            <button
              key={cat.label}
              className={`event-cat-chip ${activeCategory === cat.label ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.label)}
              id={`event-cat-${cat.label.replace(/\s/g, '-').toLowerCase()}`}
            >
              <span className="chip-icon">{cat.icon}</span>
              <span className="chip-label">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Scrolling Events */}
      {autoScroll ? (
        <div className="h-scroll-wrap" onMouseEnter={pause} onMouseLeave={resume}>
          {items.length > 0 ? (
            <div
              ref={trackRef}
              style={{ display: 'flex', gap: '16px', padding: '4px 24px 16px', willChange: 'transform' }}
            >
              {items.map((event, idx) => (
                <div key={`${event.id}-${idx}`} className="event-card" style={{ flexShrink: 0 }}>
                  <div style={{ overflow: 'hidden' }}>
                    <img src={event.image} alt={event.title} loading="lazy" />
                  </div>
                  <div className="event-info">
                    <div className="event-tag-badge">{event.tag}</div>
                    <div className="event-title">{event.title}</div>
                    <div className="event-meta">
                      📅 {event.date} • {event.time}<br />
                      📍 {event.venue}, {event.city}
                    </div>
                    <div className="event-price">Starting ₹{event.price}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="container" style={{ paddingTop: '20px', color: 'var(--text-secondary)', textAlign: 'center' }}>
              No events in this category right now.
            </div>
          )}
        </div>
      ) : (
        <div className="container">
          <div className="h-scroll-track" style={{ padding: '4px 2px 16px', margin: '0 -2px' }}>
            {items.length > 0 ? items.map((event) => (
                <div key={`event-${event.id}`} className="event-card" style={{ flexShrink: 0 }}>
                  <div style={{ overflow: 'hidden' }}>
                    <img src={event.image} alt={event.title} loading="lazy" />
                  </div>
                  <div className="event-info">
                    <div className="event-tag-badge">{event.tag}</div>
                    <div className="event-title">{event.title}</div>
                    <div className="event-meta">
                      📅 {event.date} • {event.time}<br />
                      📍 {event.venue}, {event.city}
                    </div>
                    <div className="event-price">Starting ₹{event.price}</div>
                  </div>
                </div>
            )) : (
              <div style={{ paddingTop: '20px', color: 'var(--text-secondary)', textAlign: 'center', width: '100%' }}>
                No events in this category right now.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCarousel;
