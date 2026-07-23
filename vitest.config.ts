import { defineConfig, defineProject } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      defineProject({
        test: {
          name: 'mirai-cli',
          include: ['scripts/mirai/**/*.test.ts'],
          environment: 'node',
        },
      }),
    ],
  },
})
