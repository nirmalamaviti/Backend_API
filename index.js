const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require("./model/user");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

let users = [];



mongoose.connect("mongodb+srv://nirmala:nirmala@cluster0.i0oev.mongodb.net/users?retryWrites=true", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Route to list all users
app.get('/api/users', async(req, res) => {
  // res.json(users);
  const users = await User.find();
  return res.json(users);
});

// Route to add a new user
app.post('/api/users', async(req, res) => {
  const user = req.body;
  console.log(user, "llllllll");
  
  // Simple validation (e.g., checking if email already exists)
  const existingUser = users.find(u => u.email === user.email);
  
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists.' });
  }
  
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  // users.push(user);
  // res.status(201).json(user);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
