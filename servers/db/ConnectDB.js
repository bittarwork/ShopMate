const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

// Function to connect to MongoDB
const ConnectDB = async () => {
  try {
    // Connect to MongoDB using the URL from the environment variable
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Successfully connected to MongoDB!')
  } catch (error) {
    // Log detailed error message if connection fails
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1) // Exit the process with failure code
  }
}

module.exports = ConnectDB
