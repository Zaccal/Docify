export function formatCost(value: string) {
  const cleaned = value.replace(/\s/g, '').replace(/[^\d,.]/g, '')
  const [integer = '', fraction] = cleaned.split(/[,.]/)

  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  return fraction !== undefined ? `${grouped},${fraction.slice(0, 2)}` : grouped
}

export function normalizeCost(value: string) {
  return value.replace(/\s/g, '').replace(',', '.')
}
