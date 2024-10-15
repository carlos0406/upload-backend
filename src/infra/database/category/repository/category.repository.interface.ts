import { type Category } from '../../../../domain/category/entity/category.entity'

export interface CategoryRepositoryInterface {
  create: (category: Category) => Promise<void>
  delete: (categoryId: string) => Promise<void>
  findById: (id: string) => Promise<Category>
  findByName: (name: string) => Promise<Category[]>
}
