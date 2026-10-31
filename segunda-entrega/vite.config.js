import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Convierte una carpeta relativa a este archivo en una ruta absoluta.
 * @param {string} carpeta - Ruta relativa, por ejemplo "./src/pages".
 * @returns {string} Ruta absoluta lista para usar como alias.
 */
const ruta = (carpeta) => fileURLToPath(new URL(carpeta, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': ruta('./src'),
      '@api': ruta('./src/api'),
      '@assets': ruta('./src/assets'),
      '@components': ruta('./src/components'),
      '@pages': ruta('./src/pages'),
      '@styles': ruta('./src/styles'),
      '@utils': ruta('./src/utils'),
    },
  },
  server: {
    watch: {
      // El mock guarda sus cambios en este archivo: no debe recargar la página
      ignored: ['**/src/data/db.json'],
    },
  },
});
