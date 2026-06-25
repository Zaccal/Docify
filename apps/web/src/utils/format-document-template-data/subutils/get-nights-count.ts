export function getNightsCount(from: Date, to: Date): number {
  const msInDay = 1000 * 60 * 60 * 24

  return Math.round((to.getTime() - from.getTime()) / msInDay)
}
