import { type User } from '../entity/user.entity'

export interface UserValidatorInterface {
  validate: (user: User) => void
}
