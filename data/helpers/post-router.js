const express = require('express');

const Posts = require('./postDb');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get(req.query);
        res.status(200).json(posts);
    } catch {
        res.status(500).json('error retrieving hubs')
    }
})

module.exports = router;