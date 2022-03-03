import { Grid, Container, makeStyles, Paper } from '@material-ui/core';

import DefibVid from '../../components/DefibVid/DefibVid'

import React, { Fragment } from 'react'

const useStyles = makeStyles(() => ({


  text: {
    fontSize: '16px'
  },

}));

const AEDhowto = () => {

  const classes = useStyles();

  return (
    <Fragment>

      <Container 
        style={{
          paddingBottom: "80px",
          paddingTop: "5px"
        }}>
      
      <h1 className={classes.title} >How to use an AED</h1>


          <Grid container spacing={4}>

            <Grid item md={5} >
            
            <h3 className={classes.text}>
            Step 1: Have someone continue to perform CPR and follow the instructions of the defibrillator. 
            </h3>

            <h3 className={classes.text}>
            Step 2: Remove clothing from person's chest and find the pads. Peel off the plastic and place the pads indicated by the pictures onto the person. (One pad of the right side under collarbone, second pad on the left side below armpit)
            </h3>

            <h3 className={classes.text}>
            Step 3: AED will analyse the person's heart rhythm. Stop chest compressions and wait for the AED's instructions
            </h3>

            <h3 className={classes.text}>
            Step 4: If shock is advised, tell everyone to stand back and clear of the person. After shock is delivered start chest compressions when told to do so by AED. 
            </h3>

            <h3 className={classes.text}>
            Step 5: Leave the AED on as it will reanalyse heart rhythm and follow the instructions until help arrives
            </h3>

            <h3>Read more here at <a id="choking-link" href="https://www.sja.org.uk/get-advice/first-aid-advice/how-to/how-to-use-a-defibrillator/?category=12349" target="_blank">St. John's Ambulance</a>
            </h3>


            </Grid>

            <Grid
              item
              md={7}
              xs={12}
              className=""
              > 
              <div>
                <DefibVid />
              </div>  
            </Grid>

            
          </Grid>
        </Container>


    </Fragment>
      
  )
}

export default AEDhowto