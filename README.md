cf-workers-helmet
==========

[![Version](https://img.shields.io/npm/v/cf-workers-helmet)](https://www.npmjs.com/package/cf-workers-helmet)
[![Downloads](https://img.shields.io/npm/dm/cf-workers-helmet)](https://www.npmjs.com/package/cf-workers-helmet)

cf-workers-helmet is a wrapper for [helmet](https://github.com/helmetjs/helmet) to work with [Cloudflare Workers](https://workers.cloudflare.com/). It provides important security headers to make your app more secure by default. cf-workers-helmet has been heavily inspired by [koa-helmet](https://github.com/venables/koa-helmet).

Installation
------------

```
npm install cf-workers-helmet --save
```

Usage
-----

Usage is the same as [helmet](https://github.com/helmetjs/helmet).

Helmet is a collection of 11 smaller middleware functions that set HTTP response headers.

| Module                                                                                                        | Default? |
| ------------------------------------------------------------------------------------------------------------- | -------- |
| [contentSecurityPolicy](https://helmetjs.github.io/docs/csp/) for setting Content Security Policy             |          |
| [crossdomain](https://helmetjs.github.io/docs/crossdomain/) for handling Adobe products' crossdomain requests |          |
| [dnsPrefetchControl](https://helmetjs.github.io/docs/dns-prefetch-control) controls browser DNS prefetching   | ✓        |
| [expectCt](https://helmetjs.github.io/docs/expect-ct/) for handling Certificate Transparency                  |          |
| [frameguard](https://helmetjs.github.io/docs/frameguard/) to prevent clickjacking                             | ✓        |
| [hidePoweredBy](https://helmetjs.github.io/docs/hide-powered-by) to remove the X-Powered-By header            | ✓        |
| [hsts](https://helmetjs.github.io/docs/hsts/) for HTTP Strict Transport Security                              | ✓        |
| [ieNoOpen](https://helmetjs.github.io/docs/ienoopen) sets X-Download-Options for IE8+                         | ✓        |
| [noSniff](https://helmetjs.github.io/docs/dont-sniff-mimetype) to keep clients from sniffing the MIME type    | ✓        |
| [referrerPolicy](https://helmetjs.github.io/docs/referrer-policy) to hide the Referer header                  |          |
| [xssFilter](https://helmetjs.github.io/docs/xss-filter) adds some small XSS protections                       | ✓        |

You can see more in [the documentation](https://helmetjs.github.io/docs/).

Example
-------

```js
import Helmet from 'cf-workers-helmet';
import {getAssetFromKV} from '@cloudflare/kv-asset-handler';

let helmet = new Helmet();

addEventListener('fetch', event => {
    event.respondWith(serverResponse(event));
});

async function serverResponse(event) {
    try {
        let response = await handleEvent(event);

        return helmet(event.request, response);
    } catch (e) {
        return new Response('Internal Error', {
            status: 500
        });
    }
}

async function handleEvent(event) {
    try {
        return await getAssetFromKV(event)
    } catch (e) {
        let pathname = new URL(event.request.url).pathname;

        return new Response(`"${pathname}" not found`, {
            status: 404,
            statusText: 'not found',
        });
    }
}
```
