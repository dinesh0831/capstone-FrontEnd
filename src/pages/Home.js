import { Box,  Button, Typography,Grid,Card,CardMedia,CardContent,CardActionArea,} from "@mui/material";

import React from "react";
import { Link,  useHistory } from "react-router-dom"
import lake from "../asset/lake.jpg"
import chairs from "../asset/chairs.jpg"
import house from "../asset/house.jpg"
import garlic from "../asset/garlic.jpg"
import porch from "../asset/porch.jpg"
import beach from "../asset/beach.jpg"

import MapIcon from '@mui/icons-material/Map';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HomeIcon from '@mui/icons-material/Home';

import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

function Home() {
    const [state, setState] = React.useState({

        right: false,
    });
    const history = useHistory()
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


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


    return (
        <Box sx={{ margin: -1 }}>

            <Box sx={{ width: "100%", height: 70, display: "flex", alignItems: "center", position: "absolute", justifyContent: "center", justifySelf: "center", overflow: "hidden" }}>

                <Box component={Link} to={"/"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "white", padding: 2, '&:hover': { textDecoration: "underline" } }}><HomeIcon sx={{ fontSize: 24 }} /> <Typography sx={{ fontSize: 24, fontWeight: "bold", }}> Home</Typography></Box>
                <Box component={Link} to={"/where_we"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "white", padding: 2, '&:hover': { textDecoration: "underline" } }}><MapIcon sx={{ fontSize: 24 }} /> <Typography sx={{ fontSize: 24, fontWeight: "bold", }}> where we go?</Typography></Box>
                <Box component={Link} to={"/host"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "white", padding: 2, '&:hover': { textDecoration: "underline" } }}><PostAddIcon sx={{ fontSize: 24 }} /><Typography sx={{ fontSize: 24, fontWeight: "bold", }}> Host your place</Typography></Box>
            </Box>



            <Box sx={{ position: "absolute", right: 0, height: 70, display: "flex", alignItems: "center", }}>

                <React.Fragment >
                    <Button onClick={toggleDrawer("right", true)}><MenuIcon sx={{ fontSize: 24, color: "white", }} /></Button>
                    <Drawer
                        anchor={"right"}
                        open={state.right}
                        onClose={toggleDrawer("right", false)}
                    >
                        {list("right")}
                    </Drawer>
                </React.Fragment>

            </Box>



            <Box sx={{ height: 550, overflow: "hidden" }}>
                <Box component="img" sx={{


                    width: "100%",

                    overflow: "hidden",

                    bgcolor: 'background.paper',

                }} src={lake}>


                </Box>
            </Box>
            <Box sx={{}}>
                <Grid container spacing={2} style={{ padding: "20px" ,display:"flex",justifyContent:"center"}}>
                <Grid  item>
                <Card    sx={{ textDecoration:"none",height:300 ,maxWidth: 225 }}>
                    <CardActionArea component={Link} to={`/where_we`}>
                <CardMedia
                    component="img"
                    height="140"
                    
                    src={beach}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography variant="body2" color="text.primary">
                     hello to the everyone
                    </Typography>
                    
                </CardContent>
                </CardActionArea>
               
            </Card>
            </Grid>
            <Grid  item>
                <Card    sx={{ textDecoration:"none",height:300 ,maxWidth: 225 }}>
                    <CardActionArea component={Link} to={`/where_we`}>
                <CardMedia
                    component="img"
                    height="140"
                    
                    src={chairs}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                     hello to the everyone
                    </Typography>
                    
                </CardContent>
                </CardActionArea>
               
            </Card>
            </Grid>
            <Grid  item>
                <Card    sx={{ textDecoration:"none",height:300 ,maxWidth: 225 }}>
                    <CardActionArea component={Link} to={`/where_we`}>
                <CardMedia
                    component="img"
                    height="140"
                    
                    src={house}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                     hello to the everyone
                    </Typography>
                    
                </CardContent>
                </CardActionArea>
               
            </Card>
            </Grid>
            <Grid  item>
                <Card    sx={{ textDecoration:"none",height:300 ,maxWidth: 225 }}>
                    <CardActionArea component={Link} to={`/where_we`}>
                <CardMedia
                    component="img"
                    height="140"
                    
                    src={porch}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                     hello to the everyone
                    </Typography>
                    
                </CardContent>
                </CardActionArea>
               
            </Card>
            </Grid>
            <Grid  item>
                <Card    sx={{ textDecoration:"none",height:300 ,maxWidth: 225 }}>
                    <CardActionArea component={Link} to={`/where_we`}>
                <CardMedia
                    component="img"
                    height="140"
                    
                    src={garlic}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                     hello to the everyone
                    </Typography>
                    
                </CardContent>
                </CardActionArea>
               
            </Card>
            </Grid>
           
          
                </Grid>
            </Box>

                <Box sx={{width:"100%",bgcolor:"black",height:70,display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Typography sx={{color:"white"}}>@copyrights by capstone </Typography>
                </Box>

        </Box>
    )


}
export default Home