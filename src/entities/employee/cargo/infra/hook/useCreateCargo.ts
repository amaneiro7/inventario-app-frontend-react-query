import { useCallback } from 'react'
import {
	type DefaultCargo,
	initialCargoState,
	cargoFormReducer
} from '../reducers/cargoFormReducer'
import { CargoSaveService } from '../service/cargoSave.service'
import { CargoCreator } from '../../application/CargoCreator'
import { useCargoInitialData } from './useCargoInitialData'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'

const repository = new CargoSaveService()
const cargoCreator = new CargoCreator(repository, useAuthStore.getState().events)

/**
 * A React hook for managing cargo creation and update forms.
 * It handles form state, validation errors, and interactions with the CargoCreator service.
 * @param defaultState - Optional initial state for the form, typically used for editing existing cargos.
 * @returns An object containing form data, mode, errors, required fields, disabled fields, and various handlers.
 */
export function useCreateCargo(defaultState?: DefaultCargo) {
	const { initialData, mode, refreshInitialData, isError, isLoading, isNotFound, onRetry } =
		useCargoInitialData(defaultState ?? initialCargoState.formData)

	const cargoSaveFn = useCallback(async (data: DefaultCargo) => {
		return await cargoCreator.create(data)
	}, [])

	const {
		discardChanges,
		handleSubmit,
		handleChange,
		key,
		formData,
		disabled,
		required,
		errors,
		hasChanges,
		isSubmitting
	} = useFormHandler({
		entityName: 'cargos',
		initialState: initialCargoState,
		reducer: cargoFormReducer,
		initialData,
		saveFn: cargoSaveFn,
		refreshInitialData
	})

	return {
		key,
		formData,
		mode,
		errors,
		isError,
		disabled,
		required,
		isLoading,
		isSubmitting,
		isNotFound,
		hasChanges,
		onRetry,
		discardChanges,
		handleSubmit,
		handleChange
	}
}
