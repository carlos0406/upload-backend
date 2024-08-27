import { ZodCategoryValidator } from '../validator/category.validator'
import { type CategoryValidatorInterface } from '../validator/category.validator.interface'
type CategoryValidatorType = 'zod'
export class CategoryValidatorFactory {
  static create (type: CategoryValidatorType): CategoryValidatorInterface {
    switch (type) {
      case 'zod':
        return new ZodCategoryValidator()
      default:
        throw new Error('Invalid type')
    }
  }
}
