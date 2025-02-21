import colors from 'tailwindcss/colors';
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        header:['Bebas Neue Light', 'sans-serif' ],
        body: ['Microsoft PhagsPa', 'sans-serif'],
        titles:['Microsoft PhagsPa Bold', 'sans-serif']
      },
    },
  },
  plugins: [],
};