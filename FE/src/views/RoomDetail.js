import React, { useState, useEffect } from 'react';
import ImageSilder from 'components/RoomListPage/Silder.js';
import RelatedPost from 'components/RoomListPage/RelatedPost';
import Map from 'components/RoomListPage/Map.js';
import RoomService from 'services/test.service';
import { useParams } from 'react-router-dom'

import { FaSearchLocation, FaMoneyBill, FaChartArea } from 'react-icons/fa';


// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const roomService = new RoomService();
function RoomDetail() {

    const {id} = useParams();

    const [idParam, setIdParam] = useState(id)
    const [room, setRoom] = useState([]);
    const [images, setImage] = useState([]);
    const [location, setLocation] = useState({latitude: 0, longitude: 1});
    const [roomNew, setRoomNew] = useState([]);


    const roomImage = async () => {
        try {
            const result = await roomService.getAllImageByIdRoom(idParam);
            setImage(result.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const roomDetail = async () => {
        try {
            const result = await roomService.getRoomById(idParam);
            setRoom(result.data.data[0]);
            console.log(room)
        } catch (error) {
            console.log(error);
        }
    }

    const roomLocation = async () => {
        try {
            const result = await roomService.getLocationByIdRoom(idParam);
            setLocation(result.data.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const roomNews = async () => {
        try {
            const result = await roomService.getRoomPageOne();
            setRoomNew(result.data.data)
        }
        catch(error) {
            console.log(error)
        }
    } 

    useEffect(() => {
        roomDetail();
        roomImage();
        roomLocation();
        window.scrollTo(0, 0);
    },[idParam]);
    
    useEffect(() => {
        roomNews();
    }, []);

    return (
        <div style={{ backgroundColor: '#f5f5f5' }}>
            <Container>
                <Row>
                    <Col lg={9}>
                        <Row style={{ backgroundColor: "white" }}>
                            <Row>
                                <Col>
                                    <div style={{ marginTop: "40px" }}>
                                        <ImageSilder images={images}/>
                                        <div>
                                            <h2 style={{ fontSize: '1.6rem', color: '#E13427', overflow: 'hidden' }}>
                                                {room.nameRoom}
                                            </h2>
                                            <div style={{ margin: '10px' }}>
                                                <span><FaSearchLocation color='#1976d2' /> <b>Địa chỉ:</b> {room.address}</span>
                                            </div>
                                            <div style={{ display: 'flex', margin: '10px' }}>
                                                <span style={{ marginRight: '40px' }}><FaMoneyBill style={{ margin: '0 4px 2px 0' }} />
                                                    <b>Giá thuê:</b>
                                                    <span style={{ color: '#16c784', fontSize: '1.1rem', fontWeight: '700', marginLeft: '4px' }}>
                                                        {room.price} triệu/tháng
                                                    </span>
                                                </span>
                                                <span><FaChartArea style={{ margin: '0 4px 2px 0' }} />
                                                    <b>Diện tích:</b>
                                                    <span style={{ color: '#16c784', fontSize: '1.1rem', fontWeight: '700', marginLeft: '4px' }}>
                                                    {room.area} m²
                                                    </span>
                                                </span>
                                            </div>
                                            <div >
                                                <div style={{ marginTop: '40px' }}>
                                                    <h3>Thông tin mô tả</h3>
                                                    <div>
                                                        {room.description}
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: '40px' }}>
                                                    <h3>Thông tin liên hệ</h3>
                                                    <table style={{ width: '100%' }}>
                                                        <tbody style={{ width: '100%' }}>
                                                            <tr style={{ width: '100%' }}>
                                                                <td style={{ padding: '16px' }}>Liên hệ</td>
                                                                <td style={{ padding: '16px' }}>{room.nameContact}</td>
                                                            </tr>
                                                            <tr style={{ width: '100%' }}>
                                                                <td style={{ padding: '16px' }}>Điện thoại</td>
                                                                <td style={{ padding: '16px' }}>{room.phone}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3>Bản đồ</h3>
                                        <Map location={location}/>
                                    </div>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                    <Col lg={3}>
                        <RelatedPost roomNew={roomNew} changeParam={(param) => setIdParam(param)}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default RoomDetail;
