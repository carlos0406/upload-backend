import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { type CategoryRepositoryInterface } from '../../category/repository/category.repository.interface'
import { type FileRepositoryInterface } from '../repository/file.repository.interface'
import { type InputCreateFile } from './create-file.dto'
import { r2 } from '../../../services/s2'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { File } from '../entity/file.entity'
import { randomUUID } from 'crypto'

export class CreateFileUseCase {
  constructor (private readonly fileRepository: FileRepositoryInterface, private readonly categoryRepository: CategoryRepositoryInterface) {}
  async execute (input: InputCreateFile) {
    const fileKey = this.generateKey(input.name, input.categoryId)
    const category = await this.categoryRepository.findById(input.categoryId)
    const file = new File({
      category,
      name: input.name
    })
    await this.fileRepository.create(file)
    return await getSignedUrl(r2,
      new PutObjectCommand({
        Bucket: 'uploader',
        Key: fileKey,
        ContentType: input.contentType
      }),
      {
        expiresIn: 6000
      })
  }

  generateKey (name: string, categoryId: string): string {
    return randomUUID().concat('-').concat(categoryId).concat('-').concat(name)
  }
}
