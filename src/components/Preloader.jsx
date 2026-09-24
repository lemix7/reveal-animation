import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TransitionOverlay from './TransitionOverlay.jsx';

// A load-only timeline, independent of routing and page transitions.
export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const paths = Array.from(overlayRef.current.querySelectorAll('path'));
      const lengths = paths.map((path) => path.getTotalLength());

      paths.forEach((path, index) => {
        const length = lengths[index];
        gsap.set(path, {
          strokeDasharray: `${length} ${length}`,
          strokeDashoffset: length,
          attr: { 'stroke-width': 200 },
        });
      });

      const timeline = gsap.timeline({ onComplete });
      // Fill the screen over an opaque backdrop so the site never flashes.
      timeline.to(paths, {
        strokeDashoffset: 0,
        attr: { 'stroke-width': 700 },
        duration: 1,
        ease: 'power1.inOut',
      });
      // Remove the backdrop only when the strokes fully cover the site.
      timeline.set(containerRef.current, { backgroundColor: 'transparent' });
      paths.forEach((path, index) => {
        timeline.to(path, {
          strokeDashoffset: -lengths[index],
          attr: { 'stroke-width': 200 },
          duration: 1,
          ease: 'power1.inOut',
        }, 1);
      });
    }, containerRef);

    return () => context.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} data-preloader className="fixed inset-0 z-200 overflow-hidden bg-page">
      <p className="sr-only" role="status">Loading page…</p>
      <TransitionOverlay overlayRef={overlayRef} />
    </div>
  );
}
