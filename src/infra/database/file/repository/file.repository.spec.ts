import { describe, it, expect, beforeEach, vi } from 'vitest'
import { FileRepository } from './file.repository'
import { File } from '../../../../domain/file/entity/file.entity'
import { Category } from '../../../../domain/category/entity/category.entity'
import client from '../../../../services/prisma'
import { v4 as uuid } from 'uuid'

vi.mock('../../../../services/prisma', () => ({
  default: {
    file: {
      create: vi.fn(),
      findUnique: vi.fn()
    }
  }
}))

describe('FileRepository', () => {
  let repository: FileRepository

  beforeEach(() => {
    repository = new FileRepository()
    vi.clearAllMocks()
  })

  describe('create', () => {
    it('should create a file successfully', async () => {
      const category = new Category({ id: uuid(), name: 'Test Category', description: 'Test Description' })
      const file = new File({ id: uuid(), name: 'test-file', category })

      const mockCreatedFile = { id: file.id, key: file.key, name: file.name, categoryId: file.category.id, created_at: new Date() }
      vi.mocked(client.file.create).mockResolvedValue(mockCreatedFile)

      await repository.create(file)

      expect(client.file.create).toHaveBeenCalledWith({
        data: {
          id: file.id,
          key: file.key,
          name: file.name,
          categoryId: file.category.id,
          created_at: file.created_at
        }
      })
      expect(file.id).toBe(mockCreatedFile.id)
    })

    it('should throw an error if creation fails', async () => {
      const category = new Category({ id: uuid(), name: 'Test Category', description: 'Test Description' })
      const file = new File({ id: uuid(), name: 'test-file', category })

      vi.mocked(client.file.create).mockRejectedValue(new Error('Creation failed'))

      await expect(repository.create(file)).rejects.toThrow('Creation failed')
    })
  })

  describe('findById', () => {
    it('should find a file by id successfully', async () => {
      const mockFile = {
        id: uuid(),
        key: 'test-key',
        name: 'test-file',
        category: {
          id: uuid(),
          name: 'Test Category',
          description: 'Test Description'
        }
      }

      vi.mocked(client.file.findUnique).mockResolvedValue(mockFile)

      const result = await repository.findById('1')

      expect(result).toBeInstanceOf(File)
      expect(result?.id).toBe(mockFile.id)
      expect(result?.name).toBe(mockFile.name)
      expect(result?.category).toBeInstanceOf(Category)
      expect(result?.category.id).toBe(mockFile.category.id)
    })

    it('should return null if file is not found', async () => {
      vi.mocked(client.file.findUnique).mockResolvedValue(null)

      const result = await repository.findById('1')

      expect(result).toBeNull()
    })
  })
})
