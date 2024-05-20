/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
      extend: {
        fontFamily:{
            'heading_font':[ 'Song Myung', 'serif'],
            'subheading_font':['Montserrat', 'sans-serif'],
            'body_font':['Roboto', 'sans-serif'],
            'logo_font':['Raleway', 'sans-serif'],
        },
        aspectRatio: {
          '2/2': '2/2',
        },
      },
  },
  plugins: [require('flowbite/plugin')],
  }