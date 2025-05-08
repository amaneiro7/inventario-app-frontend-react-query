import { useRef } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { DeleteUser } from '@/core/user/application/DeleteUser'
import { DeleteUserService } from '@/core/user/infra/service/deleteUser.service'

import { Dialog, type ModalRef } from '@/components/Modal/Modal'
import { ConfirmationModal } from '@/components/Modal/ConfirmationModal'
import { ThrashIcon } from '@/icon/ThrashIcon'
import Button from '@/components/Button'

export function DeleteHandle({ id }: { id: string }) {
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
}
