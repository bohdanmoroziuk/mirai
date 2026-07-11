import type { Tag } from '../../shared/types/tag'
import type { TagRepository } from '../ports/tag.repository.port'
import type { GetTagsInput } from '../types/get-tags.types'

export const makeGetTagsUseCase = (tagRepository: TagRepository) => {
  return async (input: GetTagsInput): Promise<Tag[]> => {
    return tagRepository.findMany(input)
  }
}
