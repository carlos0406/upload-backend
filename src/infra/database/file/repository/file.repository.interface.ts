import { type File } from '../../../../domain/file/entity/file.entity'

export interface FileRepositoryInterface {
  create: (category: File) => Promise<void>
}
