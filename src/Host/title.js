
import { Box, Button,  TextField } from "@mui/material";
import { useState } from "react";
import { Link ,useParams} from "react-router-dom"
import axios from "axios"
import "./TypeOfHouse.css";
import {backEndUrl} from "../backend"
function Title() {
    const [title, setTitle] = useState()

    const params=useParams()
    const [button,setButton]=useState(true)
    
    const token=localStorage.getItem("clone")
    const handleChange = async({target:{value}}) => {
        const {data}=await axios.patch(`${backEndUrl}/posts/update/${params.id}`,{title:value},{
            headers:{ clone:token}
          })
    console.log(data)
        setTitle(value)
        if(data.message==="successfully updated"){
        setButton(false)
        }
    }
    
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
                justifyContent: "center"
            }}>
                <Box sx={{ typography: { fontSize: 50, fontWeight: "bold" }, textAlign: "center", color: "white", }} >Let's give your place a name </Box></Box>
            <Box sx={{ width: "50%", display: "flex-inline" }} >
                <Box className="top" sx={{ borderColor: "black", display: "flex", justifyContent: 'flex-end', height: 700, }}>
                    <Box className="top-content" sx={{ margin: 2, }}><Button component={Link} to={`/manage_host`}>save&exit</Button></Box>
                </Box>
                <Box className="middle" sx={{ display: "flex-inline", justifyContent: "center", alignItem: "center", overflow: "auto", height: 700 }}>
                    <Box sx={{display: "flex", justifyContent: "center", alignItem: "center"}}>
                        <Box component="h3"> </Box>
                      
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '50ch' ,height:'50ch' }, display: "flex-inline", justifyContent: "center", alignItem: "center", marginLeft: 5, marginRight: 5
                            }}
                            noValidate
                            autoComplete="off"
                        >

                            <TextField id="outlined-basic" multiline  label="Title..." sx={{width:"70%",height:100} } value={title} onChange={(e)=>handleChange(e)} variant="outlined" />


                        </Box>
                        


                    </Box>
                </Box>
                <Box className="end" sx={{ display: 'flex', alignSelf: "flex-end", marginTop: 3 }} >
                    <Box sx={{ flexGrow: 1 }} >
                        <Button  component={Link} to={`/Host/${params.id}/amenities`}>Back</Button></Box>
                    <Box>
                        <Button sx={{}} disabled={button} component={Link} to={`/Host/${params.id}/highlight`}>next</Button>
                    </Box>
                </Box>
            </Box>
        </Box>)




          
}
            export default Title