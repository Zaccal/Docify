import { Moon02Icon, Sun01Icon, SunCloud01Icon } from '@hugeicons/core-free-icons'

import { welcomeDescriptions } from '@/lib/constants'

export function getWelcomeText(): string {
  const date = new Date()

  if (date.getHours() < 12) {
    return 'Доброе утро!'
  } else if (date.getHours() < 18) {
    return 'Добрый день!'
  } else {
    return 'Добрый вечер!'
  }
}

export function getWelcomeIcon() {
  const date = new Date()

  if (date.getHours() < 12) {
    return Sun01Icon
  } else if (date.getHours() < 18) {
    return SunCloud01Icon
  } else {
    return Moon02Icon
  }
}

export function getWelcomeDescription(): string {
  const randomIndex = Math.floor(Math.random() * welcomeDescriptions.length)
  return welcomeDescriptions[randomIndex]
}
