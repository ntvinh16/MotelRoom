const { getAllImageByIdRoom } = require("../Services/ImageService");


module.exports = {
    getAllImageByIdRoom: async (req, res) => {
        try {
            const idRoom = req.query;
            const result = await getAllImageByIdRoom(idRoom);
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

