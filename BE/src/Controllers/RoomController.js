const { add, scraping, getAllRoomByIdCities, getAllRoomByIdDists, getAllRoomByIdWard, getRoomById, getRoomByPrice, getRoomByArea } = require("../Services/RoomService");
const getRoomDetail = require('../Utils/scraping')

module.exports = {
  add: async (req, res) => {
    try {
      const data = await getRoomDetail()
    
      const result = await add(data);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        err: err,
      });
    }
  },
  scraping: async (req, res) => {
    try {
      
      const result = await scraping();
      return res.status(200).json(result);
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Internal Server Error",
        err,
      });
    }
  },
  getAllRoomByIdCities: async (req, res) => {
    try {
      const idCity = req.body;
      const result = await getAllRoomByIdCities(idCity);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Internal Server Error",
        err,
      });
    }
  },
  getAllRoomByIdDists: async (req, res) => {
    try {
      const idCity = req.body.idCity;
      const nameDist = req.body.nameDist;
      const result = await getAllRoomByIdDists(idCity, nameDist);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Internal Server Error",
        err,
      });
    }
  },
  getAllRoomByIdWard: async (req, res) => {
    try {
      const idCity = req.body.idCity;
      const nameDist = req.body.nameDist;
      const nameWard = req.body.nameWard;
      const result = await getAllRoomByIdWard(idCity, nameDist, nameWard);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Internal Server Error",
        err,
      });
    }
  },
  getRoomById: async (req, res) => {
    try {
      const idRoom = req.body.idRoom;
      const result = await getRoomById(idRoom);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Internal Server Error",
        err,
      });
    }
  },
  getRoomByPrice: async (req, res) => {
    try {
      const minPrice = req.body.minPrice;
      const maxPrice = req.body.maxPrice;
      const result = await getRoomByPrice(minPrice, maxPrice);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Internal Server Error",
        err,
      });
    }
  },
  getRoomByArea: async (req, res) => {
    try {
      const minArea = req.body.minArea;
      const maxArea = req.body.maxArea;
      const result = await getRoomByArea(minArea, maxArea);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Internal Server Error",
        err,
      });
    }
  },
};

