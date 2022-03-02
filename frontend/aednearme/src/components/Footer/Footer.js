import React from "react";
import { Link } from "react-router-dom";

//make styles
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";

//grid
import Grid from "@material-ui/core/Grid";

//mediaquery
import useMediaQuery from "@material-ui/core/useMediaQuery";

//sns icon 
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import CopyrightIcon from '@mui/icons-material/Copyright';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#000',
    // 6500a3 blight-purple color
    position: "fixed",
    width: '100%',
    bottom: '0',
    left: '0',
    margin: '0 auto',
    overflow: "hidden",
    //location of the image: behind / infront
    zIndex: 1302,
    padding: "5px 0",
    
  },

  item: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
    }
  },

  snsIcon: {
    // width: "40px",
    // height: "40px",
    fontSize: "2.5rem !important",

    color: "#fff",
    // 64f227 bright green color
    margin: "10px",
    [theme.breakpoints.down("xs")]: {
      // width: "50px",
      // height: "30px",
      fontSize: "1.6rem !important",

    },
  },


}));


export const Footer = ({ setValue, setSelectedIndex }) => {

  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">


        <Grid container direction="column">
          <Grid container justify="space-between">
            <Grid
              item
              // component={"a"}
              // target="_blank"
              // rel="noreferrer noopener"
              // href="https://mui-aed.Netlify.App"
              className={classes.item}
            >
              <MarkEmailUnreadIcon fontSize="large" className={classes.snsIcon} />
              <p>eMail us if any query: <br /> info@AEDnearMe.com </p>
            </Grid>


            <Grid
              item
              // component={"a"}
              // target="_blank"
              // rel="noreferrer noopener"
              // href="https://github.com/wotaque/mui-aed"
              className={classes.item}
            >
            <CopyrightIcon className={classes.snsIcon} />

              <p>2022 <br /> by Snake in the Flask </p>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

