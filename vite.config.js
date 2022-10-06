import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom'
  }
})
// configuracion para que funcionen los test en react
// dependecias necesarias
// @testing-library/react happy-dom -D
// react react-dom -E
// @vitejs/plugin-react
