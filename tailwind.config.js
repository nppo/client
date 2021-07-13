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
      opacity: {
        90: '0.9',
      },
      backgroundOpacity: (theme) => theme('opacity'),
      spacing: {
        11: '2.625rem',
        18: '4.5rem',
        28: '7rem',
        96: '24rem',
        104: '26rem',
      },
      boxShadow: {
        default: '0px 0px 20px rgba(137, 170, 205, 0.2)',
      },
      minWidth: (theme) => ({
        40: theme('spacing.40'),
        '1/4': '25%',
      }),
      minHeight: (theme) => ({
        11: theme('spacing.11'),
        24: theme('spacing.24'),
      }),
      maxHeight: (theme) => ({
        40: theme('spacing.40'),
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
      lineHeight: {
        4.5: '1.125rem',
      },
      inset: {
        '1/2': '50%',
      }
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
