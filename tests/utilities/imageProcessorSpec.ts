import fs from 'fs';
import path from 'path';
import imageProcessor from '../../src/utilities/imageProcessor';

describe('imageProcessor utility', (): void => {
    it('should create a resized image for valid inputs', async (): Promise<void> => {
        const outputPath = await imageProcessor('fjord', 200, 200);

        expect(fs.existsSync(outputPath)).toBeTrue();
    });

    it('should create the thumb directory if it does not exist', async (): Promise<void> => {
        const thumbDir = path.join(process.cwd(), 'assets', 'thumb');

        if (fs.existsSync(thumbDir)) {
            fs.rmSync(thumbDir, { recursive: true, force: true });
        }

        await imageProcessor('fjord', 220, 220);

        expect(fs.existsSync(thumbDir)).toBeTrue();
    });

    it('should throw an error if the original image does not exist', async (): Promise<void> => {
        try {
            await imageProcessor('unknown-image', 200, 200);
            fail('Expected function to throw an error for missing image.');
        } catch (error) {
            expect((error as Error).message).toBe('Image not found');
        }
    });
});