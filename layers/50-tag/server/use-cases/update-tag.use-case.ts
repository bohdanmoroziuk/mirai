import type { Tag } from '../../shared/types/tag'
import type { TagRepository } from '../ports/tag.repository.port'
import type { UpdateTagInput } from '../types/update-tag.types'

export const makeUpdateTagUseCase = (tagRepository: TagRepository) => {
  return async (input: UpdateTagInput): Promise<Tag> => {
    const tag = await tagRepository.updateOne(input)

    ensureResourceFound(tag, 'Tag not found')

    return tag
  }
}
