import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

const router = express.Router()

// Signup route
router.post('/signup', async (req, res) => {
  try {
    console.log('Received signup request:', req.body)
    const { fullName, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log('User already exists:', email)
      return res.status(400).json({ message: 'User already exists' })
    }

    // Create new user
    const user = new User({ fullName, email, password })
    await user.save()
    console.log('New user created:', user._id)

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    })

    res.status(201).json({ token, userId: user._id })
  } catch (error) {
    console.error('Error in signup:', error)
    res
      .status(500)
      .json({ message: 'Error creating user', error: error.message })
  }
})

// Login route
router.post('/login', async (req, res) => {
  try {
    console.log('Received login request:', req.body)
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      console.log('User not found:', email)
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      console.log('Invalid password for user:', email)
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    })

    console.log('User logged in successfully:', user._id)
    res.json({ token, userId: user._id })
  } catch (error) {
    console.error('Error in login:', error)
    res.status(500).json({ message: 'Error logging in', error: error.message })
  }
})

export default router
