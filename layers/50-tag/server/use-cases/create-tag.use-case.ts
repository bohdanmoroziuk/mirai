import type { Tag } from '../../shared/types/tag'
import type { TagRepository } from '../ports/tag.repository.port'
import type { CreateTagInput } from '../types/create-tag.types'

/**
 * TODO:
 * - Handle 409 Tag with this name already exists
 */
export const makeCreateTagUseCase = (tagRepository: TagRepository) => {
  return async (input: CreateTagInput): Promise<Tag> => {
    return tagRepository.createOne(input)
  }
}
