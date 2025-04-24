import React, { useState, useEffect } from 'react';
import '../css/Toast.css';
import { CheckCircleOutline, ErrorOutline, InfoOutlined } from '@mui/icons-material';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleOutline />;
      case 'error':
        return <ErrorOutline />;
      default:
        return <InfoOutlined />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">{getIcon()}</div>
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast; 