import imageToAscii from './converter';
import path from 'path';
import fs from 'fs';

async function main() {
  const imagePath = process.argv[2];
  
  if (!imagePath) {
    console.error('Usage: npm start <image-path>');
    process.exit(1);
  }
  
  try {
    // Generate with enhanced settings for facial features
    const asciiArt = await imageToAscii(imagePath, {
      width: 60,            // Reduced from 120 - try 40, 60, 80, or 100
      invert: false,
      contrast: 0.6,
      brightness: 0.15
    });
    
    console.log(asciiArt);
    
    // Save to file
    const outputPath = path.join(__dirname, '../examples/output.txt');
    fs.writeFileSync(outputPath, asciiArt);
    console.log(`\nSaved to ${outputPath}`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();