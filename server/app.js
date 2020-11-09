const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const uuid = require('node-uuid')

const routes = require('./routes')
const expressSwagger = require('./config/express-swagger')
const errorHandling = require('./middlewares/error-handling')

require('dotenv-safe').config()

const app = express()

morgan.token('id', (req) => {
  return req.id
})

app.use(cors())
app.use(helmet())
app.use((req, res, next) => {
  req.id = uuid.v4()
  console.info(`Request ${req.id} to ${req.method} ${req.url}`)
  next()
})

app.use(morgan('Response: :id :method :url :status :response-time '))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', routes)

expressSwagger.startup(app)

errorHandling(app)

module.exports = app
