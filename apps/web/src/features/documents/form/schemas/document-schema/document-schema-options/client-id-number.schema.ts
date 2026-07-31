import { z } from 'zod/mini'

export const clientIdNumberSchema = z
  .string()
  .check(z.minLength(3, 'Длина должна быть не менее 3 символов'))
