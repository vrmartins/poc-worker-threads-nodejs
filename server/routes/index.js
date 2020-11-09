const express = require('express')
const fibonacciRoutes = require('./fibonacci')

const router = new express.Router()

router.use('/fibonacci', fibonacciRoutes)

module.exports = router
