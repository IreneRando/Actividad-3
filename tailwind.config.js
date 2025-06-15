/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['App.js', './components/**/*.{js,ts,tsx,jsx}', './app/**/*/.{js,ts,tsx,jsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily:{
        'Poppins': ['Poppins-Medium', 'Sans-Serif']
      }
    },
  },
  plugins: [],
};
