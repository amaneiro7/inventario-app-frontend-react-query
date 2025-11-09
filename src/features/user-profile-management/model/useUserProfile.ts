import { useCallback, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import { queryClient } from '@/shared/lib/queryCliente'
import { useUserInitialState } from '../../../entities/user/infra/hooks/useUsersInitialState'
import { UserCreator } from '../../../entities/user/application/UserCreator'
import { UserSaveService } from '../../../entities/user/infra/service/userSave.service'
import {
	type Action,
	type DefaultUsers,
	initialUserState,
	userFormReducer
} from '../../../entities/user/infra/reducers/usersFormReducer'
import { type ModalRef } from '@/shared/ui/Modal/Modal'

export function useUserProfile(defaultState?: DefaultUsers) {
	const { events } = useAuthStore.getState()
	const saveDialogRef = useRef<ModalRef>(null)
	const [isSaving, setIsSaving] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const formId = 'user-profile-form'

	const create = useMemo(
		() => async (formData: never) => {
			return await new UserCreator(new UserSaveService(), events).create(formData)
		},
		[events]
	)

	const { initialState, mode, resetState, isError, isLoading, isNotFound, onRetry } =
		useUserInitialState(defaultState ?? initialUserState.formData)

	const prevState = usePrevious(initialState)
	const [{ formData }, dispatch] = useReducer(userFormReducer, initialUserState)

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

	const handleChange = useCallback((name: Action['type'], value: any) => {
		if (name === 'init' || name === 'reset') return
		dispatch({ type: name, payload: { value } })
	}, [])

	const handleEditToggle = () => setIsEditing(!isEditing)

	const handleCancel = () => {
		resetForm()
		setIsEditing(false)
	}

	const hasChanges = useMemo(() => {
		if (!initialState || !formData) {
			return false
		}
		return initialState.roleId !== formData.roleId
	}, [formData, initialState])

	const openSaveConfirmation = () => {
		saveDialogRef.current?.handleOpen()
	}
	const closeSaveConfirmation = () => {
		saveDialogRef.current?.handleClose()
	}

	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault()
			event.stopPropagation()
			if (!hasChanges || !formData.id) return

			setIsSaving(true)
			await create(formData as never)
				.then(() => {
					queryClient.invalidateQueries({ queryKey: ['users', formData.id] })
					setIsEditing(false)
				})
				.finally(() => {
					setIsSaving(false)
					closeSaveConfirmation()
				})
		},
		[formData, hasChanges, create]
	)

	return {
		formData,
		mode,
		isError,
		isLoading,
		isNotFound,
		isSaving,
		isEditing,
		hasChanges,
		saveDialogRef,
		formId,
		openSaveConfirmation,
		closeSaveConfirmation,
		onRetry,
		resetState,
		resetForm,
		handleSubmit,
		handleChange,
		handleEditToggle,
		handleCancel
	}
}
