import { useEffect, useState } from 'react';
import { pages } from '../routes.js';
import logo from '../assets/mbm-logo.png';

export default function Navbar({ currentRoute, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  function handleClick(event, route) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setMenuOpen(false);
    onNavigate(route);
  }

  return (
    <header className="relative z-20 font-navigation text-ink">
      <a className="absolute top-4 left-6 block h-19 w-28 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 md:top-5 md:left-1/2 md:h-28 md:w-42 md:-translate-x-1/2" href="#home" aria-label="MBM — home" onClick={(event) => handleClick(event, 'home')}>
        <img src={logo} alt="MBM logo" width="500" height="500" className="absolute -top-20.75 -left-16.25 w-60 max-w-none md:-top-30.25 md:-left-23.5 md:w-87.5" />
      </a>
      <button className="absolute top-4 right-5 grid size-11 place-items-center rounded-lg hover:bg-ink/5 focus-visible:outline-2 md:hidden" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="hero-navigation" onClick={() => setMenuOpen(!menuOpen)}>
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <path d={menuOpen ? 'm5 5 14 14M5 19 19 5' : 'M3 5h18M3 12h18M3 19h18'} />
        </svg>
      </button>
      <nav id="hero-navigation" aria-label="Main navigation" className={`${menuOpen ? 'flex' : 'hidden'} fixed inset-x-5 top-28 flex-col items-center gap-6 rounded-2xl border border-ink/10 bg-page p-8 shadow-xl shadow-ink/5 md:inset-x-auto md:top-auto md:bottom-9 md:left-1/2 md:flex md:-translate-x-1/2 md:flex-row md:gap-8 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
        {Object.entries(pages).map(([route, title]) => (
          <a key={route} className="py-2 text-[0.9375rem] decoration-ink/40 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4" href={`#${route}`} aria-current={currentRoute === route ? 'page' : undefined} onClick={(event) => handleClick(event, route)}>
            {title}
          </a>
        ))}
      </nav>
    </header>
  );
}
