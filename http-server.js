const http = require('http');

const requestHandler = require('./http-server-request-handler');

module.exports = (httpsPort, behindProxy) => http.createServer(requestHandler(httpsPort, behindProxy));
