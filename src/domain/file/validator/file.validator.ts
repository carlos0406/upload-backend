import { type File } from '../entity/file.entity'
import { type ZodError, z } from 'zod'
import { type FileValidatorInterface } from './file.validator.interface'

export class ZodFileValidator implements FileValidatorInterface {
  validate (category: File) {
    const schema = z.object({
      id: z.string().uuid(),
      name: z.string().min(3).max(255),
      key: z.string().min(3).max(255),
      category: z.object({
        id: z.string().uuid()
      }),
      created_at: z.date().optional()
    })
    try {
      schema.parse(category)
    } catch (error) {
      const validationErrors = error as ZodError
      validationErrors.errors.forEach((error) => {
        category.notification.addError({
          context: 'file',
          message: `${error.path.join('.')}:${error.message}`
        })
      })
    }
  }
}
