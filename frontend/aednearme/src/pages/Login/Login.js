import { Button, Card, FormControl, Grid, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const Login = () => {

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
    <div style={{    padding: "40px"   }}>
    <h1>Login</h1>
        <FormControl margin="normal">
            <FormControl>
                <TextField 
                    name="username"
                    label="Username"
                    onChange={handleUsername}/>
            </FormControl>
            <FormControl>
                <TextField 
                    name="password"
                    label="Password"
                    type="password"
                    onChange={handlePassword}/>
            </FormControl>
            <FormControl>
                <Button variant="contained" onClick={handleLogin} data-testid="submit">Login</Button>
            </FormControl>
        
            New user? 
            <Button variant="contained" name="register" onClick={handleRegister}>Register here!</Button>
        </FormControl>
    </div>
    
  )
}

export default Login