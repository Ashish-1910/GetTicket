import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ type = 'info', title, subtitle, duration = 3000 }) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, type, title, subtitle, exiting: false }]);
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 350);
    }, duration);
  }, []);

  const icons = { success: '✅', error: '❌', info: 'ℹ️', logout: '👋' };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-portal">
        {toasts.map(t => (
          <div key={t.id} className={`toast-msg ${t.type} ${t.exiting ? 'exit' : ''}`}>
            <span className="toast-icon">{icons[t.type] || 'ℹ️'}</span>
            <div className="toast-text">
              <div className="toast-title">{t.title}</div>
              {t.subtitle && <div className="toast-sub">{t.subtitle}</div>}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
