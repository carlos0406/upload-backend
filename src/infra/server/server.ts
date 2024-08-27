import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify'
import { categoryRoutes } from './routes/category'
import cors from '@fastify/cors'
import { fileRoutes } from './routes/file'
import fjwt from '@fastify/jwt'
import fCookie from '@fastify/cookie'
import userRoutes from './routes/user'

console.log('process.env.PUBLIC_KEY', process.env.PUBLIC_KEY)
console.log('process.env.PRIVATE_KEY', process.env.PRIVATE_KEY)
const fastify = Fastify({
  logger: true
})
fastify.register(fjwt, {
  secret: {
    public: process.env.PUBLIC_KEY ?? 'teste',
    private: process.env.PRIVATE_KEY ?? 'teste'
  },
  sign: { algorithm: 'RS256', expiresIn: '5h' }
})

fastify.decorate(
  'authenticate',
  async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.cookies.access_token

    if (!token) {
      return await reply.status(401).send({ message: 'Authentication required' })
    }

    const decoded = request.jwt.verify(token)
    request.user = decoded
  }
)

fastify.addHook('preHandler', (req, res, next) => {
  req.jwt = fastify.jwt
  next()
})

fastify.register(fCookie, {
  secret: process.env.COOKIE_SECRET ?? 'some-secret-key',
  hook: 'preHandler'
})

fastify.register(categoryRoutes)
fastify.register(fileRoutes)
fastify.register(userRoutes)
fastify.register(cors, {
  origin: '*'
})
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

fastify.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
  console.log('Server running on port 3000')
}).catch((err) => {
  fastify.log.error(err)
  process.exit(1)
})
