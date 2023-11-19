const express = require("express");
const session = require("express-session");
const mongoose =require("mongoose");
const Route =require("./controller/Route");
const Recipe =require("./controller/RecipeRoute");
const bodyParser =require("body-parser");
const cors =require("cors");

const app = express();

mongoose.set("strictQuery",true); //Deprection Warning //To supress warning
mongoose.connect("mongodb+srv://preethisettu2004:RecipeFinder.@cluster0.f8c64nl.mongodb.net/recipefinder");
var db = mongoose.connection;
db.on("open",()=>console.log("Connected to DB"));
db.on("error",()=>console.log("Error occurred"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use("/Route",Route);
app.use("/RecipeRoute",Recipe);
app.use(session({
    secret: '2023', // Add a secret key for session security
    resave: false,
    saveUninitialized: true,
  }));
app.listen(4001,()=>{
    console.log("Server started at 4001");
})
