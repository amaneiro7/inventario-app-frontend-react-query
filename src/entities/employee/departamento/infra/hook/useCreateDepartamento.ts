import { useCallback } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import {
	type DefaultDepartamento,
	initialDepartamentoState,
	departamentoFormReducer
} from '../reducers/departamentoFormReducer'
import { type DepartamentoParams } from '../../domain/dto/Departamento.dto'
import { DepartamentoSaveService } from '../service/departamentoSave.service'
import { DepartamentoCreator } from '../../application/DepartamentoCreator'
import { useDepartamentoInitialData } from './useDepartamentoInitialData'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'

const repository = new DepartamentoSaveService()
const departamentoCreator = new DepartamentoCreator(repository, useAuthStore.getState().events)

/**
 * A React hook for managing departamento creation and update forms.
 * It handles form state, validation errors, and interactions with the DepartamentoCreator service.
 * @param defaultState - Optional initial state for the form, typically used for editing existing departamentos.
 * @returns An object containing form data, mode, errors, required fields, disabled fields, and various handlers.
 */
export function useCreateDepartamento(defaultState?: DefaultDepartamento) {
	const { initialData, mode, refreshInitialData, isError, isLoading, isNotFound, onRetry } =
		useDepartamentoInitialData(defaultState ?? initialDepartamentoState.formData)

	const departamentoSaveFn = useCallback(async (data: DepartamentoParams) => {
		return await departamentoCreator.create(data)
	}, [])

	const {
		discardChanges,
		handleSubmit,
		handleChange,
		key,
		formData,
		errors,
		hasChanges,
		isSubmitting,
		required,
		disabled
	} = useFormHandler({
		entityName: 'departamentos',
		initialState: initialDepartamentoState,
		reducer: departamentoFormReducer,
		initialData,
		saveFn: departamentoSaveFn,
		refreshInitialData
	})

	return {
		key,
		formData,
		mode,
		errors,
		isError,
		isLoading,
		isSubmitting,
		isNotFound,
		hasChanges,
		onRetry,
		discardChanges,
		handleSubmit,
		handleChange,
		required,
		disabled
	}
}
