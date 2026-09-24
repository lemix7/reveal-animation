import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { gsap } from 'gsap';
import { getRouteFromHash } from '../routes.js';

export default function usePageTransition(enabled = true) {
  const [targetRoute, setTargetRoute] = useState(getRouteFromHash);
  const [currentRoute, setCurrentRoute] = useState(getRouteFromHash);
  const displayedRoute = useRef(currentRoute);
  const overlayRef = useRef(null);

  useEffect(() => {
    const syncRoute = () => setTargetRoute(getRouteFromHash());
    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  useLayoutEffect(() => {
    const paths = Array.from(overlayRef.current.querySelectorAll('path'));
    const lengths = paths.map((path) => path.getTotalLength());
    const context = gsap.context(() => {
      paths.forEach((path, index) => {
        const length = lengths[index];
        // Explicit dash and gap preserve continuous clearing in Safari.
        gsap.set(path, {
          strokeDasharray: `${length} ${length}`,
          strokeDashoffset: length,
          attr: { 'stroke-width': 200 },
        });
      });

      if (!enabled) {
        displayedRoute.current = targetRoute;
        setCurrentRoute(targetRoute);
        return;
      }
      if (targetRoute === displayedRoute.current) return;

      const timeline = gsap.timeline();
      paths.forEach((path) => {
        timeline.to(path, {
          strokeDashoffset: 0,
          attr: { 'stroke-width': 700 },
          duration: 1,
          ease: 'power1.inOut',
        }, 0);
      });
      timeline.call(() => {
        displayedRoute.current = targetRoute;
        // Commit the next page while the overlay fully covers the screen.
        flushSync(() => {
          setCurrentRoute(targetRoute);
        });
      });
      paths.forEach((path, index) => {
        timeline.to(path, {
          strokeDashoffset: -lengths[index],
          attr: { 'stroke-width': 200 },
          duration: 1,
          ease: 'power1.inOut',
        }, 1);
        timeline.set(path, { strokeDashoffset: lengths[index] }, 2);
      });
    }, overlayRef);

    // Cancel stale animations on navigation, unmount, and Strict Mode cleanup.
    return () => context.revert();
  }, [targetRoute, enabled]);

  function navigate(route) {
    if (window.location.hash !== `#${route}`) {
      window.history.pushState(null, '', `#${route}`);
    }
    setTargetRoute(route);
  }

  return { currentRoute, overlayRef, navigate };
}
