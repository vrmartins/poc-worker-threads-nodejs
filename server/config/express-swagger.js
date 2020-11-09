const startup = (app) => {
  const expressSwagger = require('express-swagger-generator')(app)

  const options = {
    swaggerDefinition: {
      info: {
        title: 'Caixa Eletrônico',
        version: '0.0.1',
        description: 'Documentação - Caixa Eletrônico'
      },
      host: `localhost:${process.env.APP_PORT}`,
      basePath: '/api',
      produces: ['application/json'],
      schemes: ['http', 'https']
    },
    basedir: __dirname,
    files: ['../routes/**/*.js'],
    route: {
      url: '/api-docs',
      docs: '/api-docs.json'
    }
  }

  expressSwagger(options)
}

module.exports = { startup }
