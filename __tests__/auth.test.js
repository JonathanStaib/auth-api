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

describe('Auth Tests', ()=> {
  it('allows a signup route to work properly', async() => {
    let response = await request.post('/signup').send({

      username: 'test',
      password: 'pass123',
      role: 'admin',
    });
    expect(response.status).toEqual(201);
    expect(response.body.user.username).toEqual('test');
    // expect(response.body.user.password).toEqual('pass123');
  });

  it('lets us sign in', async() => {
    let response = await request.post('/signin').auth('test', 'pass123');
    
    expect(response.status).toEqual(200);
    expect(response.body.user.username).toEqual('test');
  });
});