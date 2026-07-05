import { defineCommand } from 'citty'
import { createComponentCommand } from './subcommands/component/command'
import { createComposableCommand } from './subcommands/composable/command'

export const createCommand = defineCommand({
  meta: {
    name: 'create',
    description: 'Create project files',
  },

  subCommands: {
    component: createComponentCommand,
    composable: createComposableCommand,
  },
})
