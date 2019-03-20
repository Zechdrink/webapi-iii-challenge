const express = require('express');

const postRouter = require('./data/helpers/post-router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', postRouter);

server.get('/', (req, res, next) => {
    res.send('Leggo!');
})

module.exports = server;