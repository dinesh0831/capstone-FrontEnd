
import {  Box, Typography, TextField } from "@mui/material";
import { Link } from "react-router-dom"
import React from "react";
import axios from "axios"
import vintage from "../asset/vintage.jpg"
import {backEndUrl} from "../backend"

class Register extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            name:"",
            email:"",
            mobileno:"",
            password:"",
            message:""

        }
    }
    registerUser=async()=>{
        const {name,email,password,mobileno}=this.state
        const {data}= await axios.post(`${backEndUrl}/users/register`,{name,email,password,mobileno})
        console.log(data)
        this.setState({message:data.message})
        if(data.message==="*successfully registered")
        {
           this.props.history.push("/login")
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
            <Box sx={{  }}>
                <Box sx={{ width: "100%", }}>
                    <Box  sx={{ height: "max-content", width: 250, bgcolor: "white", marginTop: 20, marginLeft: 20, borderRadius: 2, display: "block", justifyContent: "center", position: 'absolute' }} >

                        <Box sx={{ display: "flex-inline", }}>
                            <Typography sx={{ fontSize: 24, fontWeight: "bold", margin: 2 }}>Register</Typography>
                            <form onSubmit={this.handleSubmit}>
                                <TextField sx={{ margin: 1 }} id="outlined-basic" onChange={this.handleChange} name="name" value={this.state.name } label="name" variant="outlined" />
                                <TextField sx={{ margin: 1 }} id="outlined-basic" onChange={this.handleChange} placeholder="10-digit Mobileno" name="mobileno" value={this.state.mobileno } label="Mobile Number" variant="outlined" />
                                <TextField sx={{ margin:1 }} id="outlined-basic" onChange={this.handleChange} placeholder="abc@123.com"name="email" value={this.state.email } label="Email" variant="outlined" />
                                <TextField sx={{ margin: 1 }} id="outlined-basic" onChange={this.handleChange} type="password" placeholder="[Aa-Zz] or [1-9]or Both " name="password" value={this.state.password } label="Password" variant="outlined" />
                                <Typography sx={{ textAlign: "center",margin:1,color:"red" }}>{this.state.message }</Typography>
                                <button style={{ marginLeft:75 }} variant="success" >Register</button>
                            </form>
                            
                            
                                <Typography sx={{ textAlign: "center",margin:1 }}>Already you have a account? <Link to={'/login'}>Click Here</Link> for login </Typography>
                            

                        </Box>

                    </Box>
                    <Box component="img" sx={{ height:"100vh",width:"100%",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundAttachment:"fixed",}} src={vintage}></Box>
                </Box>

            </Box>
        )

    }
}
export default Register
