"use strict";
const pool = require('./dbConnection');

async function getAllPosts(){
    const queryText = "SELECT * FROM journal";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getOnePostById(id) {
    const queryText = "SELECT * FROM journal where id= $1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function updatePost(id, content){
    const queryText="UPDATE journal SET content = $1 WHERE id = $2 RETURNING *";
    const values = [content, id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function deletePost(id) {
    let queryText = "DELETE FROM journal WHERE id = $1 ";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addPost(content) {
    let queryText = "INSERT INTO journal (content) VALUES ($1) RETURNING *";
    let values = [content];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getAllPosts,
    getOnePostById,
    updatePost,
    deletePost,
    addPost
};
