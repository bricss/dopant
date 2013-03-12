(function() {'use strict';
  var dope = function(uri, callback, timeout) {
    typeof (uri) === 'string' ? uri = [uri] : uri = uri;
    for (var i in uri) {
      var el = null;
      var type = uri[i].substr(uri[i].lastIndexOf('.') + 1).toLowerCase();
      switch(type) {
        case 'js':
          el = document.createElement('script');
          el.async = true;
          el.src = uri[i];
          break;
        case 'css':
          el = document.createElement('link');
          el.href = uri[i];
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
