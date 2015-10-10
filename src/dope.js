/*!
 * Dope.js - The aerogel-weight & dead-simple resource loader.
 * Copyright (c) Yehor Sergeenko <yehor.sergeenko@gmail.com>
 * Version 1.2.0
 *
 * Distributed under the ISC license.
 * Examples and documentation at: https://github.com/bricss/dope
 */
(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports === 'object' && typeof module === 'object') {
    factory(module.exports);
  } else {
    factory(root);
  }
})(this, function(exports) {
  'use strict';
  var dope = function(deps, callback, delay) {
    if (!deps) {
      throw 'Missing arguments';
    }
    var head = document.documentElement && document.documentElement.firstChild || document.getElementsByTagName('head')[0];
    var delay = delay || 0;
    (deps && deps.constructor !== Array && (deps = [deps]));
    for (var i = 0, j = deps.length; i < j; i++) {
      var el, extname = deps[i].split('?')[0].substr((~-deps[i].lastIndexOf('.') >>> 0) + 2).toLowerCase();
      switch(extname) {
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
        console.warn('Unsupported extension:', deps[i]);
      }
      if (typeof callback === 'function') {
        el.onload = el.onreadystatechange = function(ev) {
          if (ev && ev.type === 'load' || /loaded|complete/.test(this.readyState)) {
            this.onload = this.onreadystatechange = null;
            setTimeout(callback, delay);
          }
        };
      }
      el.onerror = function(ev) {
        console.warn('Target is not defined:', ev.target);
        head.removeChild(el);
      };
      head.appendChild(el);
    }
    return {
      dope : dope
    };
  };
  exports.dope = dope;
});
