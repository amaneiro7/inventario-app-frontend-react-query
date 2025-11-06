import { memo, useRef } from 'react'
import Button from '@/shared/ui/Button'
import { Color } from '@/shared/ui/Button/styles'
import { ConfirmationModal } from '@/shared/ui/Modal/ConfirmationModal'
import { Dialog, type ModalRef } from '@/shared/ui/Modal/Modal'
import { ResetIcon } from '@/shared/ui/icon/ResetIcon'

interface ResetPasswordButtonProps {
	handleActionClick: (action: 'reset' | 'disable' | 'unlock' | 'reactivate') => Promise<void>
	color: keyof typeof Color
}

export const ResetPasswordButton = memo(
	({ handleActionClick, color }: ResetPasswordButtonProps) => {
		const dialogResetRef = useRef<ModalRef>(null)

		const handleClose = () => {
			dialogResetRef.current?.handleClose()
		}

		const handleOpen = () => {
			dialogResetRef.current?.handleOpen()
		}

		return (
			<>
				<Button
					color={color}
					text="Restablecer Contraseña"
					onClick={handleOpen}
					buttonSize="medium"
					size="content"
					icon={<ResetIcon width={16} className="aspect-square" />}
				/>

				<Dialog ref={dialogResetRef}>
					<ConfirmationModal
						handleClose={handleClose}
						handle={() => handleActionClick('reset')}
						text="¿Está seguro que desea "
						strongText="Restablecer la Contraseña?"
					/>
				</Dialog>
			</>
		)
	}
)

ResetPasswordButton.displayName = 'ResetPasswordButton'
