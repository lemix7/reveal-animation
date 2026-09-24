# SVG Page Transition

React JavaScript app using Vite, Tailwind CSS, and GSAP. The original colors, SVG artwork, and two-stage wipe transition are preserved. The home hero follows the centered headline, mixed italic serif typography and responsive navigation of https://www.happn.com/.

On every initial load or refresh, a dedicated `Preloader` draws the SVG strokes across an opaque screen for one second, then removes its backdrop and clears the strokes for one second to reveal the site. It unmounts after completion and never runs on navigation. The separate page-transition timeline remains available between pages. Navigation becomes interactive after preloading finishes.

## Development

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Navigate between Home, About, and Contact, or open a hash directly (for example, `/#about`). Browser back/forward navigation is supported.

## Production

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` directory to a static host.

## Structure

- `src/App.jsx`: page rendering and component composition.
- `src/components/`: responsive navigation, home hero, preloader, and SVG overlay.
- `src/hooks/usePageTransition.js`: hash navigation, GSAP timelines, and lifecycle cleanup.
- `src/routes.js`: page labels and route validation.
- `src/styles.css`: Tailwind import and shared color/font theme tokens. Component styling uses Tailwind utilities; GSAP owns the animated SVG dash offsets and stroke widths. The hero font faces load from the reference site’s Framer CDN, with a Georgia fallback.

The header uses the supplied MBM logo. Home/About/Contact routes remain in place; app download buttons have been removed.

The standalone `.svg-compat-check.html` remains available as a Safari stroke-rendering diagnostic.
