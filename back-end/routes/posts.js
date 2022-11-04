const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', (req, res) => {
    res.send('We are on posts');
});

router.post('/', (req, res) => {
    const post = new Post({
        name: req.body.name,
        id: req.body.id,
        photo: req.body.photo,
        ingredients: req.body.ingredients,
        directions: req.body.directions
    });

    post.save()
        .exec()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
});

module.exports = router; 