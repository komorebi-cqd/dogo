import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port: 3002
  },
  plugins: [vue(),
  ElementPlus({
    useSource: true,
  })]
})
