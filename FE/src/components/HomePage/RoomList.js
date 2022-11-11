import React from 'react';
import { Card } from 'primereact/card';
import RoomService from 'services/test.service';
import { useState, useEffect } from 'react';





const roomService = new RoomService();
const RoomList = (props) => {

    const [room, setRoom] = useState([]);
    const roomImage = async () => {
        try {
            const result = await roomService.getAllImageByIdRoom(props.room._id);
            setRoom({ ...props.room, image: result.data.data[0].nameImage });
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        roomImage();
    }, [props]);
    return (
        <div className='list-room' style={{ height: 'auto', width: '100%' }}>
            <Card style={{ display: 'flex', justifyContent: 'space-between', width: '100%', boxShadow: 'none', borderBottom: '1px solid black' }}>
                <div className='cart-info'>
                    <h2 className='text text-title' style={{ fontSize: '1rem', color: '#E13427', overflow: 'hidden' }}>{room.nameRoom}</h2>
                    <div className='cart-info-detail' style={{ display: 'flex', margin: '10px 0', fontWeight: '600' }}>
                        <span style={{ color: 'black', marginRight: '40px' }}>{room.address}</span>
                        <div className='cart-info-detail-price'>
                            <span style={{ display: 'flex', marginRight: '40px', color: '#16c784' }}>{room.price} đồng/th</span>
                        </div>
                        <span style={{ display: 'flex', marginRight: '50px', color: 'black' }}>{room.area}m²</span>
                    </div>
                    <span className='text' style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '0.9rem', color: '#8a8d91' }}>
                        {props.room.description}
                    </span>

                </div>
                <div>
                    <img className='image-room' style={{ width: '170px', height: '160px', position: 'relative', marginLeft: '14px' }} src={room.image} />
                </div>
            </Card>

        </div>
    );
}

export default RoomList;