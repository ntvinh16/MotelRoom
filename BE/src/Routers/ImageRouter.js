const express = require("express");
const route = express.Router();

const { getAllImageByIdRoom } = require("../Controllers/ImageController");


route.get('/api/image/getAllImageByIdRoom', getAllImageByIdRoom)



module.exports = route
