'use strict';

const env = process.env.NODE_ENV || 'dev';
require('dotenv').config({ path: `.env.${ env }` });

const { test } = require('tap');
const Fastify = require('fastify');
const app = require('../../../../src/app');
const TOKEN = require('../../../token');


test('auth replies 200', async(t) => {

    const server = Fastify();
    server.register(app);
    const res = await server.inject({
        url: '/api/players',
        method: 'GET',
        headers: {
            authorization: `Bearer ${ TOKEN }`
        }
    });

    await server.close();

    t.equal(200, res.statusCode);
});


test('auth throws an Unauthorized error', async(t) => {

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

    t.equal(401, res.statusCode);
    t.equal('Unauthorized', content.message);
});


test('route returns list of players', async(t) => {

    const server = Fastify();
    server.register(app);

    const res = await server.inject({
        url: '/api/players',
        method: 'GET',
        headers: {
            authorization: `Bearer ${ TOKEN }`
        }
    });

    await server.close();
    const content = JSON.parse(res?.body);

    t.ok(Array.isArray(content));

    content.forEach(item => {
        t.type(item.id, 'number');
        t.hasOwnProps(item.player, [
            'firstname',
            'lastname',
            'shortname',
            'sex',
            'country',
            'picture',
            'data'
        ]);
        t.type(item.player.firstname, 'string');
        t.type(item.player.lastname, 'string');
        t.type(item.player.shortname, 'string');
        t.type(item.player.sex, 'string');
        t.type(item.player.country, 'object');
        t.type(item.player.picture, 'string');
        t.type(item.player.data, 'object');
    });
});


test('route returns single player', async(t) => {

    const server = Fastify();
    server.register(app);

    const res = await server.inject({
        url: '/api/players/17',
        method: 'GET',
        headers: {
            authorization: `Bearer ${ TOKEN }`
        }
    });

    await server.close();
    const content = JSON.parse(res?.body);

    t.hasOwnProps(content.player, [
        'firstname',
        'lastname',
        'shortname',
        'sex',
        'country',
        'picture',
        'data'
    ]);

    t.type(content.id, 'number');
    t.type(content.player.firstname, 'string');
    t.type(content.player.lastname, 'string');
    t.type(content.player.shortname, 'string');
    t.type(content.player.sex, 'string');
    t.type(content.player.country, 'object');
    t.type(content.player.picture, 'string');
    t.type(content.player.data, 'object');
});


test('route returns list of players', async(t) => {

    const server = Fastify();
    server.register(app);

    const res = await server.inject({
        url: '/api/players/kpis',
        method: 'GET',
        headers: {
            authorization: `Bearer ${ TOKEN }`
        }
    });

    await server.close();
    const content = JSON.parse(res?.body);

    t.type(content.kpis.maxPointRatioPerCountry, 'object')
    t.type(content.kpis.maxPointRatioPerCountry.country, 'string')
    t.type(content.kpis.maxPointRatioPerCountry.points, 'number')
    t.type(content.kpis.medianBodyHeight, 'number')

    t.hasOwnProps(content.kpis, [
        'maxPointRatioPerCountry',
        'medianBodyHeight',
        'imcs'
    ]);

    content.kpis.imcs.forEach(item => {
        t.hasOwnProps(item, [
            'id',
            'imc',
            'lastname',
            'firstname'
        ]);
        t.type(item.id, 'number');
        t.type(item.imc, 'number');
        t.type(item.lastname, 'string');
        t.type(item.firstname, 'string');
    });

});
