import { type ZodError, z } from 'zod'
import { type UserValidatorInterface } from './user.validator.interface'
import { type User } from '../entity/user.entity'

export class ZodUserValidator implements UserValidatorInterface {
  validate (category: User) {
    const schema = z.object({
      id: z.string().uuid(),
      email: z.string().email(),
      name: z.string().min(1),
      password: z.string().optional().nullable(),
      salt: z.string().optional().nullable()
    }).refine(
      (data) => {
        if (data.salt && !data.password) {
          return false
        }
        return true
      },
      {
        message: 'If salt is provided, password must also be provided',
        path: ['salt'] // Indica onde está o erro
      }
    )
    try {
      schema.parse(category)
    } catch (error) {
      const validationErrors = error as ZodError
      validationErrors.errors.forEach((error) => {
        category.notification.addError({
          context: 'user',
          message: `${error.path.join('.')}:${error.message}`
        })
      })
    }
  }
}
