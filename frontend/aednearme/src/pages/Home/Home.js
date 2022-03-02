import React, { Fragment } from 'react';
import { Grid, Container, Button, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router';
import MainMap from '../../components/MainMap/MainMap';
import './Home.css';

const useStyles = makeStyles(() => ({

  title: {
    borderBottom: '1px solid #fff',
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

const Home = () => {
  const navigate = useNavigate();

  const goToAEDhowTo = () => {
    navigate('/AEDhowTo')
  }

  const goToUpload = () => {
    navigate('/upload')
  }

  const classes = useStyles();


  

  return (
    <Fragment>

      <Container className="pb-5" style={{
        paddingBottom: "100px",
        paddingTop: "20px"
      }}>
        <Grid container spacing={4}>

          <Grid item md={5} >
            <h1 className={classes.title}
            >IN A LIFE THREATENING EMERGENCY, CALL 999 or 112</h1>
            
            <p className={classes.text}
            >Use our location driven database to show your nearest AED.
            </p>


            <p className={classes.text} >
            An AED machine, or Automated External Defibrillator, is an essential component in first aid and safety.
            </p>


            <p className={classes.text} >
            Most of us have seen these units at airports, hospitals, schools, government buildings, nursing homes, first aid stations and even in our workplaces — But do we remember where we seen them ?
            </p>




            <div className={classes.btn_box}>
              <Button 
                className={classes.primary}  
                onClick={goToAEDhowTo}
              >How to use AED</Button>

              <Button 
                className={classes.secondary} 
                onClick={goToUpload} 
              >Add new Location</Button>

            </div>
            
          </Grid>

          <Grid
            item
            md={7}
            xs={12}
            className=""
            >
            <div>
              <MainMap />
            </div>
          </Grid>

        </Grid>

      </Container>
          
    </Fragment>
  );
};

export default Home;
