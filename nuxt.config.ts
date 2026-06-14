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
    './layers/40-auth',
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@scalar/nuxt',
    'nuxt-auth-utils',
  ],

  devtools: {
    enabled: false,
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
    '@auth': resolveLayerPath('40-auth'),
  },

  compatibilityDate: '2025-07-15',

  nitro: {
    experimental: {
      openAPI: true,
    },

    openAPI: {
      meta: {
        title: 'Mirai API',
        description: 'API Documentation for Mirai.',
        version: '0.1.0',
      },
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        '@tanstack/vue-query',
        'zod',
      ],
    },
  },

  typescript: {
    typeCheck: false,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
