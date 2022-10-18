const ErrorHander = require("../Utils/Notification/ErrorHander");
const SuccessHander = require("../Utils/Notification/SuccessHander");
const DistModel = require("../Models/Dist");



exports.dist = async (dist) => {
    const result = new DistModel({
        nameDist: dist.nameDist,
        idCities: dist.idCities
    });
    await result.save();
    return SuccessHander(200, "Create category success", result);
}


exports.getAllDistByIdCity = async (idCities) => {
    const listDists = await DistModel.find(idCities);
    const result = listDists.map((item) => {
        return {
            "_id": item._id,
            "nameDist": item.nameDist,
            "idCities": item.idCities
        }
    })
    return SuccessHander(200, "Create category success", result);
}


