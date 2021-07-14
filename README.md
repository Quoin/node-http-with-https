# @quoin/node-http-with-https

[![Build Status](https://travis-ci.com/Quoin/node-http-with-https.svg?branch=master)](https://travis-ci.com/Quoin/node-http-with-https)

This library offers a very simple code to force HTTP traffic to go in HTTPS.

## Usage

    const fs = require('fs');
    const httpWithHttps = require('@quoin/node-http-with-https');

    const behindProxy = false;
    const httpPort = 8080;
    const httpsPort = 8443;
    const httpsOptions = {
      key: fs.readFileSync('/path/to/your/file.key'),
      cert: fs.readFileSync('/path/to/your/file.cert'),
      requestCert: false,
      rejectUnauthorized: false
    };
    const app = express(); // This is your expressJS app.

    const { httpServer, httpsServer } = httpWithHttps(httpsPort, behindProxy, httpsOptions, app);

    httpServer.listen(httpPort, () => console.log(`HTTP on ${httpPort}.`));

    httpsServer.listen(httpsPort, () => console.log(`HTTPS on ${httpsPort}.`));

where:

- `httpsPort`: port that will be used to run the application on HTTPS.
- `behindProxy`: Indicates if the server runs behind a proxy. This will prevent
  `httpsPort` to be appended to the hostname.
- `httpsOptions`: HTTPS options to be passed to `https.createServer()`.
- `app`: the expressJS app to run.


## Example

See fully working [example](./server.js).

To run the example:

    git clone git@github.com:Quoin/node-http-with-https.git
    cd node-http-with-https
    npm install
    npm start

You can then access to:

    http://localhost:8080/
    http://localhost:8080/test/with/path

You should get an error trying any other path, like:

    http://localhost:8080/other

Both should redirect you to the HTTPS path. You will probably have a security
warning because the certificate is self-signed.

See [example/README.md](example/README.md) to see how the self-signed
certificate files were generated.


## LetsEncrypt

This server will have a minimum support for letsencrypt. It will allow the
validation of the acme-challenge in HTTP before redirecting to HTTPS. In order
to do that, it must define the environment variable:

    ACME_CHALLENGE=/some/path/that/is/used/by/certbot
