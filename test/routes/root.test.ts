import { test } from 'tap'
import { build } from '../helper'

test('default root route', async (t) => {
  const app = await build(t)

  const content = `
********************************************************************************

    Tennis Players - REST API

    T. M. Wong - genaddress@gmail.com - T. 06 80 28 99 55

    Tennis Players REST API to TypeScript 

    November 2023

********************************************************************************
`;

  const res = await app.inject({ url: '/' })

  t.same(res.payload, content)

})
