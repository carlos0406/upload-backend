import { test, expect, describe } from 'vitest'
import { User } from './user.entity'

describe('UserEntity', () => {
  test('should be create a User with full data', () => {
    const user = new User({
      name: 'user1',
      email: 'user1@example.com',
      password: 'password',
      salt: 'salt'
    })
    expect(user.name).to.equal('user1')
    expect(user.email).to.equal('user1@example.com')
    expect(user.password).to.equal('password')
    expect(user.salt).to.equal('salt')
    expect(user.id).toBeDefined()
  })

  test('should be create a User withou passwd and salt', () => {
    const user = new User({
      name: 'user1',
      email: 'user1@example.com'
    })
    expect(user.name).to.equal('user1')
    expect(user.email).to.equal('user1@example.com')
    expect(user.id).toBeDefined()
  })

  test('should be throw a validate error when salt exists but password is null', () => {
    expect(() => {
      const _ = new User({
        name: 'name',
        email: 'user1@example.com',
        salt: 'salt'
      })
    }).toThrowError('user: salt:If salt is provided, password must also be provided')
  })

  test('should be throw a validate error when name is null', () => {
    expect(() => {
      const _ = new User({
        // @ts-expect-error name is null
        name: null,
        email: 'user1@example.com',
        password: 'password',
        salt: 'salt'
      })
    }).toThrowError('user: name:Expected string, received null')
  })

  test('should be throw a validate error when email is null', () => {
    expect(() => {
      const _ = new User({
        name: 'user1',
        // @ts-expect-error email is null
        email: null,
        password: 'password',
        salt: 'salt'
      })
    }).toThrowError('user: email:Expected string, received null')
  })
  test('should be throw a validate error when all data is undefined', () => {
    expect(() => {
      // @ts-expect-error void json
      const _ = new User({
      })
    }).toThrowError('user: email:Required,user: name:Required')
  })
})
