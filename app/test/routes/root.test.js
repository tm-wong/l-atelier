'use strict';

const { test } = require('tap');
const { build } = require('../helper');

test('default root route', async(t) => {

    console.log('relies with text/plain content');

    const app = await build(t);

    const res = await app.inject({
        url: '/'
    });

    const content = `
********************************************************************************

    Tennis Players API - REST

    T. M. Wong - genaddress@gmail.com - T. 06 80 28 99 55 / L'atelier

********************************************************************************
`;

    t.same(res.payload, content);
});
