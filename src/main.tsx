import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { registerSW } from "virtual:pwa-register";

// 업데이트 확인 주기를 20초로 설정 (테스트용)
const intervalMS = 20 * 1000;

// Service Worker 등록 및 업데이트 처리
const updateSW = registerSW({
  onRegisteredSW(swUrl, r) {
    console.log(`Service Worker at ${swUrl} registered`);

    // 주기적으로 업데이트 확인하는 타이머 설정 (20초마다)
    if (r) {
      setInterval(() => {
        console.log(
          "Service Worker 업데이트 확인 중... " +
            new Date().toLocaleTimeString()
        );
        r.update();
      }, intervalMS);
    }
  },
  onNeedRefresh() {
    // 업데이트가 있을 때 alert 창 표시
    console.log("새 버전이 감지됨!");

    // Windows에서의 호환성을 위해 setTimeout 추가
    setTimeout(() => {
      if (window.confirm("새 버전이 있습니다. 지금 업데이트하시겠습니까?")) {
        try {
          // 확인 버튼 클릭 시 업데이트 적용 및 페이지 리로드
          console.log("업데이트 수락됨, 페이지 새로고침 예정");

          // Windows에서의 추가 처리
          // 1. 먼저 Service Worker 업데이트
          updateSW(true);

          // 2. 강제 새로고침 추가 (일부 경우에 필요)
          setTimeout(() => {
            console.log("강제 새로고침 실행");
            window.location.reload();
          }, 500);
        } catch (err) {
          console.error("업데이트 적용 중 오류:", err);
          // 오류 발생 시 강제 새로고침
          window.location.reload();
        }
      }
    }, 100);
  },
  onOfflineReady() {
    // 오프라인 준비 완료 시 처리
    console.log("앱이 오프라인에서도 사용할 준비가 되었습니다.");
  },
});

// Service Worker 등록 함수
const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    console.log("Service Worker 지원됨");
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker 등록 성공:", registration.scope);

          // 업데이트 감지
          registration.addEventListener("updatefound", () => {
            console.log("Service Worker 업데이트 감지!");
            const newWorker = registration.installing;

            newWorker?.addEventListener("statechange", () => {
              console.log("Service Worker 상태 변경:", newWorker.state);
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                console.log("새 Service Worker 설치 완료, 알림 표시 예정");
                // 알림 코드 alert으로
              }
            });
          });
        })
        .catch((error) => {
          console.error("Service Worker 등록 실패:", error);
        });

      // 서비스 워커 제어권 변경 감지
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("새 서비스 워커가 활성화되었습니다.");
      });
    });
  } else {
    console.warn("Service Worker가 지원되지 않습니다");
  }
};

// Service Worker 등록 호출
registerServiceWorker();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
