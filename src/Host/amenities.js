
import React from "react"
import { ToggleButton, Box, Button, } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios"

import {backEndUrl} from "../backend"
const standout = [
    {
        label: "Pool",
        key: "pool",

    },
    {
        label: "Hot tub",
        key: "hot_tub",

    },
    {
        label: "Patio",
        key: "patio",
    },
    {
        label: "BBQ grill",
        key: "bbq_grill"
    },
    {
        label: 'Fire pit',
        key: "fire_pit",
    },
    {
        label: "Pool table",
        key: "pool_table"
    },
    {
        label: "Indoor fireplace",
        key: "indoor_fireplace",
    },
    {
        label: "Outdoor dining area",
        key: "outdoor_dining"
    },
    {
        label: "Excercise equipement",
        key: "excercise_equipement"
    }
]
const favourite = [
    {
        label: "Wi-fi",
        key: "wifi"
    },
    {
        label: "Tv",
        key: "tv"
    },
    {
        label: "Kitchen",
        key: "kitchen"
    },
    {
        label: "Air conditioning",
        key: "air_conditioning"
    },
    {
        label: "Outdoor shower",
        key: "outdoor_shower"
    }
]

const safety = [
    {
        label: "Smaoke alarm",
        key: "smoke_alarm"
    },
    {
        label: "First aid kit",
        key: "first_aid"
    },
    {
        label: "Carbon monoxide alarm",
        key: "alarm"
    },
    {
        label: "Fire extinguisher",
        key: "fire_extinguisher"
    }
]
class Amenities extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            button:true,
            amenities:[],
            selected: {
                smoke_alarm:false,
                first_aid:false,
                alarm:false,
                fire_extinguisher:false,
                wifi:false,
                tv:false,
                kitchen:false,
                air_conditioning:false,
                outdoor_shower:false,
                pool:false,
                hot_tub:false,
                patio:false,
                bbq_grill:false,
                fire_pit:false,
                pool_table:false,
                indoor_fireplace:false,
                outdoor_dinind:false,
                excercise_equipement:false

            }
        }
    }
          
    handleChange =async (e,key) => {

        const amenities = [...this.state.amenities]
        const token=localStorage.getItem("clone")
        if(key){
            amenities.push(e.target.value)
            this.setState({ amenities })
            const {data}=await axios.patch(`${backEndUrl}/posts/update/${this.props.match.params.id}`,{amenities:amenities},{
                headers:{ clone:token}
            })
            console.log(data)
            if (data.message==="successfully updated"){
                this.setState({button:false})
                 }
            console.log( this.props.match.params.id)
        }
        else {
            const no=amenities.indexOf(e.target.value)
            amenities.splice(no,1)
            this.setState({ amenities })
            const {data}=await axios.patch(`${backEndUrl}/posts/update/${this.props.match.params.id}`,{amenities:amenities},{
                headers:{ clone:token}
            })
            console.log(data)
            if (data.message==="successfully updated"){
                this.setState({button:false})
                 }

        }
          this.setState({selected:{...this.state.selected,[e.target.name]:key}})
        this.setState({ amenities })
        
        console.log(this.state)

    }
   
    render() {

        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: "100%",
                    height:"auto",
                    bgcolor: 'background.paper',
                   
                }}>
                <Box className="image" sx={{
                    width: "50%",
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Box
                        sx={{
                            typography: { fontSize: 50, fontWeight: "bold" },
                            textAlign: "center",
                            color: "white",
                        }} >Which of these best describes your place?</Box></Box>
                <Box sx={{ width: "50%", display: "flex-inline" }} >
                    <Box className="top"
                        sx={{
                            display: "flex",
                            justifyContent: 'flex-end',
                            height: "max-content",
                        }}>
                        <Box className="top-content"
                            sx={{
                                margin: 2,
                            }}><Button component={Link} to={`/manage_host`}>save&exit</Button></Box>
                    </Box>
                    <Box className="middle"
                        sx={{
                            display: "inline-block",
                            justifyContent: "center",
                            overflow: "auto",
                            height: 580,
                            width: "100%",
                        }}>
                            {/* standout amenity */}
                             <Box sx={{typography: { fontSize: 24 ,fontWeight:"bold"},marginLeft: 3}}>Did you have any standout favourite amenities? </Box>
                        {standout.map((types,row) => {
                                
                            return (
                           
                            <ToggleButton component="button"  key={types.key} selected={this.state.selected[types.key]  } className="choosing"  value={types.label} name={types.key} onClick={(e)=>this.handleChange(e,!this.state.selected[types.key])}
                                sx={{
                                    typography: { fontSize: 16 }, border: 0.3, borderColor: "black",color:"black",margin:1, borderRadius: 3, 
                                    bgcolor: "white", width: "30", marginLeft: 3, height:50,
                                    '&:hover': { border: 2, },
                                }}>

                                {types.label}
                            </ToggleButton>)
                           
                        })}
                        {/* favourite amenity */}
                         <Box sx={{typography: { fontSize: 24 ,fontWeight:"bold"},marginLeft: 3}}>Did you have any safety equipements? </Box>
                        {favourite.map((types,row) => {
                                
                            return (
                           
                            <ToggleButton component="button" key={types.key} selected={this.state.selected[types.key]  } className="choosing"  value={types.label} name={types.key} onClick={(e)=>this.handleChange(e,!this.state.selected[types.key])}
                                sx={{
                                    typography: { fontSize: 16 }, border: 0.3, borderColor: "black",color:"black",margin:1, borderRadius: 3, 
                                    bgcolor: "white", width: "30", marginLeft: 3, height:50,
                                    '&:hover': { border: 2, }, 
                                }}>

                                {types.label}
                            </ToggleButton>)
                           
                        })}
                        {/* this is for safety */}
                            <Box sx={{typography: { fontSize: 24 ,fontWeight:"bold"},marginLeft: 3}}>Let's guest know what your place has to offer? </Box>
                        {safety.map((types,row) => {
                                
                            return (
                           
                            <ToggleButton component="button" key={types.key} selected={this.state.selected[types.key]  } className="choosing"  value={types.label} name={types.key} onClick={(e)=>this.handleChange(e,!this.state.selected[types.key])}
                                sx={{
                                    typography: { fontSize: 16 }, border: 0.3, borderColor: "black",color:"black",margin:1, borderRadius: 3, 
                                    bgcolor: "white", width: "30", marginLeft: 3, height:50,
                                    '&:hover': { border: 2, },
                                }}>

                                {types.label}
                            </ToggleButton>)
                           
                        })}

                    </Box>
                    <Box className="end"
                        sx={{
                            display: 'flex',
                            alignSelf: "flex-end",
                            marginTop: 3
                        }}>
                        <Box sx={{
                            flexGrow: 1
                        }} >
                            <Button  component={Link} to={`/Host/${this.props.match.params.id}/address`}>Back</Button></Box>
                        <Box>
                            <Button sx={{}} disabled={this.state.button} component={Link} to={`/Host/${this.props.match.params.id}/title`}>Next</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

        )
    }
}

export default Amenities