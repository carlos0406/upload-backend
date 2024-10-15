import { beforeEach, describe, expect, it } from 'vitest'
import client from '../../../../services/prisma'
import { File } from '../../../../domain/file/entity/file.entity'
import { Category } from '../../../../domain/category/entity/category.entity'
import { FileRepository } from './file.repository'

describe('file repository integration test', async () => {
  const repository = new FileRepository()
  beforeEach(async () => {
    await client.file.deleteMany()
    await client.category.deleteMany()
  })
  it('should create a file', async () => {
    const category = await client.category.create({
      data: {
        name: 'test file',
        description: 'test description'
      }
    })
    const file = new File({
      name: 'test file',
      category: new Category(
        category
      )
    })
    await repository.create(file)
    const dbfile = await client.file.findUnique({
      where: {
        id: file.id
      }
    })

    expect(dbfile?.id).toBe(file.id)
    expect(dbfile?.categoryId).toBe(file.category.id)
  })

  it('shhould find a file by id', async () => {
    const file = await client.file.create({
      data: {
        name: 'file1',
        description: 'desenho-pessoal',
        key: 'file1-desenho-pessoal',
        category: {
          create: {
            name: 'category-1',
            description: 'category'
          }
        }
      }
    })
    const result = await repository.findById(file.id)
    expect(result?.id).toBe(file.id)
    expect(result?.name).toBe(file.name)
    expect(file.categoryId).toBe(result?.category.id)
  })
}

)
