(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hero = document.querySelector('#home');
  const background = hero?.querySelector(':scope > .absolute.inset-0');
  if (!hero || !background) return;

  const glow = document.createElement('div');
  glow.className = 'rose-scroll-glow';
  hero.appendChild(glow);

  const style = document.createElement('style');
  style.textContent = `.rose-scroll-glow{position:absolute;z-index:1;inset:0;pointer-events:none;opacity:0;background:radial-gradient(circle at 50% 42%,rgba(207,171,89,.24),transparent 22%),radial-gradient(circle at 50% 50%,transparent 26%,rgba(1,6,18,.48) 100%);transition:opacity .1s linear}#home>*:not(.rose-scroll-glow){position:relative;z-index:2}`;
  document.head.appendChild(style);

  let ticking = false;
  const update = () => {
    const amount = Math.min(window.scrollY / Math.max(window.innerHeight * .72, 1), 1);
    background.style.transform = `scale(${1 + amount * .24}) translateY(${amount * 5}%)`;
    background.style.filter = `brightness(${1 - amount * .18}) saturate(${1 + amount * .08})`;
    glow.style.opacity = String(amount * .9);
    hero.style.clipPath = `inset(0 0 ${amount * 9}% 0)`;
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
  update();
})();
