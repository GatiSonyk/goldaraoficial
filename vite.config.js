import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'mpa',
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        home: 'index.html',
        assistencia: 'assistencia-tecnica/index.html',
        conserto: 'conserto-de-iphone-em-gramado/index.html',
        bateria: 'troca-de-bateria-iphone-gramado/index.html',
        tela: 'troca-de-tela-iphone-gramado/index.html',
        loja: 'loja-de-iphone-em-gramado/index.html',
        iphone: 'iphone/index.html',
        contato: 'contato/index.html',
        sobre: 'sobre/index.html'
      }
    }
  }
});
