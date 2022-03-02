import { Button, FormControl, Paper, TextField , Card,  Grid, CssBaseline, Container,  Box} from '@mui/material';   
import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router'
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength'


const Register = () => {

  const navigate = useNavigate();

  const [ username, setUsername ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ password2, setPassword2 ] = useState("")
  const [ firstName, setFirstName ] = useState("")
  const [ lastName, setLastName ] = useState("")

  const handleUsername = (e) => setUsername(e.target.value)
  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)
  const handlePassword2 = (e) => setPassword2(e.target.value)
  const handleFirstName = (e) => setFirstName(e.target.value)
  const handleLastName = (e) => setLastName(e.target.value)

  const newUser = async () => {
      if (password !== password2){
          return alert("Passwords do not match")
      }
      let regex = /^.*(?=.{9,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
      if(!password.match(regex)){
        return alert('Password not strong enough')
      }

      if(!username || !email || !firstName || !lastName || !password || !password2) {
        return alert("Please fill in all fields")
      }
      const data = {
        "username": username,
        "email": email,
        "password": password,
        "first_name": firstName,
        "last_name": lastName
    }
    const options = {
        headers: new Headers({
            "Content-Type": "application/json"
          }),
    }
    const result = await axios.post('http://localhost:8000/users/register/', data, options)
    console.log(result)

    if (result.status !== 201) {
        alert('Server Error: failed to register user')
    }

    const result2 = await axios.post('http://localhost:8000/users/login/', {"username": username, "password": password}, options)
    console.log(result2)

    sessionStorage.setItem('accessToken', result2.data.access)
    sessionStorage.setItem('refreshToken', result2.data.refresh)
    sessionStorage.setItem('username', username)


    if (result2.status == 200) {navigate('/')
    } else { alert('Server Error: failed to login') }
  }  

  return (
       
    <div style={{    padding: "40px", paddingBottom: "100px"   }}>
        <CssBaseline /> 

            <Container className="pb-5" style={{
            paddingBottom: "10px",
            paddingTop: "10px"
            }}> 

      <Paper 
        component="form"
        sx={{  display: 'flex', alignItems: 'center', maxWidth: 400  }}
        style={{ background: 'rgba(0,0,0,0.3)' }}   
        >
        <FormControl className="form" margin='dense' style={{  margin: 'auto' }} >

          <form >

            <h1 style={{ alignText:'center'}}>Register here</h1>
        <FormControl margin="normal">
            <FormControl margin='dense' >

                <TextField
                    name="username"
                    label="Username"
                    required={true}
                    onChange={handleUsername}/>

            </FormControl>
            <FormControl margin='dense' >
                <TextField
                    name="firstName"
                    label="First Name"
                    required={true}
                    onChange={handleFirstName}/>
            </FormControl>
            <FormControl margin='dense' >
                <TextField
                    name="lastName"
                    label="Last Name"
                    required={true}
                    onChange={handleLastName}/>
            </FormControl>
            <FormControl margin='dense' >
                <TextField
                    name="email"
                    label="Email"
                    required={true}
                    onChange={handleEmail}/> 
            </FormControl>
            <FormControl margin='dense' >
                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    required={true}
                    onChange={handlePassword}/> 
            </FormControl>
            <FormControl margin='dense' >
                <TextField
                    name="password2"
                    label="Confirm Password"
                    type="password"
                    required={true}
                    onChange={handlePassword2}/> 
            </FormControl>

            <PasswordStrength password={password}/>


            <FormControl margin='dense' >
            <Button variant="contained" onClick={newUser}>Register</Button>
            </FormControl>
        </FormControl>

        </form>
        </FormControl>

        </Paper>
        
        <div>
            <h2>Password must contain the following</h2>
            <ul>
                <li>Minimum 9 characters</li>
                <li>Cannot be numerical only</li>
                <li>Must contain at least one special charcter e.g. "!,#,$,%,&,?", upper case and lower case letters and one number</li>
                <li>Cannot be similar to your name or common passwords such as: password, password123</li>
            </ul>
        </div>

    </Container>

    </div>
  )
}

export default Register