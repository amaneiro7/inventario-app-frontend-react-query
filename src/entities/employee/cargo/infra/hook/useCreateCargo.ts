import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react'

import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import {
	type DefaultCargo,
	type Action,
	initialCargoState,
	cargoFormReducer
} from '../reducers/cargoFormReducer'
import { type CargoParams } from '../../domain/dto/Cargo.dto'
import { CargoSaveService } from '../service/cargoSave.service'
import { CargoCreator } from '../../application/CargoCreator'
import { useCargoInitialState } from './useCargoInitialState'
import { useAuthStore } from '@/features/auth/model/useAuthStore'

/**
 * A React hook for managing cargo creation and update forms.
 * It handles form state, validation errors, and interactions with the CargoCreator service.
 * @param defaultState - Optional initial state for the form, typically used for editing existing cargos.
 * @returns An object containing form data, mode, errors, required fields, disabled fields, and various handlers.
 */
export function useCreateCargo(defaultState?: DefaultCargo) {
	const { events } = useAuthStore.getState()

	/**
	 * Memoized function to create or update a cargo.
	 * It uses the CargoCreator service to perform the operation.
	 */
	const create = useMemo(
		() => async (formData: CargoParams) => {
			return await new CargoCreator(new CargoSaveService(), events).create(formData)
		},
		[events]
	)

	const { initialState, mode, resetState, isError, isLoading, isNotFound, onRetry } =
		useCargoInitialState(defaultState ?? initialCargoState.formData)
	const prevState = usePrevious(initialState)
	const [{ errors, formData, required, disabled }, dispatch] = useReducer(
		cargoFormReducer,
		initialCargoState
	)
	const key = useMemo(
		() => `Cargo${initialCargoState?.formData?.id ? initialCargoState.formData.id : ''}`,
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
