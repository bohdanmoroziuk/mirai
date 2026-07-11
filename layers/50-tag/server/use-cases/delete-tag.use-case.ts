import type { TagRepository } from '../ports/tag.repository.port'
import type { DeleteTagInput, DeleteTagOutput } from '../types/delete-tag.types'

export const makeDeleteTagUseCase = (tagRepository: TagRepository) => {
  return async (input: DeleteTagInput): Promise<DeleteTagOutput> => {
    const tag = await tagRepository.deleteOne(input)

    ensureResourceFound(tag, 'Tag not found')

    return {
      success: true,
    }
  }
}
