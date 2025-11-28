import { createCanvas, loadImage } from 'canvas';
import { ImageData } from '../types';

export async function loadImage(imagePath: string): Promise<ImageData> {
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    
    const imageData = context.getImageData(0, 0, image.width, image.height);
    return {
        width: imageData.width,
        height: imageData.height,
        data: imageData.data
    };
}