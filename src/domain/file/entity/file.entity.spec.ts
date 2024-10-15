import { test, expect, describe } from 'vitest'
import { File } from './file.entity'
import { Category } from '../../category/entity/category.entity'
const category = new Category({
  description: 'any_description',
  name: 'any_name'
})
describe('FileEntity', () => {
  test('should be defined', () => {
    expect(true).toBe(true)
  })

  test('should be create a Category', () => {
    const file = new File({
      name: 'file1',
      category
    })
    expect(file.id).toBeDefined()
    expect(file.name).toBe('file1')
    expect(file.key).toBe(file.name.concat('-').concat(file.id))
    expect(file.category.id).toBe(category.id)
  })

  test('should be throw a validate error when name is null', () => {
    expect(() => {
      const _ = new File({
        // @ts-expect-error name is null
        name: null,
        category

      })
    }).toThrowError('file: name:Expected string, received null')
  })

  test('should be throw a validate error when category is null', () => {
    expect(() => {
      const _ = new File({
        name: 'name',
        // @ts-expect-error - this is a test
        category: null
      })
    }).toThrowError('file: category:Expected object, received null')
  })

  test('should be throw a validate error when name and Catgory is null', () => {
    expect(() => {
      const _ = new File({
        // @ts-expect-error - no problem, this is a test
        name: null,
        // @ts-expect-error - no problem, this is a test
        category: null
      })
    }).toThrowError('file: name:Expected string, received null,file: category:Expected object, received null')
  })
})
