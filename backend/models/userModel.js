import pool from './dbConnection.js';
import bcrypt from "bcrypt";

async function getAllUsers() {
    const queryText = "SELECT * FROM users";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getOneUserById(id) {
    const queryText = "SELECT * FROM users where id= $1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function getOneUserByEmail(email) {
    const queryText = "SELECT * FROM users where email= $1";
    const values = [email];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}


async function deleteUser(id) {
    let queryText = "DELETE FROM users WHERE id =$1; ";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addUser(first_name, last_name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    let queryText = "INSERT INTO users ( first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
    let values = [first_name, last_name, email, hashedPassword];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function getUserById(id) {
    const queryText = "SELECT * FROM users where id= $1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

export default {
    getAllUsers,
    getOneUserById,
    getOneUserByEmail,
    deleteUser,
    addUser,
    getUserById
};