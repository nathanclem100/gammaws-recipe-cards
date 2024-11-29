import express from 'express'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import Recipe from '../models/Recipe.js'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, '../public/uploads/'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false)
    }
    cb(null, true)
  },
})

// Middleware to authenticate user
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' })
  }
}

// Create recipe with image upload
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const recipeData = {
      ...req.body,
      userId: req.userId,
    }

    if (req.file) {
      recipeData.image = `/uploads/${req.file.filename}`
    }

    const recipe = new Recipe(recipeData)
    await recipe.save()
    res.status(201).json(recipe)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating recipe', error: error.message })
  }
})

// Update recipe with image
router.patch('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body }
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`
    }

    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      updateData,
      { new: true }
    )
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }
    res.json(recipe)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating recipe', error: error.message })
  }
})

// Get all recipes for a user
router.get('/', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.userId })
    res.json(recipes)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching recipes', error: error.message })
  }
})

// Get single recipe
router.get('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id,
      userId: req.userId,
    })
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }
    res.json(recipe)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching recipe', error: error.message })
  }
})

// Delete recipe
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    })
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }
    res.json({ message: 'Recipe deleted' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting recipe', error: error.message })
  }
})

export default router
