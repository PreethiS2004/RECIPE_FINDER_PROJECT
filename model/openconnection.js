const { MongoClient } = require("mongodb");

const client = new MongoClient(
  "mongodb+srv://preethisettu2004:RecipeFinder.@cluster0.f8c64nl.mongodb.net/recipefinder"
);
function connectToMongoDB() {
  try {
    client.connect();
    console.log("Connected to MongoDB open");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
  return client;
}


module.exports = { client, connectToMongoDB };

