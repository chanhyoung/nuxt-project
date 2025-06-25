// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  typescript: {
    shim: false,
    typeCheck: true,
  },

  modules: [
    '@nuxt/eslint', 
    'nuxt-quasar-ui', 
    '@pinia/nuxt', 
    '@vueuse/nuxt'
  ],

  css: [
    '~/assets/css/tiptap.scss',
  ],

  // imports: {
  //   presets: [
  //     {
  //       from: 'vue-i18n',
  //       imports: ['useI18n'],
  //     },
  //   ],
  // },

  quasar: {
    plugins: ['Notify'],
    config: {
      notify: {
        position: 'top-right'
      }
    }
  },

  runtimeConfig: {
    authCookieName: '__user',
    jwtSecretKey: 'superkey',
    public: {
      clientConfigValue: 'test',
      apiBase: 'http://localhost:8080'
    }
  }
})
