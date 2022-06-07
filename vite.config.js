import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
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
        target: 'http://123.57.240.42:100',   //代理接口
        changeOrigin: true,

      }
    }
  },
  plugins: [vue()],
  define: {
    'process.env': process.env,
  },
  resolve: {
    alias: {
      "@": pathResolve("src"),
    }
  },
})