"use strict";
import model from '../models/userModel.js';
import pool from '../models/dbConnection.js';
import bcrypt from "bcrypt";

async function fetchAllUsers(req, res) {
    try {
        const users = await model.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchUserById(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const user = await model.getOneUserById(id);
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function removeUser(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const deletedCount = await model.deleteUser(id);
            if (deletedCount > 0) {
                res.send(`User with id ${id} deleted successfully.`);
            } else {
                res.status(404).send("User not found.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function createUser(req, res) {
    const { first_name, last_name, email, password } = req.body;
    if (first_name && last_name && email && password) {
        try {
            const newUser = await model.addUser(first_name, last_name, email, password);
            res.status(201).json(newUser);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required user fields!");
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).send("Invalid credentials");
        }

        const user = result.rows[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).send("Invalid credentials");
        }

        res.json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

export default {
    fetchAllUsers,
    fetchUserById,
    removeUser,
    createUser,
    loginUser
};