Dope.js
=======

The aerogel-weight & dead-simple resource loader.

Usage:
~~~ javascript
if (document.all && document.documentMode && !window.atob) {
  (document.body.className += ' ' + 'fallback') || (document.getElementsByTagName('body')[0].className += ' ' + 'fallback');
  dope('//somewhe.re/assets/js/augment.min.js', function(ev) {
    console.log('WOOP!');
    dope('//somewhe.re/assets/js/app.min.js', function(ev) {
      console.log('WOOP!');
    });
  });
}

if (/^.*(urn)$/gi.test(window.location.href)) {
  dope('//somewhe.re/assets/js/app.min.js', function(ev) {
    console.log('WOOP!');
  }, 100, 500);
}

dope(['//somewhe.re/assets/css/layout.min.css', '//somewhe.re/assets/js/com.min.js', '//somewhe.re/assets/js/app.min.js'], function(ev) {
  console.log('WOOP!');
});

dope('//somewhe.re/assets/js/com.min.js', function(ev) {
  console.log('WOOP!');
}).dope('//somewhe.re/assets/js/app.min.js', function(ev) {
  console.log('WOOP!');
});
~~~
