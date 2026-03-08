import express, { Request, Response } from 'express';
import imageProcessor from '../../utilities/imageProcessor';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    // Read query parameters from the request
    const filename = req.query.filename as string;
    const width = Number(req.query.width);
    const height = Number(req.query.height);

    // Check if filename is missing
    if (!filename) {
        res.status(400).send('Missing filename parameter.');
        return;
    }

    // Check if width or height is missing
    if (!req.query.width || !req.query.height) {
        res.status(400).send('Missing width or height parameter.');
        return;
    }

    // Check if width and height are valid positive numbers
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        res.status(400).send('Width and height must be positive numbers.');
        return;
    }

    try {
        // Process the image and get the output path
        const outputPath = await imageProcessor(filename, width, height);

        // Send the resized image file to the client
        res.sendFile(outputPath);
    } catch (error) {
        if (error instanceof Error && error.message === 'Image not found') {
            res.status(404).send('Requested image was not found.');
            return;
        }

        res.status(500).send(
            'Something went wrong while processing the image.'
        );
    }
});

export default router;
