window.addEventListener('load', () => {
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
