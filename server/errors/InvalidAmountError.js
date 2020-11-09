/**
 * @param {string} message Error message
 * @param {int} status Error status code
 * @return {Error} InvalidAmount Error InvalidAmount
 */
class InvalidAmountError {
  /**
   * @param  {...any} args
   */
  constructor (...args) {
    this.name = 'InvalidAmountError'
    this.message = args[0]
    this.status = 422
    Error.captureStackTrace(this, InvalidAmountError)
  }
}

module.exports = InvalidAmountError
