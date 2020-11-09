const logger = require('@zenvia/logger')

const app = require('./app')
require('dotenv-safe').config()

// Inicia a aplicação na porta definida via ENV VAR
app.listen(process.env.APP_PORT, (error) => {
  if (error) {
    logger.error('Ocorreu um erro ao iniciar o app', error)
    return
  }
  logger.info(`Started server on ${process.env.APP_PORT}`)
})
