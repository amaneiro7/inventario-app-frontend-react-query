import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react'
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

export function useCreateUser(defaultState?: DefaultUsers) {
	const { events } = useAuthStore.getState()

	const create = useMemo(
		() => async (formData: never) => {
			return await new UserCreator(new UserSaveService(), events).create(formData)
		},
		[events]
	)

	const { initialState, mode, resetState, loading } = useUserInitialState(
		defaultState ?? initialUserState.formData
	)
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
			resetState()
		})
	}
	return {
		key,
		formData,
		mode,
		errors,
		required,
		disabled,
		loading,
		resetForm,
		handleSubmit,
		handleChange
	}
}
