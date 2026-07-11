import type { Nullable } from '@core/shared/types/common'
import type { Tag } from '../../shared/types/tag'
import type { GetTagsInput } from '../types/get-tags.types'
import type { CreateTagInput } from '../types/create-tag.types'
import type { UpdateTagInput } from '../types/update-tag.types'
import type { DeleteTagInput } from '../types/delete-tag.types'

export interface TagRepository {
  findMany(input: GetTagsInput): Promise<Tag[]>
  createOne(input: CreateTagInput): Promise<Tag>
  updateOne(input: UpdateTagInput): Promise<Nullable<Tag>>
  deleteOne(input: DeleteTagInput): Promise<Nullable<Tag>>
}
