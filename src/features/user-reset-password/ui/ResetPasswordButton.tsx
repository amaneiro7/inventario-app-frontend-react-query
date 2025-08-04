import { memo, useRef } from 'react'

import Button from '@/shared/ui/Button'
import { ConfirmationModal } from '@/shared/ui/Modal/ConfirmationModal'
import { Dialog, type ModalRef } from '@/shared/ui/Modal/Modal'
import { ResetIcon } from '@/shared/ui/icon/ResetIcon'
import { ResetPasswordService } from '@/entities/user/infra/service/ResetPassword.service'
import { ResetPassword } from '@/entities/user/application/ResetPassword'
import { useAuthStore } from '@/features/auth/model/useAuthStore'

export const ResetPasswordButton = memo(({ id }: { id: string }) => {
	const dialogResetRef = useRef<ModalRef>(null)
	const events = useAuthStore.getState().events
	const resetUserPasswordService = new ResetPasswordService()
	const resetUserPassword = new ResetPassword(resetUserPasswordService, events)
	const handleReset = () => {
		resetUserPassword.execute({ id })
	}
	const handleClose = () => {
		dialogResetRef.current?.handleClose()
	}

	const handleOpen = () => {
		dialogResetRef.current?.handleOpen()
	}

	return (
		<>
			<Button
				color="orange"
				text="Restablecer Contraseña"
				onClick={handleOpen}
				buttonSize="medium"
				size="content"
				icon={<ResetIcon width={16} className="aspect-square" />}
			/>

			<Dialog ref={dialogResetRef}>
				<ConfirmationModal
					handleClose={handleClose}
					handle={handleReset}
					text="¿Está seguro que desea "
					strongText="Restablecer la Contraseña?"
				/>
			</Dialog>
		</>
	)
})

ResetPasswordButton.displayName = 'ResetPasswordButton'
