import { useState,} from "react"
import { Box, Button,  } from "@mui/material";
import { Link ,useParams} from "react-router-dom";
import "./TypeOfHouse.css";
import axios from "axios";
import {backEndUrl} from "../backend"
const types = [
  {
    type: "Rental",
    description: "A rental place within a multi-unit residential building or complex.",
    house: "Flat"
  },
  {
    type: "Apartment",
    description: "A place within  multi-unit building or complex owned by the residents.",
    house: "Flat"
  },
  {
    type: "Loft",
    description: "An open-plan flat or apartment, which may have short interior walls.",
    house: "Flat"
  },
  {
    type: "Serviced apartment",
    description: "An apartment with hotel-like amenities serviced by a professional management company.",
    house: "Flat"
  },
  {
    type: "Casa particular",
    description: "A private room in a home that feels like a bed and breakfast in Cuba. ",
    house: "Flat"
  },
  {
    type: "Holiday home",
    description: "A furnished rental property that includes a kitchen and bathroom and offer some guest services, such as a reception desk.",
    house: "Flat"
  },
  {
    type: "Residential home",
    description: "A home that may stand alone or have shared walls.",
    house: "House"
  },
  {
    type: "Cabin",
    description: "A house made with natural material like wood and built in a natural setting.",
    house: "House"
  },
  {
    type: "Villa",
    description: "A luxury home that may have indoor-outdoor spaces, gardens, and pools.",
    house: "House"
  },
  {
    type: "Townhouse",
    description: "A terraced house that may have shared walls and outdoor spaces.",
    house: "House"
  },
  {
    type: "Cottage",
    description: "A cosy house built in a rural area or near a lake or beach.",
    house: "House"
  },
  {
    type: "Bungalow",
    description: "A single-level house with a wide front porch and sloping roof.",
    house: "House"
  },
  {
    type: "Earth house",
    description: "A home buint in the ground or made from materials like rammed earth. ",
    house: "House"
  },
  {
    type: "House boat",
    description: "A home that floats, which can be a boat used as a residence or a house. ",
    house: "House"
  },
  {
    type: "Hut",
    description: "A home made of wood or mud that may have a thatched straw roof. ",
    house: "House"
  },
  {
    type: "Farm stay",
    description: "A rural stay guest may spend time with animals, hiking, or crafting.",
    house: "House"
  },
  {
    type: "Dome house ",
    description: "A home with a domed roof or spherical shape, such as a bubble home.",
    house: "House"
  },
  {
    type: "Cycladic house",
    description: "A whitewashed with a flat roof found in the greek Cycladic island. ",
    house: "House"
  },
  {
    type: "Chalet",
    description: "A wooden house with a sloped roof, popular for spring or summer stays. ",
    house: "House"
  },
  {
    type: "Dammuso",
    description: "A stone house with a domed roof on the island of pantelleria. ",
    house: "House"
  },
  {
    type: "Lighthouse ",
    description: "A tower near water a bright light that helps to guid ships.",
    house: "House"
  },
  {
    type: "Shephersd's hut",
    description: "A tiny wagon on wheels originally used to follow sheep herds.",
    house: "House"
  },
  {
    type: "Tiny house ",
    description: "A stand-alone house that's usually less than 400 square feet (37 square metres).",
    house: "House"
  },
  {
    type: "Trullo",
    description: "A round, stone house with a cone-shaped roof, originating italy.",
    house: "House"
  },
  {
    type: "Casa particular",
    description: "A private room in a home that feels like a bed and breakfast in Cuba.",
    house: "House"
  },
  {
    type: "Pension ",
    description: "A house with a barbecue and communal space in the countryside of Korea.",
    house: "House"
  },
  {
    type: "Holiday home ",
    description: "A furnished rental property that includes a kitchen and bathroom and may offer some guest services , such as a reception desk.",

    house: "House"
  },
  {
    type: "Guest house",
    description: "A carriage house or coach house that shares that land with a main building.",
    house: "Secondary unit",
  },
  {
    type: "Guest suite",
    description: "A space with a private entrance inside of or attached to a larger structure.",
    house: "Secondary unit"
  },
  {
    type: "Farm stay",
    description: "A rural stay where guests may spend time with animals hiking or crafting.",
    house: "Secondary unit"
  },
  {
    type: "Holiday home",
    description: "A furnished rental property that includes a kitchen and bathroom and may offer some guest services, such as a reception desk. ",
    house: "Secondary unit"
  },
  {
    type: "Bed and Breakfast",
    description: "A hospitality business offering guests breakfast with a Host onsite. ",
    house: "Bed and breakfast"
  },
  {
    type: "Nature lodge",
    description: "A business offering stays near natural settings like forests or mountains.",
    house: "Bed and breakfast"
  },
  {
    type: "Farm stay",
    description: "A rural stay where guests may spend time with animals, hiking, or crafting.",
    house: "Bed and breakfast"
  },
  {
    type: "minsu",
    description: " A hospitality business offering guests private rooms in Taiwan.",
    house: "Bed and breakfast"
  },
  {
    type: "Casa particular",
    description: "A private room in a home that feels like a bed and breakfast in Cuba.",
    house: "Bed and breakfast"
  },
  {
    type: "Ryokan",
    description: "A small inn offering guests a unique cultural experience in Japan. ",
    house: "Bed and breakfast"
  },
  {
    type:"Barn",
    description:"A converted space in a building used for grain, livestock, farming.",
    house:"Unique space",
  },
  {
    type:"Boat",
    description:"A boat, sailing boat, or yacht moored during guest visits. Not a houseboat.",
    house:"Unique space"
  },
  {
    type:"Bus",
    description:"A converted multi-passenger vehicle with a creatively reimagined interior.",
    house:"Unique space"
  },
  {
    type:"Campervan/Motorhome",
    description:"A motorhome or campervan that's half-home and half vehicle",
    house:"Unique space"
  },
  {
    type:"Treehouse",
    description:"A place to staybuilt into the trunk or branches of a tree.",
    house:"Unique space"
  },
  {
    type:"Campsite",
    description:"An area of land where guests can set up a tent , yurt, motorhome, or tiny house",
    house:"Unique space"
  },
  {
    type:"Castle",
    description:"A majestic, possibly historical building that may have towers and moats,",
    house:"Unique space"
  },
  {
    type:"Cave",
    description:"A natural underground formation in a hillside or cliff.",
    house:"Unique space"
  },
  {
    type:"Dome house",
    description:"A home with a domed roof or spherical such as a bubble home.",
    house:"Unique space"
  },
  {
    type:"Earth House",
    description:"A home built in the ground or made from material like rammed earth.",
    house:"Unique space"
  },
  {
  type:"Farm stay",
  description:"A rural stay where guests may spend time with animals, hiking, crafting.",
  house:"Unique space"
  },
  {
    type:"Holiday park",
    description:"A plot of land with cabin or campsites in australia or New Zealand.",
    house:"Unique space"
  },
  {
    type:"Hut",
    description:"A home made of wood or mud that may have a thatched straw roof",
    house:"Unique space"
  },
  {
    type:"Igloo",
    description:"A dome-shaped structure made of snow and ice, found in cold climates",
    house:"Unique space"
  },
  {
    type :"island",
    description:"A peace of land surrounded by water.",
    house:"Unique space" 
  },
  {
    type:"Lighthouse",
    description:"A tower near water with a bright light that helps to guide ships.",
    house:"Unique space"
  },
  {
    type :"Plane",
    description:"An aircraft that's been converted in to stay",
    house:"Unique space"
},
{
  type:"Ranch",
  description:"A home on a large area of island used to raise livestock or crops. ",
  house:"Unique space"
},
{
  type:"Religious building",
  description:"A converted space in a former place of worship, such as a church or mosque.",
  house:"Unique space"
},
{
  type:"Shepered's hut",
  description:"A tiny wagon on wheels originally used to follow sheep herds.",
  house:"Unique space"
},
{
  type:"Shipping container",
  description:"A converted steel container once used to transport goods.",
  house:"Unique space"
},
{
  type:"Tent",
  description:"A usually portable collapsible structure made from fabric and poles.",
  house:"Unique space"
},
{
  type:"Tiny house",
  description:"A stand-alone house that's usually less 400 square feet(square metres).",
  house:"Unique space"
},
{
  type:"Tipi",
  description:"A cone-shaped tent supported by poles with a flap door and open top. ",
  house:"Unique space"
},
{
  type:"Tower",
  description:"A freestanding structure that's several storeys tall with a view.",
  house:"Unique space"
},
{
  type:"Train",
  description:"A brake van, covered wagon, or other railway carriage converted in to a living space.",
  house:"Unique space"
},
{
  type:"Windmill",
  description:"A structure with sail or blades used for wind power that has a living space.",
  house:"Unique space"
},
{
  type:"yurt",
  description:"A round tent built on a collapsiblewooden framework.",
  house:"Unique space"
},
{
  type:"Riad",
  description:"A traditional home with an open-air courtyard or garden in Morocco. ",
  house:"Unique space"
},
{
  type:"Pension",
  description:"A house with a barbecue and communal space in the countryside of Korea,",
  house:"Unique space"
},
{
  type:"Holiday home",
  description:"A furnished rental property that includes kitchen and bathroom and may offer some guest services, such as a reception desk.",
  house:"Unique space"
},
{
  type:"Hotel",
  description:"A business offering private rooms, suites, or unique stays for guests.",
  house:"Boutique hotel" 
},
{
  type:"Hostel",
  description:"A hospitality business that rents beds in shared dorms and private rooms.",
  house:"Boutique hotel" 
},
{
  type:"Resort",
  description:"A hospitality business with more amenities and services than a hotel.",
  house:"Boutique hotel" 
},
{
  type:"Nature lodge ",
  description:"A businesss offering stays near natural settings like forests or mountains.",
  house:"Boutique hotel" 
},
{
  type:"Boutique hotel",
  description:"A hospitality business with a unique style or theme defining its identity.",
  house:"Boutique hotel" 
},
{
  type:"Apart hotel",
  description:"A place with hotel-like amenities and rooms that feel like apartments.",
  house:"Boutique hotel"  
},
{
  type:"Serviced apartment",
  description:"An apartment with hotel-like amenities serviced by a professional management company.",
  house:"Boutique hotel" 
},
{
  type:"Heritage hotel",
  description:"A historic building converted in to guest accommodation in India.",
  house:"Boutique hotel" 
},
{
  type:"Kezhan",
  description:"A place to stay with local character and sophisticated amenities in China.",
  house:"Boutique hotel" 
}


]




