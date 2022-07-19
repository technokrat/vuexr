import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  root: './demo',
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts', '.css'],
  },
})
