/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    
    extend: {
      backgroundImage: {
        'background': 'url("/src/lib/assets/pexels-lil-artsy-1249525.jpg")',
      },
      colors: {
        'darkGrey': '#151515',
        'offWhite': '#D9D9D9',
      },
      fontFamily: {
        'sans': ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

