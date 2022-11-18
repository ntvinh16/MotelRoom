const { add, scraping, getAllRoom, getAllRoomByIdCities, getAllRoomByIdDists, getAllRoomByIdWard, getLocationByIdRoom, getRoomPageOne, getRoomById, getRoomByPrice, getRoomByArea , getRoomByAreaAndPrice, getRoomBySearch, getRoomByPage} = require("../Services/RoomService");
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
  getAllRoom: async (req, res) => {
    try {
      const page = req.query.page;
      const result = await getAllRoom(page);
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
      const idCity = req.query.idCity;
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
      const idRoom = req.query.idRoom;
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
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
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
      const minArea = req.query.minArea;
      const maxArea = req.query.maxArea;
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
  getRoomByAreaAndPrice: async (req, res) => {
    try {
      const minArea = req.query.minArea;
      const maxArea = req.query.maxArea;
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const result = await getRoomByAreaAndPrice(minArea, maxArea, minPrice, maxPrice);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Internal Server Error",
        err,
      });
    }
  },
  getRoomBySearch: async (req, res) => {
    try {
      const idCity = req.body.idCity;
      const nameDist = req.body.nameDist;
      const nameWard = req.body.nameWard;
      const result = await getRoomBySearch(idCity, nameDist, nameWard);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        err,
      });
    }
  },
  getRoomByPage: async (req, res) => {
    try {
      const pageNumber = req.query.pageNumber;
      const result = await getRoomByPage(pageNumber);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        err,
      });
    }
  },
  getLocationByIdRoom: async (req, res) => {
    try {
      const idRoom = req.query.idRoom;
      const result = await getLocationByIdRoom(idRoom);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        err,
      });
    }
  },
  getRoomPageOne: async (req, res) => {
    try {
      const result = await getRoomPageOne();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        err,
      });
    }
  },
};

