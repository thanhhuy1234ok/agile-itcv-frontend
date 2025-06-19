import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path' // 👈 cần thêm

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 👈 định nghĩa alias @ trỏ vào src
    },
  },
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: [
          'mixed-decls',
          'color-functions',
          'global-builtin',
          'import',
        ],
      },
    },
  },
});
