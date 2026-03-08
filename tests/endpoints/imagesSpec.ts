import request from 'supertest';
import app from '../../src/app';

describe('GET /api/images', (): void => {
    it('should return status 200', async (): Promise<void> => {
        const response = await request(app).get('/api/images');
        expect(response.status).toBe(200);
    });
});