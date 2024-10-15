import { CreateCategoryUseCase } from '../create-category.usecase'
import client from '../../../../services/prisma'
import { CategoryRepository } from '../../../../infra/database/category/repository/category.repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('category repo integration tests', () => {
  beforeEach(async () => {
    await client.category.deleteMany()
  })
  it('should create a category', async () => {
    const repository = new CategoryRepository()
    const spy = vi.spyOn(repository, 'create')
    const usecase = new CreateCategoryUseCase(repository)
    const category = {
      name: 'category 1',
      description: 'description description description description description description description'
    }
    await usecase.execute(category)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(category))
  })

  it('should throw an error on create category', async () => {
    const repository = new CategoryRepository()
    const usecase = new CreateCategoryUseCase(repository)
    const category = {
    }
    // @ts-expect-error void payload
    await expect(usecase.execute(category)).rejects.toThrowError()
  })
})
