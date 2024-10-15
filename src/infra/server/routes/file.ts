import { type FastifyInstance } from 'fastify'
import { FileRepository } from '../../database/file/repository/file.repository'
import { CreateFileUseCase } from '../../database/file/repository/usecase/create-file.usecase'
import { CategoryRepository } from '../../database/category/repository/category.repository'
import { z } from 'zod'
import { settings } from '../../../settings'

export const fileRoutes = (fastify: FastifyInstance, options: any, done: () => void) => {
  fastify.post('/upload', async function handler (request, reply) {
    const fileSchema = z.object({
      name: z.string(),
      category: z.string(),
      contentType: z.string().regex(/\w+\/[-+.\w]+/)
    })

    const { name, contentType, category } = fileSchema.parse(request.body)
    const fileRepository = new FileRepository()
    const categoryRepository = new CategoryRepository()
    const usecase = new CreateFileUseCase(fileRepository, categoryRepository)
    const result = await usecase.execute({
      name,
      categoryId: category,
      contentType
    })
    return await reply.status(201).send({ url: result })
  })

  fastify.get('/file/:id', async function handler (request, reply) {
    // @ts-expect-error id is not defined
    const id: string = request?.params.id
    if (id) {
      const fileRepository = new FileRepository()
      const file = await fileRepository.findById(id)
      if (file) {
        const url = `${settings.BUCKET_DOWNLOAD_URL}${file.key}`
        return await reply.status(200).send({ url })
      }
    }
    return await reply.status(400)
  })
  done()
}
