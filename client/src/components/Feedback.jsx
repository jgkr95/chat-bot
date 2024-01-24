import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const FeedbackDialog = ({ open, handleClose }) => {
  //   const [open, setOpen] = useState(open);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    setRating(0);
    setComment("");
  }, [open]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  //   const handleOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleFeedbackSubmit = () => {
    // Add logic for submitting feedback if needed
    // console.log(`Feedback submitted: ${rating}`);
    handleClose({ rating, comment });
  };

  return (
    // <div>
    //   <Button variant="outlined" onClick={handleOpen}>
    //     Rate this conversation
    //   </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "bold" }}>Feedback</DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="h6">Please rate this conversation:</Typography>
          <Rating
            name="conversation-rating"
            value={rating}
            onChange={handleRatingChange}
            precision={0.5}
          />

          <TextField
            sx={{ mt: 2 }}
            label="Additional Comments"
            multiline
            rows={4}
            value={comment}
            onChange={handleCommentChange}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose}>Cancel</Button> */}
        <Button onClick={handleFeedbackSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
    // </div>
  );
};

export default FeedbackDialog;
