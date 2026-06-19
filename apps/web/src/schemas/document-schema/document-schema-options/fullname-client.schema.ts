import { z } from 'zod/mini'

const REGEX_FULLNAME = /^[А-ЯЁ][а-яё]+ [А-ЯЁ]\.[А-ЯЁ]\.$/

export const fullnameClientSchema = z.string().check(z.regex(REGEX_FULLNAME))
