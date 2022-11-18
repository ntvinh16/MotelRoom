import React, { useEffect, useState } from 'react'
import RoomService from 'services/test.service';

import { Link } from "react-router-dom";



const roomService = new RoomService();
const RelatedPost = (props) => {
    // console.log(props)



    return (
        <div className='new-post' style={{ width: "100%", backgroundColor: "white", padding: "10px" }} >
            <div>
                <h3 style={{ margin: "20px 0 10px 0" }}>Tin mới đăng</h3>
                {
                    props.roomNew ? props.roomNew.map((item, index) => {
                        console.log(item)
                            return <Link style={{ textDecoration: "none" }} to={`/roomdetail/${item._id}`}>
                            <div key={index} style={{ display: 'flex', margin: "20px 0 10px 0" }} onClick={() => props.changeParam(item._id)}>
                                <img style={{ width: '70px', height: '70px', position: 'relative', marginLeft: '14px' }} src={item.image} />
                                <div style={{ width: "190px", marginLeft: "10px" }}>
                                    <h2 className='text' style={{ fontSize: '1rem', color: '#E13427' }}>{item.nameRoom}</h2>
                                    <span style={{ display: 'flex', fontSize: '1rem', marginRight: '40px', color: '#16c784' }}>{Math.round(item.price)} đồng/tháng</span>
                                </div>
                            </div>
                        </Link>
                    }) : <div></div>
                }

            </div>
        </div>
    )
}

export default RelatedPost