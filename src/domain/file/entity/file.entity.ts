import { AbstractClassEntity } from '../../shared/entity/entity.abstract'
import NotificationError from '../../shared/notification/notification.error'
import { v4 as uuid } from 'uuid'
import { FileValidatorFactory } from '../factory/file.validator.factory'
import { type Category } from '../../category/entity/category.entity'
interface FileProps {
  id?: string
  name: string
  category: Category
}

export class File extends AbstractClassEntity {
  private _id: string
  private _name: string
  private _key: string
  private _category: Category
  private _created_at!: Date

  get category (): Category {
    return this._category
  }

  set category (value: Category) {
    this._category = value
  }

  get key (): string {
    return this._key
  }

  set key (value: string) {
    this._key = value
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

  get created_at (): Date {
    return this._created_at
  }

  set created_at (value: Date) {
    this._created_at = value
  }

  constructor (props: FileProps) {
    super()
    this._id = props.id ?? uuid()
    this._name = props.name
    this._key = this.name.concat('-').concat(this.id)
    this._category = props.category
    this.validate()
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErros())
    }
  }

  validate () {
    FileValidatorFactory.create('zod').validate(this)
  }
}
