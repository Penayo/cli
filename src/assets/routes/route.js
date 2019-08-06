var vueApiQuery = require('../middleware/vueApiQueryToSequelize')(models, <%= modelName %>)
/**
 * Get All items with get method
 */
fastify.get('<%= route %>', { beforeHandler: vueApiQuery }, async (request, reply) => {
  let <%= collectionName %>
  try { 
    <%= collectionName %> = await <%= modelName %>.findAll(request.query)
  } catch (error) {
    console.log(error)
    return reply.code(500).send(error)
  }
  return <%= collectionName %>
})
<%= "\n" %>
/**
 * Get one item with get method and :id params
 */
fastify.get('<%= route + "/:id" %>', { beforeHandler: vueApiQuery }, async (request, reply) => {
  let <%= collectionName %>
  try {
    <%= collectionName %> = await <%= modelName %>.findOne(request.query)
  } catch (error) {
    console.log(error)
    return reply.code(500).send(error)
  }
  return <%= collectionName %>
})
<%= "\n" %>
/**
 * Add item sending and object with post method
 */
fastify.post('<%= route %>', async (request, reply) => {
  var <%= instanceName %>
  try {
    if (Array.isArray(request.body)) {
      <%= instanceName %> = await <%= modelName %>.bulkCreate(request.body, { returning: true })
    } else {
      <%= instanceName %> = await <%= modelName %>.create(request.body)
    }
  } catch (error) {
    return reply.code(500).send(error)
  }

  return <%= instanceName %>
})
<%= "\n" %>
/**
 * Modify and item sending and id with put method
 */
fastify.put('<%= route + "/:id" %>', async (request, reply) => {
  if (request.params.id) {
    try {
      await <%= modelName %>.update(request.body, { where: { id: request.params.id }})
    } catch(err) {
      return reply.code(500).send(error)
    }

    <%= instanceName %> = await <%= modelName %>.findOne({ where: { id: request.params.id }})
    return <%= instanceName %>
  } else {
    return reply.code(500).send({ message: 'Must send an Id!' })
  }
})
<%= "\n" %>
/**
 * Delete and item sending and id with delete method
 */
fastify.delete('<%= route + "/:id" %>', async (request, reply) => {
  if (request.params.id) {
    try {
      await <%= modelName %>.destroy({ where: { id: request.params.id }})
    } catch(err) {
      return reply.code(500).send(error)
    }

    return reply.send({ success: true, message: 'Delete Succefully'})
  } else {
    return reply.code(500).send({ message: 'Must send an Id!' })
  }
})
