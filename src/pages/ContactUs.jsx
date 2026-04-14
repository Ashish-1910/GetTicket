import React from 'react';
import { useToast } from '../context/ToastContext';

const ContactUs = () => {
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast({ type: 'success', title: 'Message Sent!', subtitle: 'Our Customer Support team will get back to you shortly.', duration: 5000 });
    e.target.reset();
  };

  return (
    <div className="container py-5 animate-fade-up" style={{ minHeight: '70vh', maxWidth: '600px' }}>
      <div className="text-center mb-4">
        <h1 style={{ fontWeight: 800 }}>📞 Contact Us</h1>
        <p style={{ color: 'var(--text-secondary)' }}>How can we help you today?</p>
      </div>

      <div className="p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 600 }}>Your Name</label>
            <input type="text" className="form-control bg-dark text-white border-secondary" required placeholder="Enter your full name" />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 600 }}>Email Address</label>
            <input type="email" className="form-control bg-dark text-white border-secondary" required placeholder="name@example.com" />
          </div>
          <div className="mb-4">
            <label className="form-label" style={{ fontWeight: 600 }}>Message</label>
            <textarea className="form-control bg-dark text-white border-secondary" rows="5" required placeholder="Describe your issue..."></textarea>
          </div>
          <button type="submit" className="btn-primary-cv w-100 py-2" style={{ fontSize: '1.1rem' }}>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
