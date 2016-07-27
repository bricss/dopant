'use strict';

/*!
 * Dopant.js - The aerogel-weight & dead-simple resource loader.
 * Copyright (c) Yehor Sergeenko <yehor.sergeenko@gmail.com>
 * Version 1.3.0
 *
 * Distributed under the ISC license.
 * Examples and documentation at: https://github.com/bricss/dopant
 */
(function (root, factory) {
  if (root.define && root.define.constructor === Function && root.define.amd) {
    define(['exports'], factory);
  } else if (root.module && root.module.constructor === Object && root.module.exports) {
    factory(root.module.exports);
  } else {
    factory(root);
  }
})((0, eval)('this'), function (exports) {
  exports.dopant = function (deps) {
    if (!deps) {
      throw new Error('Missing arguments');
    } else {
      deps = Array.isArray(deps) ? deps : [deps];
    }
    var head = document.head;

    var _loop = function _loop(i, j) {
      var el = void 0,
          ext = deps[i].split('?')[0].substr((~-deps[i].lastIndexOf('.') >>> 0) + 2).toLowerCase();
      if (ext === 'js') {
        el = document.createElement('script');
        el.async = true;
        el.src = deps[i];
      } else if (ext === 'css') {
        el = document.createElement('link');
        el.href = deps[i];
        el.rel = 'stylesheet';
      } else {
        console.warn('Unsupported file type or extension:', deps[i]);
      }
      deps[i] = new Promise(function (resolve, reject) {
        el.onload = function (ev) {
          resolve(ev.target.onload = undefined, ev);
        };
        el.onerror = function (ev) {
          reject(head.removeChild(ev.target), ev);
        };
      });
      head.appendChild(el);
    };

    for (var i = 0, j = deps.length - 1; i <= j; i++) {
      _loop(i, j);
    }
    return Promise.all(deps);
  };
});