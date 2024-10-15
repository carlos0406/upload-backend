import { ZodUserValidator } from '../validator/user.validator'
import { type UserValidatorInterface } from '../validator/user.validator.interface'

type UserValidatorType = 'zod'
export class UserValidatorFactory {
  static create (type: UserValidatorType): UserValidatorInterface {
    switch (type) {
      case 'zod':
        return new ZodUserValidator()
      default:
        throw new Error('Invalid type')
    }
  }
}
