import { type Category } from '../entity/category.entity'

export interface CategoryRepositoryInterface {
  create: (category: Category) => Promise<void>
  delete: (category: Category) => Promise<Category>
  findAll: () => Promise<Category[]>
  findById: (id: string) => Promise<Category>
  findByName: (name: string) => Promise<Category[]>
  // exists: (id: string) => Promise<boolean>
  // findById: (id: string) => Promise<Category>
  // findByName: (name: string) => Promise<Category>
  // update: (category: Category) => Promise<Category>
}
