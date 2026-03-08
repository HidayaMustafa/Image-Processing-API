import fs from 'fs';
import imageProcessor from '../../src/utilities/imageProcessor';

describe('imageProcessor utility', (): void => {
    it('should create a resized image for valid inputs', async (): Promise<void> => {
        const outputPath = await imageProcessor('fjord', 200, 200);

        expect(fs.existsSync(outputPath)).toBeTrue();
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
