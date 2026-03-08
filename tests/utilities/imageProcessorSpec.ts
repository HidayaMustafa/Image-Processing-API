import imageProcessor from '../../src/utilities/imageProcessor';

describe('imageProcessor utility', (): void => {
    it('should return placeholder text', (): void => {
        expect(imageProcessor()).toBe('Image processor placeholder');
    });
});