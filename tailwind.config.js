const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      '2xs': '360px',
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors:{
        'navbar': '#1E293B',
        'font-navbar': '#cbd5e1',
        'light-navbar': '#A7AFE7',
        'font-light-navbar': '#5161CE',
        'navside': '#3E54AC',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
