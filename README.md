Dopant.js
=========

The aerogel-weight & dead-simple resource loader.

Usage:
~~~ javascript
dopant('//somewhe.re/assets/js/augment.js').then(dopant.bind(null, '//somewhe.re/assets/js/main.js')).then(function() {
  console.log('POW!');
});

dopant(['//somewhe.re/assets/css/layout.css', '//somewhe.re/assets/js/main.js']).then(function() {
  console.log('POW!');
});
~~~
