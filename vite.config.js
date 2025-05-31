import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: Number(env.VITE_PORT) || 3000,
      open: true,
    },
    resolve: { 
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }
})
