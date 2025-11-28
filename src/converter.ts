import { Jimp } from 'jimp';

export interface AsciiOptions {
  width?: number;
  invert?: boolean;
  contrast?: number;
  brightness?: number;
  edgeDetection?: boolean;
}

// More detailed ASCII characters for better contrast
const ASCII_CHARS = ' .\'`^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

export default async function imageToAscii(
  imagePath: string,
  options: AsciiOptions = {}
): Promise<string> {
  const { 
    width = 100, 
    invert = false,
    contrast = 0.3,
    brightness = 0.2,
    edgeDetection = false
  } = options;

  // Load the image
  const image = await Jimp.read(imagePath);

  // Calculate height to maintain aspect ratio (chars are taller than wide)
  const aspectRatio = image.bitmap.height / image.bitmap.width;
  const height = Math.floor(width * aspectRatio * 0.5);

  // Pre-process the image for better facial features
  await image.resize({ w: width, h: height });
  await image.greyscale();
  
  // Normalize the image first to ensure good brightness distribution
  await image.normalize();
  
  // Then apply contrast and brightness
  await image.contrast(contrast);
  await image.brightness(brightness);

  let asciiArt = '';
  let minBrightness = 255;
  let maxBrightness = 0;

  // Convert each pixel to ASCII
  for (let y = 0; y < image.bitmap.height; y++) {
    for (let x = 0; x < image.bitmap.width; x++) {
      const pixel = image.getPixelColor(x, y);
      
      // Extract brightness (already grayscale)
      const r = (pixel >> 24) & 0xff;
      
      // Track min/max for debugging
      minBrightness = Math.min(minBrightness, r);
      maxBrightness = Math.max(maxBrightness, r);
      
      // Map brightness to ASCII character with more granularity
      const charIndex = Math.floor(
        (r / 255) * (ASCII_CHARS.length - 1)
      );
      
      const char = invert 
        ? ASCII_CHARS[ASCII_CHARS.length - 1 - charIndex]
        : ASCII_CHARS[charIndex];
      
      asciiArt += char;
    }
    asciiArt += '\n';
  }

  // Debug info
  console.log(`Brightness range: ${minBrightness} - ${maxBrightness}`);

  return asciiArt;
}