const fs = require('fs');
const httpWithHttps = require('./index');

const httpPort = 8080;
const httpsPort = 8443;
const httpsOptions = {
    key: fs.readFileSync('./example/localhost.key.pem'),
    cert: fs.readFileSync('./example/localhost.cert.pem'),
    requestCert: false,
    rejectUnauthorized: false
};
const app = require('./example/app');

const { httpServer, httpsServer } = httpWithHttps(8443, false, httpsOptions, app);
httpServer.listen(httpPort, () => console.info(`HTTP on ${httpPort}.`));
httpsServer.listen(httpsPort, () => console.info(`HTTPS on ${httpsPort}.`));
