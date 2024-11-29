import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import authRoutes from './routes/auth.js'
import recipeRoutes from './routes/recipes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(join(__dirname, 'public')))

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`)
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body)
  }
  next()
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mongodb:
      mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  })
})

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    console.log(
      'MongoDB URI:',
      process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')
    ) // Log URI with hidden credentials
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
    console.log(
      'Attempted MongoDB URI:',
      process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')
    ) // Log URI with hidden credentials
  })

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/recipes', recipeRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
