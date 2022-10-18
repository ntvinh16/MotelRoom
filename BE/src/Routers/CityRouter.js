const express = require("express");
const route = express.Router();

const { city, getAllCities } = require("../Controllers/CityController");


route.post('/api/city/add', city)
route.get('/api/city/getAllCities', getAllCities)





module.exports = route
