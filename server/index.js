
const express = require("express");
const app = express();
const port = 4000;



// adding body-parser and cors
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.post("/chat-model", async (req, res) => {
  const { message } = req.body;
  
  const randomValue = Math.random();

  // Set the error probability (0.6 for a 60% error rate)
  const errorProbability = 0.6;

  // Simulate an error if the random number is less than the error probability
  if (randomValue < errorProbability) {
    res.status(500).json({ error: true, message: 'AI model error. Please try again.' });
  } else {
    // Simulate a successful response
    res.json({
        message: "Hello from AI Bot",
        isUser: false,
        reaction: null,
    });
  }

//   res.json({
//     message: "Hello from AI Bot",
//     isUser: false,
//     reaction: null,
// },);
});

app.post("/save-chats", async (req, res) => {
    // const { message } = req.body;
    
    res.json(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});