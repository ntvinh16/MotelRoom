const express = require("express");
const route = express.Router();

const { dist, getAllDistByIdCity } = require("../Controllers/DistController");


route.post('/api//dist/add', dist)
route.get('/api/dist/getAllDistByIdCity', getAllDistByIdCity)



module.exports = route
