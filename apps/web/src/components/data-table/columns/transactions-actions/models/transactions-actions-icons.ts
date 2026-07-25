import { DeliveryReturn02Icon, Edit03Icon, Repeat, ViewIcon } from '@hugeicons/core-free-icons'

import type { TransactionActionId } from './transactions-actions'

export const actionIcons = {
  view: ViewIcon,
  return: DeliveryReturn02Icon,
  edit: Edit03Icon,
  recreate: Repeat
} satisfies Record<TransactionActionId, typeof ViewIcon>
