export function mapPixelsToAscii(pixels: ImageData): string {
    const asciiChars = '@%#*+=-:. '; // Characters from dark to light
    let asciiArt = '';

    for (let y = 0; y < pixels.height; y++) {
        for (let x = 0; x < pixels.width; x++) {
            const index = (y * pixels.width + x) * 4; // RGBA
            const r = pixels.data[index];
            const g = pixels.data[index + 1];
            const b = pixels.data[index + 2];

            // Calculate brightness
            const brightness = (r + g + b) / 3;
            const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
            asciiArt += asciiChars[charIndex];
        }
        asciiArt += '\n'; // New line for each row
    }

    return asciiArt;
}