(function() {'use strict';
  this.dope = function(deps, callback, delay, timeout) {
    var head = document.documentElement && document.documentElement.firstChild || document.getElementsByTagName('head')[0];
    var list = [];
    var queue = null;
    // typeof (deps) === 'string' ? deps = [deps] : deps = deps;
    // deps instanceof Array ? deps = deps : deps = [deps];
    // deps.constructor === String ? deps = [deps] : deps = deps;
    deps && deps.constructor !== Array && (deps=[deps]);
    for (var i = queue = deps.length; i--;) {
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
          console.error('Something went wrong:', deps[i]);
          throw 'Unsupported type';
      }

      if (callback && typeof (callback) === 'function') {
        el.onload = el.onreadystatechange = function(e) {
          if (e && e.type === 'load' || /loaded|complete/.test(this.readyState)) {
            this.onload = this.onreadystatechange = null;
            (!--queue) && setTimeout(function() {
              callback();
            }, delay);
          }
        }
      }

      el.onerror = function(e) {
        console.error('Target is not defined:', e.target);
      }

      list.push(head.appendChild(el));
    }

    var refuse = function() {
      for (var i = list.length; i--;) {
        head.removeChild(list[i]);
        delete list[i];
      }
    }

    if (timeout) {
      setTimeout(function() {
        if (!queue || queue > 0) {
          refuse();
        }
      }, timeout);
    }

  }
}).call(this);
