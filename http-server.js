const http = require('http');

const requestHandler = (httpsPort) => (req, res) => {
    // FIXME: If on AWS, security group will forward to other port.
    const redirectHttpsPort = (httpsPort === 443)
        ? ''
        : `:${httpsPort}`
    ;

    const hostname = req.headers.host.split(':', 1).pop();
    const location = `https://${hostname}${redirectHttpsPort}${req.url}`;
    res.writeHead(308, { location });
    res.end();
};

module.exports = (httpsPort) => http.createServer(requestHandler(httpsPort));
