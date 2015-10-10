Dopant.js
=======

The aerogel-weight & dead-simple resource loader.

Usage:
~~~ javascript
if (document.all && document.documentMode && !window.atob) {
  dopant('//somewhe.re/assets/js/augment.min.js', function() {
    console.log('POW!');
    (document.body.className += ' ' + (document.documentMode && 'ie' + document.documentMode), document.body.className = document.body.className.trim());
    dopant('//somewhe.re/assets/js/app.min.js', function() {
      console.log('POW!');
    });
  });
}

if (/^.*(urn)$/gi.test(window.location.href)) {
  dopant('//somewhe.re/assets/js/app.min.js', function() {
    console.log('POW!');
  }, 1000);
}

dopant(['//somewhe.re/assets/css/layout.min.css', '//somewhe.re/assets/js/com.min.js', '//somewhe.re/assets/js/app.min.js'], function() {
  console.log('POW!');
});

dopant('//somewhe.re/assets/js/com.min.js', function() {
  console.log('POW!');
}).dopant('//somewhe.re/assets/js/app.min.js', function() {
  console.log('POW!');
});
~~~
