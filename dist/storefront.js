// Promote the existing subtitle to the sole hero headline in every language.
const heroCopyStyle = document.createElement('style');
heroCopyStyle.textContent = `
  #home h1 { max-width:min(94vw,920px); font-size:clamp(2.1rem,4.4vw,3.7rem)!important; line-height:1.14; text-wrap:balance; }
  #home h1 + p { display:none!important; }
  @media (max-width:700px) { #home h1 { font-size:clamp(1.95rem,8vw,2.6rem)!important; } }
`;
document.head.appendChild(heroCopyStyle);

// The exported page already animates this image with a spring. Keep one visual
// scroll position so it cannot continue drifting after the user stops scrolling.
const roseMotionStyle = document.createElement('style');
roseMotionStyle.id = 'rose-motion-style';
roseMotionStyle.textContent = `
  body > .pointer-events-none.fixed.inset-0 > div:first-child {
    transform:translate3d(0,28px,0) scale(1.08)!important;
    filter:brightness(.98) saturate(1.04)!important;
  }
  @media (prefers-reduced-motion:reduce) {
    body > .pointer-events-none.fixed.inset-0 > div:first-child {
      transform:translate3d(0,0,0) scale(1.08)!important;
    }
  }
`;
document.head.appendChild(roseMotionStyle);

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const roseMotionRule = roseMotionStyle.sheet.cssRules[0];
  let roseFrame = 0;
  const updateRoses = () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
    const position = (28 - progress * 100).toFixed(2);
    const scale = (1.08 + progress * .06).toFixed(4);
    roseMotionRule.style.setProperty('transform', `translate3d(0,${position}px,0) scale(${scale})`, 'important');
    roseFrame = 0;
  };
  const scheduleRoses = () => {
    if (!roseFrame) roseFrame = requestAnimationFrame(updateRoses);
  };
  addEventListener('scroll', scheduleRoses, { passive:true });
  addEventListener('resize', scheduleRoses, { passive:true });
  addEventListener('load', scheduleRoses, { once:true });
  updateRoses();
}

