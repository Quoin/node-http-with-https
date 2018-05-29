const httpServer = require('./lib/http-server');
const httpsServer = require('./lib/https-server');

module.exports = (httpsPort, behindProxy, httpsOptions, httpsApp) => {
    const returnValue = {
        httpServer: httpServer(httpsPort, behindProxy),
        httpsServer: httpsServer(httpsOptions, httpsApp)
    };

    Object.freeze(returnValue);

    return returnValue;
};
