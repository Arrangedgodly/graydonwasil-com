import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LazyMotion, domMax } from 'motion/react';
import './styles/theme.css';
import './styles/app.css';
import App from './App.tsx';

/* domMax rather than domAnimation because the shared-element open and the nav
 * indicator are layout animations, which domAnimation does not include.
 * `strict` makes the `motion` component throw, so every call site has to use
 * `m` and the smaller feature bundle actually holds. */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={domMax} strict>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LazyMotion>
  </StrictMode>,
);