const initializeStorefront = () => {
  const backgroundLayers = document.querySelectorAll('body > .pointer-events-none.fixed.inset-0 > div');
  if (backgroundLayers[1]) {
    backgroundLayers[1].style.background = 'radial-gradient(circle at 50% 12%, rgba(86,138,255,.08), transparent 44%), linear-gradient(180deg, rgba(1,4,13,.08), rgba(2,5,16,.16))';
  }

  const motionStyle = document.createElement('style');
  motionStyle.textContent = `
    #creations { overflow:clip; }
    #creations .creation-3d-stage { position:relative; isolation:isolate; perspective:1050px; transform-style:preserve-3d; }
    #creations .creation-3d-aura { position:absolute; z-index:0; inset:13% 10% 7%; border-radius:50%; pointer-events:none; background:radial-gradient(ellipse at 50% 58%,rgba(47,103,224,.25),rgba(8,23,70,.1) 44%,transparent 72%); filter:blur(18px); opacity:.82; }
    #creations .creation-3d-shadow { position:absolute; z-index:1; bottom:0; width:38%; height:14%; border-radius:50%; pointer-events:none; background:radial-gradient(ellipse,rgba(0,0,0,.66),rgba(1,6,22,.38) 42%,transparent 73%); filter:blur(12px); transform:rotateX(68deg); opacity:.82; transition:transform .45s ease,opacity .45s ease; }
    #creations .creation-3d-shadow[data-bottle="left"] { left:9%; }
    #creations .creation-3d-shadow[data-bottle="right"] { right:9%; }
    #creations .creation-3d-bottle { --tilt-x:0deg; --tilt-y:0deg; --lift:0px; --glint-x:50%; --glint-y:34%; --glint-opacity:.22; position:absolute; inset:0; z-index:2; display:block; pointer-events:none; transform-style:preserve-3d; transform:translate3d(0,var(--lift),48px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)); transition:transform .48s cubic-bezier(.2,.75,.25,1); will-change:transform; }
    #creations .creation-3d-bottle[data-bottle="left"] { clip-path:inset(-12% 50% -12% -12%); transform-origin:29% 67%; }
    #creations .creation-3d-bottle[data-bottle="right"] { clip-path:inset(-12% -12% -12% 50%); transform-origin:71% 67%; }
    #creations .creation-3d-bottle.is-tracking { transition-duration:.14s; transition-timing-function:ease-out; }
    #creations .creation-3d-float { position:absolute; inset:0; display:block; animation:creation-3d-float 6.5s ease-in-out infinite; }
    #creations .creation-3d-bottle[data-bottle="right"] .creation-3d-float { animation-delay:-3.25s; }
    #creations .creation-3d-float > img { transform:none!important; transition:none!important; filter:drop-shadow(0 34px 27px rgba(0,0,0,.48)) drop-shadow(0 0 15px rgba(61,119,255,.16)); }
    #creations .creation-3d-glint { position:absolute; inset:0; display:block; pointer-events:none; background:radial-gradient(ellipse 15% 65% at var(--glint-x) var(--glint-y),rgba(255,246,207,.95),rgba(255,210,95,.43) 20%,rgba(89,145,255,.16) 39%,transparent 64%); -webkit-mask:url('/assets/monremy-flacon-transparent.webp') center/contain no-repeat; mask:url('/assets/monremy-flacon-transparent.webp') center/contain no-repeat; mix-blend-mode:screen; opacity:var(--glint-opacity); transition:opacity .4s ease; }
    #creations .creation-3d-hit { position:absolute; z-index:3; top:0; bottom:0; width:50%; display:block; touch-action:pan-y; }
    #creations .creation-3d-hit[data-bottle="left"] { left:0; }
    #creations .creation-3d-hit[data-bottle="right"] { right:0; }
    @keyframes creation-3d-float { 0%,100% { transform:translate3d(0,2px,0); } 50% { transform:translate3d(0,-6px,0); } }
    @media (hover:hover) and (pointer:fine) {
      #creations .creation-3d-bottle.is-tracking { --glint-opacity:.72; }
    }
    @media (max-width:700px) {
      #creations .creation-3d-stage { perspective:850px; }
      #creations .creation-3d-bottle { --glint-opacity:.28; }
      #creations .creation-3d-aura { left:7%; right:7%; filter:blur(13px); }
    }
    @media (prefers-reduced-motion:reduce) {
      #creations .creation-3d-bottle { transform:none!important; transition:none!important; }
      #creations .creation-3d-float { animation:none!important; }
      #creations .creation-3d-glint { opacity:.16; transition:none; }
    }
  `;
  document.head.appendChild(motionStyle);

  const creationBottle = document.querySelector('#creations img[src="/assets/monremy-flacon-transparent.webp"]');
  const creationStage = creationBottle?.closest('a');
  if (creationBottle && creationStage && !creationStage.classList.contains('creation-3d-stage')) {
    creationStage.classList.add('creation-3d-stage');

    const aura = document.createElement('span');
    aura.className = 'creation-3d-aura';
    aura.setAttribute('aria-hidden', 'true');

    creationStage.insertBefore(aura, creationBottle);
    creationBottle.alt = '';
    creationBottle.setAttribute('aria-hidden', 'true');
    const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion:reduce)');
    ['left', 'right'].forEach((side) => {
      const shadow = document.createElement('span');
      shadow.className = 'creation-3d-shadow';
      shadow.dataset.bottle = side;
      shadow.setAttribute('aria-hidden', 'true');
      creationStage.appendChild(shadow);

      const bottle = document.createElement('span');
      bottle.className = 'creation-3d-bottle';
      bottle.dataset.bottle = side;
      bottle.setAttribute('aria-hidden', 'true');
      const floatingLayer = document.createElement('span');
      floatingLayer.className = 'creation-3d-float';
      const image = side === 'left' ? creationBottle : creationBottle.cloneNode(true);
      floatingLayer.appendChild(image);
      const glint = document.createElement('span');
      glint.className = 'creation-3d-glint';
      floatingLayer.appendChild(glint);
      bottle.appendChild(floatingLayer);
      creationStage.appendChild(bottle);

      const hit = document.createElement('span');
      hit.className = 'creation-3d-hit';
      hit.dataset.bottle = side;
      hit.setAttribute('aria-hidden', 'true');
      creationStage.appendChild(hit);

      let pointerFrame = 0;
      let nextX = 0;
      let nextY = 0;
      let touching = false;
      const paintTilt = () => {
        bottle.style.setProperty('--tilt-x', `${(-nextY * 5).toFixed(2)}deg`);
        bottle.style.setProperty('--tilt-y', `${(nextX * 7).toFixed(2)}deg`);
        bottle.style.setProperty('--lift', nextX || nextY ? '-5px' : '0px');
        bottle.style.setProperty('--glint-x', `${(side === 'left' ? 29 : 71) + nextX * 17}%`);
        bottle.style.setProperty('--glint-y', `${34 + nextY * 26}%`);
        pointerFrame = 0;
      };
      const scheduleTilt = () => {
        if (!pointerFrame) pointerFrame = requestAnimationFrame(paintTilt);
      };
      const updateTilt = (event) => {
        if (reducedMotion.matches || (event.pointerType === 'touch' && !touching) || (event.pointerType !== 'touch' && !finePointer.matches)) return;
        const bounds = hit.getBoundingClientRect();
        nextX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2));
        nextY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - .5) * 2));
        bottle.classList.add('is-tracking');
        scheduleTilt();
      };
      const resetTilt = () => {
        touching = false;
        nextX = 0;
        nextY = 0;
        bottle.classList.remove('is-tracking');
        scheduleTilt();
      };
      hit.addEventListener('pointerdown', (event) => {
        if (event.pointerType === 'touch') touching = true;
        updateTilt(event);
      }, { passive:true });
      hit.addEventListener('pointermove', updateTilt, { passive:true });
      hit.addEventListener('pointerleave', resetTilt, { passive:true });
      hit.addEventListener('pointerup', resetTilt, { passive:true });
      hit.addEventListener('pointercancel', resetTilt, { passive:true });
    });
  }

  const hero = document.querySelector('#home');
  if (hero && !hero.querySelector('.cinematic-phoenix')) {
    const originalHeroLogo = hero.querySelector('a[href="#home"] img[src="/assets/logo.png"]');
    if (originalHeroLogo) {
      originalHeroLogo.classList.add('original-hero-logo');
    }
    const phoenixVideo = document.createElement('video');
    phoenixVideo.className = 'cinematic-phoenix';
    phoenixVideo.src = '/assets/phoenix-blue-loop-optimized.webm';
    phoenixVideo.autoplay = true;
    phoenixVideo.loop = true;
    phoenixVideo.muted = true;
    phoenixVideo.playsInline = true;
    phoenixVideo.preload = 'metadata';
    phoenixVideo.setAttribute('aria-hidden', 'true');
    phoenixVideo.setAttribute('disablepictureinpicture', '');
    hero.appendChild(phoenixVideo);
    const wordmark = document.createElement('img');
    wordmark.className = 'cinematic-wordmark';
    wordmark.src = '/assets/logo-wordmark.png';
    wordmark.alt = 'Mon Rémy Parfumerie';
    hero.appendChild(wordmark);
    phoenixVideo.play().catch(() => {});

    const videoStyle = document.createElement('style');
    videoStyle.textContent = `
      .cinematic-phoenix{--phoenix-x:0px;--phoenix-y:0px;--phoenix-scale:1;--phoenix-rotate:0deg;--phoenix-flight-opacity:.94;position:fixed;z-index:180;top:clamp(125px,18vh,175px);left:50%;width:min(620px,60vw);height:auto;aspect-ratio:32/13;contain:layout size;transform:translate(-50%,-50%) translate3d(var(--phoenix-x),var(--phoenix-y),0) scale(var(--phoenix-scale)) rotate(var(--phoenix-rotate));transform-origin:center;pointer-events:none;filter:brightness(1.28) saturate(1.22) contrast(1.06) drop-shadow(0 0 16px rgba(255,224,139,.48)) drop-shadow(0 0 32px rgba(201,169,97,.28));opacity:0;transition:opacity .32s ease;object-fit:contain;will-change:transform,opacity;-webkit-mask-image:radial-gradient(ellipse 68% 76% at 50% 44%,#000 48%,rgba(0,0,0,.9) 65%,rgba(0,0,0,.42) 82%,transparent 100%);mask-image:radial-gradient(ellipse 68% 76% at 50% 44%,#000 48%,rgba(0,0,0,.9) 65%,rgba(0,0,0,.42) 82%,transparent 100%)}
      .cinematic-phoenix.is-ready{opacity:var(--phoenix-flight-opacity)}
      .cinematic-wordmark{position:absolute;z-index:2;top:38%;left:50%;width:min(510px,56vw);height:auto;transform:translateX(-50%);pointer-events:none;filter:drop-shadow(0 0 18px rgba(201,169,97,.28))}
      #home img[src="/assets/logo.png"]{width:min(320px,64vw)!important;filter:drop-shadow(0 0 20px rgba(201,169,97,.32))}
      #home .original-hero-logo{opacity:0!important;transition:opacity .5s ease,filter .5s ease;filter:drop-shadow(0 0 16px rgba(255,218,118,.34))}
      body.phoenix-header-logo #home .original-hero-logo{opacity:1!important}
      @media(max-width:700px){.cinematic-phoenix{top:clamp(126px,19vh,155px);width:96vw}.cinematic-wordmark{top:35%;width:82vw}#home img[src="/assets/logo.png"]{width:min(265px,70vw)!important}}
      @media(prefers-reduced-motion:reduce){.cinematic-phoenix{display:none}.cinematic-wordmark{top:24%}}
    `;
    document.head.appendChild(videoStyle);
    const revealPhoenix = () => phoenixVideo.classList.add('is-ready');
    phoenixVideo.addEventListener('canplay', revealPhoenix, { once:true });
    if (phoenixVideo.readyState >= 3) revealPhoenix();

    const reducePhoenixMotion = window.matchMedia('(prefers-reduced-motion:reduce)');
    let phoenixFrame = 0;
    let heroVisible = true;
    let flightProgress = 0;
    const syncPhoenixPlayback = () => {
      if (!reducePhoenixMotion.matches && heroVisible && !document.hidden && flightProgress < .94) {
        if (phoenixVideo.paused) phoenixVideo.play().catch(() => {});
      } else if (!phoenixVideo.paused) {
        phoenixVideo.pause();
      }
    };
    const updatePhoenixFlight = () => {
      phoenixFrame = 0;
      const travel = Math.max(1, innerHeight * .72);
      const raw = Math.max(0, Math.min(1, scrollY / travel));
      const eased = raw * raw * (3 - 2 * raw);
      flightProgress = raw;
      const compact = innerWidth < 700;
      const startY = compact
        ? Math.min(155, Math.max(126, innerHeight * .19))
        : Math.min(175, Math.max(125, innerHeight * .18));
      const targetX = compact ? 55 : 68;
      const targetY = compact ? 39 : 42;
      const arc = Math.sin(eased * Math.PI) * Math.min(34, Math.max(24, innerWidth * .03));
      const endScale = compact ? .13 : .14;
      const fade = Math.max(0, Math.min(1, (raw - .72) / .22));
      phoenixVideo.style.setProperty('--phoenix-x', `${((targetX - innerWidth / 2) * eased).toFixed(2)}px`);
      phoenixVideo.style.setProperty('--phoenix-y', `${((targetY - startY) * eased - arc).toFixed(2)}px`);
      phoenixVideo.style.setProperty('--phoenix-scale', (1 - (1 - endScale) * eased).toFixed(4));
      phoenixVideo.style.setProperty('--phoenix-rotate', `${(-7 * Math.sin(eased * Math.PI)).toFixed(2)}deg`);
      phoenixVideo.style.setProperty('--phoenix-flight-opacity', (.94 * (1 - fade)).toFixed(3));
      document.body.classList.toggle('phoenix-header-logo', raw > .78);
      syncPhoenixPlayback();
    };
    const schedulePhoenixFlight = () => {
      if (!phoenixFrame) phoenixFrame = requestAnimationFrame(updatePhoenixFlight);
    };
    new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      syncPhoenixPlayback();
    }, { threshold:.03 }).observe(hero);
    addEventListener('scroll', schedulePhoenixFlight, { passive:true });
    addEventListener('resize', schedulePhoenixFlight, { passive:true });
    document.addEventListener('visibilitychange', syncPhoenixPlayback);
    reducePhoenixMotion.addEventListener('change', () => {
      schedulePhoenixFlight();
      syncPhoenixPlayback();
    });
    updatePhoenixFlight();
  }

  // Also correct older cached language bundles after a language switch.
  if (hero) {
    const syncHeroCopy = () => {
      const heading = hero.querySelector('h1');
      const lead = heading?.nextElementSibling;
      if (lead?.tagName !== 'P') return;
      const text = lead.textContent?.trim();
      if (text && heading.textContent !== text) heading.textContent = text;
    };
    syncHeroCopy();
    new MutationObserver(syncHeroCopy).observe(hero, { childList:true, characterData:true, subtree:true });
  }

};

