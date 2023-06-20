'use strict';

const { test } = require('tap');
const { build } = require('../helper');

test('default root route', async(t) => {

    const app = await build(t);

    const res = await app.inject({
        url: '/'
    });

    const content = `
********************************************************************************

    Tennis Players - REST API

    T. M. Wong - genaddress@gmail.com - T. 06 80 28 99 55

    Evaluation technique pour L'Atelier
    
    Juin 2023

********************************************************************************
`;

    t.same(res.payload, content);
});
