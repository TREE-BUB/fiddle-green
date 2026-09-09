/* Header dropdowns and the mobile drawer. No framework, no dependencies. */
(function () {
  'use strict';

  var dropdowns = Array.prototype.slice.call(document.querySelectorAll('[data-dropdown]'));

  function open(dd) {
    close();
    dd.querySelector('[data-dropdown-trigger]').setAttribute('aria-expanded', 'true');
    dd.querySelector('[data-dropdown-menu]').hidden = false;
  }

  function close() {
    dropdowns.forEach(function (dd) {
      dd.querySelector('[data-dropdown-trigger]').setAttribute('aria-expanded', 'false');
      dd.querySelector('[data-dropdown-menu]').hidden = true;
    });
  }

  dropdowns.forEach(function (dd) {
    var trigger = dd.querySelector('[data-dropdown-trigger]');
    var menu = dd.querySelector('[data-dropdown-menu]');

    // Hovering anywhere in the 78px-tall item opens it, so the pointer can
    // travel down into the panel without crossing a gap.
    dd.addEventListener('mouseenter', function () { open(dd); });
    dd.addEventListener('mouseleave', close);

    // Keyboard: the trigger is a real link, so Enter still navigates to the
    // hub. Arrow-down and Alt+Down open the panel instead.
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        open(dd);
        var first = menu.querySelector('a');
        if (first) first.focus();
      } else if (e.key === 'Escape') {
        close();
      }
    });

    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        close();
        trigger.focus();
      }
    });

    // Focus entering the item opens it; focus leaving it entirely closes it.
    dd.addEventListener('focusin', function () { open(dd); });
    dd.addEventListener('focusout', function () {
      window.setTimeout(function () {
        if (!dd.contains(document.activeElement)) close();
      }, 0);
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-dropdown]')) close();
  });

  var toggle = document.querySelector('[data-drawer-toggle]');
  var drawer = document.getElementById('mobile-drawer');

  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var isOpen = drawer.hidden;
      drawer.hidden = !isOpen;
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Navigating closes the drawer.
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        drawer.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}());
