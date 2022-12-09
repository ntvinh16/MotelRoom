import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import { useParams } from "react-router-dom";
import RoomService from "../services/test.service"

const roomService = new RoomService();

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap() {
  const { latitude, longitude } = useParams();
  const [points, setPoints] = useState([]);
  const [locationDefault, setLocationDefault] = useState({
    center: {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude)
    },
    zoom: 11
  });

  const getRoomByLocation = async () => {
    try{
      const result = await roomService.getRoomByLocation(parseFloat(latitude), parseFloat(longitude));
      console.log(result.data)
      setPoints(result.data.data)
    }catch(err) {
      console.log(err)
    }
  } 

useEffect(()=> {
  getRoomByLocation();
}, [])

  if (parseFloat(latitude) === 0) {
    return <div></div>
  }
  else
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '500px', width: '100%', position: "relative" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={{
            lat: parseFloat(latitude),
            lng: parseFloat(longitude)
          }}
          defaultZoom={11}
        >
          <AnyReactComponent
            lat={ parseFloat(latitude)}
            lng={parseFloat(longitude)}

            text={<svg xmlns="http://www.w3.org/2000/svg" width="40" color="red" height="40" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>}
          />
          {
            points.length !== 0 ? points.map((item, index) => {
              return <AnyReactComponent
              lat={item.latitude}
              lng={item.longitude}
  
              text={<svg xmlns="http://www.w3.org/2000/svg" width="30" color="green" height="30" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>}
            />
            }) : <div></div>
          }
        </GoogleMapReact>
      </div>
    );
}