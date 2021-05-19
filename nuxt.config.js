export default {
  router: {
    prefetchLinks: false,
  },
  serverMiddleware: {
    '/api': '~/api',
  },
  head: {
    title: 'economist',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [
    '~/assets/sass/base-style.sass',
    '~/assets/sass/style.sass',
    '~/assets/fonts/jetbrains/style.css',
  ],

  plugins: [{ src: '~/plugins/axiosHeader.js', mode: 'client' }],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/router-extras',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
  ],

  axios: {
    /* baseURL: 'https://ekonomist.herokuapp.com/', */
  },

  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  content: {},

  build: {},
}
