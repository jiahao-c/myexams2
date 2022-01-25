import vitePluginForArco from '@arco-plugins/vite-react'
import react from '@vitejs/plugin-react'
import path from 'path'
import ignore from "rollup-plugin-ignore"
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginForArco({
      theme: '@arco-themes/react-choral-music'
    }),
    WindiCSS(),
    ignore(['fs']),
    visualizer()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      './runtimeConfig':'./runtimeConfig.browser'
    }
  },
})
