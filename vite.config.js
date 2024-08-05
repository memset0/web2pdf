import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        // icon: 'https://vitejs.dev/logo.svg',
        namespace: 'memset0/web2pdf',
        match: [
          'zhihu.com', //
          'zhuanlan.zhihu.com',
          'blog.csdn.net',
        ]
          .map((hostname) => [
            `http://${hostname}`, //
            `https://${hostname}`,
            `http://${hostname}/*`,
            `https://${hostname}/*`,
          ])
          .flat(),
        grant: [
          'GM_addStyle', //
          'unsafeWindow',
        ],
      },
      build: {
        externalGlobals: {},
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
