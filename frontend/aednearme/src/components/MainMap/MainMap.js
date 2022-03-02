import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow, LoadScript } from "@react-google-maps/api";
import mapStyles from './mapStyles';
import axios from 'axios'
import './MainMap.css'


const MainMap = () => {
  const baseUrl = "http://127.0.0.1:8000"

  const [aedData, setAedData] = useState([])
  const [newLat, setNewLat] = useState();
  const [newLng, setNewLng] = useState();
  const [currentLat, setCurrentLat] = useState();
  const [currentLong, setCurrentLong] = useState();

  useEffect(() => {
    try{
      axios.get(baseUrl + '/aed/')
      .then((res) => {
        setAedData(res.data.data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])
  
  const containerStyle = {
    width: '100%',
    height: '70vh',
};

  // Hard coded center at Futureproof
  const center = {
      lat: newLat ? newLat : currentLat,
      lng: newLng ? newLng : currentLong
  };

  const options = {
    styles: mapStyles,
    zoomControl: true
  };


if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(position => {
    const currentLat = position.coords.latitude;
    setCurrentLat(currentLat)
    const currentLong = position.coords.longitude;
    setCurrentLong(currentLong)
  })
} else {
  console.log('geolocation not available')
}

const position = aedData.map((aed, index) => {
    return {
      lat: parseFloat(aed.lat),
      long: parseFloat(aed.long),
      photo_url: aed.photo_url,
      address: aed.address,
      postCode: aed.post_code,
      what3words: aed.what3words_link
    }
})
  
// const aedInfo = (lat, long, key) => {
//     console.log(lat, long);
//     return <InfoWindow
//       key={key}
//       position={{lat: lat, lng: long}}>
//       <h2>Hello</h2>
//     </InfoWindow>
// }

const [selectedAED, setSelectedAED] = useState(null);

  return (
    <LoadScript googleMapsApiKey="AIzaSyATeYFTD2ha1aawscSrtZxJfJ3m89DB_JU">
        <GoogleMap 
            mapContainerStyle={containerStyle} 
            zoom={15} 
            center={center} 
            options={options}>
          {position.map((aed) => {
            return <Marker 
              key={aed.id}
              position={{lat: aed.lat, lng: aed.long}}
              onClick={() => {
                setSelectedAED(aed);
              }}/>
          })}
       
        {selectedAED && (
          <InfoWindow
            position={{lat: selectedAED.lat, lng: selectedAED.long}}
            onCloseClick={() => {
              setSelectedAED(null)
              setNewLat(selectedAED.lat)
              setNewLng(selectedAED.long)
            }}>
            <div id="info-window">
            <img id="info-image" width={"200px"} src={selectedAED.photo_url}/>
              <ul>
                <li>Address: {selectedAED.address}</li>
                <li>Latitude: {selectedAED.lat}</li>
                <li>Longitude: {selectedAED.long}</li>
                <li>What 3 words: <a href={`${selectedAED.what3words}`} target="_blank">Here</a></li>
              </ul>
            </div>
          </InfoWindow>
        )}
        
        </GoogleMap>

        
    </LoadScript>
  )
}

export default MainMap