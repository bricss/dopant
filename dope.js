/*!
 * Dope.js - The aerogel-weight & dead-simple resource loader.
 * Encoded by Yehor Sergeenko <yehor.sergeenko@gmail.com>
 * Version 1.0
 *
 * Dual licensed under the MIT and BSD-2-clause licenses.
 * Examples and documentation at: https://github.com/bricss/dope
 */
(function() {'use strict';
  var dope = function(deps, callback, delay, decay) {
    var head = document.documentElement && document.documentElement.firstChild || document.getElementsByTagName('head')[0];
    var list = [];
    var queue = null;
    // typeof (deps) === 'string' ? deps = [deps] : deps = deps;
    // deps instanceof Array ? deps = deps : deps = [deps];
    // deps.constructor === String ? deps = [deps] : deps = deps;
    (deps && deps.constructor !== Array && (deps = [deps]), deps.reverse());
    // fastest
    for (var i = queue = deps.length; i--;) {
      var el = null;
      // var type = /(\.js|\.css)/.exec(deps[i])[0].replace('.', '').toLowerCase();
      var type = deps[i].substr(deps[i].lastIndexOf('.') + 1).toLowerCase();
      switch(type) {
        case 'js':
          el = document.createElement('script');
          el.async = (queue && queue.lenght === 1);
          el.src = deps[i];
          break;
        case 'css':
          el = document.createElement('link');
          el.href = deps[i];
          el.rel = 'stylesheet';
          break;
        default:
          console.warn('Something went wrong:', deps[i]);
          throw 'Unsupported type';
      }
      if (callback && typeof (callback) === 'function') {
        el.onload = el.onreadystatechange = function(ev) {
          if (ev && ev.type === 'load' || /loaded|complete/.test(this.readyState)) {
            this.onload = this.onreadystatechange = null;
            (!--queue) && setTimeout(function() {
              callback();
            }, delay);
          }
        };
      }
      el.onerror = function(ev) {
        console.warn('Target is not defined:', ev.target);
      };
      list.push(head.appendChild(el));
    }
    var waste = function() {
      for (var i = list.length; i--;) {
        head.removeChild(list[i]);
        delete list[i];
      }
    };
    if (decay) {
      setTimeout(function() {
        if (!queue || queue > 0) {
          waste();
        }
      }, decay);
    }
    return {
      dope : dope
    };
  };
  window.dope = dope;
}).call(window);
