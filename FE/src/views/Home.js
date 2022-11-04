import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import RoomService from 'services/test.service';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Slider } from 'primereact/slider';



// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// component
import RoomList from 'components/HomePage/RoomList'
import SortByPrice from 'components/HomePage/SortByPrice';
import SortByArea from 'components/HomePage/SortByArea';


import '../assets/styles/App.scss';
import Image_CT from 'assets/images/location_ct.jpg';
import Image_HCM from 'assets/images/location_hcm.jpg';
import Image_HN from 'assets/images/location_hn.jpg';



const roomService = new RoomService();
const Home = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDists, setSelectedDists] = useState('');
    const [selectedWards, setSelectedWards] = useState('');

    const [cities, setCities] = useState(null);
    const [dists, setDists] = useState(null);
    const [wards, setWards] = useState(null);
    const [price, setPrice] = useState([0, 50]);
    const [area, setArea] = useState([0, 100]);




    const getCity = async () => {
        try {
            const result = await roomService.getAllCities();
            setCities(result.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getDist = async (idCity) => {
        try {
            const result = await roomService.getAllDistByIdCity(idCity);
            setDists(result.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getWard = async (idDist) => {
        try {
            const result = await roomService.getAllWardByIdDist(idDist);
            setWards(result.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const [room, setRoom] = useState(null);

    const getRoom = async () => {
        try {
            const result = await roomService.getAllRoom();
            setRoom(result.data.data);
        } catch (error) {
            console.log(error);
        }
    }


    const getRoomByAreaAndPrice = async () => {
        try {
            const result = await roomService.getRoomByAreaAndPrice(area[0], area[1], price[0] * 1000000, price[1] * 1000000);
            setRoom(result.data.data);
        } catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {
        getCity();
        getRoom();
        getRoomByAreaAndPrice();
    }, []);






    // Handle envent

    const onSearch = async (e) => {
        try {
            let idCity = selectedCity
            let dist = ''
            let ward = ''
            if (selectedDists !== '') {
                dist = dists.filter(ele => {
                    return ele._id === selectedDists;
                })
                dist = dist[0].nameDist;
            }
            if (selectedWards !== '') {
                ward = wards.filter(ele => {
                    return ele._id === selectedWards;
                })
                ward = ward[0].nameWard;
            }
            const result = await roomService.getRoomBySearch(idCity, dist, ward);
            setRoom(result.data.data);
            

        } catch (e) {
            console.log(e)
        }

    }

    const onClickCity = async (e) => {
        try {
            const result = await roomService.getAllRoomByIdCities(e); 
            // console.log(result.data);
            setRoom(result.data.data);
        } catch(e) {
            console.log(e)
        }
    }

    const onCityChange = (e) => {
        setSelectedCity(e.value);
        getDist(e.value);
        setWards('');
    }

    const onDistChange = (e) => {
        setSelectedDists(e.value);
        getWard(e.value);
    }

    const onWardChange = (e) => {
        setSelectedWards(e.value);

    }



    // Layout

    const headerCT = (
        <div style={{ backgroundImage: `url(${Image_CT})`, backgroundPosition: 'center', backgroundSize: 'cover', width: '100%', height: '200px' }}></div>
    );
    const headerHCM = (
        <div style={{ backgroundImage: `url(${Image_HCM})`, backgroundPosition: 'center', backgroundSize: 'cover', width: '100%', height: '200px' }}></div>
    );
    const headerHN = (
        <div style={{ backgroundImage: `url(${Image_HN})`, backgroundPosition: 'center', backgroundSize: 'cover', width: '100%', height: '200px' }}></div>
    );


    return (
        <div style={{ backgroundColor: '#f5f5f5' }}>
            <Container>
                <Row>
                    <Col>
                        <div border="light" style={{ textAlign: 'center', marginTop: '10px' }}>
                            <Dropdown className='slect-area' style={{ color: '#333', marginRight: "5px", minWidth: '260px' }} value={selectedCity} options={cities} onChange={onCityChange} optionLabel="namCities" optionValue='_id' placeholder="Select a City" />
                            <Dropdown className='slect-area' style={{ color: '#333', marginRight: "5px", minWidth: '260px' }} value={selectedDists} options={dists} onChange={onDistChange} optionLabel="nameDist" optionValue='_id' placeholder="Select a Dist" />
                            <Dropdown className='slect-area' style={{ color: '#333', marginRight: "5px", minWidth: '260px' }} value={selectedWards} options={wards} onChange={onWardChange} optionLabel="nameWard" optionValue='_id' placeholder="Select a Ward" />
                            <Button style={{ minWidth: '260px' }} label="Search" icon="pi pi-search" iconPos="right" onClick={onSearch} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ marginTop: '20px' }}>
                            <h2 style={{ marginBottom: '10px' }}>Kênh thông tin Phòng Trọ số 1 Việt Nam</h2>
                            <p style={{ fontSize: '1.1rem', color: 'rgb(138, 141, 145)' }}>
                                Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='search-info' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <div style={{ backgroundColor: '#fff', padding: '20px', marginTop: '60px', borderRadius: '4px', textAlign: 'center', minWidth: '300px' }}>
                                <div className="slider-demo">
                                    <h3 style={{ fontSize: '1.4rem' }}>Xem theo giá</h3>
                                    <div >
                                        <h5 style={{ marginBottom: '10px', fontSize: '1.1rem' }}>Giá: [{price[0]}, {price[1]}] (triệu)</h5>
                                        <Slider min={0} max={50} value={price} onChange={(e) => setPrice(e.value)} onSlideEnd={getRoomByAreaAndPrice} range />
                                    </div>
                                </div>
                            </div>
                            <div style={{ backgroundColor: '#fff', padding: '20px', marginTop: '60px', borderRadius: '4px', textAlign: 'center', minWidth: '300px' }}>
                                <div className="slider-demo">
                                    <h3 style={{ fontSize: '1.4rem' }}>Xem theo diện tích</h3>
                                    <div >
                                        <h5 style={{ marginBottom: '10px', fontSize: '1.1rem' }}>Diện tích: [{area[0]}, {area[1]}] (m2)</h5>
                                        <Slider min={0} max={100} value={area} onChange={(e) => setArea(e.value)} onSlideEnd={getRoomByAreaAndPrice} range />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='card-city' style={{ display: 'flex', width: "100%", justifyContent: 'space-between', marginTop: '40px' }}>
                            <div onClick={() => {onClickCity('63437e882399ccdd43ff48ae')}}>
                            <Card className='card-city-detail' title="Hồ Chí Minh" style={{ width: '24em', borderRadius: '12px', cursor: 'pointer', marginRight: '20px' }} header={headerHCM}></Card>
                            </div>
                            <div onClick={() => {onClickCity('63437e9d2399ccdd43ff48b0')}}>
                            <Card className='card-city-detail' title="Hà Nội" style={{ width: '24em', borderRadius: '12px', cursor: 'pointer', marginRight: '20px' }} header={headerHN}></Card>
                            </div>
                            <div  onClick={() => {onClickCity('63437ed12399ccdd43ff48ba')}}>
                            <Card className='card-city-detail' title="Cần Thơ" style={{ width: '24em', borderRadius: '12px', cursor: 'pointer' }} header={headerCT}></Card>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col lg={9}>
                        <div style={{ width: '100%', borderRadius: '10px', backgroundColor: 'white', padding: '10px' }}>
                            <div className='RoomTitle'>
                                <h2>Danh Sách Tin Đăng</h2>
                            </div>
                            {room !== null ? room.map((item, index) => <RoomList key={index} room={item[0]} />) : <div></div>}
                        </div>
                    </Col>
                    <Col className='search-info-detail' lg={3}>
                        <Row>
                            <SortByPrice setRoomHome={(doc) => setRoom(doc)}/>
                        </Row>
                        <Row style={{ marginBottom: "20px" }}>

                        </Row>
                        <Row>
                            <SortByArea setRoomHome={(doc) => setRoom(doc)}/>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


export default Home;
