const ROOT_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://lunar-lander.vercel.app';

export const minikitConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: ""
  },
  miniapp: {
    version: "1",
    name: "Lunar Lander",
    subtitle: "Retro lunar landing challenge",
    description: "Master physics and fuel management to safely land your spacecraft on the moon. Classic arcade gameplay with modern touch controls.",
    screenshotUrls: [
      `${ROOT_URL}/screenshot-portrait-1.png`,
      `${ROOT_URL}/screenshot-portrait-2.png`,
      `${ROOT_URL}/screenshot-portrait-3.png`
    ],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/hero-image.png`,
    splashBackgroundColor: "#0a0a0a",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["arcade", "retro", "physics", "space", "gaming"],
    heroImageUrl: `${ROOT_URL}/hero-image.png`,
    tagline: "Land safely or crash spectacularly",
    ogTitle: "Lunar Lander - Retro Space Game",
    ogDescription: "Physics-based lunar landing challenge. Navigate gravity, manage fuel, and stick the landing!",
    ogImageUrl: `${ROOT_URL}/hero-image.png`,
  },
} as const;
