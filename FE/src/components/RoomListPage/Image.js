import React, { useState, useEffect } from 'react';
import Slider from "react-slick";


const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const ImageSilder = ({ props }) => {

    // const [images, setImages] = useState(null)


    // const getImageRoomById = async (idRoom) => {
    //     try {
    //         const result = await roomService.getAllImageByIdRoom(idRoom);
    //         setImages(result.data.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    return (
        <div>
            <Slider {...settings}>
                <span>Slider</span>
                <span>Slider</span>
                <span>Slider</span>
            </Slider>
        </div>
    );
}

export default ImageSilder;