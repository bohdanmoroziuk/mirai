import type { UserSessionRequired } from '#auth-utils'
import { escapeRegExp } from '@core/shared/utils/regexp'
import type {
  TagDocument,
  CreateTagBody,
  CreateTagInput,
  CreateTagDocumentInput,
  GetTagsInput,
  FindTagDocumentsQuery,
  DeleteTagParams,
  DeleteTagInput,
  DeleteTagDocumentQuery,
  UpdateTagBody,
  UpdateTagParams,
  UpdateTagInput,
  UpdateTagDocumentQuery,
  GetTagsQuery,
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

export const toGetTagsInput = (session: UserSessionRequired, query: GetTagsQuery): GetTagsInput => {
  return {
    userId: session.user.id,
    search: query.search,
  }
}

export const toFindTagDocumentsQuery = (input: GetTagsInput): FindTagDocumentsQuery => {
  return {
    filter: {
      userId: toObjectId(input.userId),
      ...(input.search
        ? {
            name: {
              $regex: escapeRegExp(input.search),
              $options: 'i',
            },
          }
        : {}),
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
