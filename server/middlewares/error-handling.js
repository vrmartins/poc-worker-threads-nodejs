const logger = require('@zenvia/logger')

/**
 * @param {Object} app Express Router
 */
function errorHandling (app) {
  app.use((error, request, response, next) => {
    const knownErrors = [
      'InvalidAmountError',
      'ValidationError'
    ]

    if (knownErrors.includes(error.name)) {
      logger.debug(error.name, { error })
      return response.status(error.status || 400).json({ error })
    }

    logger.error('An unknown error ocurred: ', { error })

    return response.status(500).json({ message: 'Unexepected error' })
  })
}

module.exports = errorHandling
