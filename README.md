The aerogel-weight & dead-simple resource loader 🚚
---
This package provides a **lightweight** dynamic resource loader for web browsers.

## Abstract

* Promise-based API ⏳
* Parallel by default, ordered when required ⚡
* Supports all `<link>` relations (`preconnect`, `preload`, `stylesheet`, etc.) 🔗
* Supports all `<script>` types (`importmap`, `module`, `nomodule`, etc.) 📃
* Zero dependencies 🗽

## Prerequisites

* Node.js `>= 20.0.0`

## Installation

```bash
npm install dopant --save
```

### Usage

```javascript
import dopant from 'dopant';

await dopant(
  '/assets/css/layout.css',
  '/assets/js/main.js',
  ['/assets/js/importmap.json', { type: 'importmap' }],
  ['/assets/js/module.js', { defer: true, type: 'module' }],
  [
    '/assets/webfonts/font.woff2',
    {
      as: 'font',
      rel: 'preload',
      type: 'font/woff2',
    }
  ],
);
```

### API

#### `dopant(...resources)`

* `...resources` **{string | [string, attrs]}** Resources w/wo extra attributes to load into the web page
* **Returns:** Promise that resolves to a list of resolutions

### Behavior

* CSS files default to `rel="stylesheet"`
* If `rel` is provided, a `<link>` element is created
* Otherwise, a `<script>` element is created
* Scripts default to `async: true` (unless overridden or `defer: true` is set)

---

For more details, please check tests in the repository.
