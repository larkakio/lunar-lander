import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'space': '#0a0a0a',
        'vector-green': '#00ff41',
        'vector-white': '#f0f0f0',
        'hud-amber': '#ffb000',
        'thrust-flame': '#ff4500',
        'landing-safe': '#00ff41',
        'landing-danger': '#ff0000',
      },
      fontFamily: {
        'mono': ['Share Tech Mono', 'monospace'],
        'orbitron': ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
