import React, { useState, useEffect } from 'react';
import moviesData from '../data/movies.json';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';

const AdminDashboard = () => {
  const { bookings } = useBooking();
  const { showToast } = useToast();
  
  // Local state for movies (simulating a database)
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem('gettickets_movies');
    return saved ? JSON.parse(saved) : moviesData;
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    language: '',
    rating: '8.5',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=300&h=450',
    description: '',
    duration: '2h 15m'
  });

  // Persist local movie changes
  useEffect(() => {
    localStorage.setItem('gettickets_movies', JSON.stringify(movies));
  }, [movies]);

  const stats = [
    { title: 'Total Movies', value: movies.length, icon: '🎬', color: 'var(--primary)' },
    { title: 'Total Bookings', value: bookings.length, icon: '🎟️', color: 'var(--accent)' },
    { title: 'Est. Revenue', value: `₹${bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}`, icon: '💰', color: '#10b981' },
    { title: 'Active Users', value: '1.2k', icon: '👤', color: 'var(--gold)' },
  ];

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this movie?')) {
      setMovies(movies.filter(m => m.id !== id));
      showToast({ type: 'success', title: 'Movie Removed', subtitle: 'The movie list has been updated.', duration: 3000 });
    }
  };

  const handleAddMovie = (e) => {
    e.preventDefault();
    const id = Math.max(...movies.map(m => m.id), 0) + 1;
    const movieToAdd = {
      ...newMovie,
      id,
      genre: newMovie.genre.split(',').map(g => g.trim()),
      trending: false
    };
    setMovies([movieToAdd, ...movies]);
    setShowAddModal(false);
    setNewMovie({ title: '', genre: '', language: '', rating: '8.5', poster: '', description: '', duration: '' });
    showToast({ type: 'success', title: 'Movie Added', subtitle: `${movieToAdd.title} is now live!`, duration: 3000 });
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 style={{ fontWeight: 800, fontSize: '2.5rem' }}>🛠️ Admin Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your catalog and monitor performance.</p>
        </div>
        <button 
          className="btn-primary-cv" 
          onClick={() => setShowAddModal(true)}
          style={{ padding: '12px 24px' }}
        >
          + Add New Movie
        </button>
      </div>

      {/* Stats Grid */}
      <div className="row g-4 mb-5">
        {stats.map((stat, idx) => (
          <div className="col-md-3" key={idx}>
            <div className="auth-box" style={{ width: '100%', maxWidth: 'none', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>{stat.title}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: stat.color }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Movie Management */}
      <div className="auth-box" style={{ width: '100%', maxWidth: 'none', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h5 style={{ margin: 0, fontWeight: 700 }}>Catalog Management</h5>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{movies.length} Movies</span>
        </div>
        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0" style={{ verticalAlign: 'middle' }}>
            <thead>
              <tr style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '16px 24px' }}>Movie</th>
                <th>Genre</th>
                <th>Language</th>
                <th>Rating</th>
                <th className="text-end" style={{ padding: '16px 24px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div className="d-flex align-items-center gap-3">
                      <img src={movie.poster} alt="" style={{ width: 40, height: 56, objectFit: 'cover', borderRadius: 4 }} />
                      <div style={{ fontWeight: 600 }}>{movie.title}</div>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.9rem' }}>{Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}</td>
                  <td style={{ fontSize: '0.9rem' }}>{movie.language}</td>
                  <td>
                    <span style={{ color: 'var(--gold)', fontWeight: 700 }}>⭐ {movie.rating}</span>
                  </td>
                  <td className="text-end" style={{ padding: '16px 24px' }}>
                    <button 
                      className="btn-outline-cv" 
                      style={{ padding: '6px 12px', fontSize: '0.75rem', borderColor: '#ef4444', color: '#ef4444' }}
                      onClick={() => handleDelete(movie.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Movie Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="auth-box animate-fade-up" style={{ maxWidth: '600px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 style={{ margin: 0, fontWeight: 800 }}>Add New Movie</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '1.5rem' }}>✕</button>
            </div>
            
            <form onSubmit={handleAddMovie}>
              <div className="row g-3">
                <div className="col-md-12">
                  <label>Movie Title</label>
                  <input type="text" className="cv-input" required value={newMovie.title} onChange={e => setNewMovie({...newMovie, title: e.target.value})} placeholder="e.g. Inception" />
                </div>
                <div className="col-md-6">
                  <label>Genre (comma separated)</label>
                  <input type="text" className="cv-input" required value={newMovie.genre} onChange={e => setNewMovie({...newMovie, genre: e.target.value})} placeholder="Action, Sci-Fi" />
                </div>
                <div className="col-md-6">
                  <label>Language</label>
                  <input type="text" className="cv-input" required value={newMovie.language} onChange={e => setNewMovie({...newMovie, language: e.target.value})} placeholder="English" />
                </div>
                <div className="col-md-6">
                  <label>Rating</label>
                  <input type="number" step="0.1" max="10" className="cv-input" value={newMovie.rating} onChange={e => setNewMovie({...newMovie, rating: e.target.value})} />
                </div>
                <div className="col-md-6">
                  <label>Duration</label>
                  <input type="text" className="cv-input" value={newMovie.duration} onChange={e => setNewMovie({...newMovie, duration: e.target.value})} placeholder="2h 15m" />
                </div>
                <div className="col-md-12">
                  <label>Poster URL</label>
                  <input type="text" className="cv-input" value={newMovie.poster} onChange={e => setNewMovie({...newMovie, poster: e.target.value})} placeholder="Image URL..." />
                </div>
                <div className="col-md-12">
                  <button type="submit" className="btn-primary-cv w-100 py-3 mt-3">Publish Movie</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
