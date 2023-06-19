'use strict';

require('dotenv').config();

const { test } = require('tap');
const Fastify = require('fastify');
const app = require('../../../../app');


test('auth replies 200', async(t) => {

    console.log('auth replies 200 with auth token');

    const server = Fastify();
    server.register(app);
    const res = await server.inject({
        url: '/api/players',
        method: 'GET',
        headers: {
            authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1Ybzg4SFJXUEVWYzJCV0pUdDBFaSJ9.eyJpc3MiOiJodHRwczovL2Rldi15MXozYWN5cHVvcGxvcDZoLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJDWlU3bHpUQVVtZzVNR2pyOFF5UFFKYkhCdVhzVFV5bUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYteTF6M2FjeXB1b3Bsb3A2aC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY4NzExOTY2MCwiZXhwIjoxNjg3MjA2MDYwLCJhenAiOiJDWlU3bHpUQVVtZzVNR2pyOFF5UFFKYkhCdVhzVFV5bSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.jXs0rMnq49lMAb2sS_dkQdpykKMq9KlgPts228wwK8FSeCmhewlWSeZxzVCkh0dpFZ0gDDSIMHhuAzuQaiKrVICJTS8dn8IGx6vI3kXmTQpzBRvMLIPcfG3u7PPKsn-UJR6uMPlD0HviP2fuc-cyzG8OT2VAkfCkrtz7gK8fjoXInCTU26VP2onJ91niu_qFFTYr7HNy00qTuL8fwwxuQsuev8BLGFG5u7WCUawmDdVrxSWUVTwJWEYYnMVHdsjsLNh-LsqozJn-gbzRtK2-KaT7Vgiagrqn7nUGN9TGmK0HosHi6iStTcSepQ3O1wE6ID99mzltKVyWdnTIUSQdKw'
        }
    });

    await server.close();

    t.equal(200, res.statusCode);
});


test('auth throws an Unauthorized error', async(t) => {

    console.log('auth throws an Unauthorized error when authorization header is missing');

    const server = Fastify();
    server.register(app);

    const res = await server.inject({
        url: '/api/players',
        method: 'GET'
    });

    await server.close();
    const content = JSON.parse(res?.body);

    t.equal(401, res.statusCode);
    t.equal('Unauthorized', content.message);
});


test('auth throws an bad request error', async(t) => {

    console.log('auth throws an bad request error when token header is malformed or missing');

    const server = Fastify();
    server.register(app);

    const res = await server.inject({
        url: '/api/players',
        method: 'GET',
        headers: {
            authorization: '123'
        }
    });

    await server.close();
    const content = JSON.parse(res?.body);

    t.equal(400, res.statusCode);
    t.equal('Bad Request', content.message);
});


test('auth throws an forbidden error', async(t) => {

    console.log('auth throws an forbidden error when token is not authorized');

    const server = Fastify();
    server.register(app);

    const res = await server.inject({
        url: '/api/players',
        method: 'GET',
        headers: {
            authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1Ybzg4SFJXUEVWYzJCV0pUdDBFaSXx.eyJpc3MiOiJodHRwczovL2Rldi15MXozYWN5cHVvcGxvcDZoLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJDWlU3bHpUQVVtZzVNR2pyOFF5UFFKYkhCdVhzVFV5bUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYteTF6M2FjeXB1b3Bsb3A2aC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY4NzExOTY2MCwiZXhwIjoxNjg3MjA2MDYwLCJhenAiOiJDWlU3bHpUQVVtZzVNR2pyOFF5UFFKYkhCdVhzVFV5bSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.jXs0rMnq49lMAb2sS_dkQdpykKMq9KlgPts228wwK8FSeCmhewlWSeZxzVCkh0dpFZ0gDDSIMHhuAzuQaiKrVICJTS8dn8IGx6vI3kXmTQpzBRvMLIPcfG3u7PPKsn-UJR6uMPlD0HviP2fuc-cyzG8OT2VAkfCkrtz7gK8fjoXInCTU26VP2onJ91niu_qFFTYr7HNy00qTuL8fwwxuQsuev8BLGFG5u7WCUawmDdVrxSWUVTwJWEYYnMVHdsjsLNh-LsqozJn-gbzRtK2-KaT7Vgiagrqn7nUGN9TGmK0HosHi6iStTcSepQ3O1wE6ID99mzltKVyWdnTIUSQdKw'
        }
    });

    await server.close();
    const content = JSON.parse(res?.body);

    t.equal(403, res.statusCode);
    t.equal('Forbidden', content.message);
});
