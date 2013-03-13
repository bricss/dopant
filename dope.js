(function() {'use strict';
  var dope = function(deps, callback, timeout) {
    var queue = null;
    typeof (deps) === 'string' ? deps = [deps] : deps = deps;
    for (var i in deps) {
      var el = null;
      var type = deps[i].substr(deps[i].lastIndexOf('.') + 1).toLowerCase();
      switch(type) {
        case 'js':
          el = document.createElement('script');
          el.async = true;
          el.src = deps[i];
          break;
        case 'css':
          el = document.createElement('link');
          el.href = deps[i];
          el.rel = 'stylesheet';
          break;
        default:
          return;
      }

      if (callback && typeof (callback) === 'function') {
        el.onreadystatechange = el.onload = function() {
          if (!this.fired || this.readyState === 'loaded' || this.readyState === 'complete') {
            this.fired = true;
            this.onreadystatechange = this.onload = null;
            (++queue === deps.length) &&  setTimeout(function() {
            callback();
      }, timeout);
          }
        }
      }

      document.getElementsByTagName('head')[0].appendChild(el);
    }

  }
  if (/msie [1-8]\./.test(navigator.userAgent.toLowerCase())) {
    dope(['assets/js/polyfill.js', 'assets/js/augment.js'], function(e) {
      console.log('WOOP!');
    });
  }
  dope('assets/css/layout.css', function(e) {
    console.log('WOOP!');
  }, 1000);
})();
