export default {
  /*
   ** Configure server-side rendering (false is for SPA's)
   ** See https://nuxtjs.org/guides/configuration-glossary/configuration-ssr
   */
  ssr: false,

  /*
   ** Nuxt target
   ** See https://nuxtjs.org/guides/configuration-glossary/configuration-target
   */
  target: 'static',

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/guides/configuration-glossary/configuration-head
   */
  head: {
    title: 'SURAPP',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#ffffff' },
      { hid: 'robots', name: 'robots', content: 'noindex' },
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#139ade' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/repositories.ts',
    '~/plugins/axios.ts',
    '~/plugins/vee-validate.ts',
    '~/plugins/vue-gates.ts',
    '~/plugins/permissions.ts',
    '~/plugins/rules.ts',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/fontawesome-module
    '@nuxtjs/fontawesome',
    // Doc: https://nuxt-typed-vuex.roe.dev
    'nuxt-typed-vuex',
    // Doc: https://github.com/nuxt-community/google-fonts
    '@nuxtjs/google-fonts',
    // Doc: https://github.com/avil13/vue-sweetalert2
    'vue-sweetalert2/nuxt',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://i18n.nuxtjs.org
    'nuxt-i18n',
    // Doc: https://github.com/nuxt-community/sentry-module
    '@nuxtjs/sentry',
    // Doc: https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // Doc: https://github.com/nuxt-community/dayjs-module
    '@nuxtjs/dayjs',
    // Doc: https://github.com/nuxt-community/markdownit-module
    '@nuxtjs/markdownit',
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.PROXY === 'true' ? null : process.env.BACKEND_URL,
    // eslint-disable-next-line no-unneeded-ternary
    proxy: process.env.PROXY === 'true' ? true : false,
  },

  proxy: {
    '/auth': {
      target: process.env.BACKEND_URL + '/',
    },
    '/api': {
      target: process.env.BACKEND_URL + '/',
    },
  },

  router: {
    middleware: 'set-initial-data',
  },

  auth: {
    strategies: {
      api: {
        clientId: process.env.OAUTH_CLIENT_ID,
        token: {
          property: 'access_token',
          type: 'Bearer',
          name: 'Authorization',
          maxAge: 1800,
          global: true,
          required: true,
        },
        state: 'UNIQUE_AND_NON_GUESSABLE',
        responseMode: '',
        acrValues: '',
        autoLogout: true,
        refreshToken: {
          property: 'refresh_token',
          maxAge: 2592000,
        },
        responseType: 'code',
        codeChallengeMethod: 'S256',
        scheme: 'oauth2',
        endpoints: {
          authorization: process.env.BACKEND_URL + '/auth/oauth/authorize',
          token:
            process.env.PROXY === 'true'
              ? '/auth/oauth/token'
              : process.env.BACKEND_URL + '/auth/oauth/token',
          userInfo: '/api/user',
          logout: process.env.BACKEND_URL + '/logout',
        },
        user: {
          property: 'data',
        },
        grantType: 'authorization_code',
        scope: '',
      },
    },
  },
  /*
   ** i18n module configuration
   ** See https://i18n.nuxtjs.org/options-reference.html
   */
  i18n: {
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'en',
        file: 'en-GB.js',
        name: 'English',
      },
      {
        code: 'nl',
        file: 'nl-NL.js',
        name: 'Nederlands',
      },
    ],
    defaultLocale: 'nl',
    lazy: true,
    langDir: 'lang/',
  },

  dayjs: {
    locales: ['en', 'nl'],
    defaultLocale: 'nl',
    defaultTimeZone: 'Europe/Amsterdam',
    plugins: ['utc', 'timezone'],
  },

  /*
   ** Font Awesome module configuration
   ** See https://github.com/nuxt-community/fontawesome-module#readme
   */
  fontawesome: {
    icons: {
      solid: [
        'faArrowUp',
        'faArrowDown',
        'faArrowLeft',
        'faArrowRight',
        'faLink',
        'faMinus',
        'faPlus',
        'faSearch',
        'faVideo',
        'faShareAlt',
        'faBookmark',
        'faThumbsUp',
        'faEye',
        'faPencilAlt',
        'faImage',
        'faDownload',
        'faFile',
        'faFolderOpen',
        'faCalendarAlt',
        'faBoxOpen',
        'faTimes',
        'faExpand',
        'faNewspaper',
        'faSpinner',
        'faUser',
        'faThList',
        'faTags',
        'faCopy',
        'faCaretDown',
        'faPlay',
        'faTrashAlt',
      ],
      regular: ['faBookmark', 'faPlayCircle'],
      brands: ['faLinkedin', 'faResearchgate', 'faTwitterSquare', 'faYoutube'],
    },
  },

  googleFonts: {
    families: {
      'Baloo Tammudu 2': [400],
      'Baloo Tamma 2': [500, 700],
    },
  },

  markdownit: {
    runtime: true,
  },

  /*
   ** Sentry module configuration
   ** See https://github.com/nuxt-community/sentry-module
   */
  sentry: {
    sourceMapStyle: 'hidden-source-map',
    config: {
      environment: process.env.APP_ENV || 'local',
      ignoreErrors: ['Request failed with status code 401', 'Request aborted'],
    },
    webpackConfig: {
      release: process.env.SENTRY_RELEASE_NAME,
      urlPrefix: '~/_nuxt/',
    },
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    babel: {
      presets() {
        return [
          [
            '@nuxt/babel-preset-app',
            {
              corejs: { version: 3 },
            },
          ],
        ]
      },
    },
    transpile: ['vee-validate/dist/rules'],
  },

  generate: {
    dir: 'public_html',
  },
}
