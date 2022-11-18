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
const ImageSilder = (props) => {
   
    return (
        <div style={{ width: "100%" }}>
            <Slider {...settings}>
                {
                    props.images.length !== 0 ? props.images.map((item, index) => {
                        return <div key={index} className='silder'>
                            <img className='silder-images'
                                src={item.nameImage}
                                alt='slider'
                            />
                        </div>
                    }): <div></div>
                }

            </Slider>
        </div>
    );
}

export default ImageSilder;