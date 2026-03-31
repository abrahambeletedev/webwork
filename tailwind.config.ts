
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        'apple-gray': {
          '100': '#f5f5f7',
          '200': '#e8e8ed',
          '300': '#d2d2d7',
          '400': '#a1a1a6',
          '500': '#86868b',
          '600': '#6e6e73',
          '700': '#515154',
          '800': '#3a3a3c',
          '900': '#1d1d1f',
        },
        'apple-blue': '#007aff',
      },
    },
  },
  plugins: [],
}

export default config
