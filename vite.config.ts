import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: 'auto',
      workbox: {
        clientsClaim: true,
        skipWaiting: true, // Windows 호환성을 위해 true로 유지
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif}'],
        // 업데이트 확인 주기 설정
        navigationPreload: true,
        runtimeCaching: [
          {
            urlPattern: /\.(?:js|css)$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 // 캐시 유효 기간 1분으로 설정 (테스트용)
              }
            }
          },
          {
            urlPattern: ({ url }) => String(url).includes('/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 // 캐시 유효 기간 1분으로 설정 (테스트용)
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Mala 앱',
        short_name: 'Mala',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon'
          }
          // 추가 아이콘은 필요에 따라 설정하세요
        ],
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff'
      }
    })
  ],
})
