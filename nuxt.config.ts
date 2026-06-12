// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
  ],

  devtools: {
    enabled: true,
  },

  css: [
    '~/assets/css/main.css',
  ],

  ui: {
    colorMode: false,
  },

  compatibilityDate: '2025-07-15',

  typescript: {
    typeCheck: false,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
