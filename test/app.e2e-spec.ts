import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

//to run: npm run test:e2e
describe('UserController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    //  login to get the authentication token
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'test10@example.com', password: 'password' });

    authToken = loginResponse.body.access_token; // Extract the authentication token
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ email: 'test13@example.com', password: 'password', fullName: 'Test User' })
      .expect(201);
  });

  it('should delete the user', () => {
    return request(app.getHttpServer())
      .delete('/users/1')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });

});

describe('MembershipController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Perform login to obtain the authentication token
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'test@example.com', password: 'password' });

    authToken = loginResponse.body.access_token; // Extract the authentication token
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new membership', () => {
    return request(app.getHttpServer())
      .post('/users/membership')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ membershipTypeId: 1 })
      .expect(201);
  });

  it('should delete the membership', () => {
    return request(app.getHttpServer())
      .delete('/users/membership/1')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });
});

describe('LoyaltyRewardTypeController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Perform login to obtain the authentication token
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'test@example.com', password: 'password' });

    authToken = loginResponse.body.access_token; // Extract the authentication token
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return all loyalty reward types', () => {
    return request(app.getHttpServer())
      .get('/loyalty-reward-type')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });

  it('should return a specific loyalty reward type', () => {
    return request(app.getHttpServer())
      .get('/loyalty-reward-type/1')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });
});

describe('LocationController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Perform login to obtain the authentication token
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'test@example.com', password: 'password' });

    authToken = loginResponse.body.access_token; // Extract the authentication token
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new location', () => {
    return request(app.getHttpServer())
      .post('/locations')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Test Location', address: '123 Test Street' })
      .expect(201);
  });

  it('should retrieve all locations', () => {
    return request(app.getHttpServer())
      .get('/locations')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });

  it('should retrieve a specific location', () => {
    return request(app.getHttpServer())
      .get('/locations/1')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });

});


