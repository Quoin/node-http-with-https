const fs = require('fs');
const path = require('path');

const LETSENCRYPT_CHALLENGE = '/.well-known/acme-challenge';

module.exports = (httpsPort, behindProxy) => (req, res) => {
    const redirectHttpsPort = ((httpsPort === 443) || behindProxy) ? '' : `:${httpsPort}`;

    if (req.headers.host) {
        if (process.env.ACME_CHALLENGE) {
            if ((req.url || '/').startsWith(LETSENCRYPT_CHALLENGE)) {
                const paths = req.url.split('/');
                const filename = paths[paths.length - 1];
                const file = path.join(process.env.ACME_CHALLENGE, filename);
                if (fs.existsSync(file)) {
                    const readStream = fs.createReadStream(file);
                    readStream.pipe(res);
                    return;
                } else {
                    res.statusCode = 404;
                    res.end(`Not found '${req.url}'.`);
                    return;
                }
            }
        }
        const hostname = req.headers.host.split(':', 1).pop();
        const location = `https://${hostname}${redirectHttpsPort}${req.url}`;
        res.writeHead(308, { location });
        res.end();
    } else {
        /*
         *  https://tools.ietf.org/html/rfc7230#section-5.4
         *
         *  A server MUST respond with a 400 (Bad Request) status code to any
         *  HTTP/1.1 request message that lacks a Host header field and to any
         *  request message that contains more than one Host header field or a
         *  Host header field with an invalid field-value.
         */
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end("Missing Host: header.");
    }
};
