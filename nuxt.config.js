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
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/repositories.ts',
    '~/plugins/mock-axios.ts',
    '~/plugins/axios.ts',
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

  /*
   ** Font Awesome module configuration
   ** See https://github.com/nuxt-community/fontawesome-module#readme
   */
  fontawesome: {
    icons: {
      solid: ['faSearch', 'faPlus', 'faMinus', 'faLink', 'faArrowDown'],
      regular: ['faBookmark'],
    },
  },

  googleFonts: {
    families: {
      'Baloo Tammudu 2': [400],
      'Baloo Tamma 2': [500, 700],
    },
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
  },

  generate: {
    dir: 'public_html',
  },

  env: {
    mockAxios: process.env.MOCK_AXIOS || 'false',
  },
}
