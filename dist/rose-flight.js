(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const flight = document.createElement('div');
  flight.className = 'rose-flight';
  flight.setAttribute('aria-hidden', 'true');
  flight.innerHTML = '<video muted playsinline preload="metadata"><source src="/assets/rose-flight.mp4" type="video/mp4"></video><div class="rose-flight-glow"></div>';
  document.body.appendChild(flight);

  const style = document.createElement('style');
  style.textContent = `
    .rose-flight{position:fixed;inset:0;z-index:9999;overflow:hidden;pointer-events:none;opacity:0;background:#020817;transition:opacity .35s ease}
    .rose-flight video{width:100%;height:100%;object-fit:cover;transform:scale(1.05);filter:saturate(.9) contrast(1.08)}
    .rose-flight-glow{position:absolute;inset:0;background:radial-gradient(circle at center,transparent 24%,rgba(1,5,16,.2) 62%,rgba(1,5,16,.85));mix-blend-mode:multiply}
    .rose-flight.is-flying{opacity:1;animation:rose-flight-fade 3.8s ease both}
    @keyframes rose-flight-fade{0%{opacity:0}8%,83%{opacity:1}100%{opacity:0}}
    @media(max-width:700px){.rose-flight.is-flying{animation-duration:2.7s}.rose-flight video{transform:scale(1.12)}}
  `;
  document.head.appendChild(style);

  let played = sessionStorage.getItem('monremy-rose-flight') === '1';
  const video = flight.querySelector('video');
  const start = () => {
    if (played || window.scrollY < 80) return;
    played = true;
    sessionStorage.setItem('monremy-rose-flight', '1');
    flight.classList.add('is-flying');
    video.currentTime = 0;
    video.play().catch(() => {});
    window.setTimeout(() => { flight.classList.remove('is-flying'); video.pause(); }, window.innerWidth < 700 ? 2700 : 3800);
    window.removeEventListener('scroll', start);
  };
  window.addEventListener('scroll', start, { passive: true });
})();
