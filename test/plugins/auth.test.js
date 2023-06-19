'use strict';

require('dotenv').config();

const { test } = require('tap');
const Fastify = require('fastify');
const auth = require('../../plugins/auth');

const reply = {};

const request = {
    headers: {
        authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1Ybzg4SFJXUEVWYzJCV0pUdDBFaSJ9.eyJpc3MiOiJodHRwczovL2Rldi15MXozYWN5cHVvcGxvcDZoLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJDWlU3bHpUQVVtZzVNR2pyOFF5UFFKYkhCdVhzVFV5bUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYteTF6M2FjeXB1b3Bsb3A2aC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY4NzExOTY2MCwiZXhwIjoxNjg3MjA2MDYwLCJhenAiOiJDWlU3bHpUQVVtZzVNR2pyOFF5UFFKYkhCdVhzVFV5bSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.jXs0rMnq49lMAb2sS_dkQdpykKMq9KlgPts228wwK8FSeCmhewlWSeZxzVCkh0dpFZ0gDDSIMHhuAzuQaiKrVICJTS8dn8IGx6vI3kXmTQpzBRvMLIPcfG3u7PPKsn-UJR6uMPlD0HviP2fuc-cyzG8OT2VAkfCkrtz7gK8fjoXInCTU26VP2onJ91niu_qFFTYr7HNy00qTuL8fwwxuQsuev8BLGFG5u7WCUawmDdVrxSWUVTwJWEYYnMVHdsjsLNh-LsqozJn-gbzRtK2-KaT7Vgiagrqn7nUGN9TGmK0HosHi6iStTcSepQ3O1wE6ID99mzltKVyWdnTIUSQdKw'
    }
};

const expected = {
  iss: 'https://dev-y1z3acypuoplop6h.us.auth0.com/',
  sub: 'CZU7lzTAUmg5MGjr8QyPQJbHBuXsTUym@clients',
  aud: 'https://dev-y1z3acypuoplop6h.us.auth0.com/api/v2/',
  iat: 1687119660,
  exp: 1687206060,
  azp: 'CZU7lzTAUmg5MGjr8QyPQJbHBuXsTUym',
  gty: 'client-credentials'
};


test('auth token is parsed and decoded', async(t) => {

    console.log('auth token is parsed and decoded');

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
