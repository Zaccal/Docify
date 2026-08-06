import { z } from 'zod/mini'

const REGEX_NUMBER = /^\d+$/

export const enumerationSchema = z
  .string()
  .check(z.minLength(4, 'Длина должна быть не менее 4 символов'), z.regex(REGEX_NUMBER))
