import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Relative base is required for Capacitor WebView — absolute paths don't resolve on device
  base: command === "build" ? "./" : "/",
  plugins: [react(), tailwindcss()],
}))
