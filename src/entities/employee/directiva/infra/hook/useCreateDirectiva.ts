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

/**
 * A React hook for managing directiva creation and update forms.
 * It handles form state, validation errors, and interactions with the DirectivaCreator service.
 * @param defaultState - Optional initial state for the form, typically used for editing existing directivas.
 * @returns An object containing form data, mode, errors, required fields, and various handlers.
 */
export function useCreateDirectiva(defaultState?: DefaultDirectiva) {
	const { events } = useAuthStore.getState()

	/**
	 * Memoized function to create or update a directiva.
	 * It uses the DirectivaCreator service to perform the operation.
	 */
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

	/**
	 * Resets the form to its initial state.
	 */
	const resetForm = useCallback(() => {
		dispatch({
			type: 'reset',
			payload: { formData: structuredClone(prevState ?? initialState) }
		})
	}, [prevState, initialState])

	/**
	 * Handles changes to form input fields.
	 * @param name - The name of the action/field to update.
	 * @param value - The new value for the field.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = useCallback((name: Action['type'], value: any) => {
		if (name === 'init' || name === 'reset') return
		dispatch({ type: name, payload: { value } })
	}, [])

	/**
	 * Handles the form submission.
	 * Prevents default form submission and calls the `create` function with the current form data.
	 * Resets the form state after successful submission.
	 * @param event - The React form event.
	 */
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