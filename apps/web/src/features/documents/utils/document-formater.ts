import { isArray, isPlainObject, isString } from 'es-toolkit/compat'

function parseCellsLine(value: FormDataEntryValue | undefined) {
  if (!isString(value)) {
    return {}
  }

  try {
    const parsedValue = JSON.parse(value)

    if (isPlainObject(parsedValue) && !isArray(parsedValue)) {
      return parsedValue
    }
  } catch {
    return {}
  }

  return {}
}

function parseDocumentDate(value: FormDataEntryValue | undefined) {
  if (!isString(value)) {
    return []
  }

  try {
    const parsedValue = JSON.parse(value)

    if (
      isArray(parsedValue) &&
      parsedValue.length === 2 &&
      parsedValue.every((date) => typeof date === 'string')
    ) {
      return parsedValue
    }
  } catch {
    return []
  }

  return []
}

export function getDocumentFormData(formData: FormData) {
  const data = Object.fromEntries(formData.entries())

  return {
    ...data,
    documentDate: parseDocumentDate(data.documentDate),
    cellsLine: parseCellsLine(data.cellsLine)
  }
}
