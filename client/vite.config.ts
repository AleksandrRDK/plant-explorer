import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path, { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
    base: '/plant-explorer/',
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            leaflet: path.resolve(__dirname, 'node_modules/leaflet'),
        },
    },
    server: {
        host: true,
        port: 5173,
        watch: {
            usePolling: true,
            interval: 100,
        },
    },
});
