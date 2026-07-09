export function formatNumber(data: number | string) {
  const value = typeof data === 'string' ? data : String(data)
  const cleaned = value.replace(/\s/g, '').replace(/[^\d,.]/g, '')
  const [integer = '', fraction] = cleaned.split(/[,.]/)

  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  return fraction !== undefined ? `${grouped},${fraction.slice(0, 2)}` : grouped
}

export function normalizeNumber(value: string) {
  return value.replace(/\s/g, '').replace(',', '.')
}
