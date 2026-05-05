"use strict";
import model from '../models/postModel.js';

async function fetchAllPosts(req, res) {
    try {
        const products = await model.getAllPosts();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchPostById(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const product = await model.getOnePostById(id);
            res.json(product);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function changePost(req, res){
    const id = req.params.id;
    const { content } = req.body;
    if(id && content){
        try {
            const altPost = await model.updatePost(id, content);
            res.status(201).json(altPost);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required fields");
    }
}

async function removePost(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const deletedCount = await model.deletePost(id);
            if (deletedCount > 0) {
                res.send(`Post with id ${id} deleted successfully.`);
            } else {
                res.status(404).send("Post not found.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function createPost(req, res) {
    const { content } = req.body;
    if (content) {
        try {
            const newPost = await model.addPost(content);
            res.status(201).json(newPost);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required product fields!");
    }
}

export default {
    fetchAllPosts,
    fetchPostById,
    changePost,
    removePost,
    createPost
};