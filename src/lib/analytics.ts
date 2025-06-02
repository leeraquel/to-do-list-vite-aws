// src/lib/analytics.ts
import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // 본인 ID

// 앱 시작 시 한 번 실행
export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

// 페이지뷰 전송
export const logPageview = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// 커스텀 이벤트 전송 (예시)
export const logEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  ReactGA.event({ category, action, label, value });
};
