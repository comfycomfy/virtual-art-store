import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    price:       { type: Number, required: true, min: 0 },
    image:       { type: String, required: true },
    description: { type: String, required: true },
    creator:     { type: String, required: true, trim: true },
    year:        { type: Number },
    medium:      { type: String },
    size:        { type: String },
    material:    { type: String },
    category:    { type: String, required: true },
    theme:       [String],
    frameType:   { type: String },
    tags:        [String],
    inStock:     { type: Boolean, default: true },
    soldCount:   { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
)

productSchema.index({ category: 1 })
productSchema.index({ tags: 1 })
productSchema.index({ title: 'text', description: 'text', creator: 'text' })

export default mongoose.model('Product', productSchema)
