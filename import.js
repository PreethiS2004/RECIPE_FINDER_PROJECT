const axios = require('axios');
const { MongoClient } = require('mongodb');

const MEALDB_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=z';
const MONGODB_URI = 'mongodb+srv://preethisettu2004:RecipeFinder.@cluster0.f8c64nl.mongodb.net/recipefinder';

async function fetchDataFromMealDB() {
  try {
    // Fetch data from the MealDB API
    const response = await axios.get(MEALDB_API_URL);
    return response.data.meals;
  } catch (error) {
    console.error('Error fetching data from MealDB:', error.message);
    throw error;
  }
}

async function saveDataToMongoDB(data) {
  const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected to MongoDB');

    // Select the recipefinder database and recipes collection
    const database = client.db('recipefinder');
    const collection = database.collection('recipes');

    // Insert the data into the MongoDB collection
    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents inserted`);

  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

async function main() {
  try {
    // Fetch data from MealDB
    const mealDBData = await fetchDataFromMealDB();

    // Save data to MongoDB
    await saveDataToMongoDB(mealDBData);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the main function
main();


/*
echo "# backend" >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/PreethiS2004/backend.git
git push -u origin main
*/