const Fastify = require('fastify')
const fsequelize = require('fastify-sequelize')
const fastify = Fastify()
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:ob4m4@localhost:5432/externalDb')
const Op = Sequelize.Op

var models = require('sequelize-import')(__dirname + '/models', sequelize, { 
	exclude: ['index.js']
})

// Just register the plugin and add glob array which files to loud
fastify.register(require('fastify-loader'), {
    paths: ['./routes/**/*.js'], // A glob array
    name: "fastify", // [Optional] if you want to do something like this: YOURNAMEHERE.get('/api/test')
    inject: Object.assign(models, {sequelize, Op})
});

fastify.get('/', async (request, reply) => {
  return { say: 'Welcome' }
})

const start = async () => {
  try {
    await fastify.listen(3001)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
