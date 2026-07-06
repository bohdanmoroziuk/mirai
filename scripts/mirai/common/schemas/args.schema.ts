import { z } from 'zod'

export const layerNameSchema = z
  .string()
  .trim()
  .min(2)
  .regex(/^(?=.*[a-z])[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    error: 'Layer name must use kebab-case and contain only lowercase letters, numbers, and hyphens.',
  })
