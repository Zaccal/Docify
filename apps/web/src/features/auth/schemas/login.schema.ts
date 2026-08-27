import { z } from 'zod/mini'

export const loginSchema = z.object({
  password: z.string().check(z.minLength(1, { message: 'Введите пароль' }))
})

export type LoginSchema = z.infer<typeof loginSchema>
