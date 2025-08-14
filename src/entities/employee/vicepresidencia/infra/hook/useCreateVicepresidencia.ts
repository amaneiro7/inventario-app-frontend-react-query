import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import {
	type DefaultVicepresidencia,
	type Action,
	initialVicepresidenciaState,
	vicepresidenciaFormReducer
} from '../reducers/vicepresidenciaFormReducer'
import { type VicepresidenciaParams } from '../../domain/dto/Vicepresidencia.dto'
import { VicepresidenciaSaveService } from '../service/vicepresidenciaSave.service'
import { VicepresidenciaCreator } from '../../application/VicepresidenciaCreator'
import { useVicepresidenciaInitialState } from './useVicepresidenciaInitialState'
import { queryClient } from '@/shared/lib/queryCliente'

/**
 * A React hook for managing vicepresidencia creation and update forms.
 * It handles form state, validation errors, and interactions with the VicepresidenciaCreator service.
 * @param defaultState - Optional initial state for the form, typically used for editing existing vicepresidencias.
 * @returns An object containing form data, mode, errors, required fields, disabled fields, and various handlers.
 */
export function useCreateVicepresidencia(defaultState?: DefaultVicepresidencia) {
	const { events } = useAuthStore.getState()

	/**
	 * Memoized function to create or update a vicepresidencia.
	 * It uses the VicepresidenciaCreator service to perform the operation.
	 */
	const create = useMemo(
		() => async (formData: VicepresidenciaParams) => {
			return await new VicepresidenciaCreator(
				new VicepresidenciaSaveService(),
				events
			).create(formData)
		},
		[events]
	)

	const { initialState, mode, resetState, isError, isLoading, isNotFound, onRetry } =
		useVicepresidenciaInitialState(defaultState ?? initialVicepresidenciaState.formData)
	const prevState = usePrevious(initialState)
	const [{ errors, formData, required, disabled }, dispatch] = useReducer(
		vicepresidenciaFormReducer,
		initialVicepresidenciaState
	)
	const key = useMemo(
		() =>
			`vicepresidencia${
				initialVicepresidenciaState?.formData?.id
					? initialVicepresidenciaState.formData.id
					: ''
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
				queryClient.invalidateQueries({ queryKey: ['vicepresidencias'] })
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
		disabled,
		isError,
		isLoading,
		isNotFound,
		onRetry,
		resetForm,
		handleSubmit,
		handleChange
	}
}
