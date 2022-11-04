import React from 'react';
import RoomService from 'services/test.service';


const roomService = new RoomService();
const SortByPrice = (props) => {

    const SortByPrice = async (minPrice, maxPrice) => {
        try {
            const result = await roomService.getRoomByPrice(parseInt(minPrice) * 1000000, parseInt(maxPrice) * 1000000);
            props.setRoomHome(result.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='list-price' style={{ height: 'auto', backgroundColor: 'white', borderRadius: '10px', border: '1px solid #dedede', padding:'16px' }}>
            <div className='list-price-title' style={{paddingTop: '5px'}}>
                <h5>Xem theo giá</h5>
            </div>
            <div className='list-price-value' style={{padding: '5px'}}>
                <ul className='list-price-value-ul' style={{ paddingLeft: '0', columnCount: '2' }}>
                    <div style={{ display: 'flex' }}>
                        <i style={{ paddingTop: '3px', marginRight: '10px' }} className='pi pi-angle-right'></i>
                        <li className='list-price-value-li' style={{ listStyle: 'none' }} onClick={() => SortByPrice(0,1)}>Dưới 1 triệu</li>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <i style={{ paddingTop: '3px', marginRight: '10px' }} className='pi pi-angle-right'></i>
                        <li className='list-price-value-li' style={{ listStyle: 'none' }}  onClick={() => SortByPrice(1,2)}>Từ 1 - 2 triệu</li>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <i style={{ paddingTop: '3px', marginRight: '10px' }} className='pi pi-angle-right'></i>
                        <li className='list-price-value-li' style={{ listStyle: 'none' }} onClick={() => SortByPrice(2,3)}>Từ 2 - 3 triệu</li>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <i style={{ paddingTop: '3px', marginRight: '10px' }} className='pi pi-angle-right'></i>
                        <li className='list-price-value-li' style={{ listStyle: 'none' }} onClick={() => SortByPrice(3,5)}>Từ 3 - 5 triệu</li>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <i style={{ paddingTop: '3px', marginRight: '10px' }} className='pi pi-angle-right'></i>
                        <li className='list-price-value-li' style={{ listStyle: 'none' }} onClick={() => SortByPrice(5,7)}>Từ 5 - 7 triệu</li>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <i style={{ paddingTop: '3px', marginRight: '10px' }} className='pi pi-angle-right'></i>
                        <li className='list-price-value-li' style={{ listStyle: 'none' }} onClick={() => SortByPrice(7,10)}>Từ 7 - 10 triệu</li>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <i style={{ paddingTop: '3px', marginRight: '10px' }} className='pi pi-angle-right'></i>
                        <li className='list-price-value-li' style={{ listStyle: 'none' }} onClick={() => SortByPrice(10,15)}>Từ 10 - 15 triệu</li>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <i style={{ paddingTop: '3px', marginRight: '10px' }} className='pi pi-angle-right'></i>
                        <li className='list-price-value-li' style={{ listStyle: 'none' }} onClick={() => SortByPrice(15,50)}>trên 15 triệu</li>
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default SortByPrice;