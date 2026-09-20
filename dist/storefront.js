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

window.addEventListener('load', () => {
  const backgroundLayers = document.querySelectorAll('body > .pointer-events-none.fixed.inset-0 > div');
  if (backgroundLayers[1]) {
    backgroundLayers[1].style.background = 'radial-gradient(circle at 50% 12%, rgba(86,138,255,.08), transparent 44%), linear-gradient(180deg, rgba(1,4,13,.08), rgba(2,5,16,.16))';
  }

  const motionStyle = document.createElement('style');
  motionStyle.textContent = `
    #creations { overflow:clip; }
    #creations .creation-3d-stage { --tilt-x:0deg; --tilt-y:0deg; --glint-x:50%; --glint-y:30%; --scene-scale:1; --glint-opacity:.22; position:relative; isolation:isolate; perspective:1050px; transform-style:preserve-3d; }
    #creations .creation-3d-object { position:absolute; inset:0; z-index:3; display:block; transform-style:preserve-3d; transform:translate3d(0,0,48px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale(var(--scene-scale)); transform-origin:50% 68%; transition:transform .48s cubic-bezier(.2,.75,.25,1); will-change:transform; }
    #creations .creation-3d-stage.is-tracking .creation-3d-object { transition-duration:.14s; transition-timing-function:ease-out; }
    #creations .creation-3d-float { position:absolute; inset:0; display:block; transform-style:preserve-3d; animation:creation-3d-float 6.5s ease-in-out infinite; }
    #creations .creation-3d-float > img { z-index:1; transform:none!important; transition:none!important; filter:drop-shadow(0 34px 27px rgba(0,0,0,.48)) drop-shadow(0 0 15px rgba(61,119,255,.16)); }
    #creations .creation-3d-aura { position:absolute; z-index:0; left:12%; right:12%; top:13%; bottom:7%; border-radius:50%; pointer-events:none; background:radial-gradient(ellipse at 50% 58%,rgba(47,103,224,.25),rgba(8,23,70,.1) 44%,transparent 72%); filter:blur(18px); transform:translateZ(-60px) scale(.92); opacity:.82; }
    #creations .creation-3d-shadow { position:absolute; z-index:1; left:13%; right:13%; bottom:-1%; height:17%; border-radius:50%; pointer-events:none; background:radial-gradient(ellipse,rgba(0,0,0,.66) 0%,rgba(1,6,22,.38) 42%,transparent 73%); filter:blur(12px); transform:translateZ(-35px) rotateX(68deg) scaleX(.86); transform-origin:center; transition:transform .45s ease,opacity .45s ease; opacity:.82; }
    #creations .creation-3d-ring { position:absolute; z-index:2; left:16%; right:16%; bottom:3%; height:17%; border:1px solid rgba(222,188,105,.28); border-radius:50%; pointer-events:none; box-shadow:0 0 24px rgba(60,115,255,.18),inset 0 0 18px rgba(221,185,97,.08); transform:translateZ(-12px) rotateX(70deg); opacity:.6; }
    #creations .creation-3d-glint { position:absolute; inset:0; z-index:2; display:block; pointer-events:none; background:radial-gradient(ellipse 15% 65% at var(--glint-x) var(--glint-y),rgba(255,246,207,.95) 0%,rgba(255,210,95,.43) 20%,rgba(89,145,255,.16) 39%,transparent 64%); -webkit-mask:url('/assets/monremy-flacon-transparent.webp') center/contain no-repeat; mask:url('/assets/monremy-flacon-transparent.webp') center/contain no-repeat; mix-blend-mode:screen; opacity:var(--glint-opacity); transition:opacity .4s ease; transform:translateZ(3px); }
    #creations .creation-3d-stage::after { content:''; position:absolute; z-index:4; inset:8% 8% 6%; pointer-events:none; border-radius:50%; background:linear-gradient(112deg,transparent 25%,rgba(255,228,157,.08) 45%,transparent 62%); filter:blur(16px); opacity:.35; transform:translateZ(70px); }
    @keyframes creation-3d-float { 0%,100% { transform:translate3d(0,2px,0); } 50% { transform:translate3d(0,-6px,0); } }
    @media (hover:hover) and (pointer:fine) {
      #creations .creation-3d-stage:hover { --scene-scale:1.025; --glint-opacity:.72; }
      #creations .creation-3d-stage:hover .creation-3d-shadow { transform:translateZ(-35px) rotateX(68deg) scaleX(.96); opacity:.7; }
    }
    @media (max-width:700px) {
      #creations .creation-3d-stage { perspective:850px; --glint-opacity:.28; }
      #creations .creation-3d-object { transform:translate3d(0,0,28px) rotateX(-1deg) scale(1.015); }
      #creations .creation-3d-aura { left:7%; right:7%; filter:blur(13px); }
      #creations .creation-3d-ring { left:11%; right:11%; opacity:.42; }
    }
    @media (prefers-reduced-motion:reduce) {
      #creations .creation-3d-object { transform:none!important; transition:none!important; }
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

    const shadow = document.createElement('span');
    shadow.className = 'creation-3d-shadow';
    shadow.setAttribute('aria-hidden', 'true');

    const ring = document.createElement('span');
    ring.className = 'creation-3d-ring';
    ring.setAttribute('aria-hidden', 'true');

    const object = document.createElement('span');
    object.className = 'creation-3d-object';
    const floatingLayer = document.createElement('span');
    floatingLayer.className = 'creation-3d-float';
    const glint = document.createElement('span');
    glint.className = 'creation-3d-glint';
    glint.setAttribute('aria-hidden', 'true');

    creationStage.insertBefore(aura, creationBottle);
    creationStage.insertBefore(shadow, creationBottle);
    creationStage.insertBefore(ring, creationBottle);
    creationStage.insertBefore(object, creationBottle);
    object.appendChild(floatingLayer);
    floatingLayer.appendChild(creationBottle);
    floatingLayer.appendChild(glint);

    const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)');
    let pointerFrame = 0;
    let nextX = 0;
    let nextY = 0;

    const paintTilt = () => {
      creationStage.style.setProperty('--tilt-x', `${(-nextY * 5).toFixed(2)}deg`);
      creationStage.style.setProperty('--tilt-y', `${(nextX * 7).toFixed(2)}deg`);
      creationStage.style.setProperty('--glint-x', `${(50 + nextX * 31).toFixed(1)}%`);
      creationStage.style.setProperty('--glint-y', `${(34 + nextY * 26).toFixed(1)}%`);
      pointerFrame = 0;
    };

    creationStage.addEventListener('pointermove', (event) => {
      if (!finePointer.matches || event.pointerType === 'touch') return;
      const bounds = creationStage.getBoundingClientRect();
      nextX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2));
      nextY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - .5) * 2));
      creationStage.classList.add('is-tracking');
      if (!pointerFrame) pointerFrame = requestAnimationFrame(paintTilt);
    }, { passive:true });

    creationStage.addEventListener('pointerleave', () => {
      nextX = 0;
      nextY = 0;
      creationStage.classList.remove('is-tracking');
      if (!pointerFrame) pointerFrame = requestAnimationFrame(paintTilt);
    }, { passive:true });
  }

  const hero = document.querySelector('#home');
  if (hero && !hero.querySelector('.cinematic-phoenix')) {
    const originalHeroLogo = hero.querySelector('a[href="#home"] img[src="/assets/logo.png"]');
    if (originalHeroLogo) {
      originalHeroLogo.classList.add('original-hero-logo');
    }
    const phoenixVideo = document.createElement('video');
    phoenixVideo.className = 'cinematic-phoenix';
    phoenixVideo.src = '/assets/phoenix-blue-loop.webm';
    phoenixVideo.autoplay = true;
    phoenixVideo.loop = true;
    phoenixVideo.muted = true;
    phoenixVideo.playsInline = true;
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
      .cinematic-phoenix{position:absolute;z-index:1;top:4%;left:50%;width:min(620px,60vw);height:auto;aspect-ratio:32/13;contain:layout size;transform:translateX(-50%);pointer-events:none;filter:brightness(1.28) saturate(1.22) contrast(1.06) drop-shadow(0 0 16px rgba(255,224,139,.48)) drop-shadow(0 0 32px rgba(201,169,97,.28));opacity:0;transition:opacity 1s ease;object-fit:contain;-webkit-mask-image:radial-gradient(ellipse 68% 76% at 50% 44%,#000 48%,rgba(0,0,0,.9) 65%,rgba(0,0,0,.42) 82%,transparent 100%);mask-image:radial-gradient(ellipse 68% 76% at 50% 44%,#000 48%,rgba(0,0,0,.9) 65%,rgba(0,0,0,.42) 82%,transparent 100%)}
      .cinematic-phoenix.is-ready{opacity:.94}
      .cinematic-wordmark{position:absolute;z-index:2;top:38%;left:50%;width:min(510px,56vw);height:auto;transform:translateX(-50%);pointer-events:none;filter:drop-shadow(0 0 18px rgba(201,169,97,.28))}
      #home img[src="/assets/logo.png"]{width:min(320px,64vw)!important;filter:drop-shadow(0 0 20px rgba(201,169,97,.32))}
      #home .original-hero-logo{opacity:0!important;transition:opacity .45s ease}
      body.phoenix-header-logo #home .original-hero-logo{opacity:1!important}
      @media(max-width:700px){.cinematic-phoenix{top:10%;width:96vw;opacity:.88}.cinematic-wordmark{top:35%;width:82vw}#home img[src="/assets/logo.png"]{width:min(265px,70vw)!important}}
      @media(prefers-reduced-motion:reduce){.cinematic-phoenix{display:none}.cinematic-wordmark{top:24%}}
    `;
    document.head.appendChild(videoStyle);
    phoenixVideo.addEventListener('canplay', () => phoenixVideo.classList.add('is-ready'), { once:true });
    const updateHeaderLogo = () => document.body.classList.toggle('phoenix-header-logo', scrollY > innerHeight * .62);
    addEventListener('scroll', updateHeaderLogo, { passive:true });
    updateHeaderLogo();
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

// Editorial sections live outside the exported React tree so they survive hydration.
const editorialStylesheet = document.createElement('link');
editorialStylesheet.rel = 'stylesheet';
editorialStylesheet.href = '/editorial-sections.css';
document.head.appendChild(editorialStylesheet);

window.addEventListener('load', () => {
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
      floral: 'Floral', floralText: 'Sanfte Blütennoten und eine elegante, leichte Ausstrahlung.',
      fresh: 'Frisch', freshText: 'Klar, lebendig und voller Leichtigkeit.',
      woody: 'Holzig', woodyText: 'Warm, tief und von ruhiger Präsenz.',
      galleryLabel: 'MON RÉMY GÖTTINGEN', galleryTitle: 'Einblicke in Mon Rémy.',
      galleryLead: 'Ein Blick auf den Ort, an dem persönliche Duftmomente entstehen.',
      storefrontCaption: 'Die Parfümerie von außen', storefrontAlt: 'Echte Außenaufnahme der Mon Rémy Parfümerie in Göttingen',
      signCaption: 'Das Mon-Rémy-Leuchtschild im Innenraum', signAlt: 'Echtes Foto des beleuchteten Mon-Rémy-Schilds im Innenraum',
      close: 'Bild schließen'
    },
    en: {
      processLabel: 'YOUR COMPOSITION', processTitle: 'How your fragrance takes shape.',
      processLead: 'It begins with a personal conversation. Your preferences set the direction for the composition.',
      step1: 'Getting to know you', step1Text: 'We talk about impressions, memories and what you love in a fragrance.',
      step2: 'Finding a direction', step2Text: 'Your preferences become the starting point for a scent that feels like you.',
      step3: 'Composition', step3Text: 'The individual notes come together in your personal fragrance.',
      worldsLabel: 'FRAGRANCE WORLDS', worldsTitle: 'One feeling. Many facets.',
      worldsLead: 'Which direction speaks to you? Discover three moods as the beginning of your fragrance journey.',
      floral: 'Floral', floralText: 'Soft floral notes with an elegant, light presence.',
      fresh: 'Fresh', freshText: 'Clear, lively and effortlessly light.',
      woody: 'Woody', woodyText: 'Warm, deep and quietly distinctive.',
      galleryLabel: 'MON RÉMY GÖTTINGEN', galleryTitle: 'Inside Mon Rémy.',
      galleryLead: 'A glimpse of the place where personal fragrance moments begin.',
      storefrontCaption: 'The perfumery from outside', storefrontAlt: 'Real exterior photograph of Mon Rémy perfumery in Göttingen',
      signCaption: 'The illuminated Mon Rémy sign inside', signAlt: 'Real photograph of the illuminated Mon Rémy sign inside the perfumery',
      close: 'Close image'
    },
    ar: {
      processLabel: 'عطرك الخاص', processTitle: 'هكذا يتكوّن عطرك.',
      processLead: 'تبدأ الرحلة بحوار شخصي، وتحدّد تفضيلاتك الاتجاه الذي تسير فيه التركيبة.',
      step1: 'التعارف', step1Text: 'نتحدث عن الانطباعات والذكريات وما تحبّه في العطور.',
      step2: 'اختيار الاتجاه', step2Text: 'تصبح تفضيلاتك نقطة البداية لرائحة تعبّر عن شخصيتك.',
      step3: 'التركيب', step3Text: 'تجتمع النفحات المختلفة لتشكّل عطرك الشخصي.',
      worldsLabel: 'عوالم العطور', worldsTitle: 'إحساس واحد، وجوه عديدة.',
      worldsLead: 'أي طابع يلامسك؟ اكتشف ثلاثة اتجاهات كبداية لرحلتك مع العطور.',
      floral: 'زهري', floralText: 'نفحات زهرية ناعمة بحضور أنيق وخفيف.',
      fresh: 'منعش', freshText: 'طابع صافٍ وحيوي مفعم بالخفة.',
      woody: 'خشبي', woodyText: 'دافئ وعميق بحضور هادئ ومميز.',
      galleryLabel: 'مون ريمي غوتينغن', galleryTitle: 'لمحات من مون ريمي.',
      galleryLead: 'نظرة إلى المكان الذي تبدأ فيه لحظات العطر الشخصية.',
      storefrontCaption: 'البارفومري من الخارج', storefrontAlt: 'صورة حقيقية لواجهة بارفومري مون ريمي في غوتينغن',
      signCaption: 'لافتة مون ريمي المضيئة في الداخل', signAlt: 'صورة حقيقية للافتة مون ريمي المضيئة داخل البارفومري',
      close: 'إغلاق الصورة'
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
        <article class="editorial-world"><span class="editorial-world-index" aria-hidden="true">01 / 03</span><h3 data-copy="floral"></h3><p data-copy="floralText"></p></article>
        <article class="editorial-world"><span class="editorial-world-index" aria-hidden="true">02 / 03</span><h3 data-copy="fresh"></h3><p data-copy="freshText"></p></article>
        <article class="editorial-world"><span class="editorial-world-index" aria-hidden="true">03 / 03</span><h3 data-copy="woody"></h3><p data-copy="woodyText"></p></article>
      </div>
    </div>`;

  const gallery = document.createElement('section');
  gallery.id = 'impressions';
  gallery.className = 'editorial-section';
  gallery.setAttribute('aria-labelledby', 'impressions-title');
  gallery.innerHTML = `
    <div class="editorial-inner">
      <p class="editorial-eyebrow" data-copy="galleryLabel"></p>
      <h2 class="editorial-title" id="impressions-title" data-copy="galleryTitle"></h2>
      <p class="editorial-lead" data-copy="galleryLead"></p>
      <div class="editorial-gallery">
        <button class="editorial-gallery-item" type="button" data-gallery-image="/assets/monremy-storefront.png" data-caption="storefrontCaption" data-alt="storefrontAlt">
          <figure><span class="editorial-gallery-image"><img src="/assets/monremy-storefront.png" alt="" data-alt="storefrontAlt" loading="lazy" decoding="async"></span><figcaption data-copy="storefrontCaption"></figcaption></figure>
        </button>
        <button class="editorial-gallery-item" type="button" data-gallery-image="/assets/monremy-neon-sign.jpeg" data-caption="signCaption" data-alt="signAlt">
          <figure><span class="editorial-gallery-image"><img src="/assets/monremy-neon-sign.jpeg" alt="" data-alt="signAlt" loading="lazy" decoding="async"></span><figcaption data-copy="signCaption"></figcaption></figure>
        </button>
      </div>
    </div>`;

  const dialog = document.createElement('dialog');
  dialog.className = 'editorial-gallery-dialog';
  dialog.innerHTML = '<div class="editorial-dialog-top"><button type="button" class="editorial-dialog-close" data-close aria-label="Bild schließen">×</button></div><img alt=""><p></p>';

  about.after(process);
  creations.after(worlds);
  worlds.after(gallery);
  document.body.appendChild(dialog);

  let activeGalleryButton = null;
  let currentImage = null;
  const language = () => {
    const code = document.documentElement.lang.toLowerCase().split('-')[0];
    return translations[code] ? code : 'de';
  };
  const translate = () => {
    const copy = translations[language()];
    for (const element of document.querySelectorAll('.editorial-section [data-copy]')) {
      element.textContent = copy[element.dataset.copy];
    }
    for (const element of document.querySelectorAll('.editorial-section [data-alt]')) {
      const description = copy[element.dataset.alt];
      if (element.tagName === 'IMG') element.alt = description;
      else element.setAttribute('aria-label', description);
    }
    dialog.querySelector('[data-close]').setAttribute('aria-label', copy.close);
    if (currentImage) {
      dialog.querySelector('img').alt = copy[currentImage.alt];
      dialog.querySelector('p').textContent = copy[currentImage.caption];
    }
  };
  translate();
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
  document.addEventListener('click', (event) => {
    if (event.target.closest('header button')) setTimeout(translate, 0);
  });

  gallery.querySelectorAll('[data-gallery-image]').forEach((button) => {
    button.addEventListener('click', () => {
      activeGalleryButton = button;
      currentImage = { alt: button.dataset.alt, caption: button.dataset.caption };
      const image = dialog.querySelector('img');
      image.src = button.dataset.galleryImage;
      translate();
      if (typeof dialog.showModal === 'function') dialog.showModal();
    });
  });
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => activeGalleryButton?.focus());
});
