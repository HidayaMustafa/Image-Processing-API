import express, { Application, Request, Response } from 'express';
import imagesRoute from './routes/api/images';

const app: Application = express();

app.get('/', (_req: Request, res: Response): void => {
    res.status(200).send('Image Processing API is running.');
});

app.use('/api/images', imagesRoute);

export default app;
