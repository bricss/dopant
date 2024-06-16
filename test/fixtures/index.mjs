import { once } from 'node:events';
import fs from 'node:fs/promises';
import { createServer } from 'node:http';
import { constants } from 'node:http2';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-chromium';

const {
  HTTP2_HEADER_CONTENT_TYPE,
  HTTP2_HEADER_LOCATION,
} = constants;

const base = 'static';
const baseURL = new URL('http://localhost:3000');
const covPath = './coverage/tmp';
const dirPath = path.dirname(fileURLToPath(import.meta.url));

export async function mochaGlobalSetup() {
  this.server = createServer(async (req, res) => {
    const { pathname } = new URL(req.url, baseURL);
    const pathway = pathname.match(/^\/src/)
                    ? path.resolve(process.cwd(), `.${ pathname }`)
                    : path.resolve(dirPath, base, `.${ pathname }`);

    try {
      const stat = await fs.stat(pathway);

      if (stat.isDirectory() && !pathname.endsWith('/')) {
        res.writeHead(301, {
          [HTTP2_HEADER_LOCATION]: `${ pathname }/`,
        });
        res.end();
      } else {
        if (path.extname(pathway).match('js')) {
          res.setHeader(HTTP2_HEADER_CONTENT_TYPE, 'text/javascript');
        }

        const fd = await fs.open(pathname.endsWith('/') ? path.resolve(pathway, 'index.html') : pathway);

        fd.createReadStream().pipe(res);
      }
    } catch {
      res.statusCode = 404;
      res.end();
    }
  });

  await once(this.server.listen(baseURL.port), 'listening');
  console.log('server listening on', this.server.address());
}

export async function mochaGlobalTeardown() {
  await once(this.server.close(), 'close');
  console.log('server has been closed');
}

export const mochaHooks = {
  async afterAll() {
    await globalThis.browser.close();
  },
  async afterEach() {
    const origin = await globalThis.page.evaluate('window.location.origin');
    let coverage = await globalThis.page.coverage.stopJSCoverage();

    coverage = coverage.filter((it) => it.url.match(/(?<=\/src).*\.[cm]?js/));
    coverage.forEach((it) => it.url = it.url.replace(
      new RegExp(`${ origin }(?<pathname>.*)`),
      (...[, , , , { pathname }]) => `${
        pathname.match(/^\/src/)
        ? process.cwd()
        : path.resolve(dirPath, base)
      }${ pathname.replace(/[#?].*/, '')
                  .replace(/\//g, path.sep) }`,
    ));

    await fs.mkdir(covPath, { recursive: true });
    await Promise.all(coverage.map((it, idx) => fs.writeFile(
      `${ covPath }/coverage-${ Date.now() }-${ idx }.json`,
      JSON.stringify({ result: [it] }),
    )));
  },
  async beforeAll() {
    globalThis.browser = await chromium.launch({ headless: true });
  },
  async beforeEach() {
    globalThis.page = await globalThis.browser.newPage();
    await globalThis.page.coverage.startJSCoverage();
  },
};
