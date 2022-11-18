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
    apiKey: process.env.API_KEY, // for Mapquest, OpenCage, Google Premier
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
                        // nameContact: item[1].trim(), Luu y kiem tra item thu may?????????
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

exports.getAllRoom = async (page) => {
    try {
        const PAGE_SIZE = 10;
        if (page) {
            page = parseInt(page);
            var skip = (page - 1) * PAGE_SIZE;
            var roomNumbers = await Address_DetailModel.count() ;
            var maxPage = Math.ceil(roomNumbers/10)
            let listRoom = await Address_DetailModel.find().skip(skip).limit(PAGE_SIZE);
            var listRoomDetail = [];
            for (var room of listRoom) {
                const response = await RoomModel.find({ address: room._id });
                const result = response.map((item) => {
                    return {
                        "_id": item._id,
                        "nameRoom": item.nameRoom,
                        "address": room.nameAddress,
                        "price": item.price,
                        "area": item.area,
                        "phone": item.phone,
                        "description": item.description,
                    }
                })
                listRoomDetail.push(result);
            }
            return SuccessHander(200, "Create category success", {listRoomDetail, maxPage});

            // console.log(skip)
        } else {

            let listRoom = await Address_DetailModel.find()
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

    }
    catch (err) {
        console.log(err)
        return ErrorHander(400, "Error", err);
    }
}

exports.getAllRoomByIdCities = async (idCity) => {
    try {

        let listRoom = await Address_DetailModel.find({ idCity })
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
                // "nameContact": item.nameContact,
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
                let result = [{
                    "_id": item._id,
                    "nameRoom": item.nameRoom,
                    "address": address[0].nameAddress,
                    "price": item.price,
                    "area": item.area,
                    "phone": item.phone,
                    "description": item.description
                }]
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
                let result = [{
                    "_id": item._id,
                    "nameRoom": item.nameRoom,
                    "address": address[0].nameAddress,
                    "price": item.price,
                    "area": item.area,
                    "phone": item.phone,
                    "description": item.description
                }]
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

exports.getRoomByAreaAndPrice = async (minArea, maxArea, minPrice, maxPrice) => {
    try {
        let listRoom = await RoomModel.find()
        var listRoomDetail = [];
        for (var item of listRoom) {
            if ((item.area <= maxArea && item.area >= minArea) && (item.price <= maxPrice && item.price >= minPrice)) {
                let address = await Address_DetailModel.find({ _id: item.address })
                let result = [{
                    "_id": item._id,
                    "nameRoom": item.nameRoom,
                    "address": address[0].nameAddress,
                    "price": item.price,
                    "area": item.area,
                    "phone": item.phone,
                    "description": item.description
                }]
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

exports.getRoomByPage = async (pageNumber) => {
    try {
        let listRoom = await RoomModel.find()
        var listRoomDetail = [];

        for (var item of listRoom) {
            if (item.price <= maxPrice && item.price >= minPrice) {
                let address = await Address_DetailModel.find({ _id: item.address })
                let result = [{
                    "_id": item._id,
                    "nameRoom": item.nameRoom,
                    "address": address[0].nameAddress,
                    "price": item.price,
                    "area": item.area,
                    "phone": item.phone,
                    "description": item.description
                }]
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

exports.getRoomBySearch = async (idCity, nameDist, nameWard) => {
    try {
        var listRoomDetail = [];
        if (idCity === '') {
            let listAddressRoom = await Address_DetailModel.find();
            for (var room of listAddressRoom) {
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
        } else if (idCity != '' && nameDist === '' && nameWard === '') {
            let listAddressRoom = await Address_DetailModel.find({ idCity: idCity });
            for (var room of listAddressRoom) {
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
        } else if (idCity != '' && nameDist != '' && nameWard === '') {
            let listAddressRoom = await Address_DetailModel.find({ idCity: idCity });
            let listAddressRoomDist = []
            listAddressRoom.forEach((item) => {
                let addressDist = item.nameAddress.split(",")[2].trim();
                if (addressDist == nameDist)
                    listAddressRoomDist.push(item);
            })
            for (var room of listAddressRoomDist) {
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
        } else if (idCity != '' && nameDist != '' && nameWard != '') {
            let listAddressRoom = await Address_DetailModel.find({ idCity: idCity });
            let listAddressRoomDist = []
            listAddressRoom.forEach((item) => {
                let addressDist = item.nameAddress.split(",")[2].trim();
                let addressWard = item.nameAddress.split(",")[1].trim();

                if (addressDist == nameDist && addressWard == nameWard)
                    listAddressRoomDist.push(item);
            })
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
        return SuccessHander(200, "Create category success");
    }

    catch (err) {
        console.log(err)
        return ErrorHander(400, "Error", err);
    }
}

exports.getLocationByIdRoom = async (idRoom) => {
    try {
        let room = await RoomModel.find({ _id: idRoom })
        let address = await Address_DetailModel.find({ _id: room[0].address })

        let location = await CoordinatesModel.find({ _id: address[0].idCoordinaste })

        // console.log(location)
        const result = location.map((item) => {
            return {
                "latitude": item.latitude,
                "longitude": item.longitude,
            }
        })
        return SuccessHander(200, "Create category success", result);
    }
    catch (err) {
        console.log(err)
        return ErrorHander(400, "Error", err);
    }
}

exports.getRoomPageOne = async (idRoom) => {
    try {
        let room = await RoomModel.find().limit(10);
        let listRoom = []

        for (var item of room) {
            let image = await ImageModel.find({ idRoom: item._id })
            let result = {
                "_id": item._id,
                "nameRoom": item.nameRoom,
                "price": item.price,
                "image": image[0].nameImage

            }
            listRoom.push(result);
        }

        return SuccessHander(200, "Create category success", listRoom);
    }
    catch (err) {
        console.log(err)
        return ErrorHander(400, "Error", err);
    }
}

