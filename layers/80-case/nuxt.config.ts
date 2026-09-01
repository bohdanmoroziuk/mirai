export default defineNuxtConfig({
  $meta: {
    description: 'Long-running life cases and their chronological steps',
    name: 'case',
  },

  nitro: {
    imports: {
      dirs: [
        // Public APIs are imported explicitly to avoid duplicate auto-imports with their internal modules.
        '!layers/80-case/server/flows/**/index.ts',
        '!layers/80-case/server/infra/mongo/operations/**/index.ts',
      ],
    },
  },
})
