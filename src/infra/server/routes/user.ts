/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type FastifyRequest, type FastifyInstance, type FastifyReply } from 'fastify'
import { type LoginInput } from '../../../domain/user/user.schemas'
import { UserRepositoy } from '../../database/user/repository/user.repositoy'
import { LoginUseCase } from '../../../domain/user/usecase/login.use-case'
import { FindUserByIdUseCase } from '../../../domain/user/usecase/find-by-id.usecase'

async function userRoutes (fastify: FastifyInstance, options: any, done: () => void) {
  fastify.post('/login', {}, async function handler (
    request: FastifyRequest<{
      Body: LoginInput
    }>,
    reply: FastifyReply
  ) {
    const body = request.body
    const payload = await new LoginUseCase(new UserRepositoy()).execute(body)
    const token = request.jwt.sign(payload, {
      expiresIn: '5h'
    })

    reply.setCookie('access_token', token, {
      path: '/',
      maxAge: 1000 * 60, // for a week
      httpOnly: true,
      secure: true
    })

    return { accessToken: token }
  })

  fastify.get('/me', {
    preHandler: [fastify.authenticate]
  }, async function handler (request, reply) {
    // @ts-expect-error
    const result = await new FindUserByIdUseCase(new UserRepositoy()).execute(request.user.id as string)
    return await reply.send(result)
  })
  fastify.delete('/logout', {
    preHandler: [fastify.authenticate]
  }, async function handler (request, reply) {
    reply.clearCookie('access_token')
    return { message: 'logout with sucess' }
  })

  done()
}
export default userRoutes
