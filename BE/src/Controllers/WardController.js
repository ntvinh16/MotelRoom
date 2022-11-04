const { ward, getAllWardByIdDist } = require("../Services/WardService");



module.exports = {
  ward: async (req, res) => {
    try {
      const result = await ward(req.body);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Internal Server Error",
        err,
      });
    }
  },
  getAllWardByIdDist: async (req, res) => {
    try {
      const idDist = req.query;
      const result = await getAllWardByIdDist(idDist);
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

