import { type CategoryValidatorInterface } from './category.validator.interface'
import { type Category } from './../entity/category.entity'
import { type ZodError, z } from 'zod'

export class ZodCategoryValidator implements CategoryValidatorInterface {
  validate (category: Category) {
    const schema = z.object({
      id: z.string().uuid(),
      name: z.string().min(3).max(255),
      description: z.string().min(3).max(255),
      created_at: z.date().optional(),
      updated_at: z.date().optional()
    })
    try {
      schema.parse(category)
    } catch (error) {
      const validationErrors = error as ZodError
      validationErrors.errors.forEach((error) => {
        category.notification.addError({
          context: 'category',
          message: `${error.path.join('.')}:${error.message}`
        })
      })
    }
  }
}
