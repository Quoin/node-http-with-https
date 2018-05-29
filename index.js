const httpServer = require('./http-server');
const httpsServer = require('./https-server');

module.exports = (httpsPort, behindProxy, httpsOptions, httpsApp) => {
    const returnValue = {
        httpServer: httpServer(httpsPort, behindProxy),
        httpsServer: httpsServer(httpsOptions, httpsApp)
    };

    Object.freeze(returnValue);

    return returnValue;
};
