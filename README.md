Dope.js
=======

The aerogel-weight & dead-simple resource loader.

Usage:
~~~ javascript
if (document.all && document.documentMode && !window.atob) {
  dope('//somewhe.re/assets/js/augment.min.js', function() {
    console.log('POW!');
    (document.body.className += ' ' + (document.documentMode && 'ie' + document.documentMode), document.body.className = document.body.className.trim()) || (document.getElementsByTagName('body')[0].className += ' ' + (document.documentMode && 'ie' + document.documentMode), document.getElementsByTagName('body')[0].className = document.getElementsByTagName('body')[0].className.trim());
    dope('//somewhe.re/assets/js/app.min.js', function() {
      console.log('POW!');
    });
  });
}

if (/^.*(urn)$/gi.test(window.location.href)) {
  dope('//somewhe.re/assets/js/app.min.js', function() {
    console.log('POW!');
  }, 100, 500);
}

dope(['//somewhe.re/assets/css/layout.min.css', '//somewhe.re/assets/js/com.min.js', '//somewhe.re/assets/js/app.min.js'], function() {
  console.log('POW!');
});

dope('//somewhe.re/assets/js/com.min.js', function() {
  console.log('POW!');
}).dope('//somewhe.re/assets/js/app.min.js', function() {
  console.log('POW!');
});
~~~
