'use strict';

const { server } = require('../src/server');
const { db, users } = require('../src/models');
const supertest = require('supertest');
const request = supertest(server);

let testAdmin;

beforeAll(async()=> {
  await db.sync();
  testAdmin = await users.create({

    username: 'test',
    password: 'pass123',
    role: 'admin',
  });
});

afterAll(async()=> {
  db.drop();
});

describe('v2 routes', () => {
  it('creates a record', async() => {
    let response = await request.post('/api/v2/food').send({
      name: 'taco bell',
      calories: 200,
      type: 'fast food',
    }).set('Authorization', `Bearer ${testAdmin.token}`);
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('taco bell');

  });

  it('gets all record', async() => {
    let response = await request.get('/api/v2/food').set('Authorization', `Bearer ${testAdmin.token}`);
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('taco bell');

  });

  it('gets a single record by id', async() => {
    let response = await request.get('/api/v2/food/1').set('Authorization', `Bearer ${testAdmin.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('taco bell');

  });

  it('update a single record', async() => {
    let response = await request.put('/api/v2/food/1').send({
      name: 'mcdonalds',
      calories: 200,
      type: 'fast food',
    }).set('Authorization', `Bearer ${testAdmin.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('mcdonalds');

  });

  it('deletes a single record by id', async() => {
    let response = await request.delete('/api/v2/food/1').set('Authorization', `Bearer ${testAdmin.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(1);

  });
});