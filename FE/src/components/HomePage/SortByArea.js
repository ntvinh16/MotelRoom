import React from 'react';
import RoomService from 'services/test.service';




const roomService = new RoomService();
const SortByArea = (props) => {

    const SortByArea = async (minPrice, maxPrice) => {
        try {
            const result = await roomService.getRoomByArea(parseInt(minPrice), parseInt(maxPrice));
            props.setRoomHome(result.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='list-area' style={{ height: 'auto', backgroundColor: 'white', borderRadius: '10px', border: '1px solid #dedede', padding:'16px' }}>
            <div className='list-area-title' style={{paddingTop: '5px'}}>
                <h5>Xem theo diện tích</h5>
            </div>
            <div className='list-area-value' style={{padding: '5px'}}>
                <ul className='list-area-value-ul' style={{ paddingLeft: '0', columnCount: '2' }}>
                    <div style={{ display: 'flex' }}>
                        <i style={{ paddingTop: '3px', marginRight: '10px' }} className='pi pi-angle-right'></i>
                        <li className='list-area-value-li' style={{ listStyle: 'none' }} onClick={() => SortByArea(0,20)}>Dưới 20 m<sup>2</sup></li>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <i style={{ paddingTop: '3px', marginRight: '10px' }} className='pi pi-angle-right'></i>
                        <li className='list-area-value-li' style={{ listStyle: 'none' }} onClick={() => SortByArea(20,30)}>Từ 20 - 30 m<sup>2</sup></li>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <i style={{ paddingTop: '3px', marginRight: '10px' }} className='pi pi-angle-right'></i>
                        <li className='list-area-value-li' style={{ listStyle: 'none' }} onClick={() => SortByArea(30,50)}>Từ 30 - 50 m<sup>2</sup></li>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <i style={{ paddingTop: '3px', marginRight: '10px' }} className='pi pi-angle-right'></i>
                        <li className='list-area-value-li' style={{ listStyle: 'none' }} onClick={() => SortByArea(50,70)}>Từ 50 - 70 m<sup>2</sup></li>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <i style={{ paddingTop: '3px', marginRight: '10px' }} className='pi pi-angle-right'></i>
                        <li className='list-area-value-li' style={{ listStyle: 'none' }} onClick={() => SortByArea(70,90)}>Từ 70 - 90 m<sup>2</sup></li>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <i style={{ paddingTop: '3px', marginRight: '10px' }} className='pi pi-angle-right'></i>
                        <li className='list-area-value-li' style={{ listStyle: 'none' }} onClick={() => SortByArea(90,100)}>Trên 90 m<sup>2</sup></li>
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default SortByArea;