import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DATABASE_DIRECT_URL: z.string().url(),
  BUCKET_ACCESS_KEY_ID: z.string(),
  BUCKET_SECRET_ACCESS_KEY: z.string(),
  BUCKET_DOWNLOAD_URL: z.string().url(),
  BUCKET_ENDPOINT: z.string().url(),
  COOKIE_SECRET: z.string(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string()
})

export const settings = envSchema.parse(process.env)
