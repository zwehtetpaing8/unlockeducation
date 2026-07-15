const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

loadImage('public/logo.png').then((img) => {
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const w = canvas.width;
  const h = canvas.height;

  // Set visited map
  const visited = new Uint8Array(w * h);

  // Helper to get pixel index
  const getIdx = (x, y) => (y * w + x) * 4;

  // Check if color is background-like (white or light gray checker)
  // Corner colors were [241, 242, 242] and [239, 239, 240]
  // Let's just say any pixel where all R,G,B > 220 and max-min < 20
  const isBg = (x, y) => {
    const idx = getIdx(x, y);
    const r = data[idx];
    const g = data[idx+1];
    const b = data[idx+2];
    const a = data[idx+3];
    if (a === 0) return true;
    if (r > 220 && g > 220 && b > 220 && Math.abs(r - g) < 20 && Math.abs(g - b) < 20) {
      return true;
    }
    return false;
  };

  // BFS Queue
  const queue = [];

  // Add all border pixels that are background to queue
  for (let x = 0; x < w; x++) {
    if (isBg(x, 0)) { queue.push({x, y: 0}); visited[x] = 1; }
    if (isBg(x, h-1)) { queue.push({x, y: h-1}); visited[(h-1)*w + x] = 1; }
  }
  for (let y = 0; y < h; y++) {
    if (isBg(0, y) && !visited[y*w]) { queue.push({x: 0, y}); visited[y*w] = 1; }
    if (isBg(w-1, y) && !visited[y*w + w-1]) { queue.push({x: w-1, y}); visited[y*w + w-1] = 1; }
  }

  // Process queue
  let head = 0;
  while (head < queue.length) {
    const {x, y} = queue[head++];
    
    // Clear this pixel
    const idx = getIdx(x, y);
    data[idx+3] = 0; // Alpha to 0

    // Check neighbors
    const neighbors = [
      {nx: x+1, ny: y},
      {nx: x-1, ny: y},
      {nx: x, ny: y+1},
      {nx: x, ny: y-1}
    ];

    for (let i = 0; i < 4; i++) {
      const {nx, ny} = neighbors[i];
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nIdx = ny * w + nx;
        if (!visited[nIdx] && isBg(nx, ny)) {
          visited[nIdx] = 1;
          queue.push({x: nx, y: ny});
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('public/logo.png', buffer);
  console.log('Background removed!');
});
