import { type FastifyReply, type FastifyRequest } from 'fastify'
import { type LoginInput } from '../../../domain/user/user.schemas'
import { verifyPassword } from '../../../utils/hash'
import { UserRepositoy } from '../../../domain/user/repository/user.repositoy'

export async function loginHandler (
  request: FastifyRequest<{
    Body: LoginInput
  }>,
  reply: FastifyReply
) {
  const body = request.body

  const user = await new UserRepositoy().findByEmail(body.email)

  if (!user) {
    return await reply.status(401).send({
      message: 'Invalid email address. Try again!'
    })
  };

  const isValidPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password
  })

  if (!isValidPassword) {
    return await reply.status(401).send({
      message: 'Password is incorrect'
    })
  };

  const payload = {
    id: user.id
  }
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
}
