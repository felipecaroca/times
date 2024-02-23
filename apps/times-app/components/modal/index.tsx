import { Modal } from 'native-base'

import { WithChildren } from '../../generic/types/CustomFC'

import { CustomModalProps } from './types'

const CustomModal: WithChildren<CustomModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" avoidKeyboard>
      <Modal.Content>
        <Modal.CloseButton />
        {title && <Modal.Header>{title}</Modal.Header>}
        <Modal.Body>{children}</Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default CustomModal
