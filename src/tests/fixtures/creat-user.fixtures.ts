import client from '../../services/prisma'

export async function createUserFixture (data: any = {}) {
  const user = await client.user.create({
    data: {
      name: 'user',
      email: 'test@test.com',
      password: 'test',
      salt: 'test',
      ...data
    }
  })

  return { user }
}
