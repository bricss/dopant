The aerogel-weight & dead-simple resource loader 🚚
---
This package provides a **lightweight** dynamic resource loader for the web browsers.

## Prerequisites

* Node.js `>= 20.0.0`

## Installation

```bash
npm install dopant --save
```

### Usage

```javascript
import dopant from 'dopant';

dopant([
  '//somewhe.re/assets/css/layout.css',
  '//somewhe.re/assets/js/main.cjs',
]).then(() => console.log('pow!'));

dopant('//somewhe.re/assets/js/lib.js')
  .then(() => dopant('//somewhe.re/assets/js/main.js'))
  .finally(() => console.log('pow!'));

dopant('//somewhe.re/assets/js/index.mjs')
  .then(() => console.log('pow!'));
```
