const { dist, getAllDistByIdCity } = require("../Services/DistService");


module.exports = {
  dist: async (req, res) => {
    try {
      // const dist = 
      // console.log(dist)
      const result = await dist(req.body);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Internal Server Error",
        err,
      });
    }
  },
  getAllDistByIdCity: async (req, res) => {
    try {
      const idCities = req.body;
      const result = await getAllDistByIdCity(idCities);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Internal Server Error",
        err: err,
      });
    }
  },
};

