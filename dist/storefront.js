window.addEventListener('load', () => {
  window.setTimeout(() => {
    const contact = document.querySelector('#contact');
    const heading = contact?.querySelector('.max-w-xl');
    if (!contact || !heading || document.querySelector('.storefront-photo')) return;

    const style = document.createElement('style');
    style.textContent = `.storefront-photo{position:relative;margin:0 auto 3.5rem;max-width:1100px;overflow:hidden;border:1px solid rgba(201,169,97,.45);box-shadow:0 24px 65px rgba(0,0,0,.34)}.storefront-photo img{display:block;width:100%;max-height:610px;object-fit:cover;object-position:center}.storefront-photo figcaption{position:absolute;left:0;right:0;bottom:0;padding:2.4rem 1.5rem 1.2rem;background:linear-gradient(transparent,rgba(2,6,18,.92));color:#f4efe2;font:italic 1.25rem Georgia,serif}.storefront-photo figcaption span{display:block;margin-bottom:.35rem;color:#c9a961;font:600 .67rem Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase}`;
    document.head.appendChild(style);

    const photo = document.createElement('figure');
    photo.className = 'storefront-photo';
    photo.innerHTML = '<img src="/assets/monremy-storefront.png" alt="Außenansicht der Mon Rémy Parfumerie in der Weender Straße 79 in Göttingen" loading="lazy"><figcaption><span>Mon Rémy · Göttingen</span>Besuchen Sie uns persönlich.</figcaption>';
    heading.insertAdjacentElement('afterend', photo);
  }, 500);
});
