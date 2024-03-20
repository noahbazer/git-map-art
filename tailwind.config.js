/** @type {import('tailwindcss').Config} */
const config = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};

config.content = ['./src/**/*.{vue,js,ts}'];
config.plugins = [import('daisyui')];

export default config;
