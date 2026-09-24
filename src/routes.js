export const pages = {
  home: 'Home',
  about: 'About',
  contact: 'Contact',
};

export function getRouteFromHash() {
  const route = window.location.hash.slice(1);
  return Object.hasOwn(pages, route) ? route : 'home';
}
