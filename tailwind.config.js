import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {},
  },

  plugins: [import('@tailwindcss/typography'), daisyui],

  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'luxury',
      'dracula',
      'fantasy',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'night',
      'coffee',
      'winter',
    ],
    darkTheme: 'dark',
  },
};
