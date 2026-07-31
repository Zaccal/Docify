export function toCellsEntries(values: Record<string, string>) {
  return Object.entries(values ?? {}).map(([key, value]) => ({
    id: crypto.randomUUID(),
    key,
    value
  }))
}
