module.exports = (httpsPort, behindProxy) => (req, res) => {
    const redirectHttpsPort = ((httpsPort === 443) || behindProxy) ? '' : `:${httpsPort}`;
    if (req.headers.host) {
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
