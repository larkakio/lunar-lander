import fs from 'fs';
import path from 'path';

function generateIconSvg(): string {
  return `<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#0a0a0a"/>
  <g stroke="#00ff41" fill="none" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="512,300 400,600 624,600"/>
    <line x1="400" y1="600" x2="350" y2="650"/>
    <line x1="624" y1="600" x2="674" y2="650"/>
    <path d="M 312 1024 A 200 200 0 0 1 712 1024" fill="none"/>
  </g>
  <g fill="#00ff41">
    ${Array.from({ length: 30 }, (_, i) => {
      const x = (i * 137.5) % 1024;
      const y = (i * 237.3) % 800;
      return `<rect x="${x}" y="${y}" width="2" height="2"/>`;
    }).join('\n    ')}
  </g>
</svg>`;
}

function generateHeroSvg(): string {
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="600" y="150" font-family="Orbitron, sans-serif" font-size="72" font-weight="bold" fill="#00ff41" text-anchor="middle">LUNAR LANDER</text>
  <text x="600" y="200" font-family="Share Tech Mono, monospace" font-size="24" fill="#f0f0f0" text-anchor="middle">Retro lunar landing challenge</text>
  <g stroke="#00ff41" fill="none" stroke-width="3">
    <path d="M 200 500 ${Array.from({ length: 20 }, (_, i) => {
      const x = 200 + (i * 40);
      const y = 500 + Math.sin(i * 0.3) * 30;
      return `L ${x} ${y}`;
    }).join(' ')}"/>
    <g transform="translate(600, 350)">
      <polygon points="0,-20 -15,15 15,15"/>
    </g>
  </g>
  <g fill="#00ff41">
    ${Array.from({ length: 50 }, (_, i) => {
      const x = (i * 137.5) % 1200;
      const y = (i * 237.3) % 500;
      return `<rect x="${x}" y="${y}" width="2" height="2"/>`;
    }).join('\n    ')}
  </g>
</svg>`;
}

async function main() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Generate SVG files (can be converted to PNG later)
    const iconSvg = generateIconSvg();
    fs.writeFileSync(path.join(publicDir, 'icon.svg'), iconSvg);
    console.log('✓ Generated icon.svg');

    const heroSvg = generateHeroSvg();
    fs.writeFileSync(path.join(publicDir, 'hero-image.svg'), heroSvg);
    console.log('✓ Generated hero-image.svg');

    console.log('\n✓ SVG assets generated successfully');
    console.log('Note: Convert SVG to PNG for production use (1024x1024 for icon, 1200x630 for hero)');
  } catch (error) {
    console.error('Error generating assets:', error);
    process.exit(1);
  }
}

main();
