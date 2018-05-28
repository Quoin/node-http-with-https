# @quoin/node-http-with-https

This library offers a very simple code to force HTTP traffic to go in HTTPS.

## Usage

    const httpWithHttps = require('@quoin/node-http-with-https');

    const httpPort = 8080;
    const httpsPort = 8443;
    const httpsOptions = {
      key: fs.readFileSync('/path/to/your/file.key'),
      cert: fs.readFileSync('/path/to/your/file.cert'),
      requestCert: false,
      rejectUnauthorized: false
    };
    const app = express(); // This is your expressJS app.

    const { httpServer, httpsServer } = httpWithHttps(httpsPort, httpsOptions, app);

    httpServer.listen(httpPort, () => console.log(`HTTP on ${httpPort}.`));
    httpsServer.listen(httpsPort, () => console.log(`HTTPS on ${httpsPort}.`));

where:

- `httpsPort`: port that will be used to run the application on HTTPS.
- `httpsOptions`: HTTPS options to be passed to `https.createServer()`.
- `app`: the expressJS app to run.


## Example


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
