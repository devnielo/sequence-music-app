module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  content: [
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4D77FF', // Azul claro
        secondary: '#FF7676', // Rosa suave
        accent: '#F9C74F', // Amarillo
        background: '#F0F2F5', // Fondo claro
        foreground: '#344055', // Texto oscuro
        info: '#39C0ED', // Azul cielo
        success: '#10B981', // Verde
        warning: '#FB923C', // Naranja
        danger: '#EF4444', // Rojo
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '2rem', // Botones y elementos muy redondeados
      },
      fontSize: {
        headline: '2rem',
        title: '1.5rem',
        subtitle: '1.125rem',
        body: '1rem',
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700,
      },
      boxShadow: {
        custom: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        creative: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Sombra creativa
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Moderna y versátil
        serif: ['Merriweather', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      gradients: { // Gradientes personalizados
        blue: ['45deg', '#85D7FF', '#1FB2FF'],
        pink: ['45deg', '#FFC7C7', '#FF85A1'],
        green: ['45deg', '#9BE15D', '#00E3AE'],
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['focus-visible', 'first'],
      opacity: ['disabled'],
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
