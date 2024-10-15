import { type File } from '../entity/file.entity'

export interface FileValidatorInterface {
  validate: (file: File) => void
}
