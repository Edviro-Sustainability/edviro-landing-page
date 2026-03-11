const isMobile = window.matchMedia('(max-width: 768px)').matches;

if (isMobile) {
  import('./main-mobile.js');
} else {
  import('./main-desktop.js');
}
