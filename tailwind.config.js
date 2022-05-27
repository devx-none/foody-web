/* eslint-disable global-require */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": '#41db88',
          "100": '#37d17e',
          "200": '#2dc774',
          "300": '#23bd6a',
          "400": '#19b360',
          "500": '#0fa956',
          "600": '#059f4c',
          "700": '#009542',
          "800": '#008b38',
          "900": '#00812e',
        },
        secondary: {
          50: '#fffcfd',
          100: '#fff9fb',
          200: '#fff1f4',
          300: '#ffe8ed',
          400: '#fed6e0',
          500: '#fec5d3',
          600: '#e5b1be',
          700: '#bf949e',
          800: '#98767f',
          900: '#7c6167',
        },
      },
      screens: {
        xs: { max: '360px' },
        '3xl': '1920px',
        '4xl': '2560px',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
