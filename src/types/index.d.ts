/**
 * Envirinment.d.ts
 */

export interface environment {
  (): string
}

declare module 'fastify' {
  // eslint-disable-next-line no-unused-vars
  interface FastifyInstance {
    environment: environment
  }
}
