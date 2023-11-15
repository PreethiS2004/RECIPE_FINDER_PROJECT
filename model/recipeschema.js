const mongoose=require("mongoose");

const recipeschema=new mongoose.Schema({
    "idMeal":{type:String},
    "strMeal":{type:String},
    "strMealThumb":{type:String},
    "strCategory":{type:String},
    "strArea":{type:String},
    "strIngredients":{type:String},
    "strInstructions":{type:String},
    "strTags":{type:String},
},
{
    collection:"recipes"
})

module.exports=mongoose.model("RecipeSchema",recipeschema);