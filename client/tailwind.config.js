/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#030D1C',
          DEFAULT: '#071A38',
          900: '#071A38', // Deep Navy
          800: '#0C254E',
          700: '#14356B',
        },
        primary: {
          DEFAULT: '#0866F5', // Electric Blue
          hover: '#0652C7',
          light: '#EBF3FE',
        },
        cyan: {
          accent: '#18D5E8', // Cyan
          hover: '#13B8C8',
          light: '#E6FBFC',
        },
        accent: {
          yellow: '#FFC629', // Yellow
          yellowHover: '#E5AF1B',
        },
        surface: {
          light: '#F5F8FC', // Light background
          card: '#FFFFFF',
        },
        content: {
          dark: '#172033', // Dark text
          muted: '#52627A',
          subtle: '#8896AB',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'card-soft': '0 4px 20px -2px rgba(7, 26, 56, 0.06), 0 2px 6px -1px rgba(7, 26, 56, 0.04)',
        'card-hover': '0 16px 32px -4px rgba(7, 26, 56, 0.12), 0 6px 12px -2px rgba(7, 26, 56, 0.08)',
        'elevated': '0 20px 40px -15px rgba(8, 102, 245, 0.18)',
        'glow-subtle': '0 0 25px rgba(24, 213, 232, 0.15)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
};
