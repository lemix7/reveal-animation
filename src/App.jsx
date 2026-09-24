import { useCallback, useState } from 'react';
import Preloader from './components/Preloader.jsx';
import Navbar from './components/Navbar.jsx';
import TransitionOverlay from './components/TransitionOverlay.jsx';
import usePageTransition from './hooks/usePageTransition.js';
import { pages } from './routes.js';

export default function App() {
  const [isPreloading, setIsPreloading] = useState(true);
  const finishPreloading = useCallback(() => setIsPreloading(false), []);
  const { currentRoute, overlayRef, navigate } = usePageTransition(!isPreloading);

  return (
    <>
      <div
        inert={isPreloading}
        aria-busy={isPreloading}
      >
      <Navbar currentRoute={currentRoute} onNavigate={navigate} />
      <main id="page-content">
        <section className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-page text-ink" data-page={currentRoute}>
          <h1 className="font-display text-[clamp(5rem,15vw,20rem)] leading-none font-extrabold tracking-[-0.02em] uppercase">{pages[currentRoute]}</h1>
        </section>
      </main>
      </div>
      {isPreloading && <Preloader onComplete={finishPreloading} />}
      <TransitionOverlay overlayRef={overlayRef} />
    </>
  );
}
