import { useState, useMemo, useCallback, useRef } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { queryClient } from '@/shared/lib/queryCliente'
import { ResetPasswordService } from '../../../entities/user/infra/service/ResetPassword.service'
import { UnlockAccountService } from '../../../entities/user/infra/service/UnlockAccount.service'
import { UnlockAccount } from '../../../entities/user/application/UnlockAccount'
import { ResetPassword } from '../../../entities/user/application/ResetPassword'
import { DisableAccount } from '../../../entities/user/application/DisableAccount'
import { DisableAccountService } from '../../../entities/user/infra/service/DisableAccount.service'
import { ReactivateAccount } from '../../../entities/user/application/ReactivateAccount'
import { ReactivateAccountService } from '../../../entities/user/infra/service/ReactivateAccount.service'
import { type ModalRef } from '@/shared/ui/Modal/Modal'
import { type ActionType } from './ActionType'
import { ACTION_MESSAGES } from './ACTION_MESSAGES'

interface ActionStatus {
	isLoading: boolean
	error: string | null
	action: ActionType | null
}

interface UseUserActionsProps {
	userId: string | undefined
	onSuccess: () => void
}

export function useUserActions({ userId, onSuccess }: UseUserActionsProps) {
	const { events } = useAuthStore.getState()

	const actionDialogRef = useRef<ModalRef>(null)
	const [actionToConfirm, setActionToConfirm] = useState<ActionType | null>(null)

	const [actionStatus, setActionStatus] = useState<ActionStatus>({
		isLoading: false,
		error: null,
		action: null
	})

	const services = useMemo(
		() => ({
			reset: new ResetPassword(new ResetPasswordService(), events),
			unlock: new UnlockAccount(new UnlockAccountService(), events),
			disable: new DisableAccount(new DisableAccountService(), events),
			reactivate: new ReactivateAccount(new ReactivateAccountService(), events)
		}),
		[events]
	)

	const confirmAndExecuteAction = useCallback(
		(action: ActionType) => {
			setActionToConfirm(action)
			actionDialogRef.current?.handleOpen()
		},
		[userId]
	)
	const handleCloseAction = () => {
		actionDialogRef.current?.handleClose()
		setActionToConfirm(null)
	}

	const handleConfirmAction = useCallback(async () => {
		if (!actionToConfirm || !userId) return
		try {
			setActionStatus({ isLoading: true, error: null, action: actionToConfirm })
			const service = services[actionToConfirm]
			await service.execute({ id: userId })

			queryClient.invalidateQueries({ queryKey: ['users', userId] })
			queryClient.invalidateQueries({ queryKey: ['users'] })
			onSuccess()
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error'
			console.error(`Error ejecutando la acción ${actionToConfirm}:`, error)
			setActionStatus({ isLoading: false, error: errorMessage, action: actionToConfirm })
		} finally {
			setActionStatus({ isLoading: false, error: null, action: null })
			handleCloseAction()
		}
	}, [actionToConfirm, userId, services, onSuccess])

	const isActionLoading = (action: ActionType) =>
		actionStatus.isLoading && actionStatus.action === action

	// Contenido dinámico para el modal de acciones
	const modalContent = useMemo(() => {
		const action = actionToConfirm
		const defaultMessage = {
			title: 'Confirmar Acción',
			description:
				'¿Estás seguro de que deseas realizar esta acción? Esta operación podría no ser reversible.',
			actionText: 'Confirmar'
		}
		if (!action) return defaultMessage
		return ACTION_MESSAGES[action] ?? defaultMessage
	}, [actionToConfirm])

	return {
		actionStatus,
		actionDialogRef,
		actionToConfirm,
		confirmAndExecuteAction,
		handleConfirmAction,
		isActionLoading,
		handleCloseAction,
		modalContent
	}
}
