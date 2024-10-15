import { beforeAll, describe, expect, it } from 'vitest'
import client from '../../../../services/prisma'
import { hashPassword } from '../../../../utils/hash'
import { UserRepositoy } from '../../../../infra/database/user/repository/user.repositoy'
import { LoginUseCase } from '../login.use-case'

describe('Login user usecase', async () => {
  beforeAll(async () => {
    const { hash, salt } = hashPassword('example')
    await client.user.create({
      data: {
        email: 'example@example.com',
        password: hash,
        name: 'test',
        salt
      }
    })
  })
  it('should return user after confirm credentials', async () => {
    const repo = new UserRepositoy()
    const useCase = new LoginUseCase(repo)
    const result = await useCase.execute({
      email: 'example@example.com',
      password: 'example'
    })
    expect(result).toMatchObject(
      {
        name: 'test',
        email: 'example@example.com'
      }
    )
  })

  it('should throw error because user not exists', async () => {
    const repo = new UserRepositoy()
    const useCase = new LoginUseCase(repo)
    expect(async () => {
      await useCase.execute({
        email: 'example1@example.com',
        password: 'example'
      })
    }).rejects.toThrowError('User not found')
  })

  it('should throw error because password are incorect', async () => {
    const repo = new UserRepositoy()
    const useCase = new LoginUseCase(repo)
    expect(async () => {
      await useCase.execute({
        email: 'example@example.com',
        password: 'example2323'
      })
    }).rejects.toThrowError('user without valid password')
  })
})
