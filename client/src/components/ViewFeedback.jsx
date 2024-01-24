import React from 'react'
import { Typography, Rating,Box } from "@mui/material";

const ViewFeedback = ({feedback}) => {
    return (
        <Box sx={{p:5,border: `1px solid lightgray`,m:4, borderRadius:5}}>
            <Typography sx={{fontWeight:"bold",mt:-3,mb:3}}>Feedback</Typography>
            <Typography>Rating:
            </Typography>
                 <Rating name="read-only" value={feedback?.rating} readOnly />
            <Typography>Comment: {feedback?.comment}</Typography>
        </Box>
    )
}

export default ViewFeedback