const express = require("express");
const RecipeRoute=express.Router();
const RecipeSchema = require("../model/recipeschema");
const mongoose = require("mongoose");

RecipeRoute.post("/create-recipe", (req, res) => {
    RecipeSchema.create(req.body, (err,data) => {
      if(err)
          return err;
      else
          res.json(data);
  })
  
  })
  RecipeRoute.get("/",(req,res)=>{
  RecipeSchema.find((err,data)=>{
      if(err)
          return err;
      else
          res.json(data);
  })
  });
  
  
  module.exports = RecipeRoute;