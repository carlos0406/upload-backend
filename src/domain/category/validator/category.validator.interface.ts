import { type Category } from '../entity/category.entity'

export interface CategoryValidatorInterface {
  validate: (category: Category) => void
}
