import { S3Client } from '@aws-sdk/client-s3'
import { settings } from '../settings'

export const r2 = new S3Client({
  region: 'auto',
  endpoint: settings.BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: settings.BUCKET_ACCESS_KEY_ID,
    secretAccessKey: settings.BUCKET_SECRET_ACCESS_KEY
  },
  forcePathStyle: true
})
