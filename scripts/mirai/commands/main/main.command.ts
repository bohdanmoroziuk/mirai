import { defineCommand } from 'citty'
import { createCommand } from './subcommands/create/command'

export const mainCommand = defineCommand({
  meta: {
    name: 'mirai',
    description: 'Local Mirai CLI',
    version: '0.1.0',
  },

  subCommands: {
    create: createCommand,
  },
})
