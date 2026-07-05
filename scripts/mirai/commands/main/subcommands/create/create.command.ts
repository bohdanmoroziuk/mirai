import { defineCommand } from 'citty'
import { createComponentCommand } from './subcommands/component/command'
import { createComposableCommand } from './subcommands/composable/command'
import { createLayerCommand } from './subcommands/layer/command'

export const createCommand = defineCommand({
  meta: {
    name: 'create',
    description: 'Create project files',
  },

  subCommands: {
    component: createComponentCommand,
    composable: createComposableCommand,
    layer: createLayerCommand,
  },
})
