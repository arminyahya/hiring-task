/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        table: {
          background: '#FFFFFF',
          headerBackground: '#F1F4F8',
          headerText: '#333333',
          row: {
            even: '#F9FAFB',
            odd: '#FFFFFF',
            text: '#333333',
          },
        },
        input: {
          background: '#FFFFFF',
          border: '#CED4DA',
          text: '#333333',
          focusBorder: '#4A90E2',
        },
        button: {
          background: '#4A90E2',
          hoverBackground: '#357ABD',
          text: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}