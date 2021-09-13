export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server', // currently we use 'server' target as the app needs to run over Node.js with middleware proxy for Solr until Scilit.net backend has the API endpoints ready

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Nuxt Test App',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'This is a little Nuxt test app from MDPI AG.'
      }
    ],
    link: []
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-numeral-filter.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/toast',
    'cookie-universal-nuxt', ['cookie-universal-nuxt', { parseJSON: true }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  proxy: {
    '/base/': 'http://api.openweathermap.org/'
  },

  styleResources: {},

  toast: {
    position: 'top-right', // default position for toasts
    duration: 2000
  },

  // Nuxt router config (because we deploy the web-app into Scilit Symfony app, we can use a base routing)
  router: {
    base: '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    }
  }
}
