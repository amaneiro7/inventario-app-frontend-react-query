import { useCallback } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import {
	type DefaultVicepresidencia,
	initialVicepresidenciaState,
	vicepresidenciaFormReducer
} from '../reducers/vicepresidenciaFormReducer'
import { type VicepresidenciaParams } from '../../domain/dto/Vicepresidencia.dto'
import { VicepresidenciaSaveService } from '../service/vicepresidenciaSave.service'
import { VicepresidenciaCreator } from '../../application/VicepresidenciaCreator'
import { useVicepresidenciaInitialData } from './useVicepresidenciaInitialData'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'

const repository = new VicepresidenciaSaveService()
const vicepresidenciaCreator = new VicepresidenciaCreator(
	repository,
	useAuthStore.getState().events
)
/**
 * A React hook for managing vicepresidencia  creation and update forms.
 * It handles form state, validation errors, and interactions with the VicepresidenciaCreator service.
 * @param defaultState - Optional initial state for the form, typically used for editing existing vicepresidencias s.
 * @returns An object containing form data, mode, errors, required fields, and various handlers.
 */
export function useCreateVicepresidencia(defaultState?: DefaultVicepresidencia) {
	const { initialData, mode, refreshInitialData, isError, isLoading, isNotFound, onRetry } =
		useVicepresidenciaInitialData(defaultState ?? initialVicepresidenciaState.formData)
	const vicepresidenciaSaveFn = useCallback(async (data: VicepresidenciaParams) => {
		return await vicepresidenciaCreator.create(data)
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
		disabled,
		required,
		submitError
	} = useFormHandler({
		entityName: 'vicepresidencias',
		initialState: initialVicepresidenciaState,
		reducer: vicepresidenciaFormReducer,
		initialData,
		saveFn: vicepresidenciaSaveFn,
		refreshInitialData
	})

	return {
		key,
		formData,
		mode,
		errors,
		disabled,
		required,
		isError,
		isLoading,
		isSubmitting,
		isNotFound,
		hasChanges,
		submitError,
		onRetry,
		discardChanges,
		handleSubmit,
		handleChange
	}
}
