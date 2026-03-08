import request from 'supertest';
import app from '../../src/app';

describe('GET /api/images', (): void => {
    it('should return status 200 for valid query parameters', async (): Promise<void> => {
        const response = await request(app).get(
            '/api/images?filename=fjord&width=200&height=200'
        );

        expect(response.status).toBe(200);
    });

    it('should return status 400 if filename is missing', async (): Promise<void> => {
        const response = await request(app).get(
            '/api/images?width=200&height=200'
        );

        expect(response.status).toBe(400);
    });

    it('should return status 400 if width is invalid', async (): Promise<void> => {
        const response = await request(app).get(
            '/api/images?filename=fjord&width=-5&height=200'
        );

        expect(response.status).toBe(400);
    });
});
