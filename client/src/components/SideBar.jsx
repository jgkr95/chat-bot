import { Box, Typography } from "@mui/material";
import React ,{useEffect} from "react";
import { useSelector } from 'react-redux';
import ChatList from "./ChatList";
import {selectChatList} from "../redux/chatSlice"
import { Select, MenuItem, FormControl } from '@mui/material';
import { useState } from "react";

export const SideBar = () => {
	const chats = useSelector(selectChatList);
	const [filtereChats, setFilteredChats] = useState(chats);
	const [filterValue,setFilterValue] = useState("")

	useEffect(() => {
		// Update filteredChats whenever chats or filterValue changes
		if (filterValue) {
		  setFilteredChats(chats.filter((chat) => chat.feedback.rating > filterValue));
		} else {
		  // If "All Ratings" is selected, show all chats
		  setFilteredChats(chats);
		}
	  }, [chats, filterValue]);

	console.log('chatList: ', chats);
	const handleRatingSelect = (event) => {
		setFilterValue(event.target.value);
		if(filterValue){
			setFilteredChats(chats.filter((chat)=>chat.feedback.rating > event.target.value))
		}else{
			setFilteredChats(chats)
		}
	  };
	return (
		<Box
			sx={{
				width: "20%",
				margin: "2rem",
				backgroundColor: "#919499",
				height: "80vh",
				borderRadius: '5px',
				position: 'relative'
			}}
		>
			<Box sx={{p:2}}>
				<ChatList list={filtereChats} />
				<FormControl  sx={{position: 'absolute', bottom:'20px',width: '80%'}}>
        {/* <InputLabel >Filter By</InputLabel> */}
		<Typography>Filters:</Typography>
        <Select size="small" onChange={handleRatingSelect} defaultValue="">
          <MenuItem value="">All Ratings</MenuItem>
          <MenuItem value={1}>1 Star</MenuItem>
          <MenuItem value={2}>2 Stars</MenuItem>
          <MenuItem value={3}>3 Stars</MenuItem>
		  <MenuItem value={4}>4 Stars</MenuItem>
		  <MenuItem value={5}>5 Stars</MenuItem>
          {/* Add more menu items for other ratings if needed */}
        </Select>
      </FormControl>
			</Box>
		</Box>
	);
};
export default SideBar;
