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
          100: '#e5e5e5',
        },
        orange: {
          ...colors.orange,
          brand: '#FF8427',
        },
        yellow: {
          ...colors.yellow,
          brand: '#FFC800',
        },
      },
      spacing: {
        28: '7rem',
      },
      boxShadow: {
        default: '0px 0px 20px rgba(137, 170, 205, 0.2)',
      },
      minWidth: (theme) => ({
        40: theme('spacing.40'),
      }),
    },
    customForms: () => ({
      default: {
        checkbox: {
          iconColor: '#000000',
        },
      },
    }),
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')],
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
