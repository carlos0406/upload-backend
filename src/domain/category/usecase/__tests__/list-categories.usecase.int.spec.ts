import client from '../../../../services/prisma'
import { CategoryRepository } from '../../../../infra/database/category/repository/category.repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LitCategoryUseCase } from '../list-category'
import { createCategoriesFixture } from '../../../../tests/fixtures/create-categorys.fixtures'

describe('category repo integration tests', () => {
  beforeEach(async () => {
    await client.category.deleteMany()
  })
  it('should create a category', async () => {
    const repository = new CategoryRepository()
    const spy = vi.spyOn(repository, 'findByName')
    const { a, b, c } = await createCategoriesFixture()
    const usecase = new LitCategoryUseCase(repository)
    let name = ''
    let result = await usecase.execute(name)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(name)
    expect(result.length).toBe(3)
    expect(result[0].id).toBe(a.id)
    expect(result[1].id).toBe(b.id)
    expect(result[2].id).toBe(c.id)
    name = 'b'
    result = await usecase.execute(name)
    expect(spy).toBeCalledTimes(2)
    expect(result.length).toBe(2)
    expect(result[0].id).toBe(b.id)
    expect(result[1].id).toBe(c.id)
  })
})
