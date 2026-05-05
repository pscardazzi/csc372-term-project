"use strict";
import userController from '../controllers/userController.js';
import express from "express";

const router = express.Router();

router.get("/", userController.fetchAllUsers);
router.get("/:id", userController.fetchUserById);
router.delete("/:id", userController.removeUser);
router.post("/", userController.createUser);
router.post("/login", userController.loginUser);

export default router;