const https = require('https');

module.exports = (httpsOptions, httpsApp) => https.createServer(httpsOptions, httpsApp);
