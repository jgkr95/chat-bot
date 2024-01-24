import React, { useState, useEffect, useMemo } from "react";
import { TextField, Box, ListItemText } from "@mui/material";
import {  generateUniqueId, BASE_URL } from "../utils/utils";

import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import { SvgIcon,Button } from "@mui/material";
import Feedback from "./Feedback"
import { useDispatch,useSelector } from 'react-redux';
import { addChatMessage,selectChatList,selectSelectedChatId ,selectChat } from '../redux/chatSlice'; 
import axios from "axios"
import { useParams } from "react-router-dom";
import ViewFeedback from "./ViewFeedback"
import { } from "../redux/chatSlice";
const Chat = () => {

	const dispatch = useDispatch();

	const { chatId } = useParams();
	const selectedChatId = useSelector(selectSelectedChatId);

	let  chatConversation = useSelector(selectChatList);

	chatConversation = useMemo(()=>{
		if(selectedChatId) return chatConversation?.find(c => c.id === selectedChatId ) || []
		return chatConversation?.find(c => c.id === chatId ) || []
	},[chatId,selectedChatId])

	

	const [chat, setChat] = useState([]);
	const [message, SetMessage] = useState("");
	const [hovered, setHovered] = useState({});
	const [feedbackOpen, setFeedbackOpen] = useState(false)

	useEffect(()=>{
		if(chatId){
			
			setChat(chatConversation?.chat)
		}
	},[chatId])

	useEffect(()=>{
		if(selectedChatId){
			
			setChat(chatConversation?.chat)
		}
		return ()=> dispatch(selectChat(null))
	},[selectedChatId])

	const handleAdd = (value) => {
		
		const chatCopy = [
			...chat,
			{
				message: value,
				reacttion: null,
				isUser: true,
			},
		];
		
		SetMessage("");

	
		setChat(() => chatCopy);
		getBotResponse(chatCopy);
	};

	const handleFeedback = async (feedback)=>{
		try{
			setFeedbackOpen(false);
			const response = await axios.post(`${BASE_URL}save-chats`,{ id: generateUniqueId(), chat, feedback })
			
			dispatch(addChatMessage(response.data));
			setChat([])
			SetMessage('')
		}catch(err){
			console.error(`logging error in Chat.js component ${err}`)

		}
		
	}
	const getBotResponse = async (chatCopy) => {
		// const message = await sleep(1000);
		try{

			const res = await axios.post(`${BASE_URL}chat-model`)
			
			chatCopy = [
				...chatCopy,
				res.data
			];

			setChat(chatCopy);
		}catch(err){
			chatCopy = [
				...chatCopy,
				{
						message: "Internal server error. Please try again...",
						isUser: false,
						reaction: null,
						isError: true,
				},
			];
			setChat(chatCopy)
			console.error(`logging error Chat.js component ${err}`)
		}
	};

	const setReactToMessage = (reaction, index) => {
		const chatCopy = [...chat];
		chatCopy[index].reaction = reaction;
		setChat(chatCopy);
	};

	const react = {
		dislike: <ThumbDownAltOutlinedIcon />,
		like: <ThumbUpRoundedIcon />,
	};

	return (
		<div
			style={{
				width: "50%",
				margin: "2rem",
				background: "gray",
				height: "80vh",
				position: "relative",
				borderRadius: '10px'
			}}
		>
			<Box sx={{height: '75%',overflow:'scroll'}}>
				{chat?.map((item, i) => {
					return (
						<div
							key={item.message + i}
							onMouseEnter={() => setHovered({ hover: true, index: i })}
							onMouseLeave={() => setHovered({})}
						>
							<ListItemText
								sx={{
									textAlign: !item.isUser ? "left" : "right",
									padding: "5px 20px",
								}}
							>
								{item.message}
							</ListItemText>
							{
								item?.reaction && <SvgIcon
								sx={{ml: "30px",color:'red'}}
								fontSize="small"
								>

									{react[item?.reaction]}
								</SvgIcon>
							}
							{!item.isUser && hovered.hover && hovered?.index == i && !item?.reaction  && (
								<Box
									sx={{
										display: "flex",
										ml: "30px",
										cursor: "pointer",
									}}
								>
			
										<ThumbUpOutlinedIcon
											fontSize="small"
											style={{
												pr: "5px",
												mb: "-10px",
												transition: "background-color 0.3s",
												"&:hover": {
													backgroundColor: "red",
												},
											}}
											onClick={() => {
												setReactToMessage("like", i);
											}}
										/>
								
									<ThumbDownAltOutlinedIcon
										sx={{
										transition: "background-color 0.3s",
										"&:hover": {
											borderRadius: '20%',
											backgroundColor: "lightcoral",
										},
									}}
										fontSize="small"
										onClick={() => {
											setReactToMessage("dislike", i);
										}}
									/>
								
								</Box>
							)}
						</div>
					);
				})}
			</Box>
			{!chatId ? <Box sx={{
				display:'flex',
					position: "absolute",
					bottom: "10px",
					width: "100%",
					paading: "20px",
					flexDirection:'column',
					// justifyContent: 'center',
					alignItems: 'center',
					// left: "2rem",
				}}>
			<TextField
				sx={{m:'2rem',width:'90%'}}
				onChange={(e) => {
					SetMessage(e.target.value);
				}}
				onKeyDown={(e) => {
					if (e.keyCode == 13) {
						handleAdd(e.target.value);
					}
				}}
				value={message}
				label="Message here"
				id="fullWidth"
			/>
		<Button onClick={()=>{setFeedbackOpen(true)}}
		 size="small" sx={{width:'15rem',mt:'10px',}}variant="outlined" color="error">
        End Conversation
      </Button>		
	  	</Box> : <ViewFeedback feedback={chatConversation?.feedback} />
		}

		<Feedback open={feedbackOpen} handleClose={handleFeedback} />
		</div>
	);
};

export default Chat;