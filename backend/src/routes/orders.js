import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import Order from '../models/Order.js'
import Cart from '../models/Cart.js'
import Product from '../models/Product.js'
import { protect, requireAdmin } from '../middleware/auth.js'

const router = Router()

router.use(protect)

// GET /api/orders  — current user's orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.product', 'title image')
    res.json({ orders })
  } catch (err) {
    next(err)
  }
})

// GET /api/orders/all  (admin: all orders)
router.get('/all', requireAdmin, async (req, res, next) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('user', 'username email')
      .populate('items.product', 'title image')
    res.json({ orders })
  } catch (err) {
    next(err)
  }
})

// GET /api/orders/:id
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product', 'title image')
    if (!order) return res.status(404).json({ message: 'Order not found' })
    // Users can only view their own orders; admins can view any
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' })
    }
    res.json({ order })
  } catch (err) {
    next(err)
  }
})

// POST /api/orders  — place order from current cart
router.post(
  '/',
  [
    body('shippingAddress.name').trim().notEmpty().withMessage('Name required'),
    body('shippingAddress.line1').trim().notEmpty().withMessage('Address line 1 required'),
    body('shippingAddress.city').trim().notEmpty().withMessage('City required'),
    body('shippingAddress.zip').trim().notEmpty().withMessage('ZIP required'),
    body('shippingAddress.country').trim().notEmpty().withMessage('Country required'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    try {
      const cart = await Cart.findOne({ user: req.user._id }).populate('items.product')
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' })
      }

      // Verify stock and build order items
      const orderItems = []
      let total = 0
      for (const item of cart.items) {
        if (!item.product.inStock) {
          return res.status(400).json({ message: `${item.product.title} is out of stock` })
        }
        orderItems.push({
          product: item.product._id,
          title:   item.product.title,
          price:   item.product.price,
          qty:     item.qty,
        })
        total += item.product.price * item.qty
      }

      const order = await Order.create({
        user: req.user._id,
        items: orderItems,
        total,
        shippingAddress: req.body.shippingAddress,
      })

      // Increment sold counts and clear cart in parallel
      await Promise.all([
        ...cart.items.map(item =>
          Product.findByIdAndUpdate(item.product._id, { $inc: { soldCount: item.qty } })
        ),
        Cart.findOneAndUpdate({ user: req.user._id }, { items: [] }),
      ])

      res.status(201).json({ order })
    } catch (err) {
      next(err)
    }
  }
)

// PATCH /api/orders/:id/status  (admin only)
router.patch('/:id/status', requireAdmin, async (req, res, next) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json({ order })
  } catch (err) {
    next(err)
  }
})

export default router
