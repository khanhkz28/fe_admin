import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "~/styles/global.scss";`, // Đảm bảo đường dẫn đúng
  //     },
  //   },
  // },
})
