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

// CORS configuration
const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [
  'http://localhost:3000',
]
console.log('Allowed CORS origins:', allowedOrigins)

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true)

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

// Middleware
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
    )
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
    console.log(
      'Attempted MongoDB URI:',
      process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')
    )
  })

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/recipes', recipeRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
