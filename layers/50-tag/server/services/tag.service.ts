import type { CreateTagInput, GetTagsInput } from '@tag/server/types/tag'
import { tagRepository } from '@tag/server/repositories/tag.repository'
import { toCreateTagDocumentInput, toFindManyTagDocumentsQuery, toTag } from '@tag/server/mappers/tag.mapper'

/**
 * TODO:
 * - Handle 409 Tag with this name already exists
 */

export const createTag = async (input: CreateTagInput): Promise<Tag> => {
  const tagDocument = await tagRepository.createOne(toCreateTagDocumentInput(input))

  return toTag(tagDocument)
}

export const getTags = async (input: GetTagsInput): Promise<Tag[]> => {
  const tagDocuments = await tagRepository.findMany(toFindManyTagDocumentsQuery(input))

  return tagDocuments.map(toTag)
}
