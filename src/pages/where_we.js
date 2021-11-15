import axios from "axios"
import { useState, useEffect } from "react";
import MapIcon from '@mui/icons-material/Map';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HomeIcon from '@mui/icons-material/Home';
import { Button, Box, Typography, Card, CardMedia, CardActions, CardContent, CardActionArea, Grid, IconButton } from "@mui/material";
import { Link, useHistory,  } from "react-router-dom"
import jwt from "jsonwebtoken"
import { backEndUrl } from "../backend"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
function PostList() {
    const [values, setValues] = useState([])
    
    const history = useHistory()
    const [wish, setWish] = useState(false)
    const [state, setState] = useState({

        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const getPost = async () => {
        const { data } = await axios.get(`${backEndUrl}/getpost/get`)
        var post = data

        post = post.filter(rows => rows.status === "complete")
        console.log(post)
        setValues(post)
        console.log(data)

    }
    useEffect(() => {

        getPost()

    }, [])
    const token = localStorage.getItem("clone")
    const wishList = async (id, title, town) => {
        if (token) {
            const decode = await jwt.decode(token)
            console.log(decode)
            const { data } = await axios.get(`${backEndUrl}/users/profile/${decode.user._id}`)
            const userWishlist = {
                wishlightId: id,
                wishlistTitle: title,
                wishlistTown: town,

            }


            let wishlist = [...data.wishList]
            await wishlist.push(userWishlist)
            setWish(true)
             await axios.patch(`${backEndUrl}/users/wishlist/${decode.user._id}`, {
                wishList: wishlist
            })
        }
        else {
            history.push("/login")

        }
    }
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

    console.log(values)
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
                <Box sx={{ width: "100%", height: 70, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", }}>

                    <Box component={Link} to={"/"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "black", padding: 2, '&:hover': { textDecoration: "underline" } }}><HomeIcon sx={{ fontSize: 24 }} /> <Typography sx={{ fontSize: 24, fontWeight: "bold", }}> Home</Typography></Box>
                    <Box component={Link} to={"/where_we"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "black", padding: 2, '&:hover': { textDecoration: "underline" } }}><MapIcon sx={{ fontSize: 24 }} /> <Typography sx={{ fontSize: 24, fontWeight: "bold", }}> where we go?</Typography></Box>
                    <Box component={Link} to={"/host"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "black", padding: 2, '&:hover': { textDecoration: "underline" } }}><PostAddIcon sx={{ fontSize: 24 }} /><Typography sx={{ fontSize: 24, fontWeight: "bold", }}> Host your place</Typography></Box>
                </Box>
         
            <Grid container spacing={2} style={{ padding: "20px" }}>
                {values.map(rows => {

                    return (
                        <Grid key={rows._id} item>
                            <Card sx={{ textDecoration: "none", height: 300, Width: 250 }}>
                                <CardActionArea component={Link} to={`/findOne/${rows._id}`}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`${backEndUrl}/${rows.photos[0].filename}`}
                                        alt={rows.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {rows.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            House Type:{rows.houseType}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: "bold" }} color="text.secondary">
                                            Price:{rows.price}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <IconButton onClick={() => wishList(rows._id, rows.title, rows.town)} size="small">{wish ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon />}</IconButton>

                                </CardActions>
                            </Card>
                        </Grid>)
                })}
            </Grid>
        </Box>

    )
}
export default PostList
