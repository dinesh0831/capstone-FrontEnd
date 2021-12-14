import axios from "axios"
import React, { useState, useEffect } from "react";
import MapIcon from '@mui/icons-material/Map';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HomeIcon from '@mui/icons-material/Home';
import { Button, Box, Typography, ImageListItem, ImageList, TextField } from "@mui/material";
import { Link, useHistory, useParams } from "react-router-dom"
import jwt from "jsonwebtoken"
import DateRangePicker from '@mui/lab/DateRangePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { backEndUrl } from "../backend"

import frLocale from 'date-fns/locale/fr';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
function CardDetail() {
    const [values, setValues] = useState([])
    const [photos, setPhotos] = useState([])
    const [amenities, setAmenities] = useState([])
    const [highlight, setHighlight] = useState([])
    const [book, setBook] = useState("")


    const params = useParams()
    const [value, setValue] = React.useState([null, null]);
    const [state, setState] = useState({

        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const token = localStorage.getItem("clone")
    const history = useHistory()
    const getPost = async () => {
        const { data } = await axios.get(`${backEndUrl}/getpost/getone/${params.id}`)
        setValues(data)
        console.log(data)
        setPhotos(data.photos)
        setAmenities(data.amenities)
        setHighlight(data.highlights)

    }


    useEffect(() => {

        getPost()

    },)
    const loggedIn = () => {

        return localStorage.getItem("clone") ? localStorage.removeItem("clone") : history.push("/login")
    }
    const profile = () => {
        console.log(history)
        return localStorage.getItem("clone") ? history.push("/profile") : history.push("/login")
    }
    const bookNow = async () => {
        if (token) {
            const decode = jwt.decode(token)
            const response = await axios.get(`${backEndUrl}/getpost/getone/${params.id}`)
            const booking = {
                startDate: value[0],
                endDate: value[1],
                bookingStatus: "Booked",
                bookingdId: decode.user._id
            }

            let booked = [...response.data.booked]
            console.log(booked)
            await booked.push(booking)

            await axios.patch(`${backEndUrl}/posts/update/${params.id}`, {
                booked
            },
                {
                    headers: { clone: token }
                })
            const { data } = await axios.get(`${backEndUrl}/users/profile/${decode.user._id}`)
            const userBooking = {
                startDate: value[0],
                endDate: value[1],
                bookingStatus: "Booked",
                bookingId: params.id,
                title: values.title,
            }

            const bookedlist = [...data.bookedList]
            await bookedlist.push(userBooking)

            await axios.patch(`${backEndUrl}/users/wishlist/${decode.user._id}`, {
                bookedList: bookedlist
            })
            setBook( " *Your Booking Request successfully Send. please Check your Profile for more detail")
        }

        else {
            history.push("/login")

        }

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

    return (
        <Box>
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
            <Box sx={{ width: "100%", height: 70, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", }}>

                <Box component={Link} to={"/"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "black", padding: 2, '&:hover': { textDecoration: "underline" } }}><HomeIcon sx={{ fontSize: 24 }} /> <Typography sx={{ fontSize: 24, fontWeight: "bold", }}> Home</Typography></Box>
                <Box component={Link} to={"/where_we"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "black", padding: 2, '&:hover': { textDecoration: "underline" } }}><MapIcon sx={{ fontSize: 24 }} /> <Typography sx={{ fontSize: 24, fontWeight: "bold", }}> where we go?</Typography></Box>
                <Box component={Link} to={"/host"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "black", padding: 2, '&:hover': { textDecoration: "underline" } }}><PostAddIcon sx={{ fontSize: 24 }} /><Typography sx={{ fontSize: 24, fontWeight: "bold", }}> Host your place</Typography></Box>
            </Box>
            <Box sx={{ display: "flex" }}>
                <Box sx={{ marginLeft: 5, width: "70%",border:.5,borderRadius:2,marginRight:5,padding:5 }}>
                    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                        {photos.map((item) => (
                            <ImageListItem key={item.originalname}>
                                <img
                                    src={`${backEndUrl}/${item.filename}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${backEndUrl}/${item.filename}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <Box>
                        <Typography gutterBottom variant="h5" component="div">{values.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{values.description}</Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Price: {values.price}/per night
                        </Typography>
                        <Box>
                            <Typography gutterBottom variant="h5" component="div">Amenities:</Typography>
                            <Box className="middle"
                                sx={{
                                    display: "flex",

                                    overflow: "auto",
                                    height: "auto",
                                    width: "100%",
                                }}>
                                {amenities.map((types, row) => {

                                    return (

                                        <Box key={types} className="choosing"
                                            sx={{
                                                typography: { fontSize: 16 }, display: "flex", justifyContent: "center", alignItems: "center", border: 0.3,
                                                borderColor: "black", color: "black", margin: 1, borderRadius: 3,
                                                bgcolor: "white", padding: 3, marginLeft: 3, height: 30,

                                            }}>

                                            {types}
                                        </Box>)

                                })}


                            </Box>
                        </Box>
                        <Box>
                            <Typography gutterBottom variant="h5" component="div">Highlights:</Typography>
                            <Box className="middle"
                                sx={{
                                    display: "flex",

                                    overflow: "auto",
                                    height: "auto",
                                    width: "100%",
                                }}>
                                {highlight.map((types, row) => {

                                    return (

                                        <Box key={types} className="choosing"
                                            sx={{
                                                typography: { fontSize: 16 }, display: "flex", justifyContent: "center", alignItems: "center", border: 0.3,
                                                borderColor: "black", color: "black", margin: 1, borderRadius: 3,
                                                bgcolor: "white", marginLeft: 3, height: 30, padding: 3,

                                            }}>

                                            {types}
                                        </Box>)

                                })}


                            </Box>
                        </Box>
                        <Box>
                            <Typography gutterBottom variant="h5" component="div">Type of place:</Typography>
                            <Box sx={{ marginLeft: 3 }}>
                                <Typography gutterBottom variant="h6" component="div">
                                    Property type: {values.houseType}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    Place to share: {values.kindOfShare}
                                </Typography>


                            </Box>

                        </Box>

                    </Box>

                </Box>
                <Box sx={{ width: "30%", height: "50%", padding: 1, border: 1, borderRadius: 2,marginRight:5 }}>
                    
                    <Box className="date_picker" >
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                            <DateRangePicker
                                startText="Check-in"
                                endText="Check-out"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(startProps, endProps) => (
                                    <React.Fragment>
                                        <TextField {...startProps} />
                                        <Box sx={{ mx: 2 }}> to </Box>
                                        <TextField {...endProps} />
                                    </React.Fragment>
                                )}
                            />
                        </LocalizationProvider>
                        <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
                            <Button onClick={bookNow}>Book Now</Button>
                        </Box>
                        
                        <Typography sx={{color:"green",border:"black",textAlign:"center" }}>{book}</Typography>
                        

                    </Box>




                </Box>
            </Box>
        </Box>
    )

}
export default CardDetail