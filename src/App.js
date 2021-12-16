import {BrowserRouter, Switch, Route, useHistory} from "react-router-dom";


import Host from "./Host/Host";
import House from "./Host/TypeOfHouse";

import Model from "./Host/select_model";
import KindfOFPlace from "./Host/kind_of_space";
import FloorPlan from "./Host/floor_plan";
import Price from "./Host/price"

import Amenities from "./Host/amenities";
import Title from "./Host/title"
import Description from "./Host/description";
import Highlight from "./Host/highlights";
import Security from "./Host/security";
import Address from "./Host/address";
import photos from "./Host/photos"
import Home from "./pages/Home"
import login from "./authentication/login"
import Register from "./authentication/register"
import Manage from "./authentication/manage_host"
import PostList from "./pages/where_we"
import CardDetail from "./pages/card_detail"
import Profile from "./authentication/profile"
import NotFound from "./pagenotfound";
function AuthRoute({path,component:Component}){
    const history= useHistory()
    return ( <Route path={path}
        render={(props)=>{
           if(localStorage.getItem("clone"))
           {
            return <Component {...props}/>
           }
            else{
            
                   return history.push("/login")
                
            }
        }} 
       />
    )
}


function App(){
    return (
        
        <BrowserRouter>
        
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/host"  component={Host}/>
            <AuthRoute   path="/Host/:id/Type_Of_Property" component={House}/>
            
            <AuthRoute   path="/Host/:id/:houseType/select_model" component={Model}/>
            <AuthRoute   path="/Host/:id/kind_of_place" component={KindfOFPlace}/>
            <AuthRoute   path="/Host/:id/Floor_Plan" component={FloorPlan}/>
            <AuthRoute   path="/Host/:id/Price" component={Price}/>
            <AuthRoute   path="/Host/:id/amenities" component={Amenities}/>
            <AuthRoute   path="/Host/:id/title"  component={Title}/>
            <AuthRoute   path="/Host/:id/description"  component={Description}/>
            <AuthRoute   path="/Host/:id/highlight"component={Highlight}/>
            <AuthRoute   path="/Host/:id/security"component={Security}/>
            <AuthRoute   path="/Host/:id/address"component={Address}/>
            <AuthRoute   path="/Host/:id/Photos"component={photos}/>
            <AuthRoute   path="/manage_host" component={Manage}/>
            <AuthRoute   path="/profile" component={Profile}/>
            <Route path="/login"     component={login}/>
            <Route path="/Register" component={Register}/>
            
            <Route path="/where_we" component={PostList}/>
            <Route path="/findOne/:id" component={CardDetail}/>
            <Route path="*"  component={NotFound}/>


        </Switch>
        </BrowserRouter>
        

    )
}



export default App