import client from '../../../services/prisma'

export class UserRepositoy {
  async findByEmail (email: string): Promise<any> {
    return await client.user.findUnique({
      where: {
        email
      }
    })
  }
}
