import { defineCommand } from 'citty'
import { parseArgs } from '#mirai/common/utils/validation'
import { logger } from '#mirai/common/utils/logger'
import { createComponentArgsSchema } from './component.schema'
import { createComponent } from './component.handler'

export const createComponentCommand = defineCommand({
  meta: {
    name: 'component',
    description: 'Create a new component',
  },

  args: {
    name: {
      type: 'positional',
      description: 'Component name',
      required: true,
    },

    layer: {
      type: 'string',
      description: 'Target layer name (optional)',
      required: false,
    },
  },

  async run(context) {
    const args = await parseArgs(context.args, createComponentArgsSchema)
    const result = await createComponent(args)

    logger.success(`Component created: ${result.relativePath}`)
  },
})
