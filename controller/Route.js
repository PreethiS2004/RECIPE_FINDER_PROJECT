const express = require("express");
const UserSchema = require("../model/schema");
const Route = express.Router();
const mongoose = require("mongoose");
const { client, connectToMongoDB } = require("../model/openconnection");

const db = connectToMongoDB();

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

Route.post("/user-signup", (req, res) => {
  UserSchema.create(req.body, (err, data) => {
    if (err) return err;
    else res.json(data);
  });
});
Route.get("/", (req, res) => {
  UserSchema.find((err, data) => {
    if (err) return err;
    else res.json(data);
  });
});

Route.post("/admin-login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const recipesCollection = db.db("recipefinder").collection("admindetails");

    // Fetch the user based on the username and password
    const user = await recipesCollection.findOne({ username, password });

    if (user) {
      // Admin authentication successful, send a success response
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

Route.post("/create-admin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const adminCollection = db.db("recipefinder").collection("admindetails");

    // Check if the admin already exists
    const existingAdmin = await adminCollection.findOne({ username });

    if (existingAdmin) {
      // Admin already exists, send an error response
      return res
        .status(400)
        .json({ message: "Admin already exists with the given username" });
    }

    // Create a new admin user
    const newAdmin = {
      username,
      password,
    };

    // Insert the new admin into the collection
    const result = await adminCollection.insertOne(newAdmin);

    if (result.insertedCount === 1) {
      // Admin creation successful, send a success response
      return res
        .status(201)
        .json({ message: "Admin user created successfully." });
    } else {
      // Admin creation failed, send an error response
      return res.status(500).json({ message: "Failed to create admin user" });
    }
  } catch (error) {
    // Handle database or server errors
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

Route.delete("/delete-user/:id", (req, res) => {
  UserSchema.findByIdAndRemove(
    mongoose.Types.ObjectId(req.params.id),
    (err, data) => {
      if (err) return err;
      else res.json(data);
    }
  );
});

module.exports = Route;
