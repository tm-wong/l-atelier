'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const environment = require('../../build/plugins/environment')

test('support works standalone', async (t) => {
  const fastify = Fastify()
  fastify.register(environment)

  await fastify.ready()
  const result = fastify.someSupport();
  console.log('=== result', result);

  t.equal(result, 'hugs')
})

// You can also use plugin with opts in fastify v2
//
// test('support works standalone', (t) => {
//   t.plan(2)
//   const fastify = Fastify()
//   fastify.register(Support)
//
//   fastify.ready((err) => {
//     t.error(err)
//     t.equal(fastify.someSupport(), 'hugs')
//   })
// })
