import assert from 'assert';

let page;

describe('dopant', function () {
  this.timeout(3e4);

  beforeEach(() => ({ page } = global));

  it('should load new resource', async () => {
    await page.goto('http://localhost:3000/', { waitUntil: 'load' });
    const title = await page.title();

    assert.strictEqual(title, 'test');

    const result = await page.evaluate(() => window.document.head.getAttribute('theme'));

    assert.strictEqual(result, 'dark-mode');
  });

});
