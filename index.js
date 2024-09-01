const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

let users = [];

// Route to list all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Route to add a new user
app.post('/api/users', (req, res) => {
  const user = req.body;
  
  // Simple validation (e.g., checking if email already exists)
  const existingUser = users.find(u => u.email === user.email);
  
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists.' });
  }
  
  users.push(user);
  res.status(201).json(user);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
