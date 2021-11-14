   import {Box,Typography} from "@mui/material"
   
   function NotFound(){
       return(<Box sx={{display:"flex",width:"100%",height:600,justifyContent:"center",alignItems:"center"}}>
           <Typography sx={{fontSize:64}}>
                404 Page Not Found 
           </Typography>
       </Box>
       )
   }
   export default NotFound