import { Category } from '../../../../domain/category/entity/category.entity'
import { CategoryRepository } from './category.repository'
import client from '../../../../services/prisma'
import { createCategoriesFixture } from '../../../../tests/fixtures/create-categorys.fixtures'
import { beforeEach, describe, expect, it } from 'vitest'

describe('category repo integration tests', () => {
  const repository = new CategoryRepository()
  beforeEach(async () => {
    await client.category.deleteMany()
  })
  it('should create a category', async () => {
    const category = new Category(
      {
        name: 'category 1',
        description: 'description description description description description description description'

      }
    )
    await repository.create(category)
    const dbcategory = await client.category.findUnique({
      where: {
        id: category.id
      }
    })
    expect(dbcategory?.id).to.equal(category.id)
  })

  it('should get category by id', async () => {
    const category = await client.category.create({
      data: {
        name: 'category 1',
        description: 'description description description description description description description'

      }
    })
    const dbcategory = await repository.findById(category.id)
    expect(dbcategory).toBeDefined()
    expect(dbcategory.description).toBe(category.description)
    expect(dbcategory.id).toBe(category.id)
    expect(dbcategory.name).toBe(category.name)
  })

  it('should delete a category', async () => {
    const category = await client.category.create({
      data: {
        name: 'category to delete',
        description: 'description description description description description description description'

      }
    })
    let dbCategory = await client.category.findUnique({
      where: {
        id: category.id
      }
    })
    expect(dbCategory?.id).toBeDefined()
    await repository.delete(category.id)
    dbCategory = await client.category.findUnique({
      where: {
        id: category.id
      }
    })
    console.log(dbCategory)
    expect(dbCategory?.id).toBeFalsy()
  })
  it('should list all categories', async () => {
    const { a, b, c } = await createCategoriesFixture()

    const result = await repository.findByName('')
    expect(result.length).toBe(3)
    expect(result[0].id).toBe(a.id)
    expect(result[0].name).toBe(a.name)
    expect(result[1].id).toBe(b.id)
    expect(result[1].name).toBe(b.name)
    expect(result[2].id).toBe(c.id)
    expect(result[2].name).toBe(c.name)
    console.log(result)
  })

  it('should list categories with name filter', async () => {
    const { a, b, c } = await createCategoriesFixture()
    let result = await repository.findByName('a')
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(a.id)
    result = await repository.findByName('b')
    expect(result.length).toBe(2)
    expect(result[0].id).toBe(b.id)
    expect(result[1].id).toBe(c.id)
    result = await repository.findByName(c.name)
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(c.id)
  })
})
