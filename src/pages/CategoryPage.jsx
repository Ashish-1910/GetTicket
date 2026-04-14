import React from 'react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const CATEGORY_DATA = {
  '📺 Stream': [
    { id: 1, title: 'The Dark Knight', subtitle: 'Action, Drama', img: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=300&h=450', price: '₹149' },
    { id: 2, title: 'Interstellar', subtitle: 'Sci-Fi, Adventure', img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=300&h=450', price: '₹99' },
    { id: 3, title: 'Inception', subtitle: 'Sci-Fi, Action', img: 'https://images.unsplash.com/photo-1542204172-3c1f81706f89?auto=format&fit=crop&q=80&w=300&h=450', price: '₹129' },
    { id: 4, title: 'The Prestige', subtitle: 'Mystery, Drama', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=300&h=450', price: '₹149' },
  ],
  '🎭 Live Events': [
    { id: 1, title: 'Laughter Night', subtitle: 'Stand-up Comedy', img: 'https://images.unsplash.com/photo-1527224857853-e374a441492a?auto=format&fit=crop&q=80&w=300&h=450', price: '₹499' },
    { id: 2, title: 'Classical Harmony', subtitle: 'Music Concert', img: 'https://images.unsplash.com/photo-1514328539451-eba3a1145ea0?auto=format&fit=crop&q=80&w=300&h=450', price: '₹899' },
    { id: 3, title: 'Pottery Workshop', subtitle: 'Art & Craft', img: 'https://images.unsplash.com/photo-1493106641515-6b563ad35f4f?auto=format&fit=crop&q=80&w=300&h=450', price: '₹299' },
    { id: 4, title: 'Yoga in the Park', subtitle: 'Health & Wellness', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300&h=450', price: '₹199' },
  ],
  '🏏 Sports': [
    { id: 1, title: 'Ranji Trophy Final', subtitle: 'Cricket Match', img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=300&h=450', price: '₹200' },
    { id: 2, title: 'Soccer League 2026', subtitle: 'Football Match', img: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=300&h=450', price: '₹350' },
    { id: 3, title: 'Badminton Championship', subtitle: 'Tournament', img: 'https://images.unsplash.com/photo-1626225967045-9410dd99eaa7?auto=format&fit=crop&q=80&w=300&h=450', price: '₹150' },
    { id: 4, title: 'Tabel Tennis Open', subtitle: 'Sports Event', img: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&q=80&w=300&h=450', price: '₹100' },
  ],
  '🏆 IPL 2026': [
    { id: 1, title: 'MI vs CSK', subtitle: 'Wankhede Stadium', img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=300&h=450', price: '₹1500' },
    { id: 2, title: 'RCB vs KKR', subtitle: 'Chinnaswamy Stadium', img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=300&h=450', price: '₹1200' },
    { id: 3, title: 'GT vs RR', subtitle: 'Narendra Modi Stadium', img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=300&h=450', price: '₹800' },
    { id: 4, title: 'DC vs PBKS', subtitle: 'Arun Jaitley Stadium', img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=300&h=450', price: '₹1000' },
  ]
};

const CategoryPage = ({ title, desc, icon }) => {
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();
  
  const displayItems = CATEGORY_DATA[title] || [
    { id: 1, title: 'Coming Soon', subtitle: 'Stay tuned for updates', img: '', price: '₹0' },
    { id: 2, title: 'Coming Soon', subtitle: 'Stay tuned for updates', img: '', price: '₹0' },
    { id: 3, title: 'Coming Soon', subtitle: 'Stay tuned for updates', img: '', price: '₹0' },
    { id: 4, title: 'Coming Soon', subtitle: 'Stay tuned for updates', img: '', price: '₹0' },
  ];

  const handleBook = (itemTitle) => {
    if (!isAuthenticated) {
      showToast({ type: 'info', title: 'Login Required', subtitle: 'Please login to continue.', duration: 3000 });
      return;
    }
    showToast({ 
      type: 'success', 
      title: 'Booking Initiated', 
      subtitle: `Your booking for "${itemTitle}" is being processed...`, 
      duration: 4000 
    });
  };

  return (
    <div className="container py-5 animate-fade-up" style={{ minHeight: '70vh' }}>
      <div className="text-center mb-5">
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>{icon}</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{title}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>{desc}</p>
      </div>

      <div className="row g-4 justify-content-center">
        {displayItems.map((item, idx) => (
          <div className="col-md-6 col-lg-3 animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }} key={item.id}>
            <div className="movie-card-v2" onClick={() => handleBook(item.title)} style={{ cursor: 'pointer', height: '100%', overflow: 'hidden' }}>
              <div style={{ height: '240px', overflow: 'hidden' }}>
                {item.img ? (
                   <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: '100%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    Image Placeholder
                  </div>
                )}
              </div>
              <div className="p-3" style={{ background: 'var(--bg-card)' }}>
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <h5 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 0 }}>{item.title}</h5>
                  <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 800 }}>{item.price}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  {item.subtitle}
                </p>
                <button className="btn-primary-cv w-100" style={{ padding: '8px', fontSize: '0.85rem' }}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {title === '📺 Stream' && (
        <div className="mt-5 text-center p-4 auth-box" style={{ maxWidth: '100%', background: 'var(--gradient-brand)', color: '#000' }}>
          <h4 style={{ fontWeight: 800 }}>Weekend Movie Binge?</h4>
          <p style={{ fontWeight: 500 }}>Rent 3 movies and get the 4th one free. Limited time offer!</p>
          <button className="btn-primary-cv" style={{ background: '#000', color: '#fff' }}>Redeem Offer</button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
