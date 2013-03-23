Dope.js
=======

The aerogel-weight & dead-simple async conditional resource loader.

Usage:
~~~ javascript
if (/msie [1-8]\./.test(navigator.userAgent.toLowerCase())) {
  dope(['assets/js/augment.js', 'assets/js/polyfill.js'], function(e) {
    console.log('WOOP!');
  });
}

if (/^.*(urn$)/i.test(window.location.href)) {
  dope('assets/js/common.js', function(e) {
    console.log('WOOP!');
  }, 1000, 5000);
}

dope('assets/css/common.js', function(e) {
  console.log('WOOP!');
}, 1000, 5000);
~~~
