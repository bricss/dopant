/*!
 * Dope.js - The aerogel-weight & dead-simple resource loader.
 * Copyright (c) Yehor Sergeenko <yehor.sergeenko@gmail.com>
 * Version 1.1
 *
 * Distributed under the ISC license.
 * Examples and documentation at: https://github.com/bricss/dope
 */
(function() {
  'use strict';
  var dope = function(deps, callback, delay, decay) {
    var head = document.documentElement && document.documentElement.firstChild || document.getElementsByTagName('head')[0];
    var list = [], queue;
    (deps && deps.constructor !== Array && (deps = [deps]), deps.reverse());
    for (var i = queue = deps.length - 1; i >= 0; i--) {
      var el, type = deps[i].substr((~-deps[i].lastIndexOf('.') >>> 0) + 2).toLowerCase();
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
    var purge = function() {
      for (var i = list.length - 1; i >= 0; i--) {
        head.removeChild(list[i]);
        delete list[i];
      }
    };
    if (decay) {
      setTimeout(function() {
        if (!queue || queue > 0) {
          purge();
        }
      }, decay);
    }
    return {
      dope : dope
    };
  };
  window.dope = dope;
})();
