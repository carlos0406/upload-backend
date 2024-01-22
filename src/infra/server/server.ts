import Fastify from 'fastify'
import { categoryRoutes } from './routes/category'
import { CreateFileUseCase } from '../../domain/file/usecase/create-file.usecase'
import { FileRepository } from '../../domain/file/repository/file.repository'
import { CategoryRepository } from '../../domain/category/repository/category.repository'
import { z } from 'zod'
import cors from '@fastify/cors'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '../../services/s2'
import { GetObjectCommand } from '@aws-sdk/client-s3'
const fastify = Fastify({
  logger: true
})

fastify.register(categoryRoutes)
fastify.register(cors, {
  origin: '*'
})
// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

fastify.post('/upload', async function handler (request, reply) {
  const fileSchema = z.object({
    name: z.string(),
    contentType: z.string().regex(/\w+\/[-+.\w]+/)
  })

  const { name, contentType } = fileSchema.parse(request.body)
  const fileRepository = new FileRepository()
  const categoryRepository = new CategoryRepository()
  const usecase = new CreateFileUseCase(fileRepository, categoryRepository)
  const result = await usecase.execute({
    name,
    categoryId: '0aefd6b4-14f0-49ed-aa7a-2b6d8ab89500',
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
      const url = await getSignedUrl(r2,
        new GetObjectCommand({
          Bucket: 'uploader',
          Key: file.key
        }),
        {
          expiresIn: 6000
        })
      return await reply.status(200).send({ url })
    }
  }
  return await reply.status(400)
})

// Run the server!

fastify.listen({ port: 3000 }).then(() => {
  console.log('Server running on port 3000')
}).catch((err) => {
  fastify.log.error(err)
  process.exit(1)
})
