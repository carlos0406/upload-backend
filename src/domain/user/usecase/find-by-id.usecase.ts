import { type UserRepositoy } from '../../../infra/database/user/repository/user.repositoy'

export class FindUserByIdUseCase {
  constructor (private readonly userRepository: UserRepositoy) {}
  async execute (id: string) {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw Error('User not found')
    }
    return {
      email: user.email,
      id: user.id,
      name: user.name
    }
  }
}
