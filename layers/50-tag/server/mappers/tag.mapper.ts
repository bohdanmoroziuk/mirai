import type { UserSessionRequired } from '#auth-utils'
import type {
  TagDocument,
  CreateTagBody,
  CreateTagInput,
  CreateTagDocumentInput,
  GetTagsInput,
  FindManyTagDocumentsQuery,
  DeleteTagParams,
  DeleteTagInput,
  DeleteTagDocumentQuery,
  UpdateTagBody,
  UpdateTagParams,
  UpdateTagInput,
  UpdateTagDocumentQuery,
} from '../types/tag'

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

export const toDeleteTagInput = (session: UserSessionRequired, params: DeleteTagParams): DeleteTagInput => {
  return {
    userId: session.user.id,
    tagId: params.tagId,
  }
}

export const toDeleteTagDocumentQuery = (input: DeleteTagInput): DeleteTagDocumentQuery => {
  return {
    filter: {
      _id: toObjectId(input.tagId),
      userId: toObjectId(input.userId),
    },
  }
}

export const toUpdateTagInput = (
  session: UserSessionRequired,
  params: UpdateTagParams,
  body: UpdateTagBody,
): UpdateTagInput => {
  return {
    userId: session.user.id,
    tagId: params.tagId,
    name: body.name,
    color: body.color,
  }
}

export const toUpdateTagDocumentQuery = (input: UpdateTagInput): UpdateTagDocumentQuery => {
  return {
    filter: {
      _id: toObjectId(input.tagId),
      userId: toObjectId(input.userId),
    },
    update: {
      $set: {
        name: input.name,
        color: input.color,
      },
    },
    options: {
      runValidators: true,
      returnDocument: 'after',
    },
  }
}
