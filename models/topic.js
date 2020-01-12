const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
  shortTitle: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    default: 'in progress'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Topic', topicSchema)
