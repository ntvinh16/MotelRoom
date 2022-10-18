const { city, getAllCities } = require("../Services/CityService");


module.exports = {
  city: async (req, res) => {
    try {
      const result = await city(req.body);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Internal Server Error",
        err,
      });
    }
  },
  getAllCities: async (req, res) => {
    try {
      const result = await getAllCities();
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

