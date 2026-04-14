import React from 'react';
import { useToast } from '../context/ToastContext';

const OffersPage = () => {
  const { showToast } = useToast();

  const offers = [
    {
      id: 1,
      title: '🎥 Bestseller: Buy 5 Get 2 Free',
      desc: 'Book 5 tickets for any movie and get 2 tickets absolutely free! Perfect for large groups.',
      code: 'GROUP7',
      expiry: '31 Dec 2026',
      icon: '🍿'
    },
    {
      id: 2,
      title: '💳 HDFC Bank Credit Card Offer',
      desc: 'Flat 25% off up to ₹250 on all movie tickets. Valid once per month per user.',
      code: 'HDFCMOVIE',
      expiry: '30 Jun 2026',
      icon: '🏛️'
    },
    {
      id: 3,
      title: '🎓 Student Special: Flat ₹100 Off',
      desc: 'Simply verify your student ID and get ₹100 off on any booking above ₹400.',
      code: 'STUDENTWIN',
      expiry: 'Ongoing',
      icon: '📚'
    },
    {
      id: 4,
      title: '🍿 First Timer: Buy 1 Get 1 Free',
      desc: 'New to GetTickets? Enjoy your first movie with a companion for the price of one!',
      code: 'WELCOMEBOGO',
      expiry: '31 Dec 2026',
      icon: '✨'
    }
  ];

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    showToast({
      type: 'success',
      title: 'Code Copied!',
      subtitle: `Code ${code} copied to clipboard.`,
      duration: 3000
    });
  };

  return (
    <div className="container py-5 animate-fade-up">
      <div className="text-center mb-5">
        <h1 style={{ fontWeight: 800, fontSize: '3rem' }}>🎁 Exclusive Offers</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Save big on your next movie experience with these handpicked deals.</p>
      </div>

      <div className="row g-4">
        {offers.map(offer => (
          <div className="col-md-6" key={offer.id}>
            <div className="auth-box" style={{ width: '100%', maxWidth: 'none', padding: '32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -20, right: -20, fontSize: '5rem', opacity: 0.1 }}>{offer.icon}</div>
              <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>{offer.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>{offer.desc}</p>
              
              <div className="d-flex align-items-center justify-content-between" style={{ background: 'var(--bg-elevated)', border: '1px dashed var(--border-strong)', padding: '16px 20px', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>PROMO CODE</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>{offer.code}</div>
                </div>
                <button 
                  className="btn-primary-cv" 
                  onClick={() => copyCode(offer.code)}
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  Copy Code
                </button>
              </div>
              
              <div style={{ marginTop: '20px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                📅 Valid until: {offer.expiry}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersPage;
