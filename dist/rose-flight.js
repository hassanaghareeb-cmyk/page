(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const flight = document.createElement('div');
  flight.className = 'rose-flight';
  flight.setAttribute('aria-hidden', 'true');
  flight.innerHTML = '<video muted playsinline preload="metadata"><source src="/assets/rose-flight.mp4" type="video/mp4"></video><div class="rose-flight-glow"></div>';
  document.body.appendChild(flight);

  const style = document.createElement('style');
  style.textContent = `
    .rose-flight{position:fixed;z-index:250;left:50%;top:37%;width:min(46vw,460px);aspect-ratio:1/1;transform:translate(-50%,-50%) scale(.7);overflow:hidden;border-radius:50%;pointer-events:none;opacity:0;box-shadow:0 0 0 1px rgba(201,169,97,.34),0 0 65px rgba(3,30,90,.65);transition:opacity .35s ease}
    .rose-flight video{width:100%;height:100%;object-fit:cover;transform:scale(1.18);filter:saturate(.95) contrast(1.06)}
    .rose-flight-glow{position:absolute;inset:0;background:radial-gradient(circle at center,transparent 20%,rgba(1,5,16,.1) 48%,rgba(1,5,16,.82));mix-blend-mode:multiply}
    .rose-flight.is-flying{opacity:1;animation:rose-flight-portal 3.2s ease both}
    @keyframes rose-flight-portal{0%{opacity:0;transform:translate(-50%,-50%) scale(.55)}12%,76%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.14)}}
    @media(max-width:700px){.rose-flight{top:34%;width:72vw}.rose-flight.is-flying{animation-duration:2.4s}}
  `;
  document.head.appendChild(style);

  let played = sessionStorage.getItem('monremy-rose-flight') === '1';
  const video = flight.querySelector('video');
  const start = () => {
    if (played || window.scrollY < 80) return;
    played = true;
    sessionStorage.setItem('monremy-rose-flight', '1');
    const logo = document.querySelector('a[aria-label="Zur Startseite"]');
    if (logo) {
      logo.style.cssText = 'position:fixed!important;left:50%!important;top:64%!important;z-index:300!important;display:block!important;opacity:1!important;transform:translate(-50%,-50%) scale(1.05)!important;transition:transform 1.05s cubic-bezier(.16,.8,.28,1),top 1.05s cubic-bezier(.16,.8,.28,1)!important;pointer-events:none!important;';
      requestAnimationFrame(() => { logo.style.top = '76%'; logo.style.transform = 'translate(-50%,-50%) scale(.82)'; });
    }
    flight.classList.add('is-flying');
    video.currentTime = 0;
    video.play().catch(() => {});
    window.setTimeout(() => { flight.classList.remove('is-flying'); video.pause(); if(logo) logo.style.cssText = ''; }, window.innerWidth < 700 ? 2400 : 3200);
    window.removeEventListener('scroll', start);
  };
  window.addEventListener('scroll', start, { passive: true });
})();
