/* The home page client logos: a row showing --per logos at a time that steps
   along one logo every few seconds and loops.

   The first --per logos are cloned onto the end, so the last step lands on a
   view identical to the first; the track then snaps back to the start with no
   transition, and the loop never shows a gap. The clones are hidden from
   assistive tech and the keyboard, so each client is announced once.

   It holds still while hovered or focused, while the tab is in the
   background, and not at all for a visitor who has asked for reduced motion
   or when every logo already fits. Without this script the logos are a grid. */
(function () {
  var root = document.querySelector('[data-clients]');
  if (!root) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var track = root.querySelector('.clients__track');
  var items = Array.prototype.slice.call(track.children);
  var count = items.length;
  var INTERVAL = 3500;

  root.classList.add('clients--rotating');

  function perView() {
    return parseInt(getComputedStyle(root).getPropertyValue('--per'), 10) || 3;
  }

  if (count <= perView()) {
    root.classList.remove('clients--rotating');
    return;
  }

  // Enough clones to fill the widest view.
  items.slice(0, 3).forEach(function (item) {
    var clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('a').forEach(function (a) { a.tabIndex = -1; });
    track.appendChild(clone);
  });

  var index = 0;
  var held = false;

  function place(animate) {
    track.style.transition = animate ? '' : 'none';
    track.style.transform =
      'translateX(calc(' + -index + ' * (100% + var(--gap)) / var(--per)))';
    if (!animate) {
      track.offsetHeight; // commit the jump before transitions come back
      track.style.transition = '';
    }
  }

  track.addEventListener('transitionend', function (e) {
    if (e.target !== track || index < count) return;
    index = 0;
    place(false);
  });

  setInterval(function () {
    if (held || document.hidden) return;
    // Normally transitionend has already snapped back; this covers a tab
    // where it never fired (hidden mid-transition, or transitions disabled).
    if (index >= count) { index = 0; place(false); }
    index += 1;
    place(true);
  }, INTERVAL);

  root.addEventListener('mouseenter', function () { held = true; });
  root.addEventListener('mouseleave', function () { held = false; });

  // Tabbing to a logo outside the view brings it in, rather than letting the
  // browser scroll the clipped window underneath the transform.
  root.addEventListener('focusin', function (e) {
    held = true;
    root.scrollLeft = 0;
    var i = items.indexOf(e.target.closest('.clients__item'));
    if (i === -1) return;
    var per = perView();
    if (index >= count) index = 0;
    if (i < index || i >= index + per) {
      index = Math.min(i, count - per);
      place(true);
    }
  });
  root.addEventListener('focusout', function () { held = false; });
})();
