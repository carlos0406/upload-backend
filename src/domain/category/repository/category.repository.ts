import { prisma } from '../../../services/prisma'
import { Category } from './../entity/category.entity'
import { type CategoryRepositoryInterface } from './category.repository.interface'
export class CategoryRepository implements CategoryRepositoryInterface {
  async create (category: Category): Promise<void> {
    await prisma.category.create({
      data: {
        id: category.id,
        name: category.name,
        description: category.description,
        created_at: category.created_at,
        updated_at: category.updated_at
      }
    })
  }

  async delete (category: Category): Promise<Category> {
    return category
  }

  async findById (id: string): Promise<Category> {
    const result = await prisma.category.findUnique({
      where: {
        id
      }
    })
    if (!result) throw new Error('Category not found')
    return new Category(
      {
        id: result.id,
        name: result.name,
        description: result.description,
        created_at: result.created_at,
        updated_at: result.updated_at
      }
    )
  }

  async findAll (): Promise<Category[]> {
    const result = await prisma.category.findMany()
    return result.map(category => (new Category(
      {
        id: category.id,
        name: category.name,
        description: category.description,
        created_at: category.created_at,
        updated_at: category.updated_at
      }
    )))
  }
}
