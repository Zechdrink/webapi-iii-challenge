const express = require('express');

const Users = require('./userDb');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await Users.get(req.query);
        res.status(200).json(users);
    } catch {
        res.status(500).json(
         'Error retrieving the users',
        ) }
})

module.exports = router;