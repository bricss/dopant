(function() {'use strict';
  var dope = function(url, callback, timeout) {
    var el;
    var type = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    switch(type) {
      case 'js':
        el = document.createElement('script');
        el.async = true;
        el.src = url;
        break;
      case 'css':
        el = document.createElement('link');
        el.href = url;
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
          setTimeout(function() {
            callback();
          }, timeout);
        }
      }
    }

    document.getElementsByTagName('head')[0].appendChild(el);
  }
  if (/msie [1-8]\./.test(navigator.userAgent.toLowerCase())) {
    dope('assets/js/polyfill.js', function(e) {
      console.log('WOOP!');
    });
    dope('assets/js/augment.js');
  }
  dope('assets/css/layout.css', function(e) {
    console.log('WOOP!');
  }, 1000);
})();
