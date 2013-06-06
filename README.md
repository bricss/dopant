Dope.js
=======

The aerogel-weight & dead-simple async conditional resource loader.

Usage:
~~~ javascript
if (/msie [1-8]\./.test(navigator.userAgent.toLowerCase())) {
  dope(['//somewhe.re/assets/js/augment.js', '//somewhe.re/assets/js/polyfill.js'], function(ev) {
    console.log('WOOP!');
  });
}

if (/^.*(urn$)/i.test(window.location.href)) {
  dope('//somewhe.re/assets/js/common.js', function(ev) {
    console.log('WOOP!');
  }, 1000, 5000);
}

dope('//somewhe.re/assets/css/layout.css', function(ev) {
  console.log('WOOP!');
}, 1000, 5000);

dope('//somewhe.re/assets/js/core.js', function(ev) {
  console.log('WOOP!');
}).dope('//somewhe.re/assets/js/app.js', function(ev) {
  console.log('WOOP!');
});
~~~
