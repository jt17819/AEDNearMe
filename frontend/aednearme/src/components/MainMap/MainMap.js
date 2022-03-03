import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow, LoadScript } from "@react-google-maps/api";
import mapStyles from './mapStyles';
import axios from 'axios'
import './MainMap.css'
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  
  button: {
    display: 'flex',
    backgroundColor: 'red',
    color: 'white',
    justifyContent: 'center',
    margin: '10px auto',
    '&:hover': {
      background: "green",
    },
  },

  

}));


const MainMap = () => {
  const baseUrl = "https://aednearme-backend.herokuapp.com"

  const [aedData, setAedData] = useState([])
  const [newLat, setNewLat] = useState();
  const [newLng, setNewLng] = useState();
  const [currentLat, setCurrentLat] = useState();
  const [currentLong, setCurrentLong] = useState();
  const [currentAddress, setCurrentAddress] = useState();

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
      lat: newLat ? newLat : currentLat ? currentLat : 51.49676339763987,
      lng: newLng ? newLng : currentLong ? currentLong : -0.13546533232026148
  };

  const here =  {
    lat: currentLat ? currentLat : 51.49676339763987,
    lng: currentLong ? currentLong : -0.13546533232026148
  }
 const getAddress = async () => {
   const get_address = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${here.lat},${here.lng}&key=AIzaSyATeYFTD2ha1aawscSrtZxJfJ3m89DB_JU`)
   console.log(get_address)
   const current_address = await get_address.data.results[0].formatted_address
  //  const formatted_current_address = current_address.split(',').join('').split(' ').join('+');
   setCurrentAddress(current_address)
  }

  getAddress()
  
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
    console.log(center)
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

// const icon = {
//   url: require("./bluepin.png"), // url
//   scaledSize: new google.maps.Size(50, 50), // scaled size
//   origin: new google.maps.Point(0,0), // origin
//   anchor: new google.maps.Point(0, 0) // anchor
// };
const classes = useStyles();

  return (
    <LoadScript googleMapsApiKey="AIzaSyATeYFTD2ha1aawscSrtZxJfJ3m89DB_JU">
        <GoogleMap 
            mapContainerStyle={containerStyle} 
            zoom={15} 
            center={center} 
            options={options}>
        <Marker
          // position={{ lat : 51.49676339763987 , lng : -0.13546533232026148 }}
          position={here}
          icon={{
            url: require("./bluepinsmall.png"), // url
            // scaledSize: new google.maps.Size(50, 50), // scaled size
            // origin: new google.maps.Point(0,0), // origin
            // anchor: new google.maps.Point(0, 0) // anchor
          }}
        />
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
              <a href={`https://www.google.co.uk/maps/dir/${currentAddress}/${selectedAED.address}`} target='_blank'><Button className={classes.button} variant="contained">GET DIRECTIONS</Button></a>
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