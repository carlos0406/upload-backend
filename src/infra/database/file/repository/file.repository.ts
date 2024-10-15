import client from '../../../../services/prisma'
import { Category } from '../../../../domain/category/entity/category.entity'
import { File } from '../../../../domain/file/entity/file.entity'
import { type FileRepositoryInterface } from './file.repository.interface'

export class FileRepository implements FileRepositoryInterface {
  async create (file: File): Promise<void> {
    const result = await client.file.create({
      data: {
        id: file.id,
        key: file.key,
        name: file.name,
        categoryId: file.category.id,
        created_at: file.created_at
      }
    })
    file.id = result.id
  }

  async findById (id: string): Promise<File | null> {
    const result = await client.file.findUnique({
      where: {
        id
      },
      include: {
        category: true
      }
    })
    if (result) {
      return new File({
        id: result.id,
        name: result.name,
        category: new Category({
          id: result.category.id,
          name: result.category.name,
          description: result.category.description
        })
      })
    }
    return null
  }
}
