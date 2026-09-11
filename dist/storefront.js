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
    @keyframes phoenixSignature {
      0%,100% { transform:translate3d(0,0,0) rotate(-1.2deg); filter:drop-shadow(0 0 7px rgba(201,169,97,.25)); }
      30% { transform:translate3d(2px,-5px,0) rotate(1.8deg); filter:drop-shadow(0 0 15px rgba(230,211,160,.5)); }
      62% { transform:translate3d(-1px,-2px,0) rotate(-.5deg); filter:drop-shadow(0 0 10px rgba(201,169,97,.38)); }
    }
    img[src="/assets/logo.png"] { transform-origin:48% 28%; animation:phoenixSignature 4.8s cubic-bezier(.45,0,.2,1) infinite; will-change:transform,filter; }
    img[src="/assets/logo.png"]:hover { animation-duration:1.7s; }
    .rose-scroll-glow { position:fixed; inset:-12%; z-index:1; pointer-events:none; opacity:var(--rose-glow,.12); background:radial-gradient(circle at var(--rose-x,50%) var(--rose-y,28%),rgba(105,163,255,.3),transparent 27%),radial-gradient(circle at 78% 72%,rgba(201,169,97,.1),transparent 24%); mix-blend-mode:screen; transition:opacity .25s linear; }
    @media (prefers-reduced-motion:reduce) { img[src="/assets/logo.png"] { animation:none; } .rose-scroll-glow { display:none; } }
  `;
  document.head.appendChild(motionStyle);

  const hero = document.querySelector('#home');
  if (hero && !hero.querySelector('.cinematic-phoenix')) {
    const originalHeroLogo = hero.querySelector('a[href="#home"] img[src="/assets/logo.png"]');
    if (originalHeroLogo) {
      originalHeroLogo.classList.add('original-hero-logo');
    }
    const phoenixVideo = document.createElement('video');
    phoenixVideo.className = 'cinematic-phoenix';
    phoenixVideo.src = '/assets/phoenix-transparent.webm';
    phoenixVideo.autoplay = true;
    phoenixVideo.loop = false;
    phoenixVideo.muted = true;
    phoenixVideo.playsInline = true;
    phoenixVideo.setAttribute('aria-hidden', 'true');
    phoenixVideo.setAttribute('disablepictureinpicture', '');
    hero.appendChild(phoenixVideo);
    phoenixVideo.play().catch(() => {});
    let wingLoopStart = 0;
    phoenixVideo.addEventListener('loadedmetadata', () => {
      wingLoopStart = Math.max(0, phoenixVideo.duration * .58);
    }, { once:true });
    phoenixVideo.addEventListener('timeupdate', () => {
      if (wingLoopStart && phoenixVideo.currentTime >= phoenixVideo.duration - .12) {
        phoenixVideo.currentTime = wingLoopStart;
        phoenixVideo.play().catch(() => {});
      }
    });

    const videoStyle = document.createElement('style');
    videoStyle.textContent = `
      .cinematic-phoenix{position:absolute;z-index:1;top:1.5%;left:50%;width:min(520px,48vw);max-height:390px;height:auto;transform:translateX(-50%);pointer-events:none;mix-blend-mode:screen;filter:drop-shadow(0 0 24px rgba(201,169,97,.38));opacity:0;transition:opacity 1s ease;object-fit:contain}
      .cinematic-phoenix.is-ready{opacity:.94}
      #home img[src="/assets/logo.png"]{width:min(320px,64vw)!important;filter:drop-shadow(0 0 20px rgba(201,169,97,.32))}
      #home .original-hero-logo{opacity:0!important;transition:opacity .45s ease}
      body.phoenix-header-logo #home .original-hero-logo{opacity:1!important}
      @media(max-width:700px){.cinematic-phoenix{top:8%;width:88vw;max-height:280px;opacity:.82}#home img[src="/assets/logo.png"]{width:min(265px,70vw)!important}}
      @media(prefers-reduced-motion:reduce){.cinematic-phoenix{display:none}}
    `;
    document.head.appendChild(videoStyle);
    phoenixVideo.addEventListener('canplay', () => phoenixVideo.classList.add('is-ready'), { once:true });
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
