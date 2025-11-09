import { useCallback, useMemo, useReducer, useRef, useState } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { queryClient } from '@/shared/lib/queryCliente'
import { UserSaveService } from '../../../entities/user/infra/service/userSave.service'
import { UserCreator } from '../../../entities/user/application/UserCreator'
import { useNavigate } from 'react-router-dom'
import {
	type Action,
	initialUserState,
	userFormReducer
} from '../../../entities/user/infra/reducers/usersFormReducer'
import { type ModalRef } from '@/shared/ui/Modal/Modal'

export function useCreateUserForm() {
	const { events } = useAuthStore.getState()
	const createDialogRef = useRef<ModalRef>(null)
	const navigate = useNavigate()
	const [isSaving, setIsSaving] = useState(false)
	const formId = 'create-user-form'

	const create = useMemo(
		() => async (formData: never) => {
			return await new UserCreator(new UserSaveService(), events).create(formData)
		},
		[events]
	)

	const [{ formData }, dispatch] = useReducer(userFormReducer, initialUserState)

	const resetForm = useCallback(() => {
		dispatch({
			type: 'reset',
			payload: { formData: initialUserState.formData }
		})
	}, [])

	const handleChange = useCallback((name: Action['type'], value: any) => {
		if (name === 'init' || name === 'reset') return
		dispatch({ type: name, payload: { value } })
	}, [])

	const openCreateConfirmation = () => {
		createDialogRef.current?.handleOpen()
	}
	const closeCreateConfirmation = () => {
		createDialogRef.current?.handleClose()
	}

	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault()
			event.stopPropagation()
			setIsSaving(true)

			await create(formData as never)
				.then(newUser => {
					queryClient.invalidateQueries({ queryKey: ['users'] })
					resetForm()
					if (newUser.data?.id) {
						navigate(`/user-management/profile/${newUser.data?.id}`)
					}
				})
				.finally(() => {
					setIsSaving(false)
					closeCreateConfirmation()
				})
		},
		[formData, create, resetForm, navigate]
	)

	return {
		formData,
		isSaving,
		createDialogRef,
		formId,
		openCreateConfirmation,
		closeCreateConfirmation,
		handleSubmit,
		handleChange
	}
}
