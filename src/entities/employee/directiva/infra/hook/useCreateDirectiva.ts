import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import {
	type DefaultDirectiva,
	type Action,
	initialDirectivaState,
	directivaFormReducer
} from '../reducers/directivaFormReducer'
import { type DirectivaParams } from '../../domain/dto/Directiva.dto'
import { DirectivaSaveService } from '../service/directivaSave.service'
import { DirectivaCreator } from '../../application/DirectivaCreator'
import { useDirectivaInitialState } from './useDirectivaInitialState'

export function useCreateDirectiva(defaultState?: DefaultDirectiva) {
	const { events } = useAuthStore.getState()

	const create = useMemo(
		() => async (formData: DirectivaParams) => {
			return await new DirectivaCreator(new DirectivaSaveService(), events).create(formData)
		},
		[events]
	)

	const { initialState, mode, resetState } = useDirectivaInitialState(
		defaultState ?? initialDirectivaState.formData
	)
	const prevState = usePrevious(initialState)
	const [{ errors, formData, required }, dispatch] = useReducer(
		directivaFormReducer,
		initialDirectivaState
	)
	const key = useMemo(
		() =>
			`directiva${
				initialDirectivaState?.formData?.id ? initialDirectivaState.formData.id : ''
			}`,
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

	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault()
			event.stopPropagation()
			await create(formData).then(() => {
				resetState()
			})
		},
		[formData, create, resetState]
	)

	return {
		key,
		formData,
		mode,
		errors,
		required,
		resetForm,
		handleSubmit,
		handleChange
	}
}
