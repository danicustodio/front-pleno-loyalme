import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
 
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    include: ['src/**/*.{spec,test}.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['./src/utils/testing/test-setup.ts'],
  },
})