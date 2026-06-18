import type { UserSessionRequired } from '#auth-utils'
import type {
  TagDocument,
  CreateTagBody,
  CreateTagInput,
  CreateTagDocumentInput,
  GetTagsInput,
  FindManyTagDocumentsQuery,
} from '@tag/server/types/tag'

export const toTag = (document: TagDocument): Tag => {
  return {
    id: document._id.toString(),
    userId: document.userId.toString(),
    name: document.name,
    color: document.color,
    updatedAt: document.updatedAt.toISOString(),
    createdAt: document.createdAt.toISOString(),
  }
}

export const toCreateTagInput = (session: UserSessionRequired, body: CreateTagBody): CreateTagInput => {
  return {
    userId: session.user.id,
    name: body.name,
    color: body.color,
  }
}

export const toCreateTagDocumentInput = (input: CreateTagInput): CreateTagDocumentInput => {
  return {
    userId: toObjectId(input.userId),
    name: input.name,
    color: input.color,
  }
}

export const toGetTagsInput = (session: UserSessionRequired): GetTagsInput => {
  return {
    userId: session.user.id,
  }
}

export const toFindManyTagDocumentsQuery = (input: GetTagsInput): FindManyTagDocumentsQuery => {
  return {
    filter: {
      userId: toObjectId(input.userId),
    },
    sort: {
      createdAt: -1,
    },
  }
}
