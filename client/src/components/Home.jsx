// Home.js
import React from 'react';
import SideBar from './SideBar'; // Replace with the actual path to your SideBar component
import Chat from './Chat'; // Replace with the actual path to your Chat component
import { Box, Typography } from '@mui/material';
const Home = () => {
  return (
    <Box sx={{background:'#f3f3f3',mt:-4 }}>
      <Box sx={{height: '10vh',backgroundColor:'#95ab9b',m:'2rem',mb:0,borderRadius:'5px',display:'flex',justifyContent:'center',alignItems:'center'}}>
<Typography sx={{fontWeight: 'bold',fontSize:30}}>Chat with AI Model</Typography>
      </Box>
    <Box style={{ display: 'flex',height:'85%'}}>
     <SideBar />
				<Chat />
    </Box>

    </Box>
  );
};

export default Home;
