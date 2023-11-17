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

Route.post("/admin-login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if it's an admin login
    if (username === "Admin" && password === "Admin*1.") {
      // Admin authentication successful, send a success response
      return res.status(200).json({ message: "Admin login successful." });
    }

    // If not an admin login, check the regular user credentials
    const user = await UserSchema.findOne({ username, password });

    if (user) {
      // Regular user authentication successful, send a success response
      return res.status(200).json({ message: "Admin Login successful." });
    } else {
      // Authentication failed, send an error response
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    // Handle database or server errors
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

Route.delete("/delete-user/:id",(req,res)=>{
  UserSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),
  (err,data)=>{
      if(err)
          return err;
      else
          res.json(data);
  })
})

module.exports = Route;