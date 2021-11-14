
import { Box, Button, } from "@mui/material";
import { useState } from "react";
import { Link,useParams } from "react-router-dom"
import axios from "axios";
import "./TypeOfHouse.css"
import {backEndUrl} from "../backend"

const types=["A private place","A shared room","An entire place"];
function KindfOFPlace() {
    const [house, setHouse] = useState()
    const [button,setButton]=useState(true)
    
    const token=localStorage.getItem("clone")
    const params=useParams()
    const handleChange =async (id,value) => {
        const {data}=await axios.patch(`${backEndUrl}/posts/update/${id}`,{kindOfShare:value},
        {
            headers:{ clone:token}
          })
          console.log(data)
        setHouse(data.houseType)
        if (data.message==="successfully updated"){
            setButton(false)
            }

    }
   
    return (
       

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',

                    width: "100%",
                    height:620,
                  
                    bgcolor: 'background.paper',
                    margin: -3
                }}>
                <Box className="image" sx={{
                    width:"50%",
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Box sx={{ typography: { fontSize: 50, fontWeight: "bold" }, textAlign: "center", color: "white", }} >What kind of space will guests have?</Box></Box>
                <Box sx={{ width: "50%", display: "flex-inline" }} >
                    <Box className="top" sx={{ borderColor: "black", display: "flex", justifyContent: 'flex-end', height: "max-content", }}>
                        <Box className="top-content" sx={{ margin: 2, }}><Button component={Link} to={`/manage_host`}>save&exit</Button></Box>
                    </Box>
                    <Box className="middle" sx={{ display: "flex-inline", justifyContent: "center",alignItem:"center", overflow: "auto", height: 470,}}>
                        {types.map(type => {
                        return <Box component="button" key={type} className="choosing" name="Type_of_house" value={type} onClick={()=>handleChange(params.id,type)} 
                        sx={{ border: 1, borderColor: "black",typography: { fontSize: 24 } , borderRadius: 3,margin: 2, bgcolor: "white", width: 250, height: 80, display: "flex", 
                        justifyContent: "start", alignItems: 'center', marginLeft:25,paddingLeft: 3, '&:hover': { border: 2, }, '&:focus': { border: 2,  } }}>

                            {type}
                        </Box>
                    })}
                    </Box>
                    <Box className="end" sx={{ display: 'flex',  alignSelf: "flex-end", marginTop:3}}>
                        <Box sx={{ flexGrow: 1 }} >
                            <Button component={Link} to={`/Host/${params.id}/${house}/select_model`} >Back</Button></Box>
                        <Box>
                            <Button sx={{}} disabled={button} component={Link} to={`/Host/${params.id}/Floor_Plan`}>Next</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
      

    )
}
export default KindfOFPlace