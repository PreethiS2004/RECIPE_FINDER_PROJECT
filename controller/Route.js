const express = require("express");
const UserSchema=require("../model/schema");
const Route=express.Router();
const mongoose = require("mongoose");

Route.post("/user-login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await UserSchema.findOne({ username, password });
      if (user) {
        // Authentication successful, send a success response
        res.status(200).json({ message: "Login successful." });
      } else {
        // Authentication failed, send an error response
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      // Handle database or server errors
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


Route.post("/user-signup",(req,res)=>{
    UserSchema.create(req.body, (err,data) => {
        if(err)
            return err;
        else
            res.json(data);
    })

})
Route.get("/",(req,res)=>{
    UserSchema.find((err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
});




module.exports = Route;