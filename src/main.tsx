import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Service Worker 등록 함수
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker 등록 성공:', registration.scope);
          
          // 업데이트 감지
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            console.log('Service Worker 업데이트 발견!');
            
            newWorker?.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // 새 서비스 워커가 설치되었고 이전 서비스 워커가 활성화된 상태
                console.log('새 버전이 설치되었습니다. 페이지를 새로고침하세요.');
                
                // 여기서 사용자에게 알림을 표시할 수 있습니다
                if (window.confirm('새 버전이 있습니다. 지금 업데이트하시겠습니까?')) {
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                  window.location.reload();
                }
              }
            });
          });
        })
        .catch(error => {
          console.error('Service Worker 등록 실패:', error);
        });
        
      // 서비스 워커 제어권 변경 감지
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('새 서비스 워커가 활성화되었습니다.');
      });
    });
  }
}

// Service Worker 등록 호출
registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
