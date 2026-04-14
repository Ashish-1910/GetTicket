import React from 'react';
import { useToast } from '../context/ToastContext';

const GiftCardsPage = () => {
  const { showToast } = useToast();

  const giftCards = [
    {
      id: 1,
      title: '🎥 First Time Movie-Goer Card',
      desc: 'The perfect gift for someone who\'s never experienced the magic of cinema. Includes 2 tickets + popcorn and soda combo.',
      price: '₹999',
      benefits: ['Priority Entry', 'Complimentary Popcorn', 'Special Welcome Message'],
      tag: 'First Time User'
    },
    {
      id: 2,
      title: '💳 Premium Banking Card',
      desc: 'Exclusive card for ICICI, SBI, and Axis Bank customers. Enjoy unlimited buy-one-get-one offers for 6 months.',
      price: '₹2,499',
      benefits: ['Instant Cashback', 'Zero Convenience Fee', 'Luxury Seat Upgrade'],
      tag: 'Bank Specific'
    },
    {
      id: 3,
      title: '🎓 Student Entertainment Pass',
      desc: 'Unlock affordable entertainment. 50% discount on all morning and afternoon shows on weekdays.',
      price: '₹599 / month',
      benefits: ['Student Verification Required', 'Weekend Discount (10%)', 'Exclusive Pre-screenings'],
      tag: 'Student Benefits'
    },
    {
      id: 4,
      title: '🍿 Cinephile Platinum Pass',
      desc: 'For those who live and breathe movies. Watch up to 10 movies a month for a single subscription fee.',
      price: '₹1,999 / month',
      benefits: ['IMAX Support', 'Gourmet Food Discount', 'Meet & Greet Invites'],
      tag: 'Heavy User'
    }
  ];

  const handleBuy = (title) => {
    showToast({
      type: 'success',
      title: 'Order Initiated',
      subtitle: `Your order for "${title}" has been started! Connecting to payment gateway...`,
      duration: 4000
    });
  };

  return (
    <div className="container py-5 animate-fade-up">
      <div className="text-center mb-5">
        <h1 style={{ fontWeight: 800, fontSize: '3rem' }}>🎁 GetTickets Gift Cards</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>The gift of stories, shared with loved ones.</p>
      </div>

      <div className="row g-4">
        {giftCards.map(card => (
          <div className="col-lg-6" key={card.id}>
            <div className="auth-box" style={{ width: '100%', maxWidth: 'none', padding: '36px', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span style={{ 
                  background: 'rgba(0, 200, 150, 0.1)', 
                  color: 'var(--primary)', 
                  padding: '4px 12px', 
                  borderRadius: 'var(--radius-full)', 
                  fontSize: '0.75rem', 
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}>
                  {card.tag}
                </span>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)' }}>{card.price}</div>
              </div>

              <h3 style={{ fontWeight: 800, marginBottom: '12px' }}>{card.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', flex: 1 }}>{card.desc}</p>
              
              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>KEY BENEFITS:</div>
                <div className="d-flex flex-wrap gap-2">
                  {card.benefits.map(benefit => (
                    <span key={benefit} style={{ 
                      background: 'var(--bg-elevated)', 
                      padding: '6px 14px', 
                      borderRadius: 'var(--radius-sm)', 
                      fontSize: '0.8rem', 
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border)'
                    }}>
                      ✔️ {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                className="btn-primary-cv w-100 py-3" 
                onClick={() => handleBuy(card.title)}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftCardsPage;
