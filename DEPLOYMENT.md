# Deployment Guide - Lunar Lander Mini App

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your domain and API keys
   ```

3. **Generate assets:**
   ```bash
   npm run generate-assets
   # This creates SVG files - convert to PNG for production:
   # - icon.svg → icon.png (1024x1024)
   # - hero-image.svg → hero-image.png (1200x630)
   ```

4. **Test locally:**
   ```bash
   npm run dev
   ```

## Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables:
   - `NEXT_PUBLIC_APP_URL` - Your Vercel domain
   - `NEXT_PUBLIC_BASE_APP_ID` - From base.dev (optional)
4. Deploy

## Farcaster Setup

### Step 1: Update Manifest Domain

After deployment, update `public/.well-known/farcaster.json`:
- Replace `[YOUR_DOMAIN]` with your actual domain (e.g., `lunar-lander.vercel.app`)

### Step 2: Generate Account Association

1. Go to [Base Build Account Association Tool](https://www.base.dev/preview?tab=account)
2. Paste your domain in the "App URL" field
3. Click "Submit" then "Verify"
4. Copy the `accountAssociation` object

### Step 3: Update farcaster.json

Add the `accountAssociation` object to `public/.well-known/farcaster.json`:
```json
{
  "accountAssociation": {
    "header": "...",
    "payload": "...",
    "signature": "..."
  },
  "miniapp": { ... }
}
```

### Step 4: Verify

1. Test with [Farcaster Embed Tool](https://farcaster.xyz/~/developers/mini-apps/embed)
2. Test with [Base Preview Tool](https://base.dev/preview)
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

## Base Integration

1. Register your app at [base.dev](https://base.dev)
2. Get your `base:app_id`
3. Add to `.env.local`: `NEXT_PUBLIC_BASE_APP_ID=your_app_id`
4. The app will automatically include it in metadata

## Testing Checklist

- [ ] Game loads in < 3 seconds
- [ ] Touch targets are ≥ 44px
- [ ] Works on iOS Safari
- [ ] Works on Android Chrome
- [ ] Farcaster embed validates
- [ ] Base preview works
- [ ] Share functionality works
- [ ] All difficulty levels work
- [ ] Physics feels realistic
- [ ] Controls are responsive

## Troubleshooting

### Build Errors
- Ensure Node.js 18+ is installed
- Run `rm -rf node_modules .next` and `npm install` again

### Farcaster Embed Not Valid
- Check all URLs are absolute (https://...)
- Ensure `version: "1"` (not "next")
- Verify `action.type: "launch_frame"`
- Check account association is set

### Assets Not Loading
- Ensure files are in `public/` directory
- Check file names match manifest exactly
- Verify URLs in manifest use your domain

## Next Steps

1. Add on-chain leaderboard (optional)
2. Implement haptic feedback
3. Add sound effects
4. Optimize for performance
5. Submit for featured placement on Base
