import { beforeEach, describe, expect, it } from 'vitest'
import client from '../../../../services/prisma'
import { UserRepositoy } from './user.repositoy'
import { createUserFixture } from '../../../../tests/fixtures/creat-user.fixtures'

describe('file repository integration test', async () => {
  const repository = new UserRepositoy()
  beforeEach(async () => {
    await client.user.deleteMany({})
  })
  it('should find user by email', async () => {
    const { user } = await createUserFixture()

    const result = await repository.findByEmail('test@test.com')
    expect(result?.id).toBe(user.id)
    expect(result?.email).toBe(user.email)
    expect(result?.password).toBe(user.password)
    expect(result?.salt).toBe(user.salt)
  })

  it('should find user by id', async () => {
    const { user } = await createUserFixture()
    const result = await repository.findById(user.id)
    expect(result?.id).toBe(user.id)
    expect(result?.email).toBe(user.email)
    expect(result?.password).toBe(user.password)
    expect(result?.salt).toBe(user.salt)
  })
}

)
