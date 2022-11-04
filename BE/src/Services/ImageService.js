const ErrorHander = require("../Utils/Notification/ErrorHander");
const SuccessHander = require("../Utils/Notification/SuccessHander");
const ImageModel = require("../Models/Image");



exports.getAllImageByIdRoom = async (idRoom) => {
    const listImage = await ImageModel.find(idRoom);
    // const result = listCities.map((item) => {
    //     return {
    //         "_id": item._id,
    //         "namCities": item.nameCity
    //     }
    // });
    return SuccessHander(200, "Create category success", listImage);
}


