
import {  Box, Typography, TextField,  } from "@mui/material";
import { Link } from "react-router-dom"
import React from "react";
import axios from "axios"
import vintage from "../asset/vintage.jpg"
import {backEndUrl} from "../backend"
class Login extends React.Component {
    constructor(props) {
        super()
        this.state = {
            
            email:"",
            
            password:"",
            message:""

        }
    }
    registerUser=async()=>{
        const {email,password}=this.state
        const {data}= await axios.post(`${backEndUrl}/users/login`,{email,password})
       
        console.log(data.token)
        this.setState({message:data.message})
        if(data.message==="*successfully loggedIn")
        {
            await localStorage.setItem("clone",data.token)
           this.props.history.push("/")
        }
        
    }
    handleChange=({target:{name,value}})=>{
        this.setState({[name]:value})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        this.registerUser()
        console.log(this.state)
    }

 render() {

    return (
        <Box sx={{ margin: -1 }}>
            <Box sx={{  width:"100%", height: 700, marginTop: -10, overflow: "hidden" }}>
                <Box sx={{ height: "max-content", width: 250, bgcolor: "white", marginTop: 20, marginLeft: 20,  borderRadius: 2, display: "block", justifyContent: "center", position: 'absolute' }} >

                    <Box sx={{ display: "flex-inline", }}>
                        <Typography sx={{ fontSize: 24, fontWeight: "bold", margin: 2 }}>LogIn</Typography>
                        <form onSubmit={this.handleSubmit}>
                            <TextField sx={{ margin: 2 }} id="outlined-basic" name="email" value={this.state.email} onChange={this.handleChange} label="Email" variant="outlined" />
                            <TextField sx={{ margin: 2 }} id="outlined-basic"  name="password" value={this.state.password} onChange={this.handleChange} label="Password" variant="outlined" />
                            <Typography sx={{ textAlign: "center",margin:1,color:"red" }}>{this.state.message }</Typography>
                            <button style={{ marginLeft:80 }} variant="success">LogIn</button>
                        </form>
                        <Box sx={{margin:2}}>
                            <Typography sx={{textAlign:"center"}}>If you don't have account? <Link to={'/register'}>Click Here</Link> for register </Typography>
                        </Box>

                    </Box>

                </Box>
                <Box component="img" src={vintage}></Box>
            </Box>

        </Box>
    )

}
}
export default Login