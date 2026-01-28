# Lunar Lander Mini App

A physics-based retro space game Mini App for Base.app and Farcaster, featuring authentic vector graphics aesthetic and realistic lunar landing simulation.

## Features

- 🚀 **Realistic Physics**: Lunar gravity (1.62 m/s²) with accurate thrust mechanics
- 🎮 **Multiple Difficulty Levels**: Training, Cadet, Prime, and Command modes
- 📱 **Mobile-First Controls**: Touch-optimized 3-zone control system
- 🎨 **Retro Vector Graphics**: Classic monochrome green aesthetic
- 🏆 **Scoring System**: Fuel-based scoring with landing zone bonuses
- 🔗 **Farcaster Integration**: Share scores and play within Farcaster
- ⚡ **Base Network**: Built for Base blockchain integration

## Getting Started

### Prerequisites

- Node.js 20+ (required for dependencies)
- npm or yarn
- Base app account (for deployment)
- Vercel account (for hosting)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd lunar-lander
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your values:
# NEXT_PUBLIC_APP_URL - Your deployment URL (e.g., https://lunar-lander.vercel.app)
```

4. Generate assets:
```bash
npm run generate-assets
# This creates SVG files - convert to PNG for production:
# - icon.svg → icon.png (1024x1024, no transparency)
# - hero-image.svg → hero-image.png (1200x630)
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_APP_URL` - Your Vercel domain (e.g., `https://lunar-lander.vercel.app`)
   - `NEXT_PUBLIC_BASE_APP_ID` - From base.dev (optional)
4. Deploy

### Set up Base Mini App Manifest

1. After deployment, get your domain (e.g., `your-app.vercel.app`)
2. Update `minikit.config.ts` with your domain (or set `NEXT_PUBLIC_APP_URL` env var)
3. The manifest will be automatically generated at `/.well-known/farcaster.json`

### Generate Account Association

1. Go to [Base Build Account Association Tool](https://www.base.dev/preview?tab=account)
2. Paste your domain in the "App URL" field
3. Click "Submit" then "Verify"
4. Copy the `accountAssociation` object
5. Update `minikit.config.ts` with the account association credentials:
```typescript
accountAssociation: {
  header: "...",
  payload: "...",
  signature: "..."
}
```
6. Push changes to trigger new deployment

### Verify Your App

1. Test with [Base Preview Tool](https://base.dev/preview)
   - Add your app URL
   - Check "Account association" tab
   - Check "Metadata" tab
2. Test with [Farcaster Embed Tool](https://farcaster.xyz/~/developers/mini-apps/embed)
3. Look for "Embed Valid 3" status

## Asset Requirements

### Icon (icon.png)
- Size: 1024×1024 px
- Format: PNG
- No transparency
- Must be readable at small sizes

### Hero Image (hero-image.png)
- Size: 1200×630 px (1.91:1 aspect ratio)
- Format: PNG/JPG
- High quality
- No Base logo or team photos

### Screenshots
- 3 screenshots
- Portrait orientation: 1284×2778 px
- Highlight key functionality
- Save as `screenshot-portrait-1.png`, `screenshot-portrait-2.png`, `screenshot-portrait-3.png`

## Base Mini App Guidelines

This app follows Base's featured guidelines:

- ✅ Loads within 3 seconds
- ✅ Actions complete within 1 second
- ✅ Supports light and dark modes
- ✅ Minimum 44px touch targets
- ✅ Client-agnostic (no hard-coded Farcaster text)
- ✅ Transactions are sponsored (Base network)
- ✅ Clear onboarding instructions
- ✅ User avatar and username displayed (no 0x addresses)

## Project Structure

```
lunar-lander/
├── app/
│   ├── .well-known/
│   │   └── farcaster/
│   │       └── route.ts          # Manifest API route
│   ├── api/
│   │   └── webhook/
│   │       └── route.ts          # Webhook handler
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Main game page
│   └── globals.css               # Global styles
├── components/
│   ├── FarcasterReady.tsx        # Farcaster SDK integration
│   ├── Game/
│   │   ├── Controls.tsx          # Touch controls
│   │   ├── GameCanvas.tsx        # Canvas rendering
│   │   └── HUD.tsx               # Heads-up display
│   └── UI/
│       ├── GameOverScreen.tsx    # Game over screen
│       ├── ShareButton.tsx      # Share functionality
│       └── StartScreen.tsx       # Start screen
├── context/
│   └── GameContext.tsx           # Game state context
├── hooks/
│   ├── useFarcasterSDK.ts        # Farcaster SDK hook
│   ├── useGameLoop.ts            # Game loop hook
│   └── useGameState.ts           # Game state management
├── lib/
│   ├── collision.ts              # Collision detection
│   ├── difficulty.ts             # Difficulty configurations
│   ├── physics.ts                # Physics engine
│   ├── scoring.ts                # Scoring system
│   └── terrain-generator.ts     # Terrain generation
├── public/
│   ├── .well-known/
│   │   └── farcaster.json        # Static manifest (fallback)
│   ├── icon.svg                  # App icon (SVG)
│   └── hero-image.svg            # Hero image (SVG)
├── scripts/
│   └── generate-assets.ts        # Asset generation script
├── minikit.config.ts             # Base MiniKit configuration
├── next.config.js                # Next.js configuration
└── package.json                  # Dependencies

```

## Development

### Running Locally

```bash
npm run dev
```

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Troubleshooting

### Build Errors

- Ensure Node.js 20+ is installed (use `nvm use 20` if using nvm)
- Run `rm -rf node_modules .next` and `npm install` again
- Check for TypeScript errors: `npm run build`

### Manifest Not Loading

- Check that `NEXT_PUBLIC_APP_URL` is set correctly
- Verify the API route at `/.well-known/farcaster` is accessible
- Check browser console for errors

### Assets Not Loading

- Ensure files are in `public/` directory
- Check file names match manifest exactly
- Verify URLs in manifest use your domain

## Next Steps

1. Convert SVG assets to PNG format
2. Create 3 portrait screenshots (1284×2778 px)
3. Deploy to Vercel
4. Generate account association credentials
5. Test with Base Preview Tool
6. Submit for featured placement on Base

## License

MIT

## References

- [Base Mini Apps Documentation](https://docs.base.org/mini-apps/quickstart/create-new-miniapp)
- [Base Featured Guidelines](https://docs.base.org/mini-apps/featured-guidelines/overview)
- [Farcaster Mini Apps SDK](https://miniapps.farcaster.xyz/docs/getting-started)
