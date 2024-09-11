const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT

// Libraries
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const connectDB = require('./db/ConnectDB')
const ProductModel = require('./models/Models')
const UserModel = require('./models/UserModel')

app.use(express.json())
app.use(cors())

// Connect to Database
connectDB()

/**
 * @route GET /
 * @desc Test route to check server connection
 * @access Public
 */
app.get('/', (req, res) => {
  res.send('Successfully connected to server.')
})

/**
 * @route POST /addproduct
 * @desc Add a new product to the database
 * @access Public
 */
app.post('/addproduct', async (req, res) => {
  try {
    // Fetch all products to determine the next ID
    let products = await ProductModel.find({})
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1

    // Create a new product object
    const newProduct = new ProductModel({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      data: req.body.data,
      available: req.body.available
    })

    // Save the product to the database
    await newProduct.save()
    res.json({ success: true, productName: req.body.name })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding product', error: err.message })
  }
})

/**
 * @route POST /removeproduct
 * @desc Remove a product from the database by ID
 * @access Public
 */
app.post('/removeproduct', async (req, res) => {
  try {
    await ProductModel.findOneAndDelete({ id: req.body.id })
    res.json({ success: true, message: 'Product removed successfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error removing product', error: err.message })
  }
})

// Image Storage Configuration using multer
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({ storage: storage })

/**
 * @route POST /upload
 * @desc Upload product image to server
 * @access Public
 */
app.use('/images', express.static('upload/images')) // Serve images from this folder
app.post('/upload', upload.single('product'), (req, res) => {
  res.json({
    success: true,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`
  })
})

/**
 * @route GET /allproducts
 * @desc Fetch all products from the database
 * @access Public
 */
app.get('/allproducts', async (req, res) => {
  try {
    let products = await ProductModel.find({})
    res.json(products)
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching products', error: err.message })
  }
})

/**
 * @route POST /signup
 * @desc Register a new user
 * @access Public
 */
app.post('/signup', async (req, res) => {
  try {
    // Check if the user already exists
    let existingUser = await UserModel.findOne({ email: req.body.email })
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' })
    }

    // Initialize an empty cart for the user
    let cart = {}
    for (let i = 0; i < 300; i++) {
      cart[i] = 0
    }

    // Create a new user
    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      cartData: cart
    })

    // Save the user to the database
    await newUser.save()

    // Generate JWT token
    const tokenData = { user: { id: newUser.id } }
    const token = jwt.sign(tokenData, 'secret_ecom')
    res.json({ success: true, token })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error registering user', error: err.message })
  }
})

/**
 * @route POST /login
 * @desc Authenticate a user and provide a JWT token
 * @access Public
 */
app.post('/login', async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ success: false, message: 'Invalid email' })

    // Check password
    const isPasswordCorrect = req.body.password === user.password
    if (!isPasswordCorrect) return res.status(400).json({ success: false, message: 'Incorrect password' })

    // Generate JWT token
    const tokenData = { user: { id: user.id } }
    const token = jwt.sign(tokenData, 'secret_ecom')
    res.json({ success: true, token })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error logging in', error: err.message })
  }
})

/**
 * @route GET /newcollections
 * @desc Fetch the latest 8 products from the database
 * @access Public
 */
app.get('/newcollections', async (req, res) => {
  try {
    let products = await ProductModel.find({})
    let newCollections = products.slice(-8) // Get the last 8 products
    res.json(newCollections)
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching new collections', error: err.message })
  }
})

/**
 * @route GET /popularinwomen
 * @desc Fetch popular products in the women category
 * @access Public
 */
app.get('/popularinwomen', async (req, res) => {
  try {
    let products = await ProductModel.find({ category: 'women' })
    let popularWomenProducts = products.slice(0, 4) // Get the first 4 products
    res.json(popularWomenProducts)
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching popular women products', error: err.message })
  }
})

// Middleware to authenticate users using JWT
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) return res.status(401).json({ error: 'Please authenticate using a valid token' })

  try {
    const data = jwt.verify(token, 'secret_ecom')
    req.user = data.user
    next()
  } catch (err) {
    res.status(401).json({ error: 'Token verification failed', details: err.message })
  }
}

/**
 * @route POST /addtocart
 * @desc Add a product to the user's cart
 * @access Private
 */
app.post('/addtocart', fetchUser, async (req, res) => {
  try {
    let user = await UserModel.findById(req.user.id)
    user.cartData[req.body.itemId] += 1
    await UserModel.findByIdAndUpdate(req.user.id, { cartData: user.cartData })
    res.json({ success: true, message: 'Item added to cart' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding to cart', error: err.message })
  }
})

/**
 * @route POST /removefromcart
 * @desc Remove a product from the user's cart
 * @access Private
 */
app.post('/removefromcart', fetchUser, async (req, res) => {
  try {
    let user = await UserModel.findById(req.user.id)
    user.cartData[req.body.itemId] -= 1
    await UserModel.findByIdAndUpdate(req.user.id, { cartData: user.cartData })
    res.json({ success: true, message: 'Item removed from cart' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error removing from cart', error: err.message })
  }
})

/**
 * @route POST /getcart
 * @desc Get the current user's cart data
 * @access Private
 */
app.post('/getcart', fetchUser, async (req, res) => {
  try {
    let user = await UserModel.findById(req.user.id)
    res.json(user.cartData)
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching cart', error: err.message })
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`)
})
