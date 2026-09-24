# SVG Page Transition

React JavaScript app using Vite, Tailwind CSS, and GSAP. The original colors, typography, SVG artwork, and two-stage wipe transition are preserved.

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
- `src/components/`: navigation and SVG overlay.
- `src/hooks/usePageTransition.js`: hash navigation, GSAP timelines, and lifecycle cleanup.
- `src/routes.js`: page labels and route validation.
- `src/styles.css`: Tailwind import and shared color/font theme tokens. Component styling uses Tailwind utilities; GSAP owns the animated SVG dash offsets and stroke widths.

The standalone `.svg-compat-check.html` remains available as a Safari stroke-rendering diagnostic.
