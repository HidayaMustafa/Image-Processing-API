import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imageProcessor = async (
    filename: string,
    width: number,
    height: number
): Promise<string> => {
    // Resolve paths from the project root
    const projectRoot = process.cwd();
    const fullDir = path.join(projectRoot, 'assets', 'full');
    const thumbDir = path.join(projectRoot, 'assets', 'thumb');

    // Build the original image path
    const fullImagePath = path.join(fullDir, `${filename}.jpg`);

    // Build a unique cached filename
    const resizedImageName = `${filename}_${width}_${height}.jpg`;
    const thumbImagePath = path.join(thumbDir, resizedImageName);

    // Make sure the cache directory exists
    await fs.promises.mkdir(thumbDir, { recursive: true });

    // Check if the original image exists
    if (!fs.existsSync(fullImagePath)) {
        throw new Error('Image not found');
    }

    // Return the cached image if it already exists
    if (fs.existsSync(thumbImagePath)) {
        return thumbImagePath;
    }

    // Resize the image and save it in the cache folder
    await sharp(fullImagePath).resize(width, height).toFile(thumbImagePath);

    return thumbImagePath;
};

export default imageProcessor;