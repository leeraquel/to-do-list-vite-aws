import React, { useState, useEffect } from 'react';

const UpdateNotification: React.FC = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          newWorker?.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setShowUpdatePrompt(true);
            }
          });
        });
      });
    }
  }, []);
  
  const handleUpdate = () => {
    navigator.serviceWorker.ready.then(registration => {
      registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
    });
    window.location.reload();
  };
  
  if (!showUpdatePrompt) return null;
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '16px',
      borderRadius: '4px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      zIndex: 10000
    }}>
      <p>새 버전이 있습니다!</p>
      <button 
        onClick={handleUpdate}
        style={{
          backgroundColor: 'white',
          color: '#4CAF50',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        지금 업데이트
      </button>
    </div>
  );
};

export default UpdateNotification; 