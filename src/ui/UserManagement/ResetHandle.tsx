import { useRef } from 'react'

import Button from '@/components/Button'
import { ConfirmationModal } from '@/components/Modal/ConfirmationModal'
import { Dialog, type ModalRef } from '@/components/Modal/Modal'
import { ResetIcon } from '@/icon/ResetIcon'
import { ResetPasswordService } from '@/core/user/infra/service/ResetPassword.service'
import { ResetPassword } from '@/core/user/application/ResetPassword'
import { useAuthStore } from '@/store/useAuthStore'

export function ResetHandle({ id }: { id: string }) {
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
}
