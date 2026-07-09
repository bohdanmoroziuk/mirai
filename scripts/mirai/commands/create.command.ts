import { defineCommand } from 'citty'
import { createComponentCommand } from './create/component/component.command'
import { createComposableCommand } from './create/composable/composable.command'
import { createLayerCommand } from './create/layer/layer.command'

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
