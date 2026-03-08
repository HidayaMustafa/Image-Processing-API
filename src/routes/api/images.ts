import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (_req: Request, res: Response): void => {
    res.status(200).send('Images endpoint is working.');
});

export default router;