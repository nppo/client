/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#1985a1',
          800: '#00033f',
        },
        gray: {
          100: '#e5e5e5',
          300: '#677279',
        },
        green: {
          300: '#49dcb1',
        },
      },
      boxShadow: {
        block: '0px 0px 20px rgba(137, 170, 205, 0.2)',
        input: '0px 0px 20px rgba(137, 170, 205, 0.2)',
      },
      fontFamily: {
        balooTammadu: ['"Baloo Tammudu 2"', 'sans-serif'],
        balooTamma: ['"Baloo Tamma 2"', 'sans-serif'],
      },
      fontSize: {
        tiny: '0.625rem',
      },
      minWidth: {
        '1/4': '25%',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/line-clamp')],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}
