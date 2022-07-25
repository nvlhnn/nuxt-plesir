module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      margin: {
        'default-md': '24rem',
      },
      colors: {
        'green-theme': '#00C97C',
        placeholder: '#81807D',
      },
      container: {
        // you can configure the container to be centered
        center: true,

        // or have default horizontal padding
        padding: '1rem',

        // default breakpoints but with 40px removed
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1024px',
          '2xl': '1024px',
        },
      },
    },
  },
  plugins: [],
}
