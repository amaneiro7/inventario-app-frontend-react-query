import { useCallback, useLayoutEffect, useMemo, useReducer, useState } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import { useUserInitialState } from './useUsersInitialState'
import { UserSaveService } from '../service/userSave.service'
import { UserCreator } from '../../application/UserCreator'
import {
	type Action,
	type DefaultUsers,
	initialUserState,
	userFormReducer
} from '../reducers/usersFormReducer'
import { queryClient } from '@/shared/lib/queryCliente'
import { ResetPasswordService } from '../service/ResetPassword.service'
import { UnlockAccountService } from '../service/UnlockAccount.service'
import { UnlockAccount } from '../../application/UnlockAccount'
import { ResetPassword } from '../../application/ResetPassword'
import { DisableAccount } from '../../application/DisableAccount'
import { DisableAccountService } from '../service/DisableAccount.service'
import { ReactivateAccount } from '../../application/ReactivateAccount'
import { ReactivateAccountService } from '../service/ReactivateAccount.service'

export function useCreateUser(defaultState?: DefaultUsers) {
	const { events } = useAuthStore.getState()
	const resetUserPassword = new ResetPassword(new ResetPasswordService(), events)
	const unlockAccount = new UnlockAccount(new UnlockAccountService(), events)
	const disableAccount = new DisableAccount(new DisableAccountService(), events)
	const reactivateAccount = new ReactivateAccount(new ReactivateAccountService(), events)
	const [isSaving, setIsSaving] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

	const create = useMemo(
		() => async (formData: never) => {
			return await new UserCreator(new UserSaveService(), events).create(formData)
		},
		[events]
	)

	const { initialState, mode, resetState, isError, isLoading, isNotFound, onRetry } =
		useUserInitialState(defaultState ?? initialUserState.formData)
	const prevState = usePrevious(initialState)
	const [{ errors, formData, required, disabled }, dispatch] = useReducer(
		userFormReducer,
		initialUserState
	)
	const key = useMemo(
		() => `User${initialUserState?.formData?.id ? initialUserState.formData.id : ''}`,
		[formData?.id]
	)

	useLayoutEffect(() => {
		dispatch({
			type: 'init',
			payload: { formData: structuredClone(initialState) }
		})
	}, [initialState])

	const resetForm = useCallback(() => {
		dispatch({
			type: 'reset',
			payload: { formData: structuredClone(prevState ?? initialState) }
		})
	}, [prevState, initialState])

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = useCallback((name: Action['type'], value: any) => {
		if (name === 'init' || name === 'reset') return
		dispatch({ type: name, payload: { value } })
	}, [])

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		event.stopPropagation()
		await create(formData as never).then(() => {
			queryClient.invalidateQueries({ queryKey: ['users'] })
			resetState()
		})
	}

	const handleEditToggle = () => setIsEditing(!isEditing)

	const handleCancel = () => {
		resetForm()
		setIsEditing(false)
	}

	const handleActionClick = async (action: 'reset' | 'disable' | 'unlock' | 'reactivate') => {
		if (!formData?.id) return
		setIsSaving(true)
		// Preparamos la ejecución que se repetirá en cada caso
		const userId = formData.id
		let executeAction: Promise<void>
		try {
			switch (action) {
				case 'reset':
					executeAction = resetUserPassword.execute({ id: userId })
					break
				case 'disable':
					executeAction = disableAccount.execute({ id: userId })
					break
				case 'unlock':
					executeAction = unlockAccount.execute({ id: userId })
					break
				case 'reactivate':
					executeAction = reactivateAccount.execute({ id: userId })
					break
				default:
					return // Ignorar si la acción no es válida
			}

			// Ejecutar la acción y esperar a que termine
			await executeAction

			// Lógica post-ejecución (invalida el caché y resetea el estado)
			queryClient.invalidateQueries({ queryKey: ['users'] })
			resetState()
			setIsSaving(false)
		} catch (error) {
			// Manejo de errores centralizado (ej: notificaciones)
			console.error(`Error ejecutando la acción ${action}:`, error)
			// Opcional: Mostrar una notificación al usuario (toast)
		}
	}

	return {
		key,
		formData,
		mode,
		errors,
		required,
		disabled,
		isError,
		isLoading,
		isNotFound,
		isSaving,
		isEditing,
		onRetry,
		resetForm,
		handleSubmit,
		handleChange,
		handleActionClick,
		handleEditToggle,
		handleCancel
	}
}
