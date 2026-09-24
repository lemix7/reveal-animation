import { pages } from '../routes.js';

export default function Navbar({ currentRoute, onNavigate }) {
  function handleClick(event, route) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(route);
  }

  return (
    <nav className="fixed z-2 flex w-full items-center justify-between p-4" aria-label="Main navigation">
      <div>
        <a className="inline-block p-4 font-navigation text-[1.125rem] font-bold tracking-[-0.02em] text-ink no-underline" href="#home" onClick={(event) => handleClick(event, 'home')}>Logo</a>
      </div>
      <ul className="flex list-none gap-[clamp(1rem,4vw,2rem)]">
        {Object.entries(pages).map(([route, title]) => (
          <li className="p-4" key={route}>
            <a
              className="font-navigation text-[1.125rem] font-medium tracking-[-0.02em] text-ink no-underline"
              href={`#${route}`}
              aria-current={currentRoute === route ? 'page' : undefined}
              onClick={(event) => handleClick(event, route)}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
