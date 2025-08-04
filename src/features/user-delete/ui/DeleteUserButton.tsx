import { memo, useRef } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { DeleteUser } from '@/entities/user/application/DeleteUser'
import { DeleteUserService } from '@/entities/user/infra/service/deleteUser.service'
import { Dialog, type ModalRef } from '@/shared/ui/Modal/Modal'
import { ConfirmationModal } from '@/shared/ui/Modal/ConfirmationModal'
import { ThrashIcon } from '@/shared/ui/icon/ThrashIcon'
import Button from '@/shared/ui/Button'

export const DeleteUserButton = memo(({ id }: { id: string }) => {
	const dialogDeleteRef = useRef<ModalRef>(null)
	const events = useAuthStore.getState().events
	const deleteUserService = new DeleteUserService()
	const deleteUser = new DeleteUser(deleteUserService, events)

	const handleDelete = () => {
		deleteUser.execute({ id })
	}

	const handleClose = () => {
		dialogDeleteRef.current?.handleClose()
	}

	const handleOpen = () => {
		dialogDeleteRef.current?.handleOpen()
	}

	return (
		<>
			<Button
				color="red"
				text="Eliminar Usuario"
				onClick={handleOpen}
				buttonSize="medium"
				size="content"
				icon={<ThrashIcon width={16} className="aspect-square" />}
			/>

			<Dialog ref={dialogDeleteRef}>
				<ConfirmationModal
					handleClose={handleClose}
					handle={handleDelete}
					text="¿Está seguro que desea "
					strongText="Eliminar este usuario?"
				/>
			</Dialog>
		</>
	)
})
DeleteUserButton.displayName = 'DeleteUserButton'
