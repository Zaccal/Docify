import type { ButtonProps } from '@Docify/ui/components/button'
import { Children, cloneElement, isValidElement } from 'react'
import { useFormStatus } from 'react-dom'

interface CreateDocumentBtnsWrapperProps {
  children: React.ReactElement<ButtonProps> | React.ReactElement<ButtonProps>[]
}

export default function CreateDocumentBtnsWrapper({ children }: CreateDocumentBtnsWrapperProps) {
  const { pending } = useFormStatus()

  function handleChild(child: React.ReactElement<ButtonProps>, index: number) {
    if (!isValidElement<ButtonProps>(child)) return child

    if (child.props.type === 'submit') return cloneElement(child, { loading: pending, key: index })
    return cloneElement(child, { disabled: pending, key: index })
  }

  return <div className="flex justify-end gap-4 py-8">{Children.map(children, handleChild)}</div>
}
