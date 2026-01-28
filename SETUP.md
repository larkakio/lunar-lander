# Setup Instructions - Lunar Lander Base Mini App

## ✅ Completed Steps

1. ✅ Fixed npm install issue by renaming folder from "Lunar Lander" to "lunar-lander" (removed spaces)
2. ✅ Upgraded to Node.js 20 (required for dependencies)
3. ✅ Installed all dependencies successfully
4. ✅ Created `minikit.config.ts` for Base MiniKit configuration
5. ✅ Created API route at `app/.well-known/farcaster/route.ts` for dynamic manifest generation
6. ✅ Fixed TypeScript error in `lib/physics.ts` (removed 'flying' from landing result type)
7. ✅ Updated `next.config.js` with proper headers for `.well-known` paths
8. ✅ Generated SVG assets (icon.svg and hero-image.svg)
9. ✅ Updated README.md with comprehensive documentation

## 🚀 Next Steps for Deployment

### 1. Convert SVG to PNG

You need to convert the generated SVG files to PNG format:

```bash
# Install ImageMagick or use online converter
# Convert icon.svg to icon.png (1024x1024, no transparency)
# Convert hero-image.svg to hero-image.png (1200x630)
```

Or use an online tool like:
- https://cloudconvert.com/svg-to-png
- https://convertio.co/svg-png/

**Requirements:**
- `icon.png`: 1024×1024 px, PNG, no transparency
- `hero-image.png`: 1200×630 px, PNG/JPG

### 2. Create Screenshots

Create 3 portrait screenshots (1284×2778 px) showing:
- Gameplay screenshot 1
- Gameplay screenshot 2  
- Gameplay screenshot 3

Save them as:
- `public/screenshot-portrait-1.png`
- `public/screenshot-portrait-2.png`
- `public/screenshot-portrait-3.png`

### 3. Deploy to Vercel

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Lunar Lander Base Mini App"
git remote add origin <your-repo-url>
git push -u origin main
```

2. Import project in Vercel:
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Set environment variables:
     - `NEXT_PUBLIC_APP_URL` = `https://your-app.vercel.app` (will be set automatically)
   - Deploy

3. **Important**: Turn off Deployment Protection:
   - Go to Vercel Dashboard → Settings → Deployment Protection
   - Toggle "Vercel Authentication" to OFF
   - Click Save

### 4. Update Configuration

After deployment, update `minikit.config.ts`:

1. Set `NEXT_PUBLIC_APP_URL` environment variable in Vercel, OR
2. Update the default URL in `minikit.config.ts`:
```typescript
const ROOT_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://your-actual-domain.vercel.app';
```

### 5. Generate Account Association

1. Go to [Base Build Account Association Tool](https://www.base.dev/preview?tab=account)
2. Paste your domain (e.g., `lunar-lander.vercel.app`) in "App URL" field
3. Click "Submit"
4. Click "Verify" and follow instructions
5. Copy the `accountAssociation` object:
```json
{
  "header": "...",
  "payload": "...",
  "signature": "..."
}
```

6. Update `minikit.config.ts`:
```typescript
accountAssociation: {
  header: "...",  // paste from tool
  payload: "...",  // paste from tool
  signature: "..." // paste from tool
}
```

7. Push changes to trigger new deployment

### 6. Verify Your App

1. **Base Preview Tool**: https://base.dev/preview
   - Add your app URL
   - Check "Account association" tab (should show ✅)
   - Check "Metadata" tab (should show all fields)

2. **Farcaster Embed Tool**: https://farcaster.xyz/~/developers/mini-apps/embed
   - Test embed validation
   - Should show "Embed Valid 3" status

3. **Test in Base App**:
   - Create a post in Base app with your app URL
   - Click the embed to launch the app
   - Verify game works correctly

## 📋 Checklist

- [ ] Convert SVG assets to PNG
- [ ] Create 3 portrait screenshots
- [ ] Deploy to Vercel
- [ ] Set `NEXT_PUBLIC_APP_URL` environment variable
- [ ] Turn off Vercel Deployment Protection
- [ ] Generate account association credentials
- [ ] Update `minikit.config.ts` with credentials
- [ ] Verify with Base Preview Tool
- [ ] Test embed in Farcaster
- [ ] Test game functionality
- [ ] Submit for featured placement (optional)

## 🔧 Troubleshooting

### Manifest Not Loading

- Check `/.well-known/farcaster` endpoint returns JSON
- Verify `NEXT_PUBLIC_APP_URL` is set correctly
- Check browser console for errors

### Account Association Fails

- Ensure Deployment Protection is OFF in Vercel
- Verify domain is accessible
- Check credentials are copied correctly

### Assets Not Found

- Ensure PNG files are in `public/` directory
- Check file names match manifest exactly
- Verify URLs use your actual domain (not `[YOUR_DOMAIN]`)

## 📚 Resources

- [Base Mini Apps Docs](https://docs.base.org/mini-apps/quickstart/create-new-miniapp)
- [Base Featured Guidelines](https://docs.base.org/mini-apps/featured-guidelines/overview)
- [Base Preview Tool](https://base.dev/preview)
- [Vercel Deployment](https://vercel.com/docs)
