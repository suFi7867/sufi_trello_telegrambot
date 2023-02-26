require("dotenv").config();

const express = require("express");
const app = express();

const botLaunch = require("./bot");
const PORT = process.env.PORT || 3005;

// Deafult Midllewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Launch Our bot
botLaunch();

app.use("/", (req, res) => {
  res.status(200).send("Server Started");
});


app.listen(PORT, async () => {
  console.log(`Server Started on Port ${PORT}`);
});



// npm i cors dotenv nodemon telegraf axios
