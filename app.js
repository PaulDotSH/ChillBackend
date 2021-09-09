const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
const app = express();

app.listen(parseInt(process.env.PORT));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const uploadRoute = require("./routes/upload");
const usersRoute = require("./routes/users");

app.use("/users", usersRoute);
app.use("/upload", uploadRoute);

//ROUTES
app.get("/", (req, res) => {
  res.send("The server should be up!");
});

//Connecting to database
mongoose.connect(process.env.DB_URL, () => {
  console.log("Connected to the DB");
});
