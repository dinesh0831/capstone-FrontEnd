import { Box, Button,  TextField } from "@mui/material";
import { useState } from "react";
import { Link ,useParams} from "react-router-dom"
import "./TypeOfHouse.css";
import axios from "axios"
import {backEndUrl} from "../backend"
function Description() {
    const [description, setDescription] = useState()

    const params=useParams()
    const [button,setButton]=useState(true)
    
    const token=localStorage.getItem("clone")
    const handleChange = async(e) => {
        setDescription(e.target.value)
        const {data}=await axios.patch(`${backEndUrl}/posts/update/${params.id}`,{description:e.target.value},{
            headers:{ clone:token}
          })
    console.log(data)
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
                justifyContent:"center",
                alignItems: 'center',
            }}>
                <Box sx={{ typography: { fontSize: 50, fontWeight: "bold" }, textAlign: "center", color: "white", }} >let's describe your place</Box></Box>
            <Box sx={{ width: "50%", display: "flex-inline" }} >
                <Box className="top" sx={{ borderColor: "black", display: "flex", justifyContent: 'flex-end', height: "auto", }}>
                    <Box className="top-content" sx={{ margin: 2, }}><Button component={Link} to={`/manage_host`}>save&exit</Button></Box>
                </Box>
                <Box className="middle" sx={{ display: "flex-inline", justifyContent: "center", alignItem: "center", overflow: "auto", height: 700, }}>
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

                            <TextField id="outlined-basic" multiline  label="Description..." sx={{width:"70%",height:100}}value={description} onChange={handleChange} variant="outlined" />


                        </Box>
                        


                    </Box>
                </Box>
                <Box className="end" sx={{ display: 'flex', alignSelf: "flex-end", marginTop: 3 }} >
                    <Box sx={{ flexGrow: 1,margin:1 }} >
                        <Button component={Link}  variant ="contained" size="large" color="error" to={`/Host/${params.id}/highlight`} >Back</Button></Box>
                    <Box sx={{margin:1 }}>
                        <Button sx={{}} variant ="contained" size="large" color="primary"  disabled={button} component={Link} to={`/Host/${params.id}/security`}>Next</Button>
                    </Box>
                </Box>
            </Box>
        </Box>)




          
}
            export default Description