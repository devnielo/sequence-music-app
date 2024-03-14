module.exports = {
  content: [
    "./src/**/*.{html,js}",
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
        primary: '#66ffcc',
        secondary: '#99ffd9',
        accent: '#33cc99',
        text: '#ffffff',
      },
      borderRadius: {
        button: '0.5rem',
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
