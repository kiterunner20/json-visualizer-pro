# Google AdSense Integration Guide

## Overview
The JSON Visualizer Pro is already set up to display ads! It currently shows placeholders in development mode and will automatically switch to real ads in production.

## Steps to Integrate Real Ads

### 1. Sign Up for Google AdSense
1. Go to https://www.google.com/adsense
2. Sign in with your Google account
3. Complete the application process
4. Wait for approval (usually 1-2 weeks)

### 2. Get Your Publisher ID
Once approved:
1. Log into your AdSense account
2. Go to **Account** → **Account Information**
3. Copy your **Publisher ID** (format: `ca-pub-XXXXXXXXXXXXXXXX`)

### 3. Create Ad Units
1. In AdSense, go to **Ads** → **By ad unit**
2. Click **Display ads** → **Create ad unit**
3. Name it (e.g., "JSON Visualizer Sidebar")
4. Choose **Responsive** ad type
5. Click **Create**
6. Copy the **Ad slot ID** (a long number)

### 4. Update Your Code

#### Option A: Using Environment Variables (Recommended)
Create a `.env` file in your project root:

```env
VITE_ADSENSE_CLIENT=ca-pub-YOUR_ACTUAL_PUBLISHER_ID
```

#### Option B: Direct Update
Update `index.html` line 9:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ACTUAL_PUBLISHER_ID"
```

### 5. Update Ad Slot ID
In `src/App.jsx`, line 71, replace `"viewer-sidebar"` with your actual ad slot ID:
```javascript
<AdUnit slotId="1234567890" style={{ width: '100%', height: '100%' }} />
```

### 6. Build and Deploy
```bash
npm run build
```

Deploy the `dist` folder to your hosting service (Netlify, Vercel, GitHub Pages, etc.)

## Current Ad Placement
- **Location**: Right sidebar (300px wide, 600px tall)
- **Format**: Responsive display ad
- **Visibility**: Always visible, fixed height rectangular block

## Testing
- **Development**: Shows "Ad Space" placeholder
- **Production**: Shows real ads (after building with `npm run build`)

## Important Notes
- ⚠️ **Never click your own ads** - This violates AdSense policies
- 📊 Ads will only show in production builds, not during `npm run dev`
- 💰 Revenue depends on traffic, niche, and user engagement
- 🌍 Consider adding more ad units for higher revenue (but don't overdo it)

## Alternative Ad Networks
If AdSense doesn't work for you:
- **Media.net**
- **PropellerAds**
- **Ezoic**
- **Carbon Ads** (for developer-focused sites)

The `AdUnit` component is flexible and can be adapted for any ad network!
