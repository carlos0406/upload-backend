import { v4 as uuid } from 'uuid'
import { AbstractClassEntity } from '../../shared/entity/entity.abstract'
import { UserValidatorFactory } from '../factory/user.validator.factory'
import NotificationError from '../../shared/notification/notification.error'
interface UserProps {
  id?: string
  name: string
  email: string
  password?: string | null
  salt?: string | null
}

export class User extends AbstractClassEntity {
  private _id: string
  private _name: string
  private _email: string
  private _password: string | null
  private _salt: string | null

  get email (): string {
    return this._email
  }

  set email (value: string) {
    this._email = value
  }

  get id (): string {
    return this._id
  }

  set id (value: string) {
    this._id = value
  }

  get name (): string {
    return this._name
  }

  set name (value: string) {
    this._name = value
  }

  get password (): string | null {
    return this._password
  }

  set password (value: string) {
    this._password = value
  }

  get salt (): string | null {
    return this._salt
  }

  set salt (value: string) {
    this._salt = value
  }

  constructor ({
    id,
    name,
    email,
    password = null,
    salt = null
  }: UserProps) {
    super()
    this._id = id ?? uuid()
    this._name = name
    this._email = email
    this._password = password
    this._salt = salt
    this.validate()
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErros())
    }
  }

  validate () {
    UserValidatorFactory.create('zod').validate(this)
  }
}
