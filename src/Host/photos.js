



import React, { useState } from "react"
import {  Box, Button,ImageListItem ,ImageList } from "@mui/material";
import { Link,useParams } from "react-router-dom";


import axios from "axios";

import {backEndUrl} from "../backend"
function Photos() {

    const [files, setFiles] = useState([])
    const [photos, setPhotos] = useState([])
    const params=useParams()
    const fileUpdate = (e) => {
        console.log(e.target.files)
        setFiles(e.target.files)
    }
    const token=localStorage.getItem("clone")
    const onSubmitFile = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append("file", files[i])
        }

        const response = await axios.post(`${backEndUrl}/posts/upload`, data,{
            headers:{ clone:token}
          })
        onSuccess(response.data)
        const request=await axios.patch(`${backEndUrl}/posts/update/${params.id}`,{
            photos:response.data,
            status:"complete"
        },{
            headers:{ clone:token}
          })
        console.log(request)
     }
    const onSuccess = (files) => {
        setPhotos(files)

    }


    return (<Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            width: "100%",
            height: 620,
            bgcolor: 'background.paper',
            margin: -3
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
                }} >Let's add some photos of your place...</Box></Box>
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
                    height: 470,
                    width: "100%",
                }}>
                <Box sx={{ typography: { fontSize: 24, fontWeight: "bold" }, marginLeft: 3 }}>
                    <form method="post" action="#" onSubmit={onSubmitFile} >
                        <label> Select for cover photo:</label>
                        <input type="file" placeholder="select" sx={{ border: "none", textDecoration: "none" }} onChange={fileUpdate} multiple />


                       

                        <button sx={{ marginLeft: 3 }}>Upload</button>
                    </form>
                </Box>
                <Box sx={{ width: 500, height: "auto",marginLeft:3 }}>
                    <ImageList variant="masonry" cols={3} gap={8}>
                        {photos.map((item) => (
                            <ImageListItem key={item.originalname}>
                                <img
                                    src={`${backEndUrl}/${item.filename}?w=248&fit=crop&auto=format`}
                                    srcSet={`${backEndUrl}/${item.filename}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.originalname}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>


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
                    <Button  component={Link} to={`/Host/${params.id}/security`}>Back</Button></Box>
                <Box>
                    <Button sx={{}} component={Link} to={`/manage_host`}  >Next</Button>
                </Box>
            </Box>
        </Box>
    </Box>

    )
}
export default Photos