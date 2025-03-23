import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      workbox: {
        clientsClaim: true,
        skipWaiting: false
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
