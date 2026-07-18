export function getMonthBounds() {
  const now = new Date()

  return {
    startOfThisMonth: new Date(now.getFullYear(), now.getMonth(), 1),
    startOfNextMonth: new Date(now.getFullYear(), now.getMonth() + 1, 1),
    startOfPrevMonth: new Date(now.getFullYear(), now.getMonth() - 1, 1)
  }
}
