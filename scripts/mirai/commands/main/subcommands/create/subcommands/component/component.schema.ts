import { z } from 'zod'

export const createComponentArgsSchema = z.object({
  name: z
    .string({
      error(issue) {
        return issue.input === undefined
          ? 'Component name is required'
          : 'Component name must be a string'
      },
    })
    .trim()
    .min(3, {
      error: 'Component name must be at least 3 characters long',
    })
    .regex(/^[A-Za-z]+$/, {
      error: 'Component name must contain only letters',
    })
    .regex(/^(?:[A-Z][a-z]+|[A-Z])(?:[A-Z][a-z]+)+$/, {
      error: 'Component name must be a multi-word PascalCase Vue component name, e.g. UserTable or LoginForm.',
    }),
})
