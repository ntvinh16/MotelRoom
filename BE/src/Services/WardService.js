const ErrorHander = require("../Utils/Notification/ErrorHander");
const SuccessHander = require("../Utils/Notification/SuccessHander");
const WardModel = require("../Models/Ward");



exports.ward = async (ward) => {
    const result = new WardModel({
        nameWard: ward.nameWard,
        idDist: ward.idDist
    });
    await result.save();
    return SuccessHander(200, "Create category success", result);
}

exports.getAllWardByIdDist = async (idDist) => {
    const listWards = await WardModel.find(idDist);
    const result = listWards.map((item) => {
        return {
            "_id": item._id,
            "nameWard": item.nameWard,
            "idDist": item.idDist
        }
    })
    return SuccessHander(200, "Create category success", result);
}


