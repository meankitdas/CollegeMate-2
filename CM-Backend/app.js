const express = require("express");
const mongoose = require("mongoose");


require("dotenv/config");

const app = express();

/* 
    We use bodyParser to convert data that comes in with
    POST requests into JSON objects. 
*/
app.use(express.json());

//Import Routes
const postsRoute = require("./routes/posts");

//All routes that start with posts/.. will be ran by postsRoute
app.use("/posts", postsRoute);

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

//Connect to DB
// mongoose.connect(
//     process.env.DB_CONN_STRING,
//     {useNewUrlParser:true} ,
//     () => {console.log('Succesfully connected to DB')
// });
mongoose.connect(
  process.env.DB_CONNECTON,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Succesfully connected to DB");
  }
);



//The app will be hosted on localhost, port 3000.
console.log("App is running on: http://127.0.0.1:3000");
app.listen(3000);
