import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/reset.scss';
import './styles/index.sass';
import 'leaflet/dist/leaflet.css';
import App from './App.tsx';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.toggle('dark', prefersDark);

window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
        document.documentElement.classList.toggle('dark', e.matches);
    });

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
