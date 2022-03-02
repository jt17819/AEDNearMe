import { Typography, Button, Grid, Container, makeStyles } from '@material-ui/core'
import React , { Fragment } from 'react'
import { useNavigate } from 'react-router';
import ChokingVid from '../../components/ChokingVid/ChokingVid';
import './Choking.css'

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


const Choking = () => {

  const navigate = useNavigate();
  const goToCPRhowTo = () => {
    navigate('/CPRhowTo')
  }

  const classes = useStyles();

  
  return (

    <Fragment>

    <Container className="pb-5" style={{
      paddingBottom: "70px",
      paddingTop: "10px"
      }}> 

      <h1 className={classes.title} >Learn first aid for someone who is choking</h1>

        <Grid container spacing={2}>
          <Grid item md={5} >
            <h3 className={classes.text}>
            Step 1: If someone is choking, encourage them to cough.
            </h3>
              <p>If the blockage is severe, they may be holding their chest or neck and won't be able to speak, breathe or cough, and you will need to help them.
              </p>

            <h3 className={classes.text}>
            Step 2: Bend them forwards and give up to 5 back blows to try and dislodge the blockage.
            </h3>
              <p>Hit them firmly on their back with the heel of your hand between the shoulder blades.
              </p>

            <h3 className={classes.text}>
            Step 3: If they are still choking, give up to 5 abdominal thrusts: hold around the waist and pull inwards and upwards above their navel.
            </h3>

            <h3 className={classes.text}>
            Step 4: If they are still choking and become unresponsive, follow the procedure on how to give CPR.
            </h3>


            <div className={classes.btn_box}>
              <Button variant="contained" 
                className={classes.primary}  
                onClick={goToCPRhowTo}
              >CPR: How to give</Button>
            </div>


            <h3>Read more here at <a id="choking-link" href="https://www.sja.org.uk/get-advice/first-aid-advice/choking/" target="_blank">St. John's Ambulance</a>
            </h3>

          </Grid> 

          <Grid
            item
            md={7}
            xs={12}
            className=""
            >
            <div>
              <ChokingVid />
            </div>  

          </Grid>

        </Grid>
      </Container>
  </Fragment>

       
        
  )
}

export default Choking;