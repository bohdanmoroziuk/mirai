import type {
  CreateTagInput,
  DeleteTagInput,
  DeleteTagOutput,
  GetTagsInput,
  UpdateTagInput,
} from '../types/tag'
import { tagRepository } from '../repositories/tag.repository'
import {
  toTag,
  toCreateTagDocumentInput,
  toFindManyTagDocumentsQuery,
  toDeleteTagDocumentQuery,
  toUpdateTagDocumentQuery,
} from '../mappers/tag.mapper'

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

export const deleteTag = async (input: DeleteTagInput): Promise<DeleteTagOutput> => {
  const tagDocument = await tagRepository.deleteOne(toDeleteTagDocumentQuery(input))

  ensureResourceFound(tagDocument, 'Tag not found')

  return { success: true }
}

export const updateTag = async (input: UpdateTagInput): Promise<Tag> => {
  const tagDocument = await tagRepository.updateOne(toUpdateTagDocumentQuery(input))

  ensureResourceFound(tagDocument, 'Tag not found')

  return toTag(tagDocument)
}
