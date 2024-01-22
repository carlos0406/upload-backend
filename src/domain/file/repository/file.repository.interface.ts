import { type File } from '../entity/file.entity'

export interface FileRepositoryInterface {
  create: (category: File) => Promise<void>
  // delete: (category: File) => Promise<File>
  // findAll: () => Promise<File[]>
}
