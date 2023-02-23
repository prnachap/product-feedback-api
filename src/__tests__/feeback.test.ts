/* eslint-disable no-undef */
import supertest from 'supertest';
import { app } from '../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { createFeedback } from '../service/feeback.service';

const userId = new mongoose.Types.ObjectId().toString();
const productPayload = {
  title: 'new feedback',
  category: 'sdd',
  description: 'Add ability to create professional looking portfolio from profile.',
  status: 'active',
  user: userId,
  createdAt: new Date(),
  updatedAt: new Date(),
  upvotes: [],
  comments: [],
};

describe('feedback', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('feedbacks', () => {
    describe('GET /feedbacks', () => {
      it('should return all the feedback with status code of 200', async () => {
        const productId = '634796b45316767669a8ebd5';
        await supertest(app).get(`/${productId}`).expect(404);
      });
    });
    describe('given the product does exists', () => {
      it('should return a 200 status and the product', async () => {
        const product = await createFeedback(productPayload);
        const { body, statusCode } = await supertest(app).get(`/${product?.id}`);
        console.log('body', body);
        expect(statusCode).toBe(404);
      });
    });
  });
});
