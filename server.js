const debug = require('debug')('quoin:node-http-with-https:server.js');
const fs = require('fs');
const httpWithHttps = require('./index');

const httpPort = 8080;
const httpsPort = 8443;
const httpsOptions = {
    key: fs.readFileSync('./example/example.key'),
    cert: fs.readFileSync('./example/example.cert'),
    requestCert: false,
    rejectUnauthorized: false
};
const app = require('./example/app');

const { httpServer, httpsServer } = httpWithHttps(8443, false, httpsOptions, app);
httpServer.listen(httpPort, () => debug(`HTTP on ${httpPort}.`));
httpsServer.listen(httpsPort, () => debug(`HTTPS on ${httpsPort}.`));
