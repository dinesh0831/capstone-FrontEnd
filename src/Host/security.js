
import React from "react"
import { ToggleButton, Box, Button, } from "@mui/material";
import { Link } from "react-router-dom";



import axios from "axios";
import {backEndUrl} from "../backend"
const security=[
    {
        key:"security_camera",
        label:"Security camera"
    },
    {
        key:"weapon",
        label:"Weapon"
    },
    {
        key:"dangerous_animal",
        label:"Dangerous Animal",

    }
]
class Security extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            security: [],
            selected: {
                security_camera:false,
                weapon:false,
                dangerous_animal:false

            }
        }
    }

    handleChange = async(e,key) => {
        const token=localStorage.getItem("clone")
        const security= [...this.state.security]

        if(key){
           security.push(e.target.value)
           this.setState({ security })
           const data=await axios.patch(`${backEndUrl}/posts/update/${this.props.match.params.id}`,{security:security},{
            headers:{ clone:token}
          })
           console.log(data)
           console.log( this.props.match.params.id)
        }
        else {
            const no=security.indexOf(e.target.value)
           security.splice(no,1)
           this.setState({ security })
           const data=await axios.patch(`${backEndUrl}/posts/update/${this.props.match.params.id}`,{security:security},{
            headers:{ clone:token}
          })
           console.log(data)
           console.log( this.props.match.params.id)
            

        }
          this.setState({selected:{...this.state.selected,[e.target.name]:key}})
        this.setState({ security })
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
                           
                         
                         <Box sx={{typography: { fontSize: 24 ,fontWeight:"bold"},marginLeft: 3}}>Did you have any legal security options? </Box>
                        {security.map((types,row) => {
                                
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
                            <Button  component={Link} to={`/Host/${this.props.match.params.id}/description`}>Back</Button></Box>
                        <Box>
                            <Button sx={{}} component={Link} to={`/Host/${this.props.match.params.id}/photos`}>Next</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

        )
    }
}

export default Security