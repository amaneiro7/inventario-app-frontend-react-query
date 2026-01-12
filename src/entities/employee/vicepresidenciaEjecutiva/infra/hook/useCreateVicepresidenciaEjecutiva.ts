import { useCallback } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import {
	type DefaultVicepresidenciaEjecutiva,
	initialVicepresidenciaEjecutivaState,
	vicepresidenciaEjecutivaFormReducer
} from '../reducers/vicepresidenciaEjecutivaFormReducer'
import { type VicepresidenciaEjecutivaParams } from '../../domain/dto/VicepresidenciaEjecutiva.dto'
import { VicepresidenciaEjecutivaSaveService } from '../service/vicepresidenciaEjecutivaSave.service'
import { VicepresidenciaEjecutivaCreator } from '../../application/VicepresidenciaEjecutivaCreator'
import { useVicepresidenciaEjecutivaInitialData } from './useVicepresidenciaEjecutivaInitialData'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'

const repository = new VicepresidenciaEjecutivaSaveService()
const vicepresidenciaEjecutivaCreator = new VicepresidenciaEjecutivaCreator(
	repository,
	useAuthStore.getState().events
)
/**
 * A React hook for managing vicepresidencia ejecutiva creation and update forms.
 * It handles form state, validation errors, and interactions with the VicepresidenciaEjecutivaCreator service.
 * @param defaultState - Optional initial state for the form, typically used for editing existing vicepresidencias ejecutivas.
 * @returns An object containing form data, mode, errors, required fields, and various handlers.
 */
export function useCreateVicepresidenciaEjecutiva(defaultState?: DefaultVicepresidenciaEjecutiva) {
	const { initialData, mode, refreshInitialData, isError, isLoading, isNotFound, onRetry } =
		useVicepresidenciaEjecutivaInitialData(
			defaultState ?? initialVicepresidenciaEjecutivaState.formData
		)
	const vicepresidenciaEjecutivaSaveFn = useCallback(
		async (data: VicepresidenciaEjecutivaParams) => {
			return await vicepresidenciaEjecutivaCreator.create(data)
		},
		[]
	)
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
		entityName: 'vicepresidenciaEjecutivas',
		initialState: initialVicepresidenciaEjecutivaState,
		reducer: vicepresidenciaEjecutivaFormReducer,
		initialData,
		saveFn: vicepresidenciaEjecutivaSaveFn,
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
