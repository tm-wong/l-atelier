'use strict';

require('dotenv').config();
const TOKEN = require('../token');


const { test } = require('tap');
const Fastify = require('fastify');
const auth = require('../../plugins/auth');

const reply = {};

const request = {
    headers: {
        authorization: `Bearer ${ TOKEN }`
    }
};

const expected = {
  iss: 'https://dev-y1z3acypuoplop6h.us.auth0.com/',
  sub: 'CZU7lzTAUmg5MGjr8QyPQJbHBuXsTUym@clients',
  aud: 'https://dev-y1z3acypuoplop6h.us.auth0.com/api/v2/',
  azp: 'CZU7lzTAUmg5MGjr8QyPQJbHBuXsTUym',
  gty: 'client-credentials'
};

test('auth token is parsed and decoded', async(t) => {

    const fastify = Fastify();

    fastify.register(auth);
    await fastify.ready();

    // decoded token
    const decoded = await fastify.auth(request, reply)

    // assert all items match expected
    for (let key in expected) {
        t.equal(expected[key], decoded[key]);
    }
});
