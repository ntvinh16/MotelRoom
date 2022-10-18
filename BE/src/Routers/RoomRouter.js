const express = require("express");
const route = express.Router();

const { scraping, add,  getAllRoomByIdCities, getAllRoomByIdDists, getAllRoomByIdWard, getRoomById, getRoomByPrice, getRoomByArea } = require("../Controllers/RoomController");

route.get('/api/room/scraping', scraping)
route.post('/api/room/add', add)
route.get('/api/room/getAllRoomByIdCities', getAllRoomByIdCities)
route.get('/api/room/getAllRoomByIdDists', getAllRoomByIdDists)
route.get('/api/room/getAllRoomByIdWard', getAllRoomByIdWard)
route.get('/api/room/getRoomById', getRoomById)
route.get('/api/room/getRoomByPrice', getRoomByPrice)
route.get('/api/room/getRoomByArea', getRoomByArea)


module.exports = route
