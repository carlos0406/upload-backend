import { S3Client } from '@aws-sdk/client-s3'

export const r2 = new S3Client({
  region: 'auto',
  endpoint: 'https://9d3ddf409a58da2140720094af503b0d.r2.cloudflarestorage.com/uploader',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.SECRET_ACCESS_KEY ?? ''
  }
})
