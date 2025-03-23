import { useRegisterSW } from 'virtual:pwa-register/react';

const UpdateNotification: React.FC = () => {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();
  
  const handleUpdate = () => {
    updateServiceWorker(true);
  };
  
  if (!needRefresh) return null;
  
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