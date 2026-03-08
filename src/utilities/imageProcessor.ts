import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imageProcessor = async (
    filename: string,
    width: number,
    height: number
): Promise<string> => {
    // Build the path of the original image
    const fullImagePath = path.resolve(
        __dirname,
        '../../../assets/full',
        `${filename}.jpg`
    );

    // Build a unique filename for the resized image
    const resizedImageName = `${filename}_${width}_${height}.jpg`;

    // Build the path of the cached resized image
    const thumbImagePath = path.resolve(
        __dirname,
        '../../../assets/thumb',
        resizedImageName
    );

    // Check if the original image exists
    if (!fs.existsSync(fullImagePath)) {
        throw new Error('Image not found');
    }

    // Return the cached image if it already exists
    if (fs.existsSync(thumbImagePath)) {
        return thumbImagePath;
    }

    // Resize the image and save it to the thumb folder
    await sharp(fullImagePath).resize(width, height).toFile(thumbImagePath);

    return thumbImagePath;
};

export default imageProcessor;
