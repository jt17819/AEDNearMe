import React, { useState, Fragment, useEffect } from 'react'
import axios from 'axios';
import { Button, FormControl, Input, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import { Grid, Container, makeStyles } from '@material-ui/core';
import UploadMap from '../../components/UploadMap/UploadMap'

const useStyles = makeStyles(() => ({
  
    btn_box:{
      marginTop: "30px",
      display: 'flex',
    },
  
    primary: {
      border: "none",
      background: "#000",
      color: '#fff',
      borderRadius: "0px",
      padding: "10px 20px",
      "&:hover": {
        background: "#34495E",
      }
    },
  
}));

const Upload = () => {
   
  const [ latitude, setLatitude ] = useState("");  
  const [ longitude, setLongitude ] = useState("");
  const [ access, setAccess ] = useState("");  
  const [ uploadImage64, setUploadImage64] = useState("");
  const [ comments, setComments ] = useState("");

  const handleSubmit = async () => {
      const data = {
          "username": "trevor",
          "address": "11-19 Artillery Row",
          "post_code": "SW7059G",
          "what3words_link": "http://what3words.com/fruity.song.plant",
          "lat": latitude,
          "long": longitude,
          "access": access,
          "approved": false,
          "photo_url": uploadImage64,
          "comments": comments
      }
      const options = {
          headers: new Headers({
              "Content-Type": "application/json",
            //   Authorization: "Bearer "+token 
            }),
          
      }
      const result = await axios.post('http://localhost:8000/aed/upload/', data, options)
      console.log(result)
  }  

  const handleLat = (e) => setLatitude(e.target.value);
  const handleLng = (e) => setLongitude(e.target.value);
  const handleAccess = (e) => setAccess(e.target.value);
  const handleComments = (e) => setComments(e.target.value);

const encodeImageFileAsURL = async (e) => {
      const file = e.target.files[0]
      const base64 = await convertBase64(file)
      console.log(base64)
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
  console.log(markers)
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

            <Grid container spacing={4} spacing={10}>

                <Grid
                    item
                    md={8}
                    xs={12}
                    className=""
                    >
                      {render}
                </Grid>

                <Grid item md={4} 
                style={{ paddingTop: "14px", paddingBottom: "100px"}}
                    >

                    <h1 className={"display-2 mb-5 font-weight-bold" }>Submit new AED</h1>

                    <FormControl color="secondary" >

                        <FormControl margin="dense">
                            <Input onChange={(e) => {encodeImageFileAsURL(e)}} type="file" />

                            <Button variant="raised"
                            >Upload img</Button> 

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
                                label="Comments..."
                                id="Comments"
                                type="text"
                                onChange={handleComments}
                            />
                        </FormControl>

                        <FormControl margin='dense' className={classes.btn_box} >
                            <Button variant="contained" 
                            className={classes.primary}  
                            onClick={handleSubmit}
                            >Submit</Button>
                        </FormControl>
                    
                    </FormControl>
                </Grid>
            </Grid>
        </Container>
 
    </Fragment>
  )
}

export default Upload






