import { Router } from 'express'
import Cart from '../models/Cart.js'
import Product from '../models/Product.js'
import { protect } from '../middleware/auth.js'

const router = Router()

// All cart routes require authentication
router.use(protect)

// GET /api/cart
router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product')
    res.json({ cart: cart || { items: [] } })
  } catch (err) {
    next(err)
  }
})

// POST /api/cart  — add or update item
router.post('/', async (req, res, next) => {
  try {
    const { productId, qty = 1 } = req.body
    if (!productId) return res.status(400).json({ message: 'productId required' })

    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    if (!product.inStock) return res.status(400).json({ message: 'Product is out of stock' })

    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] })
    }

    const existing = cart.items.find(i => i.product.toString() === productId)
    if (existing) {
      existing.qty += parseInt(qty)
    } else {
      cart.items.push({ product: productId, qty: parseInt(qty) })
    }

    await cart.save()
    await cart.populate('items.product')
    res.json({ cart })
  } catch (err) {
    next(err)
  }
})

// PATCH /api/cart/:productId  — update quantity
router.patch('/:productId', async (req, res, next) => {
  try {
    const { qty } = req.body
    if (qty === undefined) return res.status(400).json({ message: 'qty required' })

    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })

    const item = cart.items.find(i => i.product.toString() === req.params.productId)
    if (!item) return res.status(404).json({ message: 'Item not in cart' })

    if (parseInt(qty) <= 0) {
      cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId)
    } else {
      item.qty = parseInt(qty)
    }

    await cart.save()
    await cart.populate('items.product')
    res.json({ cart })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/cart/:productId  — remove item
router.delete('/:productId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })

    cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId)
    await cart.save()
    await cart.populate('items.product')
    res.json({ cart })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/cart  — clear entire cart
router.delete('/', async (req, res, next) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] })
    res.json({ message: 'Cart cleared' })
  } catch (err) {
    next(err)
  }
})

export default router
