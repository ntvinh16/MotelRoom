import Map from 'components/RoomListPage/Map.js';
import React, {userEffect} from 'react';




function MapPage() {

    userEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
        });
    })

    return (
        <Map>      </Map>        
    );
}

export default Map;
