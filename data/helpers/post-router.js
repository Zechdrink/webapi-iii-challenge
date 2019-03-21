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

router.get('/:id', async(req, res) => {
    try {
    const post = await Posts.get(req.params.id);
    if(post){
        res.status(200).json(post)
    } else {
        res.status(404).json('post not found')
    } 
} catch(error) {
    res.status(500).send('error retrieving the post')
    }
})

router.post('/', async (req, res) => {
    try {
      const post = await Posts.insert(req.body);
      res.status(201).json(post);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the post',
      });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id);
        if(count < 0){
            res.status(200).json("The post has been terminated")
        } else {
            res.status(404).json("The post could not be found.")
        }
    } catch(error){
        res.status(500).json("error REMOVING the post.")
    }
})

router.put('/:id', async (req, res) => {
    try {
      const post = await Posts.update(req.params.id, req.body);
      if(post){
          res.status(200).json(post);
      } else {
          res.status(404).json('the post could not be found')
      }
    } catch(error){
        res.status(500).json('error updating the post')
    }
})

module.exports = router;