import { strict as assert } from 'assert';

const url = new URL('http://localhost:3000/');
let page;

describe('dopant', () => {

  beforeEach(() => ({ page } = global));

  it('should load new resource', async () => {
    await page.goto(url.href, { waitUntil: 'load' });
    const title = await page.title();

    assert.equal(title, 'test');

    const result = await page.evaluate(() => window.document.head.getAttribute('theme'));

    assert.equal(result, 'dark-mode');
  });

}).timeout(3e4);
