import express from 'express';
const route=express.Router();
import { create } from '../controller/UserController.js';
import { fetch } from '../controller/UserController.js';
import Blog from '../models/MainModel.js';
route.post('/create',create);
route.post('/fetch',fetch);

route.post('/blogs', (req, res) => {
    const { author, content, image } = req.body;
    Blog.create({ author, content, image, likes: 0, comments: [], createdAt: new Date() })
    .then(blog => res.json(blog))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get all blog posts
route.get('/blogs', (req, res) => {
    Blog.find({})
    .sort({createdAt:-1})  
      .then(blogs => res.json(blogs))
      .catch(err => res.status(500).json({ error: err.message }));
});

// Add a like to a blog post
route.post('/blogs/:id/like', (req, res) => {
    const { id } = req.params;
    Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
      .then(blog => res.json({ likes: blog.likes }))
      .catch(err => res.status(500).json({ error: err.message }));
});

// Add a comment to a blog post
route.post('/blogs/:id/comment', (req, res) => {
    const { id } = req.params;
    const { user, text } = req.body;
    
    Blog.findByIdAndUpdate(id, { $push: { comments: { user, text } } }, { new: true })
      .then(blog => res.json(blog.comments))
      .catch(err => res.status(500).json({ error: err.message }));
});

export default route;






