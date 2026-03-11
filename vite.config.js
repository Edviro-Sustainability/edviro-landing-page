import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {},
    allowedHosts: ['unofficially-unincinerated-bethany.ngrok-free.dev']
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
