// FIDDLE,GREEN launch countdown. No dependencies.
// Launch: 19 October 2026, 8:30am Eastern (EDT, UTC-4). Change via data-launch on .timer.
(function () {
  var timer = document.querySelector('[data-launch]');
  var target = new Date(timer.getAttribute('data-launch')).getTime();
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var set = function (unit, value, singular, plural) {
    document.querySelector('[data-unit="' + unit + '"]').textContent = value;
    document.querySelector('[data-label="' + unit + '"]').textContent = Number(value) === 1 ? singular : plural;
  };
  var id;
  function tick() {
    var ms = Math.max(0, target - Date.now());
    if (ms === 0) {
      document.querySelectorAll('[data-countdown-only]').forEach(function (el) { el.hidden = true; });
      document.querySelector('[data-live]').hidden = false;
      clearInterval(id);
      return;
    }
    var s = Math.floor(ms / 1000);
    set('days', String(Math.floor(s / 86400)), 'Day', 'Days');
    set('hours', pad(Math.floor(s % 86400 / 3600)), 'Hour', 'Hours');
    set('minutes', pad(Math.floor(s % 3600 / 60)), 'Minute', 'Minutes');
    set('seconds', pad(s % 60), 'Second', 'Seconds');
  }
  tick();
  id = setInterval(tick, 1000);
})();
