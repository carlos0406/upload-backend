import { type FastifyInstance } from 'fastify'
import { loginHandler } from '../handles/user'

async function userRoutes (server: FastifyInstance, options: any, done: () => void) {
  // registerUserHandler

  server.post('/login', {}, loginHandler)
  done()
}
export default userRoutes
