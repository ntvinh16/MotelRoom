import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import RoomService from 'services/test.service';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Slider } from 'primereact/slider';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';


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
    const navigate = useNavigate()
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDists, setSelectedDists] = useState('');
    const [selectedWards, setSelectedWards] = useState('');
    const [isSreach, setIsSearch] = useState(false);

    const [currentPosition, setCurrenPosition] = useState(null);
    const [cities, setCities] = useState(null);
    const [dists, setDists] = useState(null);
    const [wards, setWards] = useState(null);
    const [price, setPrice] = useState([0, 50]);
    const [area, setArea] = useState([0, 100]);
    const [idCity, setIdCity] = useState(null);

    const [currentPage, setCurrentPage] = useState(1)



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

    const [page, setPage] = useState(1); 
    const [maxPage, setMaxPage] = useState(0); 

    const [room, setRoom] = useState([]);

    const getRoom = async (page) => {
        try {
            const result = await roomService.getAllRoom(page);
            // setMaxPage(result.data.data.maxPage)
            console.log(result.data)
            setRoom(result.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getPageHome = async () => {
        try {
            const result = await roomService.getPageHome();
            setMaxPage(result.data.data)

        } catch (error) {
            console.log(error);
        }
    }

    const getRoomByAreaAndPrice = async () => {
        try {
            setIsSearch(true);
            const result = await roomService.getRoomByAreaAndPrice(area[0], area[1], price[0] * 1000000, price[1] * 1000000);
            setRoom(result.data.data);
            setCurrentPage(1)
            setMaxPage(parseInt(Math.ceil(result.data.data.length)/10)+1);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCity();
        getRoom(page);
        getPageHome();
    }, []);






    // Handle envent

    const onSearch = async (e) => {
        try {
            setIsSearch(true);
            setIdCity(null)
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
            setMaxPage(parseInt(Math.ceil(result.data.data.length)/10)+1);
            setCurrentPage(1)

        } catch (e) {
            console.log(e)
        }

    }

    const onSearchByGeolocation = async(e) => {
        try{
            navigator.geolocation.getCurrentPosition((position) => {
                // console.log(position.coords.latitude, position.coords.longitude);
                navigate(`/map/${position.coords.latitude}/${position.coords.longitude}`)
            })
        }catch(e) {
            console.log(e)
        }
    }

    const onClickCity = async (e) => {
        try {
            setRoom([])
            setIsSearch(false);
            setIdCity(e)
            console.log(e)
            const result = await roomService.getAllRoomByIdCities(e, 1); 
            console.log(result.data)
            setRoom(result.data.data);
            setCurrentPage(1)
            setMaxPage(result.data.data2);

        } catch(e) {
            console.log(e)
        }
    }
    const onChangePageCity = async ( currentPage) => {
        try {
            setIsSearch(false);
            const result = await roomService.getAllRoomByIdCities(idCity, currentPage); 
            console.log(result.data)
            // console.log(result.data.data);
            setRoom(result.data.data);
            // setCurrentPage(1)
            // setCurrentPage(Number(e.target.innerText));

            setMaxPage(result.data.data2);

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

    const handleClickPage = (e) => {
        if(isSreach === false && idCity===null) {
            setPage(e.target.innerText);
            getRoom(e.target.innerText);
            // window.scrollTo(0, 0);
            setCurrentPage(Number(e.target.innerText));
        }else if(idCity!=null && isSreach === false) {
            onChangePageCity(Number(e.target.innerText))
            setCurrentPage(Number(e.target.innerText));
        }
        else {
            setCurrentPage(Number(e.target.innerText));
            console.log(Number(e.target.innerText))
        }
    }

    const renderRoom = () =>{
        if(isSreach === false) {
            return room;
        }
        if(room.length == 0) {
            return room;
        }
        const arr = []
        if(currentPage < maxPage) {
            for(let i = (currentPage-1)*10; i < currentPage*10; i++) {
                arr.push(room[i])
            }
        }
        else {
            console.log(room);
            for(let i = (currentPage-1)*10; i < room.length; i++) {
                arr.push(room[i])
            }
            
        }
        return arr;
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
                            <Dropdown className='slect-area' style={{ color: '#333', marginRight: "5px", minWidth: '260px' }} value={selectedCity} options={cities} onChange={onCityChange} optionLabel="namCities" optionValue='_id' placeholder="Th??nh ph???" />
                            <Dropdown className='slect-area' style={{ color: '#333', marginRight: "5px", minWidth: '260px' }} value={selectedDists} options={dists} onChange={onDistChange} optionLabel="nameDist" optionValue='_id' placeholder="Qu???n, huy???n" />
                            <Dropdown className='slect-area' style={{ color: '#333', marginRight: "5px", minWidth: '260px' }} value={selectedWards} options={wards} onChange={onWardChange} optionLabel="nameWard" optionValue='_id' placeholder="Ph?????ng, x??" />
                            <Button style={{ minWidth: '260px'}} label="T??m ki???m" icon="pi pi-search" iconPos="right" onClick={onSearch} />
                            <Button style={{ minWidth: '260px', marginTop: '6px', backgroundColor: "#fbc02dc", border: "none" }} label="T??m xung quanh" icon="pi pi-search" iconPos="right" onClick={onSearchByGeolocation} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ marginTop: '20px' }}>
                            <h2 style={{ marginBottom: '10px' }}>K??nh th??ng tin Ph??ng Tr??? s??? 1 Vi???t Nam</h2>
                            <p style={{ fontSize: '1.1rem', color: 'rgb(138, 141, 145)' }}>
                                K??nh th??ng tin Ph??ng Tr??? s??? 1 Vi???t Nam - Website ????ng tin cho thu?? ph??ng tr???, nh?? nguy??n c??n, c??n h???, ??? gh??p nhanh, hi???u qu??? v???i 100.000+ tin ????ng v?? 2.500.000 l?????t xem m???i th??ng.
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='search-info' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <div style={{ backgroundColor: '#fff', padding: '20px', marginTop: '60px', borderRadius: '4px', textAlign: 'center', minWidth: '300px' }}>
                                <div className="slider-demo">
                                    <h3 style={{ fontSize: '1.4rem' }}>Xem theo gi??</h3>
                                    <div >
                                        <h5 style={{ marginBottom: '10px', fontSize: '1.1rem' }}>Gi??: [{price[0]}, {price[1]}] (tri???u)</h5>
                                        <Slider min={0} max={50} value={price} onChange={(e) => setPrice(e.value)} onSlideEnd={getRoomByAreaAndPrice} range />
                                    </div>
                                </div>
                            </div>
                            <div style={{ backgroundColor: '#fff', padding: '20px', marginTop: '60px', borderRadius: '4px', textAlign: 'center', minWidth: '300px' }}>
                                <div className="slider-demo">
                                    <h3 style={{ fontSize: '1.4rem' }}>Xem theo di???n t??ch</h3>
                                    <div >
                                        <h5 style={{ marginBottom: '10px', fontSize: '1.1rem' }}>Di???n t??ch: [{area[0]}, {area[1]}] (m2)</h5>
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
                            <Card className='card-city-detail' title="H??? Ch?? Minh" style={{ width: '24em', borderRadius: '12px', cursor: 'pointer', marginRight: '20px' }} header={headerHCM}></Card>
                            </div>
                            <div onClick={() => {onClickCity('63437e9d2399ccdd43ff48b0')}}>
                            <Card className='card-city-detail' title="H?? N???i" style={{ width: '24em', borderRadius: '12px', cursor: 'pointer', marginRight: '20px' }} header={headerHN}></Card>
                            </div>
                            <div  onClick={() => {onClickCity('63437ed12399ccdd43ff48ba')}}>
                            <Card className='card-city-detail' title="C???n Th??" style={{ width: '24em', borderRadius: '12px', cursor: 'pointer' }} header={headerCT}></Card>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col lg={9}>
                        <div style={{ width: '100%', borderRadius: '10px', backgroundColor: 'white', padding: '10px' }}>
                            <div className='RoomTitle'>
                                <h2>Danh S??ch Tin ????ng</h2>
                            </div>
                            {room.length !== 0 ? renderRoom().map((item, index) => <RoomList key={index} room={item[0]} />) : <div></div>}
                        <Pagination onClick={handleClickPage}  style={{marginTop: '10px', textAlign: 'center'}} page={currentPage} count={maxPage} color="primary" />
                        </div>
                    </Col>
                    <Col className='search-info-detail' lg={3}>
                        <Row>
                            <SortByPrice setRoomHome={(doc) => setRoom(doc)} setIsSearch={setIsSearch} setMaxPage={setMaxPage} setCurrentPage={setCurrentPage}/>
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
