/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          ...colors.blue,
          500: '#1985a1',
          800: '#00033f',
        },
        gray: {
          ...colors.gray,
          100: '#f4f4f4',
          200: '#e0e0e0',
          300: '#677279',
        },
        green: {
          ...colors.green,
          300: '#49dcb1',
        },
        orange: {
          ...colors.orange,
          brand: '#ff8427',
        },
        yellow: {
          ...colors.yellow,
          brand: '#ffc800',
        },
      },
      spacing: {
        18: '4.5rem',
        28: '7rem',
      },
      boxShadow: {
        default: '0px 0px 20px rgba(137, 170, 205, 0.2)',
      },
      minWidth: (theme) => ({
        40: theme('spacing.40'),
        '1/4': '25%',
      }),
      maxHeight: (theme) => ({
        48: theme('spacing.48'),
      }),
      fontFamily: {
        balooTammadu: ['"Baloo Tammudu 2"', 'sans-serif'],
        balooTamma: ['"Baloo Tamma 2"', 'sans-serif'],
        times: 'Times',
      },
      fontSize: {
        tiny: '0.625rem',
      },
    },
    customForms: () => ({
      default: {
        checkbox: {
          iconColor: '#000000',
        },
      },
    }),
  },
  variants: {
    borderWidth: ['responsive', 'hover'],
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/custom-forms'),
  ],
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
