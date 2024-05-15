import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react() ],
  resolve: {
    alias: {
      '/@/': `${process.cwd()}/src/`,
    },
  },
  optimizeDeps: {
    exclude: ['@mapbox/node-pre-gyp'],
  },
  build: {
    rollupOptions: {
      plugins: [
        {
          name: 'esbuild-html-loader',
          setup(build) {
            build.onLoad({ filter: /\.html$/ }, async (args) => ({
              contents: `export default ${JSON.stringify(await fs.promises.readFile(args.path, 'utf-8'))};`,
            }));
          },
        },
      ],
    },
  },
})
