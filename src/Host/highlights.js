
import React from "react"
import { ToggleButton, Box, Button,} from "@mui/material";
import { Link } from "react-router-dom";


import axios from "axios"
import {backEndUrl} from "../backend"
const high=[
    {
        key:"peaceful",
        label:"Peaceful"
    },
    {
        key:"unique",
        label:"Unique"
    },
    {
        key:"family_friendly",
        label:"Family & friendly",

    },
    {
        key:"stylish",
        label:"Stylish"
    },
    {
        key:"central",
        label:"Central",
    },
    {
        key:"spacious",
        label:"Spacious"
    }
]
class Highlight extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            button:true,
            highlight: [],
            selected: {
               peaceful:false,
               unique:false,
               family_friendly:false,
               stylish:false,
               central:false,
               spacious:false

            }
        }
    }

    handleChange = async(e,key) => {
        const token=localStorage.getItem("clone")
        const highlight = [...this.state.highlight]

        if(key){
           highlight.push(e.target.value)
           this.setState({ highlight })
           const {data}=await axios.patch(`${backEndUrl}/posts/update/${this.props.match.params.id}`,{highlights:highlight},{
            headers:{ clone:token}
          })
          if (data.message==="successfully updated"){
            this.setState({button:false})
             }
           console.log(data)
           console.log( this.props.match.params.id)
        }
        else {
            const no=highlight.indexOf(e.target.value)
           highlight.splice(no,1)
           
           this.setState({ highlight })
           const {data}=await axios.patch(`${backEndUrl}/posts/update/${this.props.match.params.id}`,{highlights:highlight},{
            headers:{ clone:token}
          })
          if (data.message==="successfully updated"){
            this.setState({button:false})
             }
           console.log(data)
            

        }
          this.setState({selected:{...this.state.selected,[e.target.name]:key}})
        this.setState({ highlight })
        
        console.log(this.state)

    }
    handleSubmit = () => {
        console.log(this.state)
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
                            height: "auto",
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
                            height: 700,
                            width: "100%",
                        }}>
                           
                         
                         <Box sx={{typography: { fontSize: 24 ,fontWeight:"bold"},marginLeft: 3}}>Did you have any specific highlights? </Box>
                        {high.map((types,row) => {
                                
                            return (
                           
                            <ToggleButton component="button" key={ types.key} selected={this.state.selected[types.key]  } className="choosing" value={types.label} name={types.key} onClick={(e)=>this.handleChange(e,!this.state.selected[types.key])}
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
                            <Button  component={Link} to={`/Host/${this.props.match.params.id}/title`}>Back</Button></Box>
                        <Box>
                            <Button sx={{}} disabled={this.state.button} component={Link} to={`/Host/${this.props.match.params.id}/description`}>Next</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

        )
    }
}

export default Highlight