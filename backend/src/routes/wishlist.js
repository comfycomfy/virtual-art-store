import { Router } from 'express'
import Wishlist from '../models/Wishlist.js'
import Product from '../models/Product.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.use(protect)

// GET /api/wishlist
router.get('/', async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products')
    res.json({ wishlist: wishlist || { products: [] } })
  } catch (err) {
    next(err)
  }
})

// POST /api/wishlist/:productId  — toggle (add if absent, remove if present)
router.post('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: 'Product not found' })

    let wishlist = await Wishlist.findOne({ user: req.user._id })
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [] })
    }

    const idx = wishlist.products.indexOf(productId)
    let action
    if (idx === -1) {
      wishlist.products.push(productId)
      action = 'added'
    } else {
      wishlist.products.splice(idx, 1)
      action = 'removed'
    }

    await wishlist.save()
    await wishlist.populate('products')
    res.json({ wishlist, action })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/wishlist/:productId  — explicit remove
router.delete('/:productId', async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id })
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' })

    wishlist.products = wishlist.products.filter(p => p.toString() !== req.params.productId)
    await wishlist.save()
    await wishlist.populate('products')
    res.json({ wishlist })
  } catch (err) {
    next(err)
  }
})

export default router
