import './mobile.css';

fetch('/site-config.json')
  .then(res => res.json())
  .then(config => {
    const stats = config?.stats;
    if (!stats) return;
    const map = { schools: stats.schools, districts: stats.districts, usagePoints: stats.usagePoints };
    for (const [key, value] of Object.entries(map)) {
      if (value == null) continue;
      const el = document.querySelector(`.m-stat[data-stat="${key}"] .m-stat__value`);
      if (el) el.textContent = String(value);
    }
  })
  .catch(() => {});

const fadeTargets = document.querySelectorAll('.m-fade-in');

if (fadeTargets.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  fadeTargets.forEach(el => observer.observe(el));
}
