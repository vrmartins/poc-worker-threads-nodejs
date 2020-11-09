const express = require('express')
const FibonacciController = require('../controllers/fibonacci')
// const validate = require('../utils/joi/validate')

const router = new express.Router()

// const withdrawSchema = Joi.object().keys({
//   amount: Joi.number().required().min(1)
// })

/**
 * @typedef Fibonacci
 *
 * @property {Object} banknotes - Cédulas
 */

/**
 * @typedef Fibonacci_Request
 *
 * @property {number} amount - Valor para saque
 */

/**
  * Realiza o saque do valor solicitado
  * @route GET /withdraw
  * @group Saque
  * @param {number} amount.query.required Valor a sacar
  * @returns {string} 200 - Ok
  * @return  {Error} 500 - Unexpected error
*/
router.route('/withoutThreads')
  .get(
    // validate({ query: withdrawSchema }),
    FibonacciController.withoutThreads
  )

router.route('/withThreads')
  .get(
    // validate({ query: withdrawSchema }),
    FibonacciController.withThreads
  )

router.route('/withThreadsPool')
  .get(
    // validate({ query: withdrawSchema }),
    FibonacciController.withThreadsPool
  )

module.exports = router