function Model() {
  
 const [button,setButton]=useState(true)
  const params=useParams()
  const token=localStorage.getItem("clone")
  const handleChange =async (id,value) => {
    const {data}=await axios.patch(`${backEndUrl}/posts/update/${id}`,{kindOfType:value},
    {
      headers:{ clone:token}
    })
    console.log(data)
    if (data.message==="successfully updated"){
      setButton(false)
      }
  }
  
  const match=types.filter(types=>types.house===params.houseType)
  



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
        width:"50%",
        display: 'flex',
        
        alignItems: 'center',
      }}>
        <Box sx={{ typography: { fontSize: 50, fontWeight: "bold" }, textAlign: "center", color: "white", }} >Which of these best describes your place?</Box></Box>
      <Box sx={{ width: "50%", display: "flex-inline" }} >
        <Box className="top" sx={{ borderColor: "black", display: "flex", justifyContent: 'flex-end', height: "max-content", }}>
          <Box className="top-content" sx={{ margin: 2, }}><Button component={Link} to={`/manage_host`}>save&exit</Button></Box>
        </Box>
        <Box className="middle" sx={{ display: "flex-inline", justifyContent: "center" ,overflow: "auto", height: 580, }}>
        {match.map(types => {
        
          return(<Box component="button"  className="choosing" name="Type_of_house" key={types.type} value={types.type} onClick={()=>handleChange(params.id,types.type)} sx={{ border: 0.3, borderColor: "black", borderRadius: 3, margin: 2, bgcolor: "white", width:"75%", marginLeft:10,marginRight:10,height: 100,display: "flex-inline", '&:hover': { border: 3 }, '&:focus': { border: 3,borderColor:"green"  } }}>

           <Box sx={{ typography: { fontSize: 24},}}>{types.type}</Box><br/>
           <Box sx={{ typography: { fontSize: 16}}}>{types.description}</Box>
          </Box>)
        })}
        </Box>
        <Box className="end" sx={{ display: 'flex', alignSelf: "flex-end", marginTop: 3 }}>
          <Box sx={{ flexGrow: 1 }} >
            <Button component={Link} to={`/Host/${params.id}/Type_Of_Property`} >Back</Button></Box>
          <Box>
            <Button sx={{}} disabled={button} component={Link} to={`/Host/${params.id}/kind_of_place`}>Next</Button>
          </Box>
        </Box>
      </Box>
    </Box>

  )
}
export default Model
