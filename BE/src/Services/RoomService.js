const ErrorHander = require("../Utils/Notification/ErrorHander");
const SuccessHander = require("../Utils/Notification/SuccessHander");
const getRoomDetail = require('../Utils/scraping')
const RoomModel = require("../Models/Room");
const ImageModel = require("../Models/Image");
const Address_DetailModel = require("../Models/Address_Detail");
const CityModel = require('../Models/City');
const CoordinatesModel = require("../Models/Coordinates");


const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',

    // Optional depending on the providers
    //   fetch: customFetchImplementation,
    apiKey: 'AIzaSyB3iXKLXN0fxMbOBR7BOpHo-PmJAI-oPVg', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);


exports.add = async (data) => {
    try {
        const unit = "triệu/tháng"
        data.map(async (item) => {
            var res = await geocoder.geocode(item[1]);

            if (typeof res[0] != "undefined") {
                let location = new CoordinatesModel({
                    latitude: res[0].latitude,
                    longitude: res[0].longitude
                })
                await location.save();

                let nameCitys = item[1].split(',')[3].trim()
                const checkCity = await CityModel.find({ nameCity: nameCitys })
                if (typeof checkCity[0] != "undefined") {
                    let address_detail = new Address_DetailModel({
                        nameAddress: item[1].trim(),
                        idCity: checkCity[0]._id,
                        idCoordinaste: location._id
                    })
                    await address_detail.save()

                    let price = ""
                    if (item[3].split(" ")[1].trim() == unit) {
                        price = parseFloat(item[3].split(" ")[0]) * 1000000
                    } else {
                        price = parseFloat(item[3].split(" ")[0]) * 1000
                    }
                    let area = parseFloat(item[4].split("m")[0])

                    let room = new RoomModel({
                        nameRoom: item[0],
                        address: address_detail._id,
                        phone: item[2].trim(),
                        price: price,
                        area: area,
                        description: item[5],
                    });
                    await room.save();

                    for (let i = 0; i < item[6].length; i++) {
                        let image = new ImageModel({
                            nameImage: item[6][i],
                            idRoom: room._id
                        });
                        image.save();
                    }
                }
            }
        });
        return SuccessHander(200, "Create category success");
    } catch (err) {
        return ErrorHander(400, "Error", err);
    }
}

exports.scraping = async () => {
    const result = await getRoomDetail();
    console.log(result)
    return SuccessHander(200, "Create category success", result);
}

exports.getAllRoomByIdCities = async (idCity) => {
    try {

        let listRoom = await Address_DetailModel.find(idCity)
        // console.log(listRoom)
        var listRoomDetail = [];
        for (var room of listRoom) {
            // console.log(room)
            const response = await RoomModel.find({ address: room._id });
            const result = response.map((item) => {
                return {
                    "_id": item._id,
                    "nameRoom": item.nameRoom,
                    "address": room.nameAddress,
                    "price": item.price,
                    "area": item.area,
                    "phone": item.phone,
                    "description": item.description
                }
            })
            listRoomDetail.push(result);
        }
        return SuccessHander(200, "Create category success", listRoomDetail);
    }
    catch (err) {
        console.log(err)
        return ErrorHander(400, "Error", err);
    }
}

exports.getAllRoomByIdDists = async (idCity, nameDist) => {
    try {
        let listAddressRoom = await Address_DetailModel.find({ "idCity": idCity });
        var listAddressRoomDist = [];
        listAddressRoom.forEach((item) => {
            let addressDist = item.nameAddress.split(",")[2].trim();
            if (addressDist == nameDist)
                listAddressRoomDist.push(item);
        })

        var listRoomDetail = []
        for (var room of listAddressRoomDist) {
            const response = await RoomModel.find({ address: room._id });
            const result = response.map((item) => {
                return {
                    "_id": item._id,
                    "nameRoom": item.nameRoom,
                    "address": room.nameAddress,
                    "price": item.price,
                    "area": item.area,
                    "phone": item.phone,
                    "description": item.description
                }
            })
            listRoomDetail.push(result);
        }
        return SuccessHander(200, "Create category success", listRoomDetail);
    }
    catch (err) {
        console.log(err)
        return ErrorHander(400, "Error", err);
    }
}

exports.getAllRoomByIdWard = async (idCity, nameDist, nameWard) => {
    try {
        let listAddressRoom = await Address_DetailModel.find({ "idCity": idCity });
        var listAddressRoomDist = [];
        listAddressRoom.forEach((item) => {
            let addressDist = item.nameAddress.split(",")[2].trim();
            let addressWard = item.nameAddress.split(",")[1].trim();
            if (addressDist == nameDist && addressWard == nameWard)
                listAddressRoomDist.push(item);
        })

        var listRoomDetail = []
        for (var room of listAddressRoomDist) {

            const response = await RoomModel.find({ address: room._id });
            const result = response.map((item) => {
                return {
                    "_id": item._id,
                    "nameRoom": item.nameRoom,
                    "address": room.nameAddress,
                    "price": item.price,
                    "area": item.area,
                    "phone": item.phone,
                    "description": item.description
                }
            })
            listRoomDetail.push(result);
        }
        return SuccessHander(200, "Create category success", listRoomDetail);
    }
    catch (err) {
        console.log(err)
        return ErrorHander(400, "Error", err);
    }
}

exports.getRoomById = async (idRoom) => {
    try {
        let room = await RoomModel.find({ _id: idRoom })
        let address = await Address_DetailModel.find({ _id: room[0].address })
        const result = room.map((item) => {
            return {
                "_id": item._id,
                "nameRoom": item.nameRoom,
                "address": address[0].nameAddress,
                "price": item.price,
                "area": item.area,
                "phone": item.phone,
                "description": item.description
            }
        })
        return SuccessHander(200, "Create category success", result);
    }
    catch (err) {
        console.log(err)
        return ErrorHander(400, "Error", err);
    }
}

exports.getRoomByPrice = async (minPrice, maxPrice) => {
    try {
        let listRoom = await RoomModel.find()
        var listRoomDetail = [];

        for (var item of listRoom) {
            if (item.price <= maxPrice && item.price >= minPrice) {
                let address = await Address_DetailModel.find({ _id: item.address })
                let result = {
                    "_id": item._id,
                    "nameRoom": item.nameRoom,
                    "address": address[0].nameAddress,
                    "price": item.price,
                    "area": item.area,
                    "phone": item.phone,
                    "description": item.description
                }
                listRoomDetail.push(result);
            }
        }
        return SuccessHander(200, "Create category success", listRoomDetail);
    }

    catch (err) {
        console.log(err)
        return ErrorHander(400, "Error", err);
    }
}

exports.getRoomByArea = async (minArea, maxArea) => {
    try {
        let listRoom = await RoomModel.find()
        var listRoomDetail = [];

        for (var item of listRoom) {
            if (item.area <= maxArea && item.area >= minArea) {
                let address = await Address_DetailModel.find({ _id: item.address })
                let result = {
                    "_id": item._id,
                    "nameRoom": item.nameRoom,
                    "address": address[0].nameAddress,
                    "price": item.price,
                    "area": item.area,
                    "phone": item.phone,
                    "description": item.description
                }
                listRoomDetail.push(result);
            }
        }
        return SuccessHander(200, "Create category success", listRoomDetail);
    }

    catch (err) {
        console.log(err)
        return ErrorHander(400, "Error", err);
    }
}

