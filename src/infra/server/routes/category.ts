import { type FastifyInstance } from 'fastify'
import { CategoryRepository } from '../../../domain/category/repository/category.repository'
import { CreateCategoryUseCase } from '../../../domain/category/usecase/create-category.usecase'
import { z } from 'zod'

export const categoryRoutes = (fastify: FastifyInstance, options: any, done: () => void) => {
  fastify.post('/category', async function handler (request, reply) {
    const requestBodySchema = z.object({
      name: z.string(),
      description: z.string()
    })
    try {
      const body = requestBodySchema.parse(request.body)
      const categoryRepository = new CategoryRepository()
      await new CreateCategoryUseCase(categoryRepository).execute({
        description: body.description,
        name: body.name
      })
      return await reply.status(201).send()
    } catch (e: any) {
      return await reply.status(400).send(e.message)
    }
  })
  done()
}
