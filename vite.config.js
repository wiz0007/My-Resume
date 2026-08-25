import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          animation: ["framer-motion", "gsap"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          router: ["react-router-dom"],
        },
      },
    },
  },
})
