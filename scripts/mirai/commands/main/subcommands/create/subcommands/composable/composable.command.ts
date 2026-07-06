import { defineCommand } from 'citty'
import { parseArgs } from '#mirai/common/utils/validation'
import { logger } from '#mirai/common/utils/logger'
import { createComposableArgsSchema } from './composable.schema'
import { createComposable } from './composable.handler'

export const createComposableCommand = defineCommand({
  meta: {
    name: 'composable',
    description: 'Create a new composable',
  },

  args: {
    name: {
      type: 'positional',
      description: 'Composable name',
      required: true,
    },

    layer: {
      type: 'string',
      description: 'Target layer name (optional)',
      required: false,
    },
  },

  async run(context) {
    const args = await parseArgs(context.args, createComposableArgsSchema)
    const result = await createComposable(args)

    logger.success(`Composable created: ${result.relativePath}`)
  },
})
