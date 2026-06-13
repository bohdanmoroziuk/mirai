// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

const resolveLayerPath = (name: string) => {
  return fileURLToPath(new URL(`./layers/${name}/`, import.meta.url))
}

export default defineNuxtConfig({
  extends: [
    './layers/10-core',
    './layers/20-infra',
    './layers/30-user',
  ],

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

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
  },

  alias: {
    '@core': resolveLayerPath('10-core'),
    '@infra': resolveLayerPath('20-infra'),
    '@user': resolveLayerPath('30-user'),
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
