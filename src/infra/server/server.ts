import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify'
import { categoryRoutes } from './routes/category'
import cors from '@fastify/cors'
import { fileRoutes } from './routes/file'
import fjwt from '@fastify/jwt'
import fCookie from '@fastify/cookie'
import userRoutes from './routes/user'
import { settings } from '../../settings'

const fastify = Fastify({
  logger: true
})
fastify.register(fjwt, {
  secret: {
    public: settings.JWT_PUBLIC_KEY,
    private: settings.JWT_PRIVATE_KEY ?? 'teste'
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
  secret: settings.COOKIE_SECRET,
  hook: 'preHandler'
})

fastify.register(categoryRoutes)
fastify.register(fileRoutes)
fastify.register(userRoutes)
fastify.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true
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
