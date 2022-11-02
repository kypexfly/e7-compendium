/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Colors from variables.less (old version)
        main: '#252B35',
        text: '#B0BBC8',
        nav: '#23272A'
      }
    }
  },
  plugins: [require('flowbite/plugin')]
}
