/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '3xl': ['41px', '1.3em'], // H1
        '2xl': ['34px', '1.3em'], // H2
        'xl': ['29px', '1.3em'],  // H3
        'lg': ['27px', '1.2em'],  // H4
        'base': ['23px', '1.2em'], // H5
        'sm': ['19px', '1.2em'],  // H6
        'body-lg': ['16px', '1.2em'], // Body Large
        'body-base': ['14px', '1.4em'], // Body Base
        'body-sm': ['12px', '1.4em'],  // Body Small
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      colors: {
        mainbackground: "#F5F5F5", // couleur du fond
        maintext: "#333333", // couleur du texte
      },
      textTransform: {
        uppercase: 'uppercase',
      },
      letterSpacing: {
        wider: '0.05em', // 5% de letter-spacing
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

