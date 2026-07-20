const { Jimp } = require("jimp");

async function main() {
  try {
    const originalPath = "../media__1784558727637.png"; // Let's read the original from the artifacts
    // Wait, the artifact is in c:\Users\ro224\.gemini\antigravity-ide\brain\d4f4f86c-c1c5-49f7-b683-b067516290ab\media__1784558727637.png
    const imgPath = "C:\\Users\\ro224\\.gemini\\antigravity-ide\\brain\\d4f4f86c-c1c5-49f7-b683-b067516290ab\\media__1784558727637.png";
    const image = await Jimp.read(imgPath);
    
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;
    
    // Scan all pixels
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const r = image.bitmap.data[idx];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        const a = image.bitmap.data[idx + 3];
        
        // If it's not purely white (or very close to it) and not completely transparent
        const isWhite = r > 240 && g > 240 && b > 240;
        const isTransparent = a === 0;
        
        if (!isWhite && !isTransparent) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    
    console.log(`Bounding box: minX=${minX}, minY=${minY}, maxX=${maxX}, maxY=${maxY}`);
    
    const cropWidth = maxX - minX;
    const cropHeight = maxY - minY;
    
    if (cropWidth > 0 && cropHeight > 0) {
      image.crop({ x: minX, y: minY, w: cropWidth, h: cropHeight });
      await image.write("public/logo.png");
      console.log("Successfully manually cropped and saved to public/logo.png");
    } else {
      console.log("Could not find a valid bounding box.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
