const Joi = require('@hapi/joi')

const sanitizeError = error => {
  if (!error) return
  const { _object, ...sanitezedError } = error
  return sanitezedError
}

const validate = (schema, disableSanitize = false) => {
  return (request, response, next) => {
    Object.keys(schema).forEach((key) => {
      const { error } = Joi.validate(request[key], schema[key])
      next(sanitizeError(error))
    })
  }
}

module.exports = validate
