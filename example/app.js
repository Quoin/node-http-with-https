const debug = require('debug')('quoin:node-http-with-https:example/app.js');
const express = require('express');

const app = express();

function simpleGet(req, res) {
    debug(req.url);
    res.status(200).send(`You are on valid example ${req.url}.`);
}

app.get('/', simpleGet);
app.get('/test/with/path', simpleGet);

module.exports = app;
