import { verifyPassword } from '../../../utils/hash'
import { type UserRepositoy } from '../../../infra/database/user/repository/user.repositoy'
interface LoginInput {
  password: string
  email: string
}

interface LoginOutput {
  id: string
  name: string
  email: string
}

export class LoginUseCase {
  constructor (private readonly userRepository: UserRepositoy) {}
  async execute (input: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository.findByEmail(input.email)
    if (!user) {
      throw new Error('User not found')
    };
    if (!user.salt || !user.password) {
      throw new Error('user without password')
    }
    const isValidPassword = verifyPassword({
      candidatePassword: input.password,
      salt: user.salt,
      hash: user.password
    })

    if (!isValidPassword) {
      throw new Error('user without valid password')
    };

    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
}
