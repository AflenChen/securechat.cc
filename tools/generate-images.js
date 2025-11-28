const fs = require('fs');
const path = require('path');

// Check if canvas is available
let createCanvas;
try {
    const canvas = require('canvas');
    createCanvas = canvas.createCanvas;
} catch (e) {
    console.error('❌ Error: canvas package not found.');
    console.log('📦 Please install canvas: npm install canvas');
    console.log('💡 Or use the browser version: tools/generate-images.html');
    process.exit(1);
}

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const centerX = size / 2;
  const centerY = size / 2;
  const scale = size / 512;

  // Draw chat bubble
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  const bubbleWidth = 220 * scale;
  const bubbleHeight = 160 * scale;
  const bubbleX = centerX - bubbleWidth / 2;
  const bubbleY = centerY - bubbleHeight / 2 - 20 * scale;
  
  // Rounded rectangle for chat bubble
  const radius = 20 * scale;
  ctx.beginPath();
  ctx.moveTo(bubbleX + radius, bubbleY);
  ctx.lineTo(bubbleX + bubbleWidth - radius, bubbleY);
  ctx.quadraticCurveTo(bubbleX + bubbleWidth, bubbleY, bubbleX + bubbleWidth, bubbleY + radius);
  ctx.lineTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight - radius);
  ctx.quadraticCurveTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight, bubbleX + bubbleWidth - radius, bubbleY + bubbleHeight);
  ctx.lineTo(bubbleX + radius, bubbleY + bubbleHeight);
  ctx.quadraticCurveTo(bubbleX, bubbleY + bubbleHeight, bubbleX, bubbleY + bubbleHeight - radius);
  ctx.lineTo(bubbleX, bubbleY + radius);
  ctx.quadraticCurveTo(bubbleX, bubbleY, bubbleX + radius, bubbleY);
  ctx.closePath();
  ctx.fill();
  
  // Chat bubble tail
  ctx.beginPath();
  ctx.moveTo(bubbleX + 40 * scale, bubbleY + bubbleHeight);
  ctx.lineTo(bubbleX + 20 * scale, bubbleY + bubbleHeight + 15 * scale);
  ctx.lineTo(bubbleX + 60 * scale, bubbleY + bubbleHeight);
  ctx.closePath();
  ctx.fill();
  
  // Draw lock icon inside bubble
  const lockSize = 50 * scale;
  const lockX = centerX;
  const lockY = centerY - 10 * scale;
  
  // Lock body
  ctx.fillStyle = '#667eea';
  ctx.fillRect(lockX - lockSize / 2, lockY, lockSize, lockSize * 0.7);
  
  // Lock shackle
  ctx.strokeStyle = '#667eea';
  ctx.lineWidth = 6 * scale;
  ctx.beginPath();
  ctx.arc(lockX, lockY - 5 * scale, lockSize * 0.4, Math.PI, 0, false);
  ctx.stroke();
  
  // Lock keyhole
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.arc(lockX, lockY + lockSize * 0.2, 8 * scale, 0, Math.PI * 2);
  ctx.fill();

  // Text for larger icons
  if (size >= 180) {
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${50 * scale}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CHAT', centerX, centerY + 100 * scale);
  }

  return canvas;
}

