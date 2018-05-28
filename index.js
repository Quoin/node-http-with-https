const httpServer = require('./http-server');
const httpsServer = require('./https-server');

module.exports = (httpsPort, httpsOptions, httpsApp) => {
    const returnValue = {
        httpServer: httpServer(httpsPort),
        httpsServer: httpsServer(httpsOptions, httpsApp)
    };

    Object.freeze(returnValue);

    return returnValue;
};
