const request = require('supertest');
const { app, server } = require('../../index');
const { closePool } = require("../../src/lib/mysql")

describe('test cases for all endPoints!!', () => {

  afterAll(async () => {
    await closePool();
    server.close();
  });

  it('should return a 200 OK status code for GET request to /health', async () => {
    const response = await request(server).get('/health');
    expect(response.status).toBe(200);
  });

  it('should create news and return a 200 OK status code', async () => {
    const matchId = 1;
    const news = {
      title: 'Demo News',
      news_description: 'This is a demo news.',
    };

    const response = await request(app)
      .post(`/news/create?matchId=${matchId}`)
      .send(news);

    expect(response.status).toBe(200);

  });

  it('should return a 400 Bad Request status code for incomplete data', async () => {
    const tourId = 1;
    const incompleteNews = {
      title: 'Incomplete News',
      // news_description is intentionally missing
    };

    const response = await request(app)
      .post(`/news/create?matchId=${tourId}`)
      .send(incompleteNews);

    expect(response.status).toBe(400);
  });

  it('should get news by matchId successfully', async () => {
    const matchId = 1;

    const response = await request(app)
      .get(`/news/match?matchId=${matchId}`);

    // Assuming response.body is an array
    expect(Array.isArray(response.body)).toBe(true);

    // Check if each item in the array has the expected properties and values
    response.body.forEach(newsItem => {
      expect(newsItem).toHaveProperty('id');
      expect(newsItem).toHaveProperty('title');
      expect(newsItem).toHaveProperty('news_description');
      expect(newsItem).toHaveProperty('tourId');

      // Check the type of each property
      expect(typeof newsItem.id).toBe('number');
      expect(typeof newsItem.title).toBe('string');
      expect(typeof newsItem.news_description).toBe('string');
      expect(typeof newsItem.tourId).toBe('number');
    });

    expect(response.status).toBe(200);

  });

  it('should return a 400 Bad Request status code for missing matchId parameter', async () => {
    const response = await request(app)
      .get('/news/match');
    expect(response.status).toBe(400);
  });

  it('should get news by tourId successfully', async () => {
    const tourId = 1;
    const response = await request(app)
      .get(`/news/tour?tourId=${tourId}`);

    expect(response.status).toBe(200);
  });

  it('should return a 400 Bad Request status code for missing tourId parameter', async () => {
    const response = await request(app)
      .get('/news/tour');
    expect(response.status).toBe(400);
  });

  it('should get news by sportId successfully', async () => {
    const sportId = 1;
    const response = await request(app)
      .get(`/news/sport?sportId=${sportId}`);

    expect(response.status).toBe(200);
  });

  it('should return a 400 Bad Request status code for missing sportId parameter', async () => {
    const response = await request(app)
      .get('/news/sport');
    expect(response.status).toBe(400);
  });

});

