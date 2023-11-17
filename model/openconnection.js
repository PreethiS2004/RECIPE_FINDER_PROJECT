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

<<<<<<< HEAD
module.exports = { client, connectToMongoDB };
=======
module.exports = { client, connectToMongoDB };
>>>>>>> 4940fae8ee2da0af011fa5b513533c24f6f9ce31
