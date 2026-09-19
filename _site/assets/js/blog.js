/* Category filter pills, shared by the blog index and the home carousel. */
(function () {
  'use strict';

  var STEP = 320 + 20; // card width + track gap

  function initFilters(root) {
    var pills = Array.prototype.slice.call(root.querySelectorAll('.filter'));
    var scope = document.getElementById(root.getAttribute('data-filters-for'));
    if (!pills.length || !scope) return;

    var cards = Array.prototype.slice.call(scope.querySelectorAll('[data-category]'));
    var carousel = scope.closest('[data-carousel]');

    function apply(value) {
      pills.forEach(function (p) {
        p.setAttribute('aria-pressed', String(p.getAttribute('data-filter') === value));
      });
      cards.forEach(function (c) {
        c.hidden = value !== 'All' && c.getAttribute('data-category') !== value;
      });
      if (carousel) resetCarousel(carousel);
    }

    pills.forEach(function (p) {
      p.addEventListener('click', function () { apply(p.getAttribute('data-filter')); });
    });

    apply('All');
  }

  function visibleCards(track) {
    return Array.prototype.slice.call(track.children).filter(function (c) { return !c.hidden; });
  }

  function initCarousel(carousel) {
    var track = carousel.querySelector('.carousel__track');
    var prev = carousel.querySelector('[data-carousel-prev]');
    var next = carousel.querySelector('[data-carousel-next]');
    var slide = 0;

    function render() {
      var max = Math.max(0, visibleCards(track).length - 1);
      slide = Math.min(Math.max(0, slide), max);
      track.style.transform = 'translateX(calc(' + -slide + ' * ' + STEP + 'px))';
      prev.disabled = slide === 0;
      next.disabled = slide >= max;
    }

    prev.addEventListener('click', function () { slide -= 1; render(); });
    next.addEventListener('click', function () { slide += 1; render(); });

    carousel.reset = function () { slide = 0; render(); };
    render();
  }

  function resetCarousel(carousel) {
    if (typeof carousel.reset === 'function') carousel.reset();
  }

  Array.prototype.slice.call(document.querySelectorAll('[data-carousel]')).forEach(initCarousel);
  Array.prototype.slice.call(document.querySelectorAll('[data-filters-for]')).forEach(initFilters);
}());
