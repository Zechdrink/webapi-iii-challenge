const express = require('express');
const helmet = require('helmet')

const postRouter = require('./data/helpers/post-router.js');
const userRouter = require('./data/helpers/user-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

function restricted(req, res, next) {
    const required = req.headers.required;

    
}

server.get('/', (req, res, next) => {
    res.send('Leggo!');
})

module.exports = server;