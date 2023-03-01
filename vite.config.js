import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
      server:{
        port: parseInt(env.APP_PORT || 3002),
        // proxy:{
        //   "/api/":{
        //     target: 'http://203.175.11.186',
        //     rewrite: (path) => path.replace(/^\/api/, ""),
        //     changeOrigin: true,
        //     secure: false
        //   }
        // }
      },
      // vite config
      plugins: [vue()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
  }
})
