export function errorHandler(err, req, res, next) {
  console.error(err.stack)

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({ message: 'Validation error', errors: messages })
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0]
    return res.status(409).json({ message: `${field} already in use` })
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' })
  }

  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  })
}
