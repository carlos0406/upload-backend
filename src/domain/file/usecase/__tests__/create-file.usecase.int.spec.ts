import { FileRepository } from './../../../../infra/database/file/repository/file.repository'
import client from '../../../../services/prisma'
import { CategoryRepository } from '../../../../infra/database/category/repository/category.repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CreateFileUseCase } from '../create-file.usecase'
import { createCategoriesFixture } from '../../../../tests/fixtures/create-categorys.fixtures'
import { type InputCreateFile } from '../create-file.dto'

describe('category repo integration tests', () => {
  beforeEach(async () => {
    await client.file.deleteMany()
    await client.category.deleteMany()
  })
  it('should create a category', async () => {
    const categoryRepository = new CategoryRepository()
    const fileRepository = new FileRepository()
    const spyFileRepo = vi.spyOn(fileRepository, 'create')
    const spyCategoryRepo = vi.spyOn(categoryRepository, 'findById')
    const usecase = new CreateFileUseCase(fileRepository, categoryRepository)
    const { a } = await createCategoriesFixture()
    const input: InputCreateFile = {
      categoryId: a.id,
      name: 'file1',
      contentType: 'image/png'

    }
    await usecase.execute(input)
    expect(spyCategoryRepo).toHaveBeenCalledOnce()
    expect(spyFileRepo).toHaveBeenCalledOnce()
  })

  // it('should throw an error on create category', async () => {
  //   const repository = new CategoryRepository()
  //   const usecase = new CreateCategoryUseCase(repository)
  //   const category = {
  //   }
  //   // @ts-expect-error void payload
  //   await expect(usecase.execute(category)).rejects.toThrowError()
  // })
})