function drawOgImage() {
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Decorations
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.beginPath();
  ctx.arc(width - 100, 100, 200, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(100, height - 100, 200, 0, Math.PI * 2);
  ctx.fill();

  // Large chat bubble icon
  const iconX = width / 2;
  const iconY = height / 2 - 80;
  
  // Chat bubble
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  const bubbleWidth = 300;
  const bubbleHeight = 220;
  const bubbleX = iconX - bubbleWidth / 2;
  const bubbleY = iconY - bubbleHeight / 2;
  
  // Rounded rectangle
  const radius = 30;
  ctx.beginPath();
  ctx.moveTo(bubbleX + radius, bubbleY);
  ctx.lineTo(bubbleX + bubbleWidth - radius, bubbleY);
  ctx.quadraticCurveTo(bubbleX + bubbleWidth, bubbleY, bubbleX + bubbleWidth, bubbleY + radius);
  ctx.lineTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight - radius);
  ctx.quadraticCurveTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight, bubbleX + bubbleWidth - radius, bubbleY + bubbleHeight);
  ctx.lineTo(bubbleX + radius, bubbleY + bubbleHeight);
  ctx.quadraticCurveTo(bubbleX, bubbleY + bubbleHeight, bubbleX, bubbleY + bubbleHeight - radius);
  ctx.lineTo(bubbleX, bubbleY + radius);
  ctx.quadraticCurveTo(bubbleX, bubbleY, bubbleX + radius, bubbleY);
  ctx.closePath();
  ctx.fill();
  
  // Chat bubble tail
  ctx.beginPath();
  ctx.moveTo(bubbleX + 60, bubbleY + bubbleHeight);
  ctx.lineTo(bubbleX + 30, bubbleY + bubbleHeight + 25);
  ctx.lineTo(bubbleX + 90, bubbleY + bubbleHeight);
  ctx.closePath();
  ctx.fill();
  
  // Lock icon inside bubble
  const lockSize = 80;
  const lockX = iconX;
  const lockY = iconY + 20;
  
  // Lock body
  ctx.fillStyle = '#667eea';
  ctx.fillRect(lockX - lockSize / 2, lockY, lockSize, lockSize * 0.7);
  
  // Lock shackle
  ctx.strokeStyle = '#667eea';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(lockX, lockY - 8, lockSize * 0.4, Math.PI, 0, false);
  ctx.stroke();
  
  // Lock keyhole
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.arc(lockX, lockY + lockSize * 0.2, 12, 0, Math.PI * 2);
  ctx.fill();

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 4;
  ctx.fillText('Secure Chat', width / 2, iconY + 200);

  // Subtitle
  ctx.font = '36px Arial';
  ctx.shadowBlur = 5;
  ctx.fillText('AI Chat Helper & Reply Assistant', width / 2, iconY + 270);

  // Domain
  ctx.font = '28px Arial';
  ctx.shadowBlur = 3;
  ctx.fillText('securechat.cc', width / 2, height - 40);

  ctx.shadowBlur = 0;

  return canvas;
}

function savePng(canvas, filename) {
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filename, buffer);
  console.log('✅ Generated', filename);
}

function saveJpeg(canvas, filename) {
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
  fs.writeFileSync(filename, buffer);
  console.log('✅ Generated', filename);
}

function main() {
  // Create directories if they don't exist
  const iconsDir = path.join(__dirname, '..', 'assets', 'icons');
  const imagesDir = path.join(__dirname, '..', 'assets', 'images');
  
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  console.log('🎨 Generating Secure Chat icons and images...\n');

  // Icon sizes
  const sizes = [64, 180, 192, 512];

  sizes.forEach((size) => {
    const canvas = drawIcon(size);
    let filename = `icon-${size}x${size}.png`;
    if (size === 180) filename = 'apple-touch-icon.png';
    if (size === 64) filename = 'favicon.png';
    const filepath = path.join(iconsDir, filename);
    savePng(canvas, filepath);
  });

  // OG image
  const ogCanvas = drawOgImage();
  const ogFilepath = path.join(imagesDir, 'og-image.jpg');
  saveJpeg(ogCanvas, ogFilepath);

  console.log('\n✅ All images generated successfully!');
  console.log('📁 Icons saved to: assets/icons/');
  console.log('📁 OG image saved to: assets/images/');
  console.log('\n💡 Next step: Convert favicon.png to favicon.ico using:');
  console.log('   - Online: https://favicon.io/favicon-converter/');
  console.log('   - Or ImageMagick: convert assets/icons/favicon.png assets/icons/favicon.ico');
}

main();

