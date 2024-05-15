/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],

}

module.exports = {

  plugins: [
      require('flowbite/plugin')
  ]

}

module.exports = {

  content: [
      // ...
      'node_modules/flowbite-react/lib/esm/**/*.js'
  ]

}