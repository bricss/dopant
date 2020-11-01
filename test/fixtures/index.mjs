import { once } from 'events';
import { createReadStream } from 'fs';
import fs from 'fs/promises';
import { createServer } from 'http';
import path from 'path';
import { chromium } from 'playwright-chromium';
import { fileURLToPath } from 'url';

const base = 'static';
const dirPath = path.dirname(fileURLToPath(import.meta.url));
const port = 3000;

export async function mochaGlobalSetup() {
  this.server = createServer(async (req, res) => {
    const pathname = req.url.split('?').shift();
    const pathway = pathname.match(/^\/src/)
                    ? path.resolve(process.cwd(), `.${ pathname }`)
                    : path.resolve(dirPath, base, `.${ pathname }`);

    try {
      const stat = await fs.stat(pathway);

      if (stat.isDirectory() && !pathname.endsWith('/')) {
        res.writeHead(301, {
          'Location': `${ pathname }/`,
        });
        res.end();
      } else {
        if (path.extname(pathway).match('js')) {
          res.setHeader('Content-Type', 'text/javascript');
        }

        createReadStream(pathname.endsWith('/') ? path.resolve(pathway, 'index.html') : pathway).pipe(res);
      }
    } catch (ex) {
      res.statusCode = 404;
      res.end();
    }
  });

  await once(this.server.listen(port), 'listening');
  console.log('server listening on', this.server.address());
}

export async function mochaGlobalTeardown() {
  await once(this.server.close(), 'close');
  console.log('server has been closed');
}

export const mochaHooks = {
  async afterAll() {
    await global.browser.close();
  },
  async beforeAll() {
    global.browser = await chromium.launch({ headless: true });
  },
  async afterEach() {
    const origin = await global.page.evaluate('window.location.origin');
    let coverage = await global.page.coverage.stopJSCoverage();

    coverage = coverage.filter((it) => it.url.match(/(?<=\/src).*\.[cm]?js/));
    coverage.forEach((it) => it.url = it.url.replace(
      new RegExp(`${ origin }(?<pathname>.*)`),
      (...[, , , , { pathname }]) => `${
        pathname.match(/^\/src/)
        ? process.cwd()
        : path.resolve(dirPath, base)
      }${ pathname.replace(/([#?].*)/, '')
                  .replaceAll('/', path.sep) }`,
    ));

    await fs.mkdir('./coverage/tmp', { recursive: true });
    await Promise.all(coverage.map((it, idx) => fs.writeFile(
      `./coverage/tmp/coverage-${ Date.now() }-${ idx }.json`,
      JSON.stringify({ result: [it] }),
    )));
  },
  async beforeEach() {
    global.page = await global.browser.newPage();
    await global.page.coverage.startJSCoverage();
  },
};
