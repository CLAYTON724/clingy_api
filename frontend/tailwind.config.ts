import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#1a2847',
        primary: '#6366f1',
        accent: '#06b6d4',
        success: '#10b981',
      },
    },
  },
  plugins: [],
}

export default config
