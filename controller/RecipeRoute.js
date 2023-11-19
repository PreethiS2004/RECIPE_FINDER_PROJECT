const express = require("express");
const RecipeRoute = express.Router();
const RecipeSchema = require("../model/recipeschema");
const { client, connectToMongoDB } = require("../model/openconnection");
const { default: mongoose } = require("mongoose");
const db = connectToMongoDB();


RecipeRoute.post("/create-recipe", (req, res) => {
  RecipeSchema.create(req.body, (err, data) => {
    if (err) return err;
    else res.json(data);
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


RecipeRoute.get("/list", async (req, res) => {
  try {
    const recipesCollection = db.db("recipefinder").collection("recipes");

    const totalDocuments = await recipesCollection.countDocuments();

    const randomIndices = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * totalDocuments)
    );

    const randomRecipes = await recipesCollection
      .find({}, { projection: { _id: 0 } })
      .limit(10)
      .toArray();

    res.json(randomRecipes);
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

RecipeRoute.get("/ingredient/:ingredient", async (req, res) => {
  try {
    const recipesCollection = db.db("recipefinder").collection("recipes");
    const ingredient = req.params.ingredient;

    // Use $regex to perform a case-insensitive search on all strIngredientX fields
    const ingredientConditions = Array.from({ length: 20 }, (_, index) => ({
      [`strIngredient${index + 1}`]: { $regex: new RegExp(ingredient, "i") },
    }));

    const recipesWithIngredient = await recipesCollection
      .find({ $or: ingredientConditions })
      .toArray();

    res.json(recipesWithIngredient);
  } catch (error) {
    console.error("Error fetching recipes with the given ingredient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

RecipeRoute.get("/recipe/:query", async (req, res) => {
  try {
    const recipesCollection = db.db("recipefinder").collection("recipes");
    const query = req.params.query;

    // Use $regex to perform a case-insensitive search on strMeal field
    const nameCondition = { strMeal: { $regex: new RegExp(query, "i") } };

    const recipesWithName = await recipesCollection
      .find(nameCondition)
      .toArray();

    res.json(recipesWithName);
  } catch (error) {
    console.error("Error fetching recipes with the given query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

RecipeRoute.get("/category/:query", async (req, res) => {
  try {
    const recipesCollection = db.db("recipefinder").collection("recipes");
    const query = req.params.query;

    // Use $regex to perform a case-insensitive search on strMeal field
    const nameCondition = { strCategory: { $regex: new RegExp(query, "i") } };

    const recipesWithName = await recipesCollection
      .find(nameCondition)
      .toArray();

    res.json(recipesWithName);
  } catch (error) {
    console.error("Error fetching recipes with the given query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

RecipeRoute.get("/cuisine/:query", async (req, res) => {
  try {
    const recipesCollection = db.db("recipefinder").collection("recipes");
    const query = req.params.query;

    // Use $regex to perform a case-insensitive search on strMeal field
    const nameCondition = { strArea: { $regex: new RegExp(query, "i") } };

    const recipesWithName = await recipesCollection
      .find(nameCondition)
      .toArray();

    res.json(recipesWithName);
  } catch (error) {
    console.error("Error fetching recipes with the given query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
RecipeRoute.delete("/delete-recipe/:id", async (req, res) => {
  try {
    const result = await RecipeSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id));
    res.json(result);
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = RecipeRoute;

