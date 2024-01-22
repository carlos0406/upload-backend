import { AbstractClassEntity } from '../../shared/entity/entity.abstract'
import NotificationError from '../../shared/notification/notification.error'
import { CategoryValidatorFactory } from '../factory/category.validator.factory'
import { v4 as uuid } from 'uuid'
interface CategoryProps {
  id?: string
  name: string
  description: string
  created_at?: Date
  updated_at?: Date
}

export class Category extends AbstractClassEntity {
  private _id: string
  private _name: string
  private _description: string
  private _created_at!: Date
  private _updated_at!: Date

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

  get description (): string {
    return this._description
  }

  set description (value: string) {
    this._description = value
  }

  get created_at (): Date {
    return this._created_at
  }

  set created_at (value: Date) {
    this._created_at = value
  }

  get updated_at (): Date {
    return this._updated_at
  }

  set updated_at (value: Date) {
    this._updated_at = value
  }

  constructor (props: CategoryProps) {
    super()
    this._id = props.id ?? uuid()
    this._name = props.name
    this._description = props.description
    if (props.created_at) this._created_at = props.created_at
    if (props.updated_at) this._updated_at = props.updated_at
    this.validate()
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErros())
    }
  }

  validate () {
    CategoryValidatorFactory.create('zod').validate(this)
  }
}
