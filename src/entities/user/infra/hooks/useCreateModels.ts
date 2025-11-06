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
import { queryClient } from '@/shared/lib/queryCliente'
import { ResetPasswordService } from '../service/ResetPassword.service'
import { UnlockAccountService } from '../service/UnlockAccount.service'
import { UnlockAccount } from '../../application/UnlockAccount'
import { ResetPassword } from '../../application/ResetPassword'
import { DisableAccount } from '../../application/DisableAccount'
import { DisableAccountService } from '../service/DisableAccount.service'

export function useCreateUser(defaultState?: DefaultUsers) {
	const { events } = useAuthStore.getState()
	const resetUserPassword = new ResetPassword(new ResetPasswordService(), events)
	const unlockAccount = new UnlockAccount(new UnlockAccountService(), events)
	const disableAccount = new DisableAccount(new DisableAccountService(), events)

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

	const handleResetPassword = (id: string) => {
		resetUserPassword.execute({ id })
	}
	const handleUnlockAccount = (id: string) => {
		unlockAccount.execute({ id })
	}
	const handleDisableAccount = (id: string) => {
		disableAccount.execute({ id })
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
		onRetry,
		resetForm,
		handleSubmit,
		handleChange,
		handleResetPassword,
		handleUnlockAccount,
		handleDisableAccount
	}
}
