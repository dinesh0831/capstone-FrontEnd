

import axios from "axios"
import React, { useState, useEffect } from "react";
import MapIcon from '@mui/icons-material/Map';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HomeIcon from '@mui/icons-material/Home';
import { Button, Box, Typography, Card, CardMedia, CardContent,Paper,Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import TableCell  from '@mui/material/TableCell';
import { Link, useHistory,} from "react-router-dom"
import jwt from "jsonwebtoken"
import {backEndUrl} from "../backend"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';

import LoginIcon from '@mui/icons-material/Login';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

function Profile() {
    const [post, setPost] = useState([])
    const [wishList,setWishlist]=useState([])
    const [bookedList, setBookedlist]=useState([])
    const token = localStorage.getItem("clone")
    const [state, setState] = useState({

        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const history=useHistory()
    const getPost = async () => {

        if(token){
            const decode = jwt.decode(token)
            console.log(decode)
        const { data } = await axios.get(`${backEndUrl}/users/profile/${decode.user._id}`)
        setPost(data)
        console.log(data)
        setWishlist(data.wishList)
        setBookedlist(data.bookedList)
        }
    }
    useEffect(() => {

        getPost()

    })
    const loggedIn = () => {

        return localStorage.getItem("clone") ? localStorage.removeItem("clone") : history.push("/login")
    }
    const profile = () => {
        console.log(history)
        return localStorage.getItem("clone") ? history.push("/profile") : history.push("/login")
    }
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>

                <ListItem button onClick={profile}>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Profile"} />
                </ListItem>

                {localStorage.getItem("clone") ?
                    <>
                        <ListItem button component={Link} to={"/host"}>
                            <ListItemIcon>
                                <PostAddIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Host Your Place"} />
                        </ListItem>
                        <ListItem button component={Link} to={'/manage_host'} >
                            <ListItemIcon>
                                <ManageAccountsIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Manage Hosting"} />
                        </ListItem>
                    </> : ""}

                <ListItem button component={Link} to={'/where_we'}>
                    <ListItemIcon>
                        <MapIcon />
                    </ListItemIcon>
                    <ListItemText primary={"where We Go"} />
                </ListItem>
                <ListItem button onClick={loggedIn}>
                    <ListItemIcon>
                        <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary={localStorage.getItem("clone") ? "Logout" : "login"} />
                </ListItem>


            </List>


        </Box>
    );
console.log(post)
    return (
        <Box >
            <Box sx={{ position: "absolute", right: 0, height: 70, display: "flex", alignItems: "center", }}>
                        <Button onClick={toggleDrawer("right", true)}><MenuIcon sx={{ fontSize: 24, color: "black", }} /></Button>
                        <Drawer
                            anchor={"right"}
                            open={state.right}
                            onClose={toggleDrawer("right", false)}
                        >
                            {list("right")}
                        </Drawer>
                </Box>
            <Box sx={{ height: 70, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", }}>

                <Box component={Link} to={"/"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "black", padding: 2, '&:hover': { textDecoration: "underline" } }}><HomeIcon sx={{ fontSize: 24 }} /> <Typography sx={{ fontSize: 24, fontWeight: "bold", }}> Home</Typography></Box>
                <Box component={Link} to={"/where_we"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "black", padding: 2, '&:hover': { textDecoration: "underline" } }}><MapIcon sx={{ fontSize: 24 }} /> <Typography sx={{ fontSize: 24, fontWeight: "bold", }}> where we go?</Typography></Box>
                <Box component={Link} to={"/host"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "black", padding: 2, '&:hover': { textDecoration: "underline" } }}><PostAddIcon sx={{ fontSize: 24 }} /><Typography sx={{ fontSize: 24, fontWeight: "bold", }}> Host your place</Typography></Box>
            </Box>
            <Box sx={{ display: "flex", }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Card sx={{ width: 250, height: "max-content" }}>

                        <CardMedia sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: 100 }} alt="green iguana">
                            <AccountCircleIcon sx={{ fontSize: 64 }} />
                        </CardMedia>

                        <CardContent sx={{ display: "block", marginLeft: 6, marginRight: 5 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {post.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">{post.email} </Typography>
                            <Typography variant="body2" color="text.secondary">{post.mobileno} </Typography>
                           

                        </CardContent>

                    </Card>
                </Box>
                <Box sx={{ marginLeft: 3, }}>
                    <Box>
                        <Typography gutterBottom variant="h5" component="div">Booked List  </Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell align="right">Start Date</TableCell>
                                        <TableCell align="right">End Date</TableCell>
                                        <TableCell align="right">Preview</TableCell>

                                       
                                        
                                    </TableRow>
                                </TableHead>

                                <TableBody>

                                    {bookedList.map(row => {
                                        return (
                                            <TableRow
                                                key={row.startDate}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.title}
                                                </TableCell>

                                                <TableCell align="right">{row.startDate}</TableCell>
                                                <TableCell align="right">{row.endDate}</TableCell>
                                                <TableCell align="right"> <Button component={Link} to={`/findOne/${row.bookingId}`}>preview</Button></TableCell>
                                                
                                            </TableRow>)

                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box>
                        <Typography gutterBottom variant="h5" component="div"> Wished List </Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                       
                                        <TableCell align="right">Town</TableCell>
                                        <TableCell align="right">Preview</TableCell>
                                       
                                    </TableRow>
                                </TableHead>

                                <TableBody>

                                    {wishList.map(row => {
                                        return (
                                            <TableRow
                                                key={row.wishlightId}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.wishlistTitle}
                                                </TableCell>

                                                
                                                <TableCell align="right">{row.wishlistTown}</TableCell>
                                                <TableCell align="right"><Button component={Link} to={`/findOne/${row.wishlightId}`}>preview</Button></TableCell>
                                                
                                            </TableRow>)

                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                </Box>
            </Box>

        </Box>
    )
}
export default Profile
