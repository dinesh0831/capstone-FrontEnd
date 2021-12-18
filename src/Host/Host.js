
import { Button, Box, Typography } from "@mui/material";
import { Link, useHistory } from "react-router-dom"

import axios from "axios"

import door from "../asset/door.jpg"
import MapIcon from '@mui/icons-material/Map';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HomeIcon from '@mui/icons-material/Home';

import jwt from "jsonwebtoken"
import { backEndUrl } from "../backend"



function Host() {


  const token = localStorage.getItem("clone")


  const history = useHistory()

  const letsGo = async () => {


    if (token) {
      const decode = await jwt.decode(token)
      console.log(decode)
      const { data } = await axios.post(`${backEndUrl}/posts/save`, { status: "incomplete", user: decode.user._id },
        {
          headers: { clone: token }
        })
      console.log(data)
      history.push(`/host/${data._id}/Type_Of_Property`)
    }
    else {
      history.push("/login")
    }
  }

  return (


    <Box sx={{ width: "100%", height: "auto", }}>
      <Box sx={{ width: "100%", height: 70, marginTop: 5, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "absolute" }}>

        <Box component={Link} to={"/"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "white", padding: 2, '&:hover': { textDecoration: "underline" } }}><HomeIcon sx={{ fontSize: 24 }} /> <Typography sx={{ fontSize: 24, fontWeight: "bold", }}> Home</Typography></Box>
        <Box component={Link} to={"/where_we"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "white", padding: 2, '&:hover': { textDecoration: "underline" } }}><MapIcon sx={{ fontSize: 24 }} /> <Typography sx={{ fontSize: 24, fontWeight: "bold", }}> where we go?</Typography></Box>
        <Box component={Link} to={"/host"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "white", padding: 2, '&:hover': { textDecoration: "underline" } }}><PostAddIcon sx={{ fontSize: 24 }} /><Typography sx={{ fontSize: 24, fontWeight: "bold", }}> Host your place</Typography></Box>
      </Box>


      <Box sx={{ position: "absolute", width: 500,bottom:5,right:0 }}>
        <Typography sx={{ fontSize: 48, textAlign: "center", color: "orange" }}> Earn with your property without any interupts </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button variant="outlined" color="primary" onClick={letsGo} sx={{}}> Let's Start</Button>
        </Box>

      </Box>
      <Box component="img" sx={{ height: "auto",width:"100%" }} src={door}></Box>

    </Box>


  )
}
export default Host