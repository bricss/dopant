import assert from 'node:assert/strict';

const url = globalThis.baseURL;
let page;

describe('given dopant', () => {

  beforeEach(() => ({ page } = globalThis));

  it('should load new resource', async () => {
    await page.goto(url.href, { waitUntil: 'load' });

    const result = await page.evaluate(async () => {
      await window.dopant('/assets/css/layout.css');

      return document.querySelector('link[href*="layout.css"]')?.rel;
    });

    assert.equal(result, 'stylesheet');
  });

  it('should preload links', async () => {
    await page.goto(url.href, { waitUntil: 'load' });

    const result = await page.evaluate(async () => {
      await window.dopant([
        '/assets/js/main.js',
        { as: 'script', rel: 'preload' },
      ]);

      return document.querySelector('link[as="script"]')?.rel;
    });

    assert.equal(result, 'preload');
  });

  it('should load importmap', async () => {
    await page.goto(url.href, { waitUntil: 'load' });

    const result = await page.evaluate(async () => {
      await window.dopant([
        '/assets/js/importmap.json',
        { type: 'importmap' },
      ]);

      return document.querySelector('script[type="importmap"]')?.type;
    });

    assert.equal(result, 'importmap');
  });

  it('should load module script', async () => {
    await page.goto(url.href, { waitUntil: 'load' });

    const result = await page.evaluate(async () => {
      await window.dopant([
        '/assets/js/main.js',
        { type: 'module' },
      ]);

      return document.querySelector('script[src*="main.js"]')?.type;
    });

    assert.equal(result, 'module');
  });

  it('should load multiple resources at once', async () => {
    await page.goto(url.href, { waitUntil: 'load' });

    const result = await page.evaluate(async () => {
      await window.dopant(
        '/assets/css/layout.css',
        [
          '/assets/js/main.js',
          { type: 'module' },
        ],
      );

      return document.querySelector('html[data-theme="dark-mode"]').computedStyleMap().get('filter').toString();
    });

    assert.equal(result, 'invert(1) hue-rotate(180deg)');
  });

});
