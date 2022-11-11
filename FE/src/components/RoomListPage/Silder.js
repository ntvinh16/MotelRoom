import React, { useState, useEffect } from 'react';
import RoomService from 'services/test.service';

import Slider from "react-slick";


const settings = {
    dots: false,
    infinite: true,
    speed: 150,
    slidesToShow: 1,
    slidesToScroll: 1
};


const roomService = new RoomService();
const ImageSilder = ({ images }) => {

    // const [images, setImages] = useState(null)


    // const roomImage = async (props) => {
    //     try {
    //         const result = await roomService.getAllImageByIdRoom(props._id);
    //         setImages(result.data.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     roomImage();
    // }, [props]);


    return (
        <div style={{width: "100%"}}>
            <Slider {...settings}>
                <div  className='silder'>
                    <img className='silder-images'
                        src='https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/11/05/5794d2b9-f632-4cd3-8e3f-261d1d2ca27a_1667629866.jpg'
                        alt='slider'
                    />
                </div>
                <div className='silder' style={{backgroundColor: "black", display: "flex", justifyContent: "center", height: "300px"}}>
                    <img className='silder-images'
                        src='https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/11/05/fe21d801-e59e-4659-bef9-9dd8acab3b8f_1667629866.jpg'
                        alt='slider'
                    />
                </div>
                <div className='silder' style={{backgroundColor: "black", display: "flex", justifyContent: "center", height: "300px"}}>
                    <img className='silder-images'
                        src='https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/11/05/7cccee8e-7705-4163-b4c5-0277f4fda666_1667629868.jpg'
                        alt='slider'
                    />
                </div>
            </Slider>
        </div>
    );
}

export default ImageSilder;