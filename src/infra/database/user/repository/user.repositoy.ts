import client from '../../../../services/prisma'
import { User } from '../../../../domain/user/entity/user.entity'

export class UserRepositoy {
  async findByEmail (email: string): Promise<User | null> {
    const result = await client.user.findUnique({

      where: {
        email
      }
    })
    return result
      ? new User(
        {
          id: result.id,
          name: result.name,
          email: result.email,
          salt: result.salt,
          password: result.password
        }
      )
      : null
  }

  async findById (id: string): Promise<User | null> {
    const result = await client.user.findUnique({
      where: {
        id
      }
    })
    return result
      ? new User(
        {
          id: result.id,
          name: result.name,
          email: result.email,
          salt: result.salt,
          password: result.password
        }
      )
      : null
  }
}
