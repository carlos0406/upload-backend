import client from '../../../../services/prisma'
import { Category } from '../../../../domain/category/entity/category.entity'
import { type CategoryRepositoryInterface } from './category.repository.interface'
export class CategoryRepository implements CategoryRepositoryInterface {
  async create (category: Category): Promise<void> {
    await client.category.create({
      data: {
        id: category.id,
        name: category.name,
        description: category.description,
        created_at: category.created_at,
        updated_at: category.updated_at
      }
    })
  }

  async delete (categoryId: string) {
    await client.category.delete({
      where: {
        id: categoryId
      }
    })
  }

  async findById (id: string): Promise<Category> {
    const result = await client.category.findUnique({
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

  async findByName (name: string): Promise<Category[]> {
    const result = await client.category.findMany({
      orderBy: {
        name: 'asc'
      },
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }
    })
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
