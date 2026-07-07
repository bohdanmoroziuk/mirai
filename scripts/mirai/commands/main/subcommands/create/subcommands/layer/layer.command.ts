import { defineCommand } from 'citty'
import { parseArgs } from '#mirai/common/utils/validation'
import { logger } from '#mirai/common/utils/logger'
import { createLayerArgsSchema } from './layer.schema'
import { createLayer } from './layer.handler'

export const createLayerCommand = defineCommand({
  meta: {
    name: 'layer',
    description: 'Create a new layer',
  },

  args: {
    name: {
      type: 'positional',
      description: 'Layer name',
      required: true,
    },

    description: {
      type: 'string',
      description: 'Layer description (optional)',
      required: false,
      default: '',
    },
  },

  async run(context) {
    const args = await parseArgs(context.args, createLayerArgsSchema)
    const result = await createLayer(args)

    logger.success(`Layer created: ${result.relativePath}`)
    logger.info('Next: register the layer in root nuxt.config.ts and add aliases manually.')
  },
})
