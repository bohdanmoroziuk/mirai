// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

const resolveLayerPath = (name: string) => {
  return fileURLToPath(new URL(`./layers/${name}/`, import.meta.url))
}

export default defineNuxtConfig({
  extends: [
    './layers/10-core',
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

  alias: {
    '@core': resolveLayerPath('10-core'),
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