if (document.readyState === 'complete') initializeStorefront();
else window.addEventListener('load', initializeStorefront, { once:true });

// Editorial sections live outside the exported React tree so they survive hydration.
const editorialStylesheet = document.createElement('link');
editorialStylesheet.rel = 'stylesheet';
editorialStylesheet.href = '/editorial-sections.css';
document.head.appendChild(editorialStylesheet);

const initializeEditorialSections = () => {
  const about = document.getElementById('about');
  const creations = document.getElementById('creations');
  const contact = document.getElementById('contact');
  if (!about || !creations || !contact || document.getElementById('process')) return;

  const translations = {
    de: {
      processLabel: 'IHRE KOMPOSITION', processTitle: 'So entsteht Ihr Duft.',
      processLead: 'Ein persönliches Gespräch ist der Anfang. Ihre Vorlieben geben der Komposition ihre Richtung.',
      step1: 'Kennenlernen', step1Text: 'Wir sprechen über Eindrücke, Erinnerungen und das, was Sie an einem Duft lieben.',
      step2: 'Richtung finden', step2Text: 'Aus Ihren Vorlieben entsteht eine Duftidee, die zu Ihrer Persönlichkeit passt.',
      step3: 'Komposition', step3Text: 'Die einzelnen Nuancen werden zu Ihrem persönlichen Duft zusammengeführt.',
      worldsLabel: 'DUFTWELTEN', worldsTitle: 'Ein Gefühl. Viele Facetten.',
      worldsLead: 'Welche Richtung spricht Sie an? Entdecken Sie drei Stimmungen als Ausgangspunkt für Ihre eigene Duftreise.',
      floral: 'Floral', floralText: 'Sanfte Blütennoten und eine elegante, leichte Ausstrahlung.', floralNotes: 'Rose · Jasmin · Iris',
      fresh: 'Frisch', freshText: 'Klar, lebendig und voller Leichtigkeit.', freshNotes: 'Bergamotte · Zitrus · Aquatische Noten',
      woody: 'Holzig', woodyText: 'Warm, tief und von ruhiger Präsenz.', woodyNotes: 'Zedernholz · Sandelholz · Amber',
      contactPhotoLabel: 'Mon Rémy · Göttingen', contactPhotoCaption: 'Besuchen Sie uns persönlich.',
      contactPhotoAlt: 'Außenansicht der Mon Rémy Parfumerie in der Weender Straße 79 in Göttingen'
    },
    en: {
      processLabel: 'YOUR COMPOSITION', processTitle: 'How your fragrance takes shape.',
      processLead: 'It begins with a personal conversation. Your preferences set the direction for the composition.',
      step1: 'Getting to know you', step1Text: 'We talk about impressions, memories and what you love in a fragrance.',
      step2: 'Finding a direction', step2Text: 'Your preferences become the starting point for a scent that feels like you.',
      step3: 'Composition', step3Text: 'The individual notes come together in your personal fragrance.',
      worldsLabel: 'FRAGRANCE WORLDS', worldsTitle: 'One feeling. Many facets.',
      worldsLead: 'Which direction speaks to you? Discover three moods as the beginning of your fragrance journey.',
      floral: 'Floral', floralText: 'Soft floral notes with an elegant, light presence.', floralNotes: 'Rose · Jasmine · Iris',
      fresh: 'Fresh', freshText: 'Clear, lively and effortlessly light.', freshNotes: 'Bergamot · Citrus · Aquatic notes',
      woody: 'Woody', woodyText: 'Warm, deep and quietly distinctive.', woodyNotes: 'Cedarwood · Sandalwood · Amber',
      contactPhotoLabel: 'Mon Rémy · Göttingen', contactPhotoCaption: 'Come and visit us.',
      contactPhotoAlt: 'Exterior of the Mon Rémy perfumery on Weender Straße 79 in Göttingen'
    },
    ar: {
      processLabel: 'عطرك الخاص', processTitle: 'هكذا يتكوّن عطرك.',
      processLead: 'تبدأ الرحلة بحوار شخصي، وتحدّد تفضيلاتك الاتجاه الذي تسير فيه التركيبة.',
      step1: 'التعارف', step1Text: 'نتحدث عن الانطباعات والذكريات وما تحبّه في العطور.',
      step2: 'اختيار الاتجاه', step2Text: 'تصبح تفضيلاتك نقطة البداية لرائحة تعبّر عن شخصيتك.',
      step3: 'التركيب', step3Text: 'تجتمع النفحات المختلفة لتشكّل عطرك الشخصي.',
      worldsLabel: 'عوالم العطور', worldsTitle: 'إحساس واحد، وجوه عديدة.',
      worldsLead: 'أي طابع يلامسك؟ اكتشف ثلاثة اتجاهات كبداية لرحلتك مع العطور.',
      floral: 'زهري', floralText: 'نفحات زهرية ناعمة بحضور أنيق وخفيف.', floralNotes: 'ورد · ياسمين · سوسن',
      fresh: 'منعش', freshText: 'طابع صافٍ وحيوي مفعم بالخفة.', freshNotes: 'برغموت · حمضيات · نفحات مائية',
      woody: 'خشبي', woodyText: 'دافئ وعميق بحضور هادئ ومميز.', woodyNotes: 'خشب الأرز · صندل · عنبر',
      contactPhotoLabel: 'مون ريمي · غوتينغن', contactPhotoCaption: 'يسعدنا استقبالكم.',
      contactPhotoAlt: 'واجهة بارفومري مون ريمي في شارع فيندر 79 بمدينة غوتينغن'
    }
  };

  const process = document.createElement('section');
  process.id = 'process';
  process.className = 'editorial-section';
  process.setAttribute('aria-labelledby', 'process-title');
  process.innerHTML = `
    <div class="editorial-inner">
      <p class="editorial-eyebrow" data-copy="processLabel"></p>
      <h2 class="editorial-title" id="process-title" data-copy="processTitle"></h2>
      <p class="editorial-lead" data-copy="processLead"></p>
      <ol class="editorial-process">
        <li><span class="editorial-step-number" aria-hidden="true">01</span><h3 data-copy="step1"></h3><p data-copy="step1Text"></p></li>
        <li><span class="editorial-step-number" aria-hidden="true">02</span><h3 data-copy="step2"></h3><p data-copy="step2Text"></p></li>
        <li><span class="editorial-step-number" aria-hidden="true">03</span><h3 data-copy="step3"></h3><p data-copy="step3Text"></p></li>
      </ol>
    </div>`;

  const worlds = document.createElement('section');
  worlds.id = 'worlds';
  worlds.className = 'editorial-section';
  worlds.setAttribute('aria-labelledby', 'worlds-title');
  worlds.innerHTML = `
    <div class="editorial-inner">
      <p class="editorial-eyebrow" data-copy="worldsLabel"></p>
      <h2 class="editorial-title" id="worlds-title" data-copy="worldsTitle"></h2>
      <p class="editorial-lead" data-copy="worldsLead"></p>
      <div class="editorial-worlds">
        <article class="editorial-world" tabindex="0" role="button" aria-expanded="false"><span class="editorial-world-index" aria-hidden="true">01 / 03</span><h3 data-copy="floral"></h3><p data-copy="floralText"></p><p class="editorial-world-notes" data-copy="floralNotes"></p></article>
        <article class="editorial-world" tabindex="0" role="button" aria-expanded="false"><span class="editorial-world-index" aria-hidden="true">02 / 03</span><h3 data-copy="fresh"></h3><p data-copy="freshText"></p><p class="editorial-world-notes" data-copy="freshNotes"></p></article>
        <article class="editorial-world" tabindex="0" role="button" aria-expanded="false"><span class="editorial-world-index" aria-hidden="true">03 / 03</span><h3 data-copy="woody"></h3><p data-copy="woodyText"></p><p class="editorial-world-notes" data-copy="woodyNotes"></p></article>
      </div>
    </div>`;

  about.after(process);
  creations.after(worlds);

  const language = () => {
    const code = document.documentElement.lang.toLowerCase().split('-')[0];
    return translations[code] ? code : 'de';
  };
  const translate = () => {
    const copy = translations[language()];
    for (const element of document.querySelectorAll('.editorial-section [data-copy]')) {
      element.textContent = copy[element.dataset.copy];
    }
    const photo = contact.querySelector('.storefront-photo');
    if (photo) {
      photo.querySelector('img').alt = copy.contactPhotoAlt;
      photo.querySelector('figcaption span').textContent = copy.contactPhotoLabel;
      photo.querySelector('figcaption strong').textContent = copy.contactPhotoCaption;
    }
  };
  translate();
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
  document.addEventListener('click', (event) => {
    if (event.target.closest('header button')) setTimeout(translate, 0);
  });

  const worldDeck = worlds.querySelector('.editorial-worlds');
  const worldCards = [...worldDeck.querySelectorAll('.editorial-world')];
  const fineWorldPointer = window.matchMedia('(hover:hover) and (pointer:fine)');
  const setActiveWorld = (activeCard, selected = false) => {
    worldCards.forEach((card) => {
      const active = card === activeCard;
      card.classList.toggle('is-active', active);
      if (selected) card.classList.toggle('is-selected', active);
      else if (!active) card.classList.remove('is-selected');
      card.setAttribute('aria-expanded', active ? 'true' : 'false');
    });
    worldDeck.classList.toggle('has-active', Boolean(activeCard));
  };
  const restoreSelectedWorld = () => {
    const selectedCard = worldDeck.querySelector('.is-selected');
    setActiveWorld(selectedCard || null, Boolean(selectedCard));
  };
  worldCards.forEach((card) => {
    let worldFrame = 0;
    let nextX = 50;
    let nextY = 38;
    const paintWorldLight = () => {
      worldFrame = 0;
      card.style.setProperty('--spot-x', `${nextX.toFixed(1)}%`);
      card.style.setProperty('--spot-y', `${nextY.toFixed(1)}%`);
      card.style.setProperty('--depth-x', `${((nextX - 50) * -.025).toFixed(2)}px`);
      card.style.setProperty('--depth-y', `${((nextY - 50) * -.025).toFixed(2)}px`);
    };
    const moveWorldLight = (event) => {
      if (!fineWorldPointer.matches) return;
      const bounds = card.getBoundingClientRect();
      nextX = Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100));
      nextY = Math.max(0, Math.min(100, (event.clientY - bounds.top) / bounds.height * 100));
      if (!worldFrame) worldFrame = requestAnimationFrame(paintWorldLight);
    };
    card.addEventListener('pointerenter', () => {
      if (fineWorldPointer.matches) setActiveWorld(card);
    });
    card.addEventListener('pointermove', moveWorldLight, { passive:true });
    card.addEventListener('pointerleave', restoreSelectedWorld);
    card.addEventListener('focus', () => setActiveWorld(card));
    card.addEventListener('blur', restoreSelectedWorld);
    card.addEventListener('click', () => {
      const close = card.classList.contains('is-selected');
      if (close) setActiveWorld(null);
      else setActiveWorld(card, true);
    });
    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      card.click();
    });
  });
  document.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('.editorial-world')) setActiveWorld(null);
  }, { passive:true });

  const timelineMedia = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
  const timeline = process.querySelector('.editorial-process');
  const timelineSteps = [...timeline.querySelectorAll('li')];
  let timelineFrame = 0;
  const updateTimeline = () => {
    timelineFrame = 0;
    if (!timelineMedia.matches) return;
    const travel = Math.max(1, process.offsetHeight - innerHeight);
    const progress = Math.max(0, Math.min(1, -process.getBoundingClientRect().top / travel));
    timeline.style.setProperty('--timeline-progress', progress.toFixed(3));
    timelineSteps.forEach((step, index) => {
      step.classList.toggle('is-visible', progress >= [0, .32, .68][index]);
    });
  };
  const scheduleTimeline = () => {
    if (!timelineFrame) timelineFrame = requestAnimationFrame(updateTimeline);
  };
  const syncTimelineMode = () => {
    process.classList.toggle('is-timeline-animated', timelineMedia.matches);
    if (timelineMedia.matches) scheduleTimeline();
    else {
      timeline.style.removeProperty('--timeline-progress');
      timelineSteps.forEach((step) => step.classList.remove('is-visible'));
    }
  };
  timelineMedia.addEventListener('change', syncTimelineMode);
  addEventListener('scroll', scheduleTimeline, { passive:true });
  addEventListener('resize', scheduleTimeline, { passive:true });
  syncTimelineMode();


  window.setTimeout(() => {
    const addressColumn = contact.querySelector('.grid > div');
    if (!addressColumn || contact.querySelector('.storefront-photo')) return;
    const photo = document.createElement('figure');
    photo.className = 'storefront-photo';
    photo.innerHTML = '<img src="/assets/monremy-storefront.png" alt="" loading="lazy" decoding="async"><figcaption><span></span><strong></strong></figcaption>';
    addressColumn.insertBefore(photo, addressColumn.firstChild);
    translate();
  }, 500);
};

if (document.readyState === 'complete') initializeEditorialSections();
else window.addEventListener('load', initializeEditorialSections, { once:true });
