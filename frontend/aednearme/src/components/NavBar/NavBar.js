import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer/Drawer.js";
import { MyMenu } from "../DropdownMenu/Menu.js";


export const NavBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    sessionStorage.clear()
    alert('You have been logged out')
    window.location.reload()
  }

  return (
    <AppBar className={classes.appbar}
    >
      <CssBaseline />
      <Toolbar>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.root}>
            <div className="">
              <Link to="/" className={classes.logo}>AED <br /> nearMe </Link>
            </div>

            <div className={classes.navlinks}>

              <Link to="/" className={classes.link} >Home</Link>

              <MyMenu title="AED" className={classes.mymenu} menuItems={aedArray} />
              <MyMenu title="CPR" className={classes.mymenu} menuItems={cprArray} />
              <MyMenu title="Choking" className={classes.mymenu} menuItems={chokingArray} />
              <MyMenu title="Education Hub" className={classes.mymenu} menuItems={educationArray} />
              {
              sessionStorage.getItem('accessToken') ?
              <Link to="/" onClick={handleLogout} className={classes.link}>Logout</Link> :
              <Link to="/login" className={classes.link}>Login</Link>
            }

            </div>
   
          </div>
          
        )}
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  navlinks: {
    margin: theme.spacing(2),
    display: "flex",
    padding: "20px 0",
    borderBottom: "1px solid #fff"
  },

  logo: {
    flexGrow: "10",
    cursor: "pointer",
    textDecoration: "none",
    color: "#fff",
    fontSize: "40px",
    fontWeight: "bolder",
    lineHeight: "10px",
  },

  link: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
    
    // 64f227 blight green color
    // color: "#64f227",
    fontSize: "20px",
    marginLeft: theme.spacing(5),

    // hover navbar items changes color
    "&:hover": {
      color: "#000",
      borderBottom: "1px solid white",
    },
  },

// DOES NOT WORK WAKAWAKAWAKA Why???
  mymenu: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "20px",
    marginLeft: theme.spacing(5),
    // hover navbar items changes color
    "&:hover": {
      color: "#000",
      borderBottom: "1px solid white",
    },
  },

  // NavBar
  appbar: {
    position: "static",
    // ba181b dark red colour
    background: '#ba181b',

    // black line above NavBar
    "&:before": {
      width: "100%",
      height: "10px",
      top: 0,
      backgroundColor: "#000",
      content: '" "',
      position: "absolute",
      transform: ` rotateZ(180deg)`,
    },

  },

}));


const aedArray = [
  {
    title: "How to use",
    path: '/AEDhowto'
  },
  {
    title: "Add NEW location",
    path: "/upload"
  }
]

const cprArray = [
  {
    title: "How to give",
    path: "/CPRhowto"
  }
]

const chokingArray = [
  {
    title: "How to help",
    path: '/choking'
  }
]

const educationArray = [
  {
    title: "QUIZ",
    path: "/quiz"
  },
  {
    title: "AED: How to use",
    path: "/aedhowto"
  },
  {
    title: "CPR: How to give",
    path: "/cprhowto"
  },
  {
    title: "Choking: How to help",
    path: "/choking"
  }
]

