
/**
 * Get All items with get method
 */
fastify.get('<%= route %>', { beforeHandler: () => { next() } }, async (request, reply) => {
  let <%= collectionName %> = await <%= modelName %>.findAll(request.query)
  return <%= collectionName %>
})

/**
 * Get one item with get method and :id params
 */
fastify.get('<%= route + "/:id" %>', { beforeHandler: () => { next() } }, async (request, reply) => {
  let <%= collectionName %> = await <%= modelName %>.findAll(request.query)
  return <%= collectionName %>
})

/**
 * Add item sending and object with post method
 */
fastify.post('<%= route %>', async (request, reply) => {
  var <%= instanceName %>
  try {
    <%= instanceName %> = await <%= modelName %>.create(request.body)
  } catch (err) {
    reply.code(500).send({err: err});
    return
  }

  return reply.send({ success: true, message: '<%= modelName + " Registered successfully." %>', <%= instanceName %> })
})

/**
 * Modify and item sending and id with put method
 */
fastify.put('<%= route + "/:id" %>', async (request, reply) => {
  if (request.params.id) {
    try {
      await <%= modelName %>.update(request.body, { where: { id: request.params.id }})
    } catch(err) {
      return reply.code(500).send({ error: err })
    }

    return reply.send({
      success: true,
      message: 'Update Succefully',
      <%= instanceName %>: await <%= modelName %>.findOne({ where: { id: request.params.id }})})
  } else {
    return reply.code(500).send({ message: 'Must send an Id!' })
  }
})

/**
 * Delete and item sending and id with delete method
 */
fastify.delete('<%= route + "/:id" %>', async (request, reply) => {
  if (request.params.id) {
    try {
      await <%= modelName %>.destroy({ where: { id: request.params.id }})
    } catch(err) {
      return reply.code(500).send({ error: err })
    }

    return reply.send({ success: true, message: 'Delete Succefully'})
  } else {
    return reply.code(500).send({ message: 'Must send an Id!' })
  }
})
