import { z } from 'zod'

export const layerNameSchema = z
  .string()
  .trim()
  .min(3, {
    error: 'Layer name must be at least 3 characters long',
  })
  .regex(/^(?=.*[a-z])[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    error: 'Layer name must use kebab-case and contain only lowercase letters, numbers, and hyphens.',
  })
