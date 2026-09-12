import { fakerRU as faker } from '@faker-js/faker'

function calculateBINChecksum(first11: string): number | null {
  const weights1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  let sum = 0

  for (let i = 0; i < 11; i++) {
    sum += Number(first11[i]) * weights1[i]!
  }

  const remainder1 = sum % 11

  if (remainder1 !== 10) {
    return remainder1
  }

  const weights2 = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2]

  sum = 0

  for (let i = 0; i < 11; i++) {
    sum += Number(first11[i]) * weights2[i]!
  }

  const remainder2 = sum % 11

  if (remainder2 === 10) {
    return null
  }

  return remainder2
}

export function generateBIN(): string {
  while (true) {
    const first11 = faker.string.numeric({
      length: 11
    })

    const checksum = calculateBINChecksum(first11)

    if (checksum === null) {
      continue
    }

    return `${first11}${checksum}`
  }
}
