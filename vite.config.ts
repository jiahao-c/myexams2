import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import vitePluginForArco from '@arco-plugins/vite-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginForArco({
      theme: '@arco-themes/react-choral-music'
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
})
