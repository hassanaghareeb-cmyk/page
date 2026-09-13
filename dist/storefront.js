window.addEventListener('load', () => {
  const backgroundLayers = document.querySelectorAll('body > .pointer-events-none.fixed.inset-0 > div');
  if (backgroundLayers[0]) {
    backgroundLayers[0].style.filter = 'brightness(.98) saturate(1.04)';
  }
  if (backgroundLayers[1]) {
    backgroundLayers[1].style.background = 'radial-gradient(circle at 50% 12%, rgba(86,138,255,.08), transparent 44%), linear-gradient(180deg, rgba(1,4,13,.08), rgba(2,5,16,.16))';
  }

  const motionStyle = document.createElement('style');
  motionStyle.textContent = `
    .rose-scroll-glow { position:fixed; inset:-12%; z-index:1; pointer-events:none; opacity:var(--rose-glow,.12); background:radial-gradient(circle at var(--rose-x,50%) var(--rose-y,28%),rgba(105,163,255,.3),transparent 27%),radial-gradient(circle at 78% 72%,rgba(201,169,97,.1),transparent 24%); mix-blend-mode:screen; transition:opacity .25s linear; }
    @media (prefers-reduced-motion:reduce) { .rose-scroll-glow { display:none; } }
  `;
  document.head.appendChild(motionStyle);

  const hero = document.querySelector('#home');
  if (hero && !hero.querySelector('.cinematic-phoenix')) {
    const originalHeroLogo = hero.querySelector('a[href="#home"] img[src="/assets/logo.png"]');
    if (originalHeroLogo) {
      originalHeroLogo.classList.add('original-hero-logo');
    }
    const phoenix = document.createElement('div');
    phoenix.className = 'cinematic-phoenix';
    phoenix.setAttribute('role', 'img');
    phoenix.setAttribute('aria-label', 'Goldener Mon Rémy Phönix');
    phoenix.innerHTML = `
      <img class="phoenix-piece phoenix-wing phoenix-wing-left" src="/assets/logo-bird.png" alt="" aria-hidden="true">
      <img class="phoenix-piece phoenix-wing phoenix-wing-right" src="/assets/logo-bird.png" alt="" aria-hidden="true">
      <img class="phoenix-piece phoenix-body" src="/assets/logo-bird.png" alt="" aria-hidden="true">
    `;
    hero.appendChild(phoenix);
    const wordmark = document.createElement('img');
    wordmark.className = 'cinematic-wordmark';
    wordmark.src = '/assets/logo-wordmark.png';
    wordmark.alt = 'Mon Rémy Parfumerie';
    hero.appendChild(wordmark);
    requestAnimationFrame(() => phoenix.classList.add('is-ready'));

    const videoStyle = document.createElement('style');
    videoStyle.textContent = `
      @keyframes phoenixWingLeft{0%,100%{transform:rotate(1deg) translate3d(0,0,0) scaleY(1)}50%{transform:rotate(-6deg) translate3d(-2px,5px,0) scaleY(.94)}}
      @keyframes phoenixWingRight{0%,100%{transform:rotate(-1deg) translate3d(0,0,0) scaleY(1)}50%{transform:rotate(6deg) translate3d(2px,5px,0) scaleY(.94)}}
      .cinematic-phoenix{position:absolute;z-index:1;top:3%;left:50%;width:min(540px,54vw);aspect-ratio:1503/706;overflow:hidden;contain:layout size;transform:translateX(-50%);pointer-events:none;filter:drop-shadow(0 0 16px rgba(255,224,139,.42)) drop-shadow(0 0 28px rgba(201,169,97,.22));opacity:0;transition:opacity 1s ease}
      .cinematic-phoenix.is-ready{opacity:.94}
      .phoenix-piece{position:absolute;inset:0;width:100%;height:auto;max-width:none;mix-blend-mode:screen;will-change:transform}
      .phoenix-wing-left{clip-path:polygon(18% 0,51% 0,51% 48%,40% 48%,27% 42%,16% 34%);transform-origin:48% 28%;animation:phoenixWingLeft 1.65s cubic-bezier(.45,0,.55,1) infinite}
      .phoenix-wing-right{clip-path:polygon(49% 0,82% 0,84% 34%,73% 42%,60% 48%,49% 48%);transform-origin:52% 28%;animation:phoenixWingRight 1.65s cubic-bezier(.45,0,.55,1) infinite}
      .phoenix-body{clip-path:polygon(40% 0,61% 0,61% 28%,67% 47%,64% 100%,35% 100%,38% 47%,40% 28%)}
      .cinematic-wordmark{position:absolute;z-index:2;top:31%;left:50%;width:min(510px,56vw);height:auto;transform:translateX(-50%);pointer-events:none;filter:drop-shadow(0 0 18px rgba(201,169,97,.28))}
      #home img[src="/assets/logo.png"]{width:min(320px,64vw)!important;filter:drop-shadow(0 0 20px rgba(201,169,97,.32))}
      #home .original-hero-logo{opacity:0!important;transition:opacity .45s ease}
      body.phoenix-header-logo #home .original-hero-logo{opacity:1!important}
      @media(max-width:700px){.cinematic-phoenix{top:8%;width:84vw;opacity:.92}.cinematic-wordmark{top:33%;width:82vw}#home img[src="/assets/logo.png"]{width:min(265px,70vw)!important}}
      @media(prefers-reduced-motion:reduce){.phoenix-wing{animation:none}}
    `;
    document.head.appendChild(videoStyle);
    const updateHeaderLogo = () => document.body.classList.toggle('phoenix-header-logo', scrollY > innerHeight * .62);
    addEventListener('scroll', updateHeaderLogo, { passive:true });
    updateHeaderLogo();
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && backgroundLayers[0]) {
    const glow = document.createElement('div');
    glow.className = 'rose-scroll-glow';
    document.body.appendChild(glow);
    let ticking = false;
    const updateRoses = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const progress = Math.min(1, scrollY / maxScroll);
      const wave = Math.sin(progress * Math.PI * 3);
      backgroundLayers[0].style.transform = `translate3d(0,${28 - scrollY * .045}px,0) scale(${1.08 + progress * .1}) rotate(${wave * .35}deg)`;
      backgroundLayers[0].style.filter = `brightness(${.98 + progress * .1}) saturate(${1.04 + progress * .18})`;
      glow.style.setProperty('--rose-x', `${38 + progress * 38}%`);
      glow.style.setProperty('--rose-y', `${24 + Math.sin(progress * Math.PI) * 48}%`);
      glow.style.setProperty('--rose-glow', `${.1 + Math.abs(wave) * .12}`);
      ticking = false;
    };
    addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(updateRoses); ticking = true; }
    }, { passive:true });
    updateRoses();
  }

  window.setTimeout(() => {
    const contact = document.querySelector('#contact');
    const heading = contact?.querySelector('.max-w-xl');
    if (!contact || !heading || document.querySelector('.storefront-photo')) return;

    const style = document.createElement('style');
    style.textContent = `.storefront-photo{position:relative;margin:0 0 1.7rem;max-width:290px;overflow:hidden;border:1px solid rgba(201,169,97,.45);box-shadow:0 16px 38px rgba(0,0,0,.3)}.storefront-photo img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;object-position:center}.storefront-photo figcaption{position:absolute;left:0;right:0;bottom:0;padding:1.4rem .8rem .65rem;background:linear-gradient(transparent,rgba(2,6,18,.92));color:#f4efe2;font:italic .95rem Georgia,serif}.storefront-photo figcaption span{display:block;margin-bottom:.2rem;color:#c9a961;font:600 .58rem Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase}`;
    document.head.appendChild(style);

    const photo = document.createElement('figure');
    photo.className = 'storefront-photo';
    photo.innerHTML = '<img src="/assets/monremy-storefront.png" alt="Außenansicht der Mon Rémy Parfumerie in der Weender Straße 79 in Göttingen" loading="lazy"><figcaption><span>Mon Rémy · Göttingen</span>Besuchen Sie uns persönlich.</figcaption>';
    var addressColumn = contact.querySelector('.grid > div');
    if (addressColumn) addressColumn.insertBefore(photo, addressColumn.firstChild);
  }, 500);
});
