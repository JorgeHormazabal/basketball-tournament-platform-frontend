import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/',
  }

  if (command !== 'serve') {
    config.base = '/basketball-tournament-platform-frontend/'
  }

  return config
})
