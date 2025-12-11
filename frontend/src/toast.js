// toast.js
import { useState, useEffect } from 'react';
import { BiCheckCircle, BiErrorCircle, BiX } from 'react-icons/bi';

export const Toast = ({ message, type = 'success', onClose, duration = 8000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger slide-in animation
    setTimeout(() => setIsVisible(true), 10);

    // Auto-close after duration
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const backgroundColor = type === 'success' ? 'rgba(134, 239, 172, 0.9)' : type === 'error' ? 'rgba(252, 165, 165, 0.9)' : 'rgba(251, 191, 36, 0.9)';
  const Icon = type === 'success' ? BiCheckCircle : BiErrorCircle;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: isVisible && !isExiting ? '20px' : '-400px',
        backgroundColor: backgroundColor,
        color: '#1f2937',
        padding: '14px 18px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        maxWidth: '380px',
        zIndex: 10000,
        transition: 'right 0.3s ease-in-out',
        fontFamily: 'inherit',
        fontSize: '13px'
      }}
    >
      <Icon size={18} style={{ flexShrink: 0, marginTop: '1px', color: '#1f2937' }} />
      <div style={{ flex: 1, whiteSpace: 'pre-line', fontSize: '13px', lineHeight: '1.5' }}>
        {message}
      </div>
      <button
        onClick={handleClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#1f2937',
          cursor: 'pointer',
          padding: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <BiX size={18} />
      </button>
    </div>
  );
};

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', duration = 5000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const ToastContainer = () => (
    <>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );

  return { showToast, ToastContainer };
};
