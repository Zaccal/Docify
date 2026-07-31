import { Chart02Icon, ChartDownIcon, ChartUpIcon } from '@hugeicons/core-free-icons'

export function getStatisticText(percentage: number) {
  if (percentage > 0) {
    return 'Увеличилось в этом месяце'
  }

  if (percentage < 0) {
    return 'Уменьшилось в этом месяце'
  }

  return 'Без изменений в этом месяце'
}

export function getStatisticIcon(percentage: number) {
  if (percentage > 0) {
    return ChartUpIcon
  }

  if (percentage < 0) {
    return ChartDownIcon
  }

  return Chart02Icon
}
