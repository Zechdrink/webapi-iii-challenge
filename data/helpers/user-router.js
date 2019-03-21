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

router.get('/:id', async (req, res) => {
    try {
        const user = await Users.getById(req.params.id);
        
        if(user){
            res.status(200).json(user)
        } else {
            res.status(404).json('user not found')
        } 
    } catch(error) {
  res.status(500).json('error retrieving user');
        }
})


router.post('/', restricted, async (req, res) => {
    try {
      const user = await Users.insert(req.body);
      res.status(201).json(user);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the user',
      });
    }
  });

  router.delete('/:id', async (req, res) => {
      try {
          const count = await Users.remove(req.params.id);
          if(count > 0){
              res.status(200).json("The user has been terminated")
          } else {
              res.status(404).json("The user could not be found.")
          }
      } catch(error){
          res.status(500).json("error REMOVING the user.")
      }
  })

  router.put('/:id', restricted, async (req, res) => {
      try {
        const user = await Users.update(req.params.id, req.body);
        if(user){
            res.status(200).json(user);
        } else {
            res.status(404).json('the user could not be found')
        }
      } catch(error){
          res.status(500).json('error updating the user')
      }
  })

  router.get('/:id/messages', async (req, res) => {
    try {

      const messages = await  Users.getUserPosts(req.params.id);
  
      res.status(200).json(messages);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error getting the messages for the hub',
      });
    }
  });


  function restricted(req, res, next){
    const require = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);

    if(req.body.name === require){
        next()
    } else {
        res.status(401).send('learn how to capitalize things')
    }

  }

module.exports = router;