import { useCallback } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import {
	type DefaultDirectiva,
	initialDirectivaState,
	directivaFormReducer
} from '../reducers/directivaFormReducer'
import { type DirectivaParams } from '../../domain/dto/Directiva.dto'
import { DirectivaSaveService } from '../service/directivaSave.service'
import { DirectivaCreator } from '../../application/DirectivaCreator'
import { useDirectivaInitialData } from './useDirectivaInitialData'

import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'

const repository = new DirectivaSaveService()
const directivaCreator = new DirectivaCreator(repository, useAuthStore.getState().events)

/**
 * A React hook for managing directiva creation and update forms.
 * It handles form state, validation errors, and interactions with the DirectivaCreator service.
 * @param defaultState - Optional initial state for the form, typically used for editing existing directivas.
 * @returns An object containing form data, mode, errors, required fields, and various handlers.
 */
export function useCreateDirectiva(defaultState?: DefaultDirectiva) {
	const { initialData, mode, refreshInitialData, isError, isLoading, isNotFound, onRetry } =
		useDirectivaInitialData(defaultState ?? initialDirectivaState.formData)
	const directviaSaveFn = useCallback(async (data: DirectivaParams) => {
		return await directivaCreator.create(data)
	}, [])

	const {
		discardChanges,
		handleSubmit,
		handleChange,
		key,
		formData,
		errors,
		hasChanges,
		required,
		disabled,
		isSubmitting,
		submitError
	} = useFormHandler({
		entityName: 'directivas',
		initialState: initialDirectivaState,
		reducer: directivaFormReducer,
		initialData,
		saveFn: directviaSaveFn,
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
		required,
		disabled,
		submitError,
		onRetry,
		discardChanges,
		handleSubmit,
		handleChange
	}
}
