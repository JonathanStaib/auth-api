'use strict';

const { server } = require('../src/server');
const { db } = require('../src/models');
const supertest = require('supertest');
const request = supertest(server);

beforeAll(async()=> {
  await db.sync();
});

afterAll(async()=> {
  db.drop();
});

describe('v1 routes', () => {
  it('creates a record', async() => {
    let response = await request.post('/api/v1/food').send({
      name: 'taco bell',
      calories: 300,
      type: 'fast food',
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('taco bell');

  });

  it('gets all record', async() => {
    let response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('taco bell');

  });

  it('creates a single record by id', async() => {
    let response = await request.get('/api/v1/food/1');

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('taco bell');

  });

  it('update a single record by id', async() => {
    let response = await request.put('/api/v1/food/1').send({
      name: 'mcdonalds',
      calories: 300,
      type: 'fast food',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('mcdonalds');

  });

  it('deletes a single record by id', async() => {
    let response = await request.delete('/api/v1/food/1');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(1);

  });
});