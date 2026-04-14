import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load session on mount
  useEffect(() => {
    const stored = localStorage.getItem('gettickets_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch { localStorage.removeItem('gettickets_user'); }
    }
  }, []);

  const signup = (data) => {
    try {
      const users = JSON.parse(localStorage.getItem('gettickets_users') || '[]');
      if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
        return { success: false, message: 'An account with this email already exists. Please sign in.' };
      }
      const newUser = {
        id: `user_${Date.now()}`,
        name: data.name,
        email: data.email.toLowerCase(),
        phone: data.phone || '',
        city: data.city || '',
        interests: data.interests || [],
        password: data.password,
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      localStorage.setItem('gettickets_users', JSON.stringify(users));
      return { success: true };
    } catch (err) {
      return { success: false, message: 'Something went wrong. Please try again.' };
    }
  };

  const login = (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('gettickets_users') || '[]');
      const found = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!found) {
        return { success: false, message: 'Incorrect email or password. Please try again.' };
      }
      const sessionUser = {
        id: found.id,
        name: found.name,
        email: found.email,
        phone: found.phone,
        city: found.city,
        interests: found.interests,
      };
      localStorage.setItem('gettickets_user', JSON.stringify(sessionUser));
      setUser(sessionUser);
      setIsAuthenticated(true);
      return { success: true, user: sessionUser };
    } catch (err) {
      return { success: false, message: 'Something went wrong. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('gettickets_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
