"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());


const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const postRoutes = require('./routes/postRoutes');

app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});