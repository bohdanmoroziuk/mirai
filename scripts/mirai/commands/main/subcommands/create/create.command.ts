import { defineCommand } from 'citty'
import { createComponentCommand } from './subcommands/component/command'

export const createCommand = defineCommand({
  meta: {
    name: 'create',
    description: 'Create project files',
  },

  subCommands: {
    component: createComponentCommand,
  },
})
