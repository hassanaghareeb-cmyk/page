(() => {
  'use strict';

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const range = (value, start, end) => clamp((value - start) / (end - start));
  const mix = (from, to, amount) => from + (to - from) * amount;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const compact = matchMedia('(max-width: 760px)').matches;

  function installStyles() {
    const style = document.createElement('style');
    style.dataset.monremyStory = '';
    style.textContent = `
      html,body{max-width:100%;overflow-x:clip}
      body{--story-progress:0;--bloom:0;--line-progress:0}
      .monremy-story{position:fixed;inset:0;z-index:35;overflow:hidden;pointer-events:none;contain:layout paint}
      .story-phoenix{position:absolute;left:0;top:0;width:clamp(160px,30vw,520px);height:auto;opacity:0;transform-origin:50% 48%;mix-blend-mode:screen;will-change:transform,opacity,filter}
      .story-bloom{position:absolute;left:50%;top:52%;width:min(70vw,850px);aspect-ratio:1;border-radius:50%;opacity:var(--bloom);transform:translate(-50%,-50%) scale(calc(.35 + var(--bloom)*.75));background:radial-gradient(circle,rgba(255,244,198,.8) 0 2%,rgba(245,174,60,.46) 8%,rgba(226,111,30,.2) 25%,rgba(201,169,97,.08) 43%,transparent 68%);filter:blur(8px);mix-blend-mode:screen;will-change:transform,opacity}
      .story-bloom:after{content:"";position:absolute;inset:34%;border-radius:50%;background:#fff4c7;box-shadow:0 0 35px 12px rgba(255,178,67,.75),0 0 110px 34px rgba(216,103,30,.36);opacity:calc(var(--bloom)*.7)}
      .story-trail{position:absolute;width:7px;height:7px;border-radius:50%;background:#f5d686;box-shadow:0 0 15px #e18c35;opacity:0;will-change:transform,opacity}
      .story-petal{position:absolute;width:var(--size);aspect-ratio:.72;border-radius:75% 20% 70% 30%;background-image:url('/assets/blue-flowers.webp');background-size:620px auto;background-position:var(--bg-x) var(--bg-y);box-shadow:inset 0 0 8px rgba(112,171,255,.34),0 7px 20px rgba(0,0,0,.22);opacity:0;filter:blur(var(--blur));will-change:transform,opacity}
      .story-progress{position:fixed;right:11px;top:18vh;z-index:220;width:1px;height:64vh;background:rgba(201,169,97,.14);pointer-events:none}
      .story-progress span{display:block;width:1px;height:calc(var(--story-progress)*100%);background:linear-gradient(#f4e2aa,#c9a961);box-shadow:0 0 10px rgba(223,189,104,.75);position:relative}
      .story-progress span:after{content:"";position:absolute;right:-2px;bottom:-2px;width:5px;height:5px;border-radius:50%;background:#f4e2aa;box-shadow:0 0 10px #c9a961}
      .story-transition{position:absolute;left:50%;bottom:-1px;width:min(74vw,960px);height:1px;transform:translateX(-50%) scaleX(var(--line-progress));background:linear-gradient(90deg,transparent,#c9a961,transparent);box-shadow:0 0 12px rgba(201,169,97,.65);transform-origin:center}
      #home{perspective:1100px}
      #home>.relative.z-\\[1\\]{will-change:transform,opacity,filter}
      .hero-brandmark{display:block;width:min(320px,62vw);height:auto;margin:0 auto;filter:drop-shadow(0 0 24px rgba(201,169,97,.34))}
      #about figure img,#creations article img{will-change:transform,filter}
      .story-reveal{clip-path:inset(0 0 100% 0);filter:blur(7px);transform:translateY(24px);opacity:.2;transition:clip-path 1.15s cubic-bezier(.16,1,.3,1),filter 1.05s ease,transform 1.05s cubic-bezier(.16,1,.3,1),opacity .75s ease}
      .story-reveal.is-visible{clip-path:inset(-10% 0 -10% 0);filter:blur(0);transform:translateY(0);opacity:1}
      .storefront-photo{position:relative;margin:0 0 1.7rem;max-width:300px;overflow:hidden;border:1px solid rgba(201,169,97,.45);box-shadow:0 18px 46px rgba(0,0,0,.34)}
      .storefront-photo img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover}
      .storefront-photo figcaption{position:absolute;inset:auto 0 0;padding:1.7rem .85rem .7rem;background:linear-gradient(transparent,rgba(2,6,18,.94));color:#f4efe2;font:italic .95rem Georgia,serif}
      .storefront-photo figcaption span{display:block;margin-bottom:.2rem;color:#c9a961;font:600 .58rem Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase}
      @media(max-width:760px){.story-phoenix{width:clamp(130px,48vw,260px)}.story-bloom{width:110vw;filter:blur(14px)}.story-progress{right:5px;top:20vh;height:56vh}.story-petal:nth-of-type(n+6){display:none}}
      @media(prefers-reduced-motion:reduce){.monremy-story,.story-progress,.story-transition,.story-petal{display:none!important}.story-reveal{clip-path:none;filter:none;transform:none;opacity:1;transition:none}#about figure img,#creations article img,#home>.relative.z-\\[1\\]{transform:none!important;filter:none!important;opacity:1!important}}
    `;
    document.head.appendChild(style);
  }

  function createStoryLayer() {
    const layer = document.createElement('div');
    layer.className = 'monremy-story';
    layer.setAttribute('aria-hidden', 'true');
    const bloom = document.createElement('div');
    bloom.className = 'story-bloom';
    layer.appendChild(bloom);
    const phoenix = document.createElement('video');
    phoenix.className = 'story-phoenix';
    Object.assign(phoenix, { src: '/assets/phoenix-transparent.webm', muted: true, loop: true, autoplay: true, playsInline: true, preload: compact ? 'metadata' : 'auto', tabIndex: -1 });
    phoenix.setAttribute('disablepictureinpicture', '');
    layer.appendChild(phoenix);
    const trails = Array.from({ length: compact ? 4 : 8 }, (_, index) => {
      const dot = document.createElement('i'); dot.className = 'story-trail'; dot.dataset.index = String(index); layer.appendChild(dot); return dot;
    });
    const petalData = [[9,14,34,0,0],[82,21,22,1,.6],[18,54,27,2,.2],[73,68,38,3,1.1],[42,83,20,4,.5],[91,89,30,5,1.4],[8,92,42,6,1.7],[58,38,17,7,.8]];
    const petals = petalData.map(([x,y,size,index,blur]) => {
      const petal = document.createElement('i'); petal.className = 'story-petal';
      petal.style.cssText = `--size:${size}px;--blur:${blur}px;--bg-x:${(index*83)%100}%;--bg-y:${(index*47)%100}%;left:${x}%;top:${y}%`;
      petal.dataset.index = String(index); layer.appendChild(petal); return petal;
    });
    document.body.appendChild(layer);
    phoenix.play().catch(() => {});
    return { layer, phoenix, bloom, trails, petals };
  }

  function prepareContent() {
    const transition = document.createElement('div'); transition.className = 'story-transition'; transition.setAttribute('aria-hidden', 'true'); document.querySelector('#home')?.appendChild(transition);
    const heroLogo = document.querySelector('#home a[href="#home"] img[src="/assets/logo.png"]');
    if (heroLogo) heroLogo.closest('a').style.pointerEvents = 'none';
    const heroLogoSlot = document.querySelector('#home .mb-8.aspect-\\[1568\\/1003\\]');
    if (heroLogoSlot && !heroLogoSlot.querySelector('img')) {
      heroLogoSlot.style.cssText = 'width:auto;aspect-ratio:auto;height:auto';
      heroLogoSlot.innerHTML = '<img class="hero-brandmark" src="/assets/logo.png" alt="Mon Rémy Parfumerie">';
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-visible', entry.isIntersecting)), { threshold: .16, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('h2').forEach(heading => { heading.classList.add('story-reveal'); observer.observe(heading); });
    const addressColumn = document.querySelector('#contact .grid > div');
    if (addressColumn && !addressColumn.querySelector('.storefront-photo')) {
      const photo = document.createElement('figure'); photo.className = 'storefront-photo';
      photo.innerHTML = '<img src="/assets/monremy-storefront.png" alt="Außenansicht der Mon Rémy Parfumerie in der Weender Straße 79 in Göttingen" loading="lazy" decoding="async"><figcaption><span>Mon Rémy · Göttingen</span>Besuchen Sie uns persönlich.</figcaption>';
      addressColumn.prepend(photo);
    }
    const progress = document.createElement('div'); progress.className = 'story-progress'; progress.setAttribute('aria-hidden', 'true'); progress.innerHTML = '<span></span>'; document.body.appendChild(progress);
  }

  function startMotion(story) {
    const backdrop = document.querySelector('body > .pointer-events-none.fixed.inset-0 > div:first-child');
    const heroContent = document.querySelector('#home > .relative.z-\\[1\\]');
    const aboutImage = document.querySelector('#about img[src="/assets/monremy-phoenix-sign.webp"]');
    const bottle = document.querySelector('#creations img[src="/assets/monremy-flacon-transparent.webp"]');
    let smooth = 0, requested = true;
    const render = () => {
      const maximum = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const target = clamp(scrollY / maximum); smooth += (target - smooth) * .13;
      const p = smooth, heroP = clamp(scrollY / Math.max(innerHeight, 1));
      document.body.style.setProperty('--story-progress', p.toFixed(4));
      document.body.style.setProperty('--line-progress', clamp(heroP * 1.35).toFixed(3));
      if (backdrop) {
        const wave = Math.sin(p * Math.PI * 2.4);
        backdrop.style.transform = `translate3d(${wave*(compact?5:12)}px,${28-scrollY*(compact?.018:.034)}px,0) scale(${1.08+p*(compact?.06:.14)})`;
        backdrop.style.filter = `brightness(${.88+p*.13}) saturate(${1.02+p*.24})`;
      }
      if (heroContent) {
        heroContent.style.transform = `translate3d(0,${-heroP*(compact?35:90)}px,${heroP*70}px) scale(${1+heroP*.055})`;
        heroContent.style.opacity = String(clamp(1-heroP*.72)); heroContent.style.filter = `blur(${heroP*2.4}px)`;
      }
      const enter=range(p,.035,.18), cross=range(p,.18,.48), signature=range(p,.48,.66), returnFlight=range(p,.66,.84), exit=range(p,.84,.97);
      let x=mix(-34,-12,enter), y=mix(62,30,enter), scale=mix(.18,.62,enter), opacity=clamp(enter*1.4), rotate=mix(-15,7,enter);
      if(p>=.18){x=mix(-12,38,cross);y=mix(30,9,cross);scale=mix(.62,1.02,cross);rotate=mix(7,-8,cross)}
      if(p>=.48){x=mix(38,4,signature);y=mix(9,48,signature);scale=mix(1.02,.82,signature);rotate=mix(-8,10,signature)}
      if(p>=.66){x=mix(-26,26,returnFlight);y=mix(72,28,returnFlight);scale=mix(.58,.88,returnFlight);rotate=mix(-10,5,returnFlight);opacity=range(p,.66,.7)}
      if(p>=.84){x=mix(26,92,exit);y=mix(28,-18,exit);scale=mix(.88,.38,exit);opacity=1-exit;rotate=mix(5,18,exit)}
      story.layer.style.zIndex = p>.43&&p<.57 ? '7' : '35';
      story.phoenix.style.opacity = String(opacity*.96);
      story.phoenix.style.transform = `translate3d(calc(${x}vw - 50%),calc(${y}vh - 50%),0) scale(${scale}) rotate(${rotate}deg)`;
      const heat=clamp(1-Math.abs(p-.555)/.14), bloom=clamp(1-Math.abs(p-.575)/.105);
      story.phoenix.style.filter = `sepia(${heat*.28}) saturate(${1+heat*1.5}) drop-shadow(0 0 ${12+heat*38}px rgba(238,151,50,${.28+heat*.45}))`;
      document.body.style.setProperty('--bloom',(bloom*.82).toFixed(3));
      story.trails.forEach((dot,index)=>{const distance=3+index*2.4;dot.style.opacity=String(heat*(1-index/(story.trails.length+2))*.72);dot.style.transform=`translate3d(${x-distance}vw,${y+Math.sin(p*20+index)*2.4}vh,0) scale(${1-index*.07})`});
      story.petals.forEach((petal,index)=>{const seed=index+1,petalIn=range(p,.12+index*.012,.28+index*.01),petalOut=1-range(p,.82,.98);petal.style.opacity=String(petalIn*petalOut*(.28+(index%3)*.1));petal.style.transform=`translate3d(${Math.sin(p*7+seed)*(compact?12:35)}px,${(p*(110+seed*19))%(innerHeight+170)-80}px,0) rotate(${p*(90+seed*22)}deg)`});
      if(aboutImage){const rect=aboutImage.closest('section').getBoundingClientRect(),local=clamp((innerHeight-rect.top)/(innerHeight+rect.height));aboutImage.style.transform=`translate3d(0,${mix(22,-22,local)}px,0) scale(${1.025+local*.035}) rotate(${mix(-.35,.35,local)}deg)`;aboutImage.style.filter=`drop-shadow(0 0 ${local*24}px rgba(201,169,97,${local*.32}))`}
      if(bottle){const rect=bottle.closest('section').getBoundingClientRect(),local=clamp((innerHeight-rect.top)/(innerHeight+rect.height));bottle.style.transform=`translate3d(${mix(compact?-5:-22,compact?4:16,local)}px,${mix(36,-18,local)}px,0) scale(${mix(.88,1.055,local)}) rotate(${mix(-1.7,1.2,local)}deg)`;bottle.style.filter=`drop-shadow(0 24px 38px rgba(0,0,0,.4)) drop-shadow(0 0 ${local*30}px rgba(201,169,97,${local*.3}))`}
      if(Math.abs(target-smooth)>.00015) requestAnimationFrame(render); else requested=false;
    };
    const requestRender=()=>{if(!requested){requested=true;requestAnimationFrame(render)}};
    addEventListener('scroll',requestRender,{passive:true}); addEventListener('resize',requestRender,{passive:true}); requestAnimationFrame(render);
  }

  addEventListener('load', () => { installStyles(); prepareContent(); if (!reducedMotion) startMotion(createStoryLayer()); }, { once: true });
})();
