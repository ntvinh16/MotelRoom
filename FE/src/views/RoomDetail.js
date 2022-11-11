import React, { useState, useEffect } from 'react';
import ImageSilder from 'components/RoomListPage/Silder.js';
import RelatedPost from 'components/RoomListPage/RelatedPost';
import Map from 'components/RoomListPage/Map.js';
import RoomService from 'services/test.service';

import { FaSearchLocation, FaMoneyBill, FaChartArea } from 'react-icons/fa';


// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const roomService = new RoomService();
function RoomDetail() {




    return (
        <div style={{ backgroundColor: '#f5f5f5' }}>
            <Container>
                <Row>
                    <Col lg={9}>
                        <Row style={{ backgroundColor: "white" }}>
                            <Row>
                                <Col>
                                    <div style={{ marginTop: "40px" }}>
                                        <ImageSilder />
                                        <div>
                                            <h2 style={{ fontSize: '1.6rem', color: '#E13427', overflow: 'hidden' }}>
                                                Phòng mới 100% full nội thất 25m2 ban công View Landmark 81
                                            </h2>
                                            <div style={{ margin: '10px' }}>
                                                <span><FaSearchLocation color='#1976d2' /> <b>Địa chỉ:</b> 48/13 Đường Lương Thế Vinh, Phường Tân Thới Hòa, Quận Tân Phú, Hồ Chí Minh</span>
                                            </div>
                                            <div style={{ display: 'flex', margin: '10px' }}>
                                                <span style={{ marginRight: '40px' }}><FaMoneyBill style={{ margin: '0 4px 2px 0' }} />
                                                    <b>Giá thuê:</b>
                                                    <span style={{ color: '#16c784', fontSize: '1.1rem', fontWeight: '700', marginLeft: '4px' }}>
                                                        5 triệu/tháng
                                                    </span>
                                                </span>
                                                <span><FaChartArea style={{ margin: '0 4px 2px 0' }} />
                                                    <b>Diện tích:</b>
                                                    <span style={{ color: '#16c784', fontSize: '1.1rem', fontWeight: '700', marginLeft: '4px' }}>
                                                        25 m²
                                                    </span>
                                                </span>
                                            </div>
                                            <div >
                                                <div style={{ marginTop: '40px' }}>
                                                    <h3>Thông tin mô tả</h3>
                                                    <div>
                                                        KHAI TRƯƠNG CHDV siêu thoáng VIEW LANDMARK 81
                                                        Sát trường ĐH Hutech , UEF, VL Cơ sở 3 ,…
                                                        Giá chỉ từ : 5.000.000 VNĐ - 6.500.000 VNĐ ( ban công, cửa sổ )
                                                        Full nội thất : Giường , tủ quần áo, bếp , Máy lạnh , tủ lạnh
                                                        Cho ở 2-3 người
                                                        Điện 3,8k , nước : 100K , Phí dịch vụ 150K ( Hết )
                                                        Free xe chiếc đầu
                                                        Ra vào vân tây , Camera 24/7 , vệ sinh , máy giặt
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: '40px' }}>
                                                    <h3>Thông tin liên hệ</h3>
                                                    <table style={{ width: '100%' }}>
                                                        <tbody style={{ width: '100%' }}>
                                                            <tr style={{ width: '100%' }}>
                                                                <td style={{ padding: '16px' }}>Liên hệ</td>
                                                                <td style={{ padding: '16px' }}>Trung Kiên</td>
                                                            </tr>
                                                            <tr style={{ width: '100%' }}>
                                                                <td style={{ padding: '16px' }}>Điện thoại</td>
                                                                <td style={{ padding: '16px' }}>09999999999</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3>Bản đồ</h3>
                                        <Map />
                                    </div>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                    <Col lg={3}>
                        <RelatedPost />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default RoomDetail;
