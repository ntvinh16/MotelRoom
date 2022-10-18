const express = require("express");
const route = express.Router();

const { ward, getAllWardByIdDist } = require("../Controllers/WardController");


route.post('/api/ward/add', ward)
route.get('/api/ward/getAllWardByIdDist', getAllWardByIdDist)



module.exports = route
