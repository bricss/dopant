The aerogel-weight & dead-simple resource loader 🚚
----
This package provides **lightweight** dynamic resource loader for the web browsers.

## Prerequisites
* Node.js `>= 14.13.x`

## Installation
```shell
npm install dopant --save
```

### Usage
```javascript
dopant('//somewhe.re/assets/js/augment.js')
  .then(dopant.bind(null, '//somewhe.re/assets/js/main.js'))
  .then(function() {
    console.log('POW!');
  });

dopant([
  '//somewhe.re/assets/css/layout.css',
  '//somewhe.re/assets/js/main.js'
  ]).then(function() {
    console.log('POW!');
});
```
