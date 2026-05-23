import { Router } from 'express'
import { body, query, validationResult } from 'express-validator'
import Product from '../models/Product.js'
import { protect, requireAdmin } from '../middleware/auth.js'

const router = Router()

// GET /api/products  — list with optional filtering, sorting, pagination
router.get(
  '/',
  [
    query('category').optional().trim(),
    query('search').optional().trim(),
    query('minPrice').optional().isFloat({ min: 0 }),
    query('maxPrice').optional().isFloat({ min: 0 }),
    query('sort').optional().isIn(['price_asc', 'price_desc', 'title', 'newest']),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
  ],
  async (req, res, next) => {
    try {
      const { category, search, minPrice, maxPrice, sort, page = 1, limit = 20 } = req.query
      const filter = {}

      if (category && category !== 'All') filter.category = category
      if (search) filter.$text = { $search: search }
      if (minPrice || maxPrice) {
        filter.price = {}
        if (minPrice) filter.price.$gte = parseFloat(minPrice)
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice)
      }

      const sortMap = {
        price_asc:  { price: 1 },
        price_desc: { price: -1 },
        title:      { title: 1 },
        newest:     { createdAt: -1 },
      }
      const sortOption = sortMap[sort] || { createdAt: -1 }

      const skip = (parseInt(page) - 1) * parseInt(limit)
      const [products, total] = await Promise.all([
        Product.find(filter).sort(sortOption).skip(skip).limit(parseInt(limit)),
        Product.countDocuments(filter),
      ])

      res.json({
        products,
        pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / parseInt(limit)) },
      })
    } catch (err) {
      next(err)
    }
  }
)

// GET /api/products/categories  — distinct categories list
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await Product.distinct('category')
    res.json({ categories })
  } catch (err) {
    next(err)
  }
})

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ product })
  } catch (err) {
    next(err)
  }
})

// POST /api/products  (admin only)
router.post(
  '/',
  protect, requireAdmin,
  [
    body('title').trim().notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('image').isURL(),
    body('description').trim().notEmpty(),
    body('creator').trim().notEmpty(),
    body('category').trim().notEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    try {
      const product = await Product.create(req.body)
      res.status(201).json({ product })
    } catch (err) {
      next(err)
    }
  }
)

// PATCH /api/products/:id  (admin only)
router.patch('/:id', protect, requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ product })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/products/:id  (admin only)
router.delete('/:id', protect, requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product deleted' })
  } catch (err) {
    next(err)
  }
})

export default router
