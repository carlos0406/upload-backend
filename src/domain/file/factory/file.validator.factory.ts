import { ZodFileValidator } from '../validator/file.validator'
import { type FileValidatorInterface } from '../validator/file.validator.interface'

type FileValidatorType = 'zod'
export class FileValidatorFactory {
  static create (type: FileValidatorType): FileValidatorInterface {
    switch (type) {
      case 'zod':
        return new ZodFileValidator()
      default:
        throw new Error('Invalid type')
    }
  }
}
