import { Typography } from '@mui/material';
import { Grid, Container, Button, makeStyles } from '@material-ui/core';

import CprVid from '../../components/CprVid/CprVid'

import React, { Fragment } from 'react'

import { FormControl, Input, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'

const useStyles = makeStyles(() => ({

  title: {
    paddingBottom: '5px',

  },

  text: {
    fontSize: '16px'
  },

  btn_box:{
    marginTop: "30px",
    display: 'flex',
    justifyContent: 'space-between',
  },

  primary: {
    border: "none",
    background: "#273746",
    color: '#fff',
    borderRadius: "0px",
    padding: "10px 20px",
    "&:hover": {
      background: "#34495E",
    }
  },
  
  secondary: {
    border: "none",
    background: "aliceblue",
    color: "#ba181b",
    borderRadius: "0px",
    padding: "10px 20px",
    "&:hover": {
      background: "aliceblue",
    }
  },

}));



const CPRhowto = () => {

  const classes = useStyles();

  return (
    <Fragment>

    <Container className="pb-5" style={{
      paddingBottom: "100px",
      paddingTop: "20px"
    }}>

    <h1 className={classes.title} >The four simple steps of CPR (Cardiopulmonary Resuscitation) </h1>

        <Grid container spacing={4}>

          <Grid item md={5} >
          
            <h3 className={classes.text}>
            Step 1: If you suspect someone is having a cardiac arrest, check the person over, tilt the head back and check for breathing for 10 seconds. If the person is unresponsive, ask someone to call 999/112 and tell them to bring an AED.
            </h3>
            <p>Never leave a victim by themself</p>

            <h3 className={classes.text}>
            Step 2: Start hands only CPR, lock your hands together and place them by the person's chest.
            </h3>

            <h3 className={classes.text}>
            Step 3: With straight arms, use your body to push 5-6cm in depth at a rate of 100-120 bpm. 
            </h3>
            <p>For reference, use the beat of Staying Alive by the Bee Gees or Baby Shark</p>

            <h3 className={classes.text}>
            Step 4: Keep doing hands only CPR until a defibrillator is present and the ambulance arrives. If there are multiple people around you. 
            </h3>
            <p>Switch to other helpers every 5 rounds of 30 pushes to avoid fatigue</p>
            
            <h3>Read more here at <a id="choking-link" href="https://www.sja.org.uk/get-advice/first-aid-advice/unresponsive-casualty/how-to-do-cpr-on-an-adult/" target="_blank">St. John's Ambulance</a>
            </h3>


          </Grid>

          <Grid
            item
            md={7}
            xs={12}
            className=""
            > 
            <div>
            <CprVid />
            </div>  
          </Grid>

          
        </Grid>
      </Container>

    </Fragment>
      
  )
}

export default CPRhowto