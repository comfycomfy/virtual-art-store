import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

import { connectDB } from './config/db.js'
import authRoutes     from './routes/auth.js'
import productRoutes  from './routes/products.js'
import cartRoutes     from './routes/cart.js'
import wishlistRoutes from './routes/wishlist.js'
import orderRoutes    from './routes/orders.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

// ── CORS ───────────────────────────────────────────────────────────────────
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.FRONTEND_URL].filter(Boolean)
  : true // allow all origins in development

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

// Handle preflight for every route before rate-limiting
app.options('*', cors(corsOptions))
app.use(cors(corsOptions))

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
}))

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

// ── Body parsing ───────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))

// ── Routes ─────────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use('/api/auth',     authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart',     cartRoutes)
app.use('/api/wishlist', wishlistRoutes)
app.use('/api/orders',   orderRoutes)

// 404 fallback
app.use((req, res) => res.status(404).json({ message: 'Route not found' }))

// ── Error handler ──────────────────────────────────────────────────────────
app.use(errorHandler)

// ── Start ──────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
})

export default app
