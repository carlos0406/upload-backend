import { test, expect, describe } from 'vitest'
import { Category } from './category.entity'

describe('CategoryEntity', () => {
  test('should be defined', () => {
    expect(true).toBe(true)
  })

  test('should be create a Category', () => {
    const category = new Category({
      description: 'any_description',
      name: 'any_name'
    })
    expect(category.name).toBe('any_name')
    expect(category.description).toBe('any_description')
    expect(category.id).toBeDefined()
  })

  test('should be throw a validate error when name is null', () => {
    expect(() => {
      const _ = new Category({
        description: 'any_description',
        // @ts-expect-error - this is a test
        name: null
      })
    }).toThrowError('category: name:Expected string, received null')
  })

  test('should be throw a validate error when description is null', () => {
    expect(() => {
      const _ = new Category({
        name: 'name',
        // @ts-expect-error - this is a test
        description: null
      })
    }).toThrowError('category: description:Expected string, received null')
  })

  test('should be throw a validate error when name and description is null', () => {
    expect(() => {
      const _ = new Category({
        // @ts-expect-error - no problem, this is a test
        name: null,
        // @ts-expect-error - no problem, this is a test
        description: null
      })
    }).toThrowError('category: name:Expected string, received null,category: description:Expected string, received null')
  })
})
