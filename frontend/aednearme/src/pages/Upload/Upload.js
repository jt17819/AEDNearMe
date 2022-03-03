import React, { useState, Fragment, useEffect } from 'react'
import axios from 'axios';

import { Button, FormControl, Input, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'

import { Grid, Container, makeStyles } from '@material-ui/core';

import UploadMap from '../../components/UploadMap/UploadMap'

const useStyles = makeStyles(theme => ({
  
    
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
    
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '300px',
        },
        '& .MuiButtonBase-root': {
          margin: theme.spacing(2),
        },
      },
  
}));

const Upload = () => {
   
  const [ latitude, setLatitude ] = useState("");  
  const [ longitude, setLongitude ] = useState("");
  const [ access, setAccess ] = useState("");  
  const [ uploadImage64, setUploadImage64] = useState("");
  const [ comments, setComments ] = useState("");

  const handleSubmit = async () => {
    const get_address = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyATeYFTD2ha1aawscSrtZxJfJ3m89DB_JU`)
    const get_w3w = await axios.get(`https://api.what3words.com/v3/convert-to-3wa?coordinates=${latitude}%2C${longitude}&key=V89M1TE1`)
    console.log(get_w3w.data.words)
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyATeYFTD2ha1aawscSrtZxJfJ3m89DB_JU
    const data = {
        "username": sessionStorage.getItem('username'),
        "address": get_address.data.results[0].formatted_address,
        "post_code": get_address.data.results[0].address_components[get_address.data.results[0].address_components.length-1].long_name,
        "what3words_link": `http://what3words.com/${get_w3w.data.words}`,
        "lat": latitude,
        "long": longitude,
        "access": access,
        "approved": false,
        "photo_url": uploadImage64,
        "comments": comments
    }

    const new_token = await axios.post('https://aednearme-backend.herokuapp.com/users/login/refresh/', {refresh: sessionStorage.getItem('refreshToken')}, {"Content-Type": "application/json"})
    console.log(new_token.data.access)
    sessionStorage.setItem('accessToken', new_token.data.access)

    const options = {
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer "+sessionStorage.getItem('accessToken') 
            }),
    }
    if(!latitude || !longitude || !access || !comments){
        return alert("Please fill in all fields")
    }
    if(sessionStorage.length == 0){
        return alert("Please log in to submit a new AED")
    }
      try{
          console.log(data)
    const result = await axios.post('https://aednearme-backend.herokuapp.com/aed/upload/', data, options)
    console.log(result)
      } catch(err) {
          console.log(err)
      }
    //     // if(result.status == 401){
    //     const new_token = await axios.post('http://localhost:8000/users/login/refresh/', {refresh: sessionStorage.getItem('refreshToken')}, options)
    //     console.log(new_token.data.access)
    //     sessionStorage.setItem('accessToken', new_token.data.access)
    //     return alert("new token issued")
    //     }
    // } else {
    //     console.log(results.status)
    //     return alert("Failed to submit please try again")
    // }
      
      if(result.status == 200){
          return alert("Your location has been submitted to be approved")
      } else {
          console.log(results.status)
          return alert("Failed to submit please try again")
      }
  }  

  const handleLat = (e) => setLatitude(e.target.value);
  const handleLng = (e) => setLongitude(e.target.value);
  const handleAccess = (e) => setAccess(e.target.value);
  const handleComments = (e) => setComments(e.target.value);

const encodeImageFileAsURL = async (e) => {
      const file = e.target.files[0]
      const base64 = await convertBase64(file)
    //   console.log(base64)
      setUploadImage64(base64)
    // var file = e.target[0];
    // var reader = new FileReader();
    // reader.onloadend = function() {
    //   console.log('RESULT', reader.result)
    // }
    // reader.readAsDataURL(file);
  }

  const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
              resolve(fileReader.result)
          }
          fileReader.onerror = (error) => {
              reject(error)
          }
      })
  }

  
  const {render, markers} = UploadMap();
//   console.log(markers)
  useEffect(() => {
    if(markers[0]){
        setLatitude(markers[0].lat)
        setLongitude(markers[0].lng)
    }  
  }, [markers])


    
  const classes = useStyles();


  return (

    <Fragment>
        <Container className="pb-5" 
            spacing={1}
            style={{
            paddingBottom: "100px",
            paddingTop: "20px",
            }}>

            <Grid 
                container spacing={4} 
                spacing={10}>

                <Grid
                    item
                    md={8}
                    xs={12}
                    className=""
                    >
                        {sessionStorage.length !== 0 ? <h1>Welcome {sessionStorage.username}</h1> : <h1>Please log in to submit a new AED</h1>  }{render} 
                </Grid>

                <Grid item md={4} 
                style={{ paddingTop: "14px", paddingBottom: "100px"}}
                    >

                    <h1 className={"display-2 mb-5 font-weight-bold" }>Submit new AED</h1>

                    <Paper 
                        component="form"
                        sx={{ p: '20px', display: 'flex', alignItems: 'center', maxWidth: 400  }}
                        style={{ background: 'rgba(0,0,0,0.3)' }}   
                        >

                        <FormControl className="form" margin='dense' style={{  margin: 'auto' }} >

                        <FormControl>
                            <form className={classes.root}> 
                                <Input onChange={(e) => {encodeImageFileAsURL(e)}} type="file" />

                                <Button variant="raised"
                                >Upload img</Button> 
                            </form>

                        </FormControl>
        
                        <FormControl margin="dense">
                            <TextField
                                label="Latitude"
                                id="latitude"
                                type="number"
                                value={latitude}
                                onChange={handleLat}
                            />
                        </FormControl>

                        <FormControl margin="dense">
                            <TextField
                                    label="Longitude"
                                    id="longitude"
                                    type="number"
                                    value={longitude}
                                    onChange={handleLng}
                                />
                        </FormControl>



                        <FormControl margin="dense">
                            <InputLabel id="access-label">
                                Access?
                            </InputLabel>
                            <Select 
                                id="access"
                                label="Access?"
                                value={access}
                                onChange={handleAccess}>
                                <MenuItem value="public">Public Access</MenuItem>
                                <MenuItem value="limited">Limited Access</MenuItem>
                                <MenuItem value="unknown">Not sure?</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl margin='dense'>
                            <TextField 
                                aria-label='Comments...'
                                label="Comments..."
                                id="Comments"
                                type="text"
                                onChange={handleComments}
                            />
                        </FormControl>

                        
                        <FormControl margin='dense'>
                            <Button variant="contained" 
                            onClick={handleSubmit}
                            >Submit</Button>
                        </FormControl>


                        </FormControl>

                    </Paper>

                    

                    </Grid>
            </Grid>
        </Container>
 
    </Fragment>
  )
}

export default Upload






