import {
  CancelSquareIcon,
  DeliveryReturn02Icon,
  Edit03Icon,
  Repeat,
  ViewIcon
} from '@hugeicons/core-free-icons'

import type { TransactionActionId } from './transactions-actions'

export const actionIcons = {
  view: ViewIcon,
  refund: DeliveryReturn02Icon,
  edit: Edit03Icon,
  recreate: Repeat,
  cancel: CancelSquareIcon
} satisfies Record<TransactionActionId, typeof ViewIcon>
