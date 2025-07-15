import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/react-todo/',  // 👈 important for GitHub Pages
  plugins: [react()],
})
