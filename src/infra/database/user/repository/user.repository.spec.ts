import { describe, it, expect, beforeEach, vi } from 'vitest'
import { User } from '../../../../domain/user/entity/user.entity'
import client from '../../../../services/prisma'
import { v4 as uuid } from 'uuid'
import { UserRepositoy } from './user.repositoy'

vi.mock('../../../../services/prisma', () => ({
  default: {
    user: {
      findUnique: vi.fn()
    }
  }
}))

describe('UserRepository', () => {
  let repository: UserRepositoy

  beforeEach(() => {
    repository = new UserRepositoy()
    vi.clearAllMocks()
  })

  describe('findByEmail', () => {
    it('should find a user by email successfully', async () => {
      const mockUser = {
        id: uuid(),
        name: 'Test User',
        email: 'test@example.com',
        salt: 'test-salt',
        password: 'hashed-password'
      }

      vi.mocked(client.user.findUnique).mockResolvedValue(mockUser)

      const result = await repository.findByEmail('test@example.com')

      expect(result).toBeInstanceOf(User)
      expect(result?.id).toBe(mockUser.id)
      expect(result?.name).toBe(mockUser.name)
      expect(result?.email).toBe(mockUser.email)
    })

    it('should return null if user is not found by email', async () => {
      vi.mocked(client.user.findUnique).mockResolvedValue(null)

      const result = await repository.findByEmail('nonexistent@example.com')

      expect(result).toBeNull()
    })
  })

  describe('findById', () => {
    it('should find a user by id successfully', async () => {
      const mockUser = {
        id: uuid(),
        name: 'Test User',
        email: 'test@example.com',
        salt: 'test-salt',
        password: 'hashed-password'
      }

      vi.mocked(client.user.findUnique).mockResolvedValue(mockUser)

      const result = await repository.findById('1')

      expect(result).toBeInstanceOf(User)
      expect(result?.id).toBe(mockUser.id)
      expect(result?.name).toBe(mockUser.name)
      expect(result?.email).toBe(mockUser.email)
    })

    it('should return null if user is not found by id', async () => {
      vi.mocked(client.user.findUnique).mockResolvedValue(null)

      const result = await repository.findById('nonexistent-id')

      expect(result).toBeNull()
    })
  })
})
