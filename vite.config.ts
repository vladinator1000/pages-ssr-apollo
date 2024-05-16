import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { cloudflareDevProxyVitePlugin } from './src/cloudflareDevProxyVitePlugin'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
    // rollupOptions: {
    //   output: {
    //     entryFileNames: `[name].js`,
    //     chunkFileNames: `assets/[name].[hash].js`,
    //   },
    // },
  },
  plugins: [react(), cloudflareDevProxyVitePlugin()],
  ssr: {
    target: 'webworker',
  },
})
