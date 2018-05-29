module.exports = (httpsPort, behindProxy) => (req, res) => {
    const redirectHttpsPort = ((httpsPort === 443) || behindProxy) ? '' : `:${httpsPort}`;
    const hostname = req.headers.host.split(':', 1).pop();
    const location = `https://${hostname}${redirectHttpsPort}${req.url}`;
    res.writeHead(308, { location });
    res.end();
};
