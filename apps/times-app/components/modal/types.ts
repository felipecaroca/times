import { ReactNode } from 'react'

export type CustomModalProps = {
  isOpen: boolean
  onClose(): void
  title?: string | ReactNode
}
