import { consola } from 'consola'

export const logger = consola.withTag('app')

export const databaseLogger = logger.withTag('database')

export const serverLogger = logger.withTag('server')
