import { Box, Button,  } from "@mui/material";
import React from "react";
import { Link,  } from "react-router-dom"
import "./TypeOfHouse.css"
import {backEndUrl} from "../backend"
import axios from "axios"

class FloorPlan extends React.Component {

    constructor(props) {
        super()
        this.state = {
            guest: 0,
            beds: 0,
            bedrooms: 0,
            bathrooms: 0,
            button:true

        }
    }
    handleChange = async ({ target: { name, value } }) => {
        this.setState({ [name]: value })
        const token=localStorage.getItem("clone")
             
        const {data} = await axios.patch(`${backEndUrl}/posts/update/${this.props.match.params.id}`, {
           floorPlan:{ [name]:value}
        }, {
            headers:{ clone:token}
          })
          console.log(this.props.match.params.id)
          if (data.message==="successfully updated"){
           this.setState({button:false})
            }

    }
  


    render() {
     
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
                    alignItems: 'center',
                }}>
                    <Box sx={{ typography: { fontSize: 50, fontWeight: "bold" }, textAlign: "center", color: "white", }} >How many guests would you like to welcome?</Box></Box>
                <Box sx={{ width: "50%", display: "flex-inline" }} >
                    <Box className="top" sx={{ borderColor: "black", display: "flex", justifyContent: 'flex-end', height: "max-content", }}>
                        <Box className="top-content" sx={{ margin: 2, }}><Button component={Link} to={`/manage_host`}>save&exit</Button></Box>
                    </Box>
                    <Box className="middle" sx={{ display: "flex-inline", width: "100%", justifyContent: "center", alignItem: "center", overflow: "auto", height: 580, }}>

                        <Box sx={{ display: "flex", typography: { fontSize: 24 }, width: "75%", marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}>
                            <Box sx={{ flexGrow: 1 }}>Guest</Box>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItem: "center" }}>
                                <Box sx={{ paddingLeft: 1, paddingRight: 1, borderRadius: "50%", bgcolor: "white", margin: 1 }} component="button" disabled={this.state.guest <= 1} name="guest" value={this.state.guest-1} onClick={this.handleChange}>-</Box>
                                <Box sx={{ margin: 1 }}>{this.state.guest}</Box>
                                <Box sx={{ borderRadius: "50%", bgcolor: "white", margin: 1 }} component="button" name="guest" value={parseInt(this.state.guest)+1} onClick={this.handleChange}>+</Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", typography: { fontSize: 24 }, width: "75%", marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}>
                            <Box sx={{ flexGrow: 1 }}>Beds</Box>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItem: "center" }}>
                                <Box sx={{ paddingLeft: 1, paddingRight: 1, borderRadius: "50%", bgcolor: "white", margin: 1 }} name="beds" value={this.state.beds-1} component="button" disabled={this.state.beds <= 1} onClick={this.handleChange}>-</Box>
                                <Box sx={{ margin: 1 }}>{this.state.beds}</Box>
                                <Box sx={{ borderRadius: "50%", bgcolor: "white", margin: 1 }} component="button" name="beds" value={parseInt(this.state.beds)+1} onClick={this.handleChange}>+</Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", typography: { fontSize: 24 }, width: "75%", marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}>
                            <Box sx={{ flexGrow: 1 }}>Bedrooms</Box>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItem: "center" }}>
                                <Box sx={{ paddingLeft: 1, paddingRight: 1, borderRadius: "50%", bgcolor: "white", margin: 1 }} component="button" name="bedrooms" value={this.state.bedrooms-1} disabled={this.state.bedrooms <= 1} onClick={this.handleChange}>-</Box>
                                <Box sx={{ margin: 1 }}>{this.state.bedrooms}</Box>
                                <Box sx={{ borderRadius: "50%", bgcolor: "white", margin: 1 }} component="button" name="bedrooms" value={parseInt(this.state.bedrooms)+1} onClick={this.handleChange}>+</Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", typography: { fontSize: 24 }, width: "75%", marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}>
                            <Box sx={{ flexGrow: 1 }}>Bathrooms</Box>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItem: "center" }}>
                                <Box sx={{ paddingLeft: 1, paddingRight: 1, borderRadius: "50%", bgcolor: "white", margin: 1 }} component="button" name="bathrooms" value={parseInt(this.state.bathrooms)-1} disabled={this.state.bathrooms <= 1} onClick={this.handleChange}>-</Box>
                                <Box sx={{ margin: 1 }}>{this.state.bathrooms}</Box>
                                <Box sx={{ borderRadius: "50%", bgcolor: "white", margin: 1 }} component="button" name="bathrooms" value={parseInt(this.state.bathrooms)+1} onClick={this.handleChange}>+</Box>
                            </Box>
                        </Box>


                    </Box>
                    <Box className="end" sx={{ display: 'flex', alignSelf: "flex-end", marginTop: 3 }}>
                        <Box sx={{ flexGrow: 1 }} >
                            <Button  component={Link} to={`/Host/${this.props.match.params.id}/kind_of_place`}>Back</Button>
                            </Box>
                        <Box>
                            <Button sx={{}} disabled={this.state.button} component={Link} to={`/Host/${this.props.match.params.id}/Price`}>Next</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>


        )
    }
}
export default FloorPlan