module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  content: [
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        dark: '#121212', // Very dark background
        primary: '#8c67ef', // Primary purple
        secondary: '#7f5af0', // Secondary purple
        accent: '#6e44ff', // Accent purple
        text: '#ffffff', // White text color for high contrast
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        // Include any other font families you might want to use
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
