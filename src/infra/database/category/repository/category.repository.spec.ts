import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CategoryRepository } from './category.repository'
import { Category } from '../../../../domain/category/entity/category.entity'
import client from '../../../../services/prisma'
import { v4 as uuid } from 'uuid'

vi.mock('../../../../services/prisma', () => ({
  default: {
    category: {
      create: vi.fn(),
      delete: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn()
    }
  }
}))

describe('CategoryRepository', () => {
  let repository: CategoryRepository

  beforeEach(() => {
    repository = new CategoryRepository()
    vi.clearAllMocks()
  })

  describe('create', () => {
    it('should create a category successfully', async () => {
      const category = new Category({
        name: 'Test Category',
        description: 'Test Description'
      })

      await repository.create(category)

      expect(client.category.create).toHaveBeenCalledWith({
        data: {
          id: category.id,
          name: category.name,
          description: category.description,
          created_at: category.created_at,
          updated_at: category.updated_at
        }
      })
    })

    it('should throw an error if creation fails', async () => {
      const category = new Category({
        name: 'Test Category',
        description: 'Test Description'
      })

      vi.mocked(client.category.create).mockRejectedValue(new Error('Creation failed'))

      await expect(repository.create(category)).rejects.toThrow('Creation failed')
    })
  })

  describe('delete', () => {
    it('should delete a category successfully', async () => {
      await repository.delete('1')

      expect(client.category.delete).toHaveBeenCalledWith({
        where: { id: '1' }
      })
    })

    it('should throw an error if deletion fails', async () => {
      vi.mocked(client.category.delete).mockRejectedValue(new Error('Deletion failed'))

      await expect(repository.delete('1')).rejects.toThrow('Deletion failed')
    })
  })

  describe('findById', () => {
    it('should find a category by id successfully', async () => {
      const mockCategory = {
        id: uuid(),
        name: 'Test Category',
        description: 'Test Description'
      }

      vi.mocked(client.category.findUnique).mockResolvedValue(mockCategory)

      const result = await repository.findById('1')

      expect(result).toBeInstanceOf(Category)
      expect(result.name).toBe(mockCategory.name)
    })

    it('should throw an error if category is not found', async () => {
      vi.mocked(client.category.findUnique).mockResolvedValue(null)

      await expect(repository.findById('1')).rejects.toThrow('Category not found')
    })
  })

  describe('findByName', () => {
    it('should find categories by name successfully', async () => {
      const mockCategories = [
        {
          name: 'Test Category 1',
          description: 'Test Description 1',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Test Category 2',
          description: 'Test Description 2',
          created_at: new Date(),
          updated_at: new Date()
        }
      ]

      vi.mocked(client.category.findMany).mockResolvedValue(mockCategories)

      const result = await repository.findByName('Test')

      expect(result).toHaveLength(2)
      expect(result[0]).toBeInstanceOf(Category)
      expect(result[1]).toBeInstanceOf(Category)
      expect(result[0].name).toBe(mockCategories[0].name)
      expect(result[1].name).toBe(mockCategories[1].name)
    })

    it('should return an empty array if no categories are found', async () => {
      vi.mocked(client.category.findMany).mockResolvedValue([])

      const result = await repository.findByName('NonExistent')

      expect(result).toHaveLength(0)
    })
  })
})
