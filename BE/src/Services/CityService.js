const ErrorHander = require("../Utils/Notification/ErrorHander");
const SuccessHander = require("../Utils/Notification/SuccessHander");
const CityModel = require("../Models/City");


exports.city = async (city) => {
    const result = new CityModel({
        nameCity: city.nameCity
    });
    await result.save();
    return SuccessHander(200, "Create category success", result);
}

exports.getAllCities = async () => {
    const listCities = await CityModel.find();
    const result = listCities.map((item) => {
        return {
            "_id": item._id,
            "namCities": item.nameCity
        }
    });
    return SuccessHander(200, "Create category success", result);
}


