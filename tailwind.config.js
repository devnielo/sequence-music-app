module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  content: [
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sora': ['Sora', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        dark: 'rgba(55, 58, 58, 1)',
        primary: '#66ffcc', // Verde azulado claro
        secondary: '#99ffd9', // Verde azulado más claro
        accent: '#33cc99', // Verde azulado más oscuro
        text: '#ffffff', // Blanco para el texto
      },
      borderRadius: {
        button: '0.5rem', // Rounded buttons
      },
      boxShadow: {
        subtle: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
