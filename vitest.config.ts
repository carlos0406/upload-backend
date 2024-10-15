import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {

    test: {
      globals: false,
      include: ['./src/**/*.spec.ts'],
      exclude: ['**/*.int.spec.ts', "**/*.e2e.spec.ts'"],
      setupFiles: ['./src/tests/test-setup.ts'],
      env,
      testTimeout: 10000,
      coverage: {
        reportsDirectory: './coverage/unit'
      }
    }
  }
})
