const isMobile = window.matchMedia('(max-width: 768px)').matches;

if (isMobile) {
  window.location.replace('/mobile.html');
} else {
  import('./main-desktop.js');
}
