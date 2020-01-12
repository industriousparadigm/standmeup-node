const express = require('express')
const Topic = require('../models/topic')
const router = express.Router()

// Get all topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find()
    res.json(topics)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get one topic
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const topic = await Topic.findById(id)
    if (topic) res.json(topic)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create one topic
router.post('/', async (req, res) => {
  const topic = new Topic({
    shortTitle: req.body.shortTitle
  })

  try {
    const newTopic = await topic.save()
    res.status(201).json(newTopic)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update one topic
router.patch('/:id', (req, res) => {})

// Delete one topic
router.delete('/:id', (req, res) => {})

module.exports = router
