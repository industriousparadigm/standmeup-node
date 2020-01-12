const express = require('express')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const mongoose = require('mongoose')

const topicsRouter = require('./routes/topics')

// Create a new Express app and add utilities
const app = express()
app.use(express.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// Connect to mongoDB
const uri = process.env.MONGO_URI
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to MongoDB database'))

// Define middleware that validates incoming bearer tokens
// using JWKS from dev-piqi36-y.eu.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithm: ['RS256']
})

// Define an endpoint that must be called with an access token
app.get('/api/external', checkJwt, (req, res) => {
  res.send({
    msg: 'Your Access Token was successfully validated!'
  })
})

// Routing topics endpoints
app.use('/topics', topicsRouter)

// Start the app
app.listen(3001, () => console.log('API listening on 3001'))
