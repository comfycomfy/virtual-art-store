import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    title:   { type: String, required: true },
    price:   { type: Number, required: true },
    qty:     { type: Number, required: true, min: 1 },
  },
  { _id: false }
)

const orderSchema = new mongoose.Schema(
  {
    user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items:  [orderItemSchema],
    total:  { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    shippingAddress: {
      name:    String,
      line1:   String,
      line2:   String,
      city:    String,
      state:   String,
      zip:     String,
      country: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Order', orderSchema)
