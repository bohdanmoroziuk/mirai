import type { CreateTagInput } from '@tag/server/types/tag'
import { tagRepository } from '@tag/server/repositories/tag.repository'
import { mapTag } from '@tag/server/mappers/tag.mapper'

/**
 * TODO:
 * - Handle 409 Tag with this name already exists
 */

export const createTag = async (input: CreateTagInput): Promise<Tag> => {
  const tagDocument = await tagRepository.createOne({
    userId: toObjectId(input.userId),
    name: input.name,
    color: input.color,
  })

  return mapTag(tagDocument)
}
