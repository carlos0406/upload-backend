import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { type InputCreateFile } from './create-file.dto'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { type FileRepositoryInterface } from '../../../infra/database/file/repository/file.repository.interface'
import { type CategoryRepositoryInterface } from '../../../infra/database/category/repository/category.repository.interface'
import { File } from '../entity/file.entity'
import { r2 } from '../../../services/r2'

export class CreateFileUseCase {
  constructor (private readonly fileRepository: FileRepositoryInterface, private readonly categoryRepository: CategoryRepositoryInterface) {}
  async execute (input: InputCreateFile) {
    const category = await this.categoryRepository.findById(input.categoryId)
    const file = new File({
      category,
      name: input.name
    })
    await this.fileRepository.create(file)
    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: 'uploader',
        Key: file.key,
        ContentType: input.contentType
      }),
      {
        expiresIn: 6000
      }
    )
    const formattedUrl = signedUrl.replace(/https?:\/\/localstack:4566/, 'http://localhost:4566')
    return formattedUrl
  }
}
