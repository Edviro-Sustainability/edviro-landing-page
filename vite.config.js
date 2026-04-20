import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        mobile: resolve(__dirname, 'mobile.html')
      }
    }
  },
  server: {
    proxy: {},
    allowedHosts: ['unofficially-unincinerated-bethany.ngrok-free.dev', 'edviroenergy.com']
  },
  plugins: [
    {
      name: 'deck-redirect',
      configureServer(server) {
        server.middlewares.use('/deck', (_req, res) => {
          res.writeHead(302, { Location: '/Edviro Pitch Deck.pdf' });
          res.end();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use('/deck', (_req, res) => {
          res.writeHead(302, { Location: '/Edviro Pitch Deck.pdf' });
          res.end();
        });
      }
    }
  ]
});
