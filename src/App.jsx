import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import CategoryNav from './components/CategoryNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import BookingPage from './pages/BookingPage';
import BookingConfirmation from './pages/BookingConfirmation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyBookings from './pages/MyBookings';
import NotFound from './pages/NotFound';

import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import CategoryPage from './pages/CategoryPage';
import OffersPage from './pages/OffersPage';
import GiftCardsPage from './pages/GiftCardsPage';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div key={location.pathname} style={{ opacity: 1, animation: 'pageEntry 0.3s ease both' }}>
      <style>{`
        @keyframes pageEntry {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Routes location={location}>
        <Route path="/"                    element={<Home />} />
        <Route path="/movies"              element={<Movies />} />
        <Route path="/movie/:id"           element={<MovieDetails />} />
        <Route path="/booking/:id"         element={<BookingPage />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/my-bookings"         element={<MyBookings />} />
        <Route path="/login"               element={<Login />} />
        <Route path="/signup"              element={<Signup />} />
        <Route path="/profile"             element={<Profile />} />
        <Route path="/contact"             element={<ContactUs />} />
        <Route path="/about"               element={<AboutUs />} />
        <Route path="/admin"               element={<AdminDashboard />} />
        
        {/* Category Routes */}
        <Route path="/stream"    element={<CategoryPage title="📺 Stream" desc="Watch premium exclusive movies and TV shows from the comfort of your home." icon="🍿" />} />
        <Route path="/events"    element={<CategoryPage title="🎭 Live Events" desc="Comedy gigs, music concerts, and workshops happening around you." icon="🎤" />} />
        <Route path="/sports"    element={<CategoryPage title="🏏 Sports" desc="Book tickets for cricket, football, kabaddi, and live screenings." icon="🏆" />} />
        <Route path="/ipl"       element={<CategoryPage title="🏆 IPL 2026" desc="Welcome to the biggest T20 carnival. Secure your stadium seats now!" icon="🏏" />} />
        <Route path="/offers"    element={<OffersPage />} />
        <Route path="/giftcards" element={<GiftCardsPage />} />
        <Route path="*"          element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookingProvider>
          <ToastProvider>
            <Router>
              <Navbar />
              <CategoryNav />
              <main style={{ minHeight: '70vh' }}>
                <AnimatedRoutes />
              </main>
              <Footer />
            </Router>
          </ToastProvider>
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
