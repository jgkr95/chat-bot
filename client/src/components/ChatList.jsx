// import { Box, ListItemText } from '@mui/material'
// import React from 'react'

// const ChatList = ({list}) => {
//     console.log('list: ', list);
//   return (
//     <Box sx={{display:'grid'}}>{
//         list.map((chat)=>{
//             return <>
//             <ListItemText sx={{pl:2,
// 											transition: "background-color 0.3s",
// 											"&:hover": {
// 												borderRadius: '5%',
// 												backgroundColor: "#cbced4",
// 											},
// 										}}>{chat?.chat?.[0]?.message}</ListItemText>
//             </>
//         })}
//         </Box>
//   )
// }

// export default ChatList
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { selectChat } from '../redux/chatSlice';
import { useDispatch } from 'react-redux';

import Alert from './Alert';

const ChatList = ({ list = [] }) => {
    const [hoverId, setHoverId] = useState('')
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const [selectedChatId, setSelectedChatId] = useState(null)

    const dispatch = useDispatch();

    const handleShareClick = (chatId) => {

        const shareUrl = `http://localhost:3000/${chatId}`
        setSnackbarMessage(`${shareUrl} copied to clipboard..`);
        setSnackbarSeverity('success');
        setIsSnackbarOpen(true);
        navigator.clipboard.writeText(`http://localhost:3000/${chatId}`);

    }

    const handleSelect = (chatId)=>{
        dispatch(selectChat(chatId))
        setSelectedChatId(chatId)
    }

    const handleSnackbarClose = () => {
        setIsSnackbarOpen(false);
    };
    return (
        <Box >
            <Typography component={'h3'} sx={{ fontWeight: 'bold' }}> Chat List</Typography>

            <List sx={{height:'60vh',overflow:'scroll'}}>
                {list.map((chat) => (
                    <ListItem key={chat.id} sx={{
                        border: '0.5px dotted white',
                        borderRadius: '5px',
                        mt: '5px',
                        backgroundColor: selectedChatId === chat.id ? '#b5b8bd' : 'inherit',
                        p: 0, pl: 1, height: '30px', "&:hover": {
                            borderRadius: '10px',
                            opacity: 0.7
                        },
                    }} 
                    onClick={()=>handleSelect(chat.id)}
                    onMouseEnter={() => { setHoverId(chat.id) }} onMouseLeave={() => { setHoverId('') }}>
                        <ListItemText primary={chat?.chat?.[0]?.message} />
                        {hoverId === chat.id &&
                            <Button fontSize="small" sx={{ textTransform: 'none' }} onClick={(e) => { e.stopPropagation(); handleShareClick(chat.id) }}>
                                share
                            </Button>
                        }
                    </ListItem>
                ))}
            </List>
            <Alert
                open={isSnackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleSnackbarClose}
            />
        </Box>
    );
};

export default ChatList;