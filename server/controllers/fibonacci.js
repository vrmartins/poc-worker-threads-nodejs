const fb = require('fibonacci')
const runFibonacci = require('../workers/fibonacciWorker')
const runFibonacciPool = require('../workers/fibonacciWorkerPool')

const FibonacciController = {
  withoutThreads: (req, res, next) => {
    const number = fb.iterate(10000)
    res.send(number)
  },

  withThreads: async (req, res, next) => {
    console.log('withThreads', req.id)
    try {
      const result = await runFibonacci({ iterations: 10000 })
      res.send(result)
    } catch (error) {
      next(error)
    }

    console.log('withThreads-return', req.id)
  },

  withThreadsPool: async (req, res, next) => {
    const result = await runFibonacciPool({ iterations: 10000 })
    res.send(result)
  }
}

module.exports = FibonacciController
