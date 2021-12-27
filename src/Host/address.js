
import { Box, Button,  TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom"
import "./TypeOfHouse.css";
import axios from "axios"
import {backEndUrl} from "../backend"
class Address extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            house_no: "",
            street: "",
            town: "",
            city: "",
            stt: "",
            pin:"",
            button:true
        }
    }
   
   
    handleChange =async ({ target: { name, value } }) => {
        const token=localStorage.getItem("clone")
        const {data}=await axios.patch(`${backEndUrl}/posts/update/${this.props.match.params.id}`,{
           
            [name]:value
            
        },
        {
        headers:{ clone:token}
    })
        this.setState({ [name]: value })
        if (data.message==="successfully updated"){
            this.setState({button:false})
             }
        console.log(data)
    }
  handleSubmit=()=>{
 console.log("success")
  }
        render()
        {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                              
                        width: "100%",
                        height: "auto",

                        bgcolor: 'background.paper',
                        
                    }}>
                    <Box className="image" sx={{
                        width: "50%",
                        display: 'flex',
                        justifyContent:"center",
                        alignItems: 'center',
                    }}>
                        <Box sx={{ typography: { fontSize: 50, fontWeight: "bold" }, textAlign: "center", color: "white", }} >let's share your property address?</Box></Box>
                    <Box sx={{ width: "50%", display: "flex-inline" }} >
                        <Box className="top" sx={{ borderColor: "black", display: "flex", justifyContent: 'flex-end', height: "auto", }}>
                            <Box className="top-content" sx={{ margin: 2, }}><Button component={Link} to={`/manage_host`}>save&exit</Button></Box>
                        </Box>
                        <Box className="middle" sx={{ display: "flex-inline", justifyContent: "center", alignItem: "center", overflow: "auto", height: 700, }}>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItem: "center" }}>
                                <Box component="h3"> </Box>

                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '50ch' }, display: "flex-inline", justifyContent: "center", alignItem: "center", marginLeft: 5, marginRight: 5
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >

                                    <TextField id="outlined-basic"  label="House No" name="house_no" value={this.state.house_no} onChange={this.handleChange} variant="outlined" />
                                    <TextField id="outlined-basic"  label="Street" name="street" value={this.state.street} onChange={this.handleChange} variant="outlined" />
                                    <TextField id="outlined-basic"  label="Town" name="town" value={this.state.town} onChange={this.handleChange} variant="outlined" />
                                    <TextField id="outlined-basic"  label="City" name="city" value={this.state.city} onChange={this.handleChange} variant="outlined" />
                                    <TextField id="outlined-basic"  label="State" name="stt" value={this.state.stt} onChange={this.handleChange} variant="outlined" />
                                    <TextField id="outlined-basic"  label="PIN" name="pin" value={this.state.pin} onChange={this.handleChange} variant="outlined" />


                                </Box>



                            </Box>
                        </Box>
                        <Box className="end" sx={{ display: 'flex', alignSelf: "flex-end", marginTop: 3 }} >
                            <Box sx={{ flexGrow: 1,margin:1 }} >
                                <Button  component={Link} variant ="contained" size="large" color="error" to={`/Host/${this.props.match.params.id}/price`}>Back</Button></Box>
                            <Box sx={{margin:1 }}>
                                <Button sx={{}} variant ="contained" size="large" color="primary" disabled={this.state.button} component={Link} to={`/Host/${this.props.match.params.id}/amenities`}> Next</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )
        }
    }

export default Address