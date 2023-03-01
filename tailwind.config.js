const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
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
        'font-navbar': '#cbd5e1'
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
