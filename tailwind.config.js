/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['App.js', './components/**/*.{js,ts,tsx,jsx}', './app/**/*/.{js,ts,tsx,jsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily:{
        'Poppins': ['Poppins-Medium', 'Sans-Serif']
      },
      colors: {
        primary: '#2E8B57',
        secondary: '#87CEEB',
        acento: '#FFA500'


      },
    },
  },
  plugins: [],
};
