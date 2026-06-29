// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

const resolveLayerPath = (name: string) => {
  return fileURLToPath(new URL(`./layers/${name}/`, import.meta.url))
}

export default defineNuxtConfig({
  extends: [
    './layers/10-core',
    './layers/20-infra',
    './layers/25-common',
    './layers/30-user',
    './layers/40-auth',
    './layers/50-tag',
    './layers/60-collection',
    './layers/70-bookmark',
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@scalar/nuxt',
    'nuxt-auth-utils',
    '@vueuse/nuxt',
  ],

  devtools: {
    enabled: false,
  },

  app: {
    head: {
      title: 'Mirai',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
      ],
    },
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
    '@common': resolveLayerPath('25-common'),
    '@user': resolveLayerPath('30-user'),
    '@auth': resolveLayerPath('40-auth'),
    '@tag': resolveLayerPath('50-tag'),
    '@collection': resolveLayerPath('60-collection'),
    '@bookmark': resolveLayerPath('70-bookmark'),
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
