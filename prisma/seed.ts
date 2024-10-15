import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/utils/hash'
const prisma = new PrismaClient()

async function main () {
  const { hash, salt } = hashPassword('example')
  const user = await prisma.user.create({
    data: {
      email: 'example@example.com',
      password: hash,
      name:"test",
      salt
    }
  })
  console.log(user)
}

main().then(() => {
  console.log('seed done')
})
