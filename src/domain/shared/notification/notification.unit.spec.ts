import { Notification } from './notification'
import { it, expect, describe } from 'vitest'
describe('unit test for notification', () => {
  it('should create  erros ', () => {
    const notification = new Notification()
    const error = {
      message: 'error message',
      context: 'customer'
    }
    notification.addError(error)
    expect(notification.messages('customer')).toBe('customer: error message')
    const error2 = {
      message: 'error message2',
      context: 'customer'
    }
    const error3 = {
      message: 'error message3',
      context: 'product'
    }
    notification.addError(error2)
    notification.addError(error3)
    expect(notification.messages('customer')).toBe('customer: error message,customer: error message2')
    expect(notification.messages()).toBe('customer: error message,customer: error message2,product: error message3')
  })

  it('should check if notification has erros', () => {
    const notification = new Notification()
    const error = {
      message: 'error message',
      context: 'customer'
    }
    notification.addError(error)
    expect(notification.hasErrors()).toBe(true)
  })

  it('should get all errors props', () => {
    const notification = new Notification()
    const error = {
      message: 'error message',
      context: 'customer'
    }
    notification.addError(error)
    expect(notification.getErros()).toStrictEqual([error])
  })
})
