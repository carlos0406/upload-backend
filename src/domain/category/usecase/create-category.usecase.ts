import { Category } from './../entity/category.entity'
import { type CategoryRepositoryInterface } from '../repository/category.repository.interface'
import { type InputCreateCategory } from './create-category.dto'

export class CreateCategoryUseCase {
  constructor (private readonly categoryRepository: CategoryRepositoryInterface) {}

  async execute (input: InputCreateCategory) {
    const category = new Category({
      name: input.name,
      description: input.description
    })
    console.log(category)
    await this.categoryRepository.create(category)
  }
}
