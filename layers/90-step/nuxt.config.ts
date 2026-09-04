export default defineNuxtConfig({
  $meta: {
    description: 'Chronological steps within long-running life cases',
    name: 'step',
  },

  nitro: {
    imports: {
      dirs: [
        // Public APIs are imported explicitly to avoid duplicate auto-imports with their internal modules.
        '!layers/90-step/server/flows/**/index.ts',
        '!layers/90-step/server/infra/mongo/operations/**/index.ts',
      ],
    },
  },
})
