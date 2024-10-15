import client from '../../services/prisma'

export async function createCategoriesFixture () {
  const a = await client.category.create({
    data: {
      name: 'aaaaaaaaa',
      description: 'description1'
    }
  })

  const c = await client.category.create({
    data: {
      name: 'cccccccb',
      description: 'description2'
    }
  })

  const b = await client.category.create({
    data: {
      name: 'bbbbbbb',
      description: 'description3'
    }
  })

  return { a, b, c }
}
