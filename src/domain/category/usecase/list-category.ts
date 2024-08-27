import { type CategoryRepositoryInterface } from '../repository/category.repository.interface'

export class LitCategoryUseCase {
  constructor (private readonly categoryRepository: CategoryRepositoryInterface) {}

  async execute (name: string) {
    const result = await this.categoryRepository.findByName(name)
    return result.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description
    }))
  }
}
