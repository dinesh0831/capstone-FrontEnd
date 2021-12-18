



import { Box, Button,  TextField } from "@mui/material";
import { useState } from "react";
import { Link,useParams } from "react-router-dom"
import "./TypeOfHouse.css";
import axios from "axios"
import {backEndUrl} from "../backend"

function Price() {
    const [price, setPrice] = useState(750)


    const params=useParams()
    const [button,setButton]=useState(true)
    
    const token=localStorage.getItem("clone")
    const handleChange =async (value) => {
       
        const {data}=await axios.patch(`${backEndUrl}/posts/update/${params.id}`,{price:value},
        {
            headers:{ clone:token}
          })
        console.log(data)
        setPrice(value)
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
                height: "auto",

                bgcolor: 'background.paper',
               
            }}>
            <Box className="image" sx={{
                width: "50%",
                display: 'flex',
                justifyContent:"center",
                alignItems: 'center',
            }}>
                <Box sx={{ typography: { fontSize: 50, fontWeight: "bold" }, textAlign: "center", color: "white", }} >Now for the funpart, set your price</Box></Box>
            <Box sx={{ width: "50%", display: "flex-inline" }} >
                <Box className="top" sx={{ borderColor: "black", display: "flex", justifyContent: 'flex-end', height: "auto", }}>
                    <Box className="top-content" sx={{ margin: 2, }}><Button component={Link} to={`/manage_host`}>save&exit</Button></Box>
                </Box>
                <Box className="middle" sx={{ display: "flex-inline", justifyContent: "center", alignItem: "center", overflow: "auto", height: 700 }}>
                    <Box sx={{display: "flex", justifyContent: "center", alignItem: "center"}}>
                        <Box component="h3"> </Box>
                        <Box disabled={price<=750}  onClick={()=>handleChange(price-100)} component="button"
                        sx={{paddingTop:1,paddingLeft:1,paddingRight:1,height:50,width:50, typography: { fontSize: 24 ,fontWeight:"bold"},borderRadius: "50%", border: 1, 
                        bgcolor: "white", marginTop: 1,display: "flex", justifyContent: "center", alignItem: "center" }}>-</Box>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' }, display: "flex-inline", justifyContent: "center", alignItem: "center", marginLeft: 5, marginRight: 5
                            }}
                            noValidate
                            autoComplete="off"
                        >

                            <TextField id="outlined-basic" type="number" label="Price" value={price} onChange={(e)=>handleChange(e.target.value)} variant="outlined" />


                        </Box>
                        <Box onClick={()=> handleChange(parseInt(price)+100)} component="button" 
                        sx={{paddingLeft:1,paddingRight:1,paddingTop:1, typography: { fontSize: 24 ,fontWeight:"bold"},borderRadius: "50%", height:50,width:50,
                        bgcolor: "white", marginTop: 1, border: 1 ,display: "flex", justifyContent: "center", alignItem: "center"}}>+</Box>


                    </Box>
                </Box>
                <Box className="end" sx={{ display: 'flex', alignSelf: "flex-end", marginTop: 3 }} >
                    <Box sx={{ flexGrow: 1 }} >
                        <Button component={Link} to={`/Host/${params.id}/Floor_Plan`} >Back</Button></Box>
                    <Box>
                        <Button sx={{}} disabled={button}  component={Link} to={`/Host/${params.id}/address`}> Next</Button>
                    </Box>
                </Box>
            </Box>
        </Box>


    )
}
export default Price