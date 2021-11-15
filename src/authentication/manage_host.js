import { Box, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material"
import MapIcon from '@mui/icons-material/Map';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HomeIcon from '@mui/icons-material/Home';
import TableCell from '@mui/material/TableCell';

import { useState, useEffect } from "react";
import axios from "axios"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useHistory } from "react-router-dom"
import {backEndUrl} from "../backend"


function Manage() {
    const [post, setPost] = useState([])
    const token = localStorage.getItem("clone")

    const getPost = async () => {
        try{
        const { data } = await axios.get(`${backEndUrl}/posts/save`, {
            headers: { clone: token }
        })
        setPost(data)
    }
    catch(err){
        console.log(err)
    }
    }
    useEffect(() => {

        getPost()

    },[])
    const history = useHistory()
    const editPage = (id) => {
        if (token) {
            history.push(`/host/${id}/Type_Of_Property`)
        }

    }
    const deletePost = async (id) => {
        try {
            await axios.delete(`${backEndUrl}/posts/${id}`, {
                headers: { clone: token }
            })
            let value = [...post]
            value =value.filter((post) => post._id !== id)
            setPost(value)
           
        }

        catch (err) {
            console.error("error", err)
        }
    }
    console.log(post)
    return (
        <Box sx={{ margin: -1 }} >
            <Box sx={{ width: "100%", height: 70, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", }}>

                <Box component={Link} to={"/"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "black", padding: 2, '&:hover': { textDecoration: "underline" } }}><HomeIcon sx={{ fontSize: 24 }} /> <Typography sx={{ fontSize: 24, fontWeight: "bold", }}> Home</Typography></Box>
                <Box component={Link} to={"/where_we"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "black", padding: 2, '&:hover': { textDecoration: "underline" } }}><MapIcon sx={{ fontSize: 24 }} /> <Typography sx={{ fontSize: 24, fontWeight: "bold", }}> where we go?</Typography></Box>
                <Box component={Link} to={"/host"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "black", padding: 2, '&:hover': { textDecoration: "underline" } }}><PostAddIcon sx={{ fontSize: 24 }} /><Typography sx={{ fontSize: 24, fontWeight: "bold", }}> Host your place</Typography></Box>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Town</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                   
                        {post.map(row => {
                            return (  
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                {row.title}
                                </TableCell>
                                
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">{row.town}</TableCell>
                                <TableCell align="right"><Button onClick={() => editPage(row._id)} variant="outlined" startIcon={< ModeEditIcon />}>
                                    Edit
                                </Button></TableCell>
                                <TableCell align="right"><Button variant="outlined" onClick={() => deletePost(row._id)} startIcon={<DeleteIcon />}>
                                    Delete
                                </Button></TableCell>
                            </TableRow>)
                          
                        })}
                        </TableBody>
                </Table>
            </TableContainer>
        </Box>

    )
}
export default Manage

