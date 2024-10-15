import { beforeAll, describe, expect, it } from 'vitest'
import client from '../../../../services/prisma'
import { UserRepositoy } from '../../../../infra/database/user/repository/user.repositoy'
import { FindUserByIdUseCase } from '../find-by-id.usecase'

describe('Find user by id usecase', () => {
  let userId: string

  beforeAll(async () => {
    const user = await client.user.create({
      data: {
        email: 'example@example.com',
        password: 'hashedpassword',
        name: 'test',
        salt: 'somesalt'
      }
    })
    userId = user.id
  })

  it('should return user when found by id', async () => {
    const repo = new UserRepositoy()
    const useCase = new FindUserByIdUseCase(repo)
    const result = await useCase.execute(userId)
    expect(result).toMatchObject({
      id: userId,
      name: 'test',
      email: 'example@example.com'
    })
  })

  it('should throw error when user not found', async () => {
    const repo = new UserRepositoy()
    const useCase = new FindUserByIdUseCase(repo)
    await expect(useCase.execute('non-existent-id')).rejects.toThrow('User not found')
  })
})
