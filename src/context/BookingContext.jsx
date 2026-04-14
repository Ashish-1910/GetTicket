import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('gettickets_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [globalBookedSeats, setGlobalBookedSeats] = useState(() => {
    const saved = localStorage.getItem('gettickets_global_seats');
    return saved ? JSON.parse(saved) : {}; // Format: { "movieId_showTime": ["A1", "A2"] }
  });

  useEffect(() => {
    localStorage.setItem('gettickets_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('gettickets_global_seats', JSON.stringify(globalBookedSeats));
  }, [globalBookedSeats]);

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      bookedAt: new Date().toISOString(),
    };
    
    // Update global booked seats
    const showKey = `${booking.movieId}_${booking.showTime}`;
    setGlobalBookedSeats(prev => ({
      ...prev,
      [showKey]: [...(prev[showKey] || []), ...booking.seats]
    }));

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const getBookings = (userEmail) => {
    return bookings.filter(b => b.userEmail === userEmail);
  };

  const cancelBooking = (bookingId) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  return (
    <BookingContext.Provider value={{ bookings, globalBookedSeats, addBooking, getBookings, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
