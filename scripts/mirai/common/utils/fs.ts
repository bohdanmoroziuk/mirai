import { stat } from 'node:fs/promises'
import { isNodeError } from '#mirai/common/utils/error'

export const pathExists = async (path: string) => {
  try {
    await stat(path)

    return true
  }
  catch (error) {
    if (isNodeError(error) && error.code === 'ENOENT') {
      return false
    }

    throw error
  }
}
