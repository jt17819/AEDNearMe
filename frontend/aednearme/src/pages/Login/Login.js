import { Button, Card, FormControl, Grid, CssBaseline, Paper, Box, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { Container, makeStyles } from '@material-ui/core';



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


    title: {
        paddingBottom: '5px',
      },
    
      text: {
        fontSize: '16px'
      }, 
    

}));


const Login = () => {

    const classes = useStyles();

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const navigate = useNavigate();  

  const handleUsername = (e) => setUsername(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleLogin = async () => {
    const data = {
        "username": username,
        "password": password,
    }
    const options = {
        headers: new Headers({
            "Content-Type": "application/json"
          }),
    }

    const result = await axios.post('http://localhost:8000/users/login/', data, options)
    console.log(result)

    sessionStorage.setItem('accessToken', result.data.access)
    sessionStorage.setItem('refreshToken', result.data.refresh)
    sessionStorage.setItem('username', username)



    if (result.status == 200) {
        navigate('/')
        window.location.reload()
    } else { alert('Server Error: failed to login') }


  }
  const handleRegister = () => {
      navigate('/register')
  }
    
  return (
    <div >

      <CssBaseline /> 

      <Container 
        className="pb-5" 
        style={{
          paddingBottom: "10px",
          paddingTop: "10px"
          }}
        sx={{ display: 'flex', alignItems: 'center', maxWidth: 600  }}

        > 

        <Paper 
          component="form"
          sx={{ p: '20px', display: 'flex', alignItems: 'center', maxWidth: 400  }}
          style={{ background: 'rgba(0,0,0,0.3)' }}   
          >
          <FormControl className="form" margin='dense' style={{  margin: 'auto' }} >

            <form className={classes.root}>

              <h1>Welcome back</h1>

              <TextField a
                required
                name="username"
                label="Username"
                variant="filled"
                onChange={handleUsername} 
              />

              <TextField 
                name="password"
                label="Password"
                type="password"
                variant="filled"
                required
                onChange={handlePassword}
              />

              <FormControl>
                <Button variant="contained" onClick={handleLogin}>Login</Button>
              </FormControl>
        
              New user? 
       
              <FormControl margin='dense' className={classes.btn_box} >
                <Button 
                variant="contained" 
                className={classes.primary}  
                onClick={handleRegister}
                >Register here!</Button>
              </FormControl>

            </form>
          </FormControl>
        </Paper>
      </Container>
    </div>
  )
}

export default Login; 