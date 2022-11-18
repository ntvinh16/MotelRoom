const { default: BaseService } = require("./base.service")

class RoomService extends BaseService {

    getAllCities = async () => {
        const result = await this.api.get('/city/getAllCities');
        return result;
    }
    
    getAllDistByIdCity = async (idCity) => {
        const result = await this.api.get(`/dist/getAllDistByIdCity?idCities=${idCity}`);
        return result;
    }

    getAllWardByIdDist = async (idDist) => {
        const result = await this.api.get(`/ward/getAllWardByIdDist?idDist=${idDist}`);
        return result;
    }

    getAllImageByIdRoom = async (idRoom) => {
        const result = await this.api.get(`/image/getAllImageByIdRoom?idRoom=${idRoom}`);
        return result;
    }

    getAllRoom = async (page) => {
        const result = await this.api.get(`/room/getAllRoom?page=${page}`);
        return result;
    }

    getRoomByPrice = async (minPrice, maxPrice) => {
        const result = await this.api.get(`/room/getRoomByArea?minPrice=${minPrice}&maxPrice=${maxPrice}`);
        return result;
    }

    getRoomByArea = async (minArea, maxArea) => {
        const result = await this.api.get(`/room/getRoomByArea?minArea=${minArea}&maxArea=${maxArea}`);
        return result;
    }


    getRoomByAreaAndPrice = async (minArea, maxArea, minPrice, maxPrice) => {
        const result = await this.api.get(`/room/getRoomByAreaAndPrice?minArea=${minArea}&maxArea=${maxArea}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
        return result;
    }

    getRoomBySearch = async (idCity, nameDist, nameWard) => {
        const result = await this.api.post(`/room/getRoomBySearch`, {idCity, nameDist, nameWard});
        return result;
    }

    getAllRoomByIdCities = async (idCity) => {
        const result = await this.api.get(`/room/getAllRoomByIdCities?idCity=${idCity}`);
        return result;
    }

    getRoomByPrice = async (minPrice, maxPrice) => {
        const result = await this.api.get(`/room/getRoomByPrice?minPrice=${minPrice}&maxPrice=${maxPrice}`);
        return result;
    }

    getRoomByArea = async (minArea, maxArea) => {
        const result = await this.api.get(`/room/getRoomByArea?minArea=${minArea}&maxArea=${maxArea}`);
        return result;
    }

    getRoomById = async (idRoom) => {
        const result = await this.api.get(`/room/getRoomById?idRoom=${idRoom}`);
        return result;
    }

    getLocationByIdRoom = async (idRoom) => {
        const result = await this.api.get(`/room/getLocationByIdRoom?idRoom=${idRoom}`);
        return result;
    }
    
    getRoomPageOne = async () => {
        const result = await this.api.get(`/room/getRoomPageOne`);
        return result;
    }
    

    


}

export default RoomService;