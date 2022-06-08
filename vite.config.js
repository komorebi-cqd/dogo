import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
import { resolve } from "path" // 主要用于alias文件路径别名
// 加别名的函数
function pathResolve(dir) {
  return resolve(__dirname, ".", dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3002,
    proxy: {
      '/api': {
        target: 'http://3.112.243.158:100',   //代理接口
        changeOrigin: true,

      }
    }
  },
  plugins: [vue(),
    ElementPlus({
      useSource: true,
    })],
  define: {
    'process.env': process.env,
  },
  resolve: {
    alias: {
      "@": pathResolve("src"),
    }
  },
})
