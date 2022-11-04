import React, { useState, useEffect } from 'react';
import ImageSilder from 'components/RoomListPage/Image.js';
import RoomService from 'services/test.service';


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
                        <Row>
                            <Row>
                                <Col>
                                    <div style={{ width: '100%', height: '100%', backgroundColor: 'red' }}>
                                        <ImageSilder />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    CONTACT
                                </Col>
                            </Row>
                        </Row>
                        <Row>
                            <Col>
                                MAP
                            </Col>
                        </Row>
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default RoomDetail;
