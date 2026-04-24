/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  theme: {
    extend: {
      scrollbar: {
        hide: 'none',
      },
      padding: {
        '0.5': '1px',   // Adding a custom padding of 1px
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.scrollbar-hide': {
            '-ms-overflow-style': 'none', /* IE and Edge */
            'scrollbar-width': 'none', /* Firefox */
          },
          '.scrollbar-hide::-webkit-scrollbar': {
            'display': 'none', /* Safari and Chrome */
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
};