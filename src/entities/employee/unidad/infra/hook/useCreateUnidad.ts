import { useCallback } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import {
	type DefaultUnidad,
	initialUnidadState,
	unidadFormReducer
} from '../reducers/unidadFormReducer'
import { type UnidadDto, type UnidadParams } from '../../domain/dto/Unidad.dto'
import { UnidadSaveService } from '../service/unidadSave.service'
import { UnidadCreator } from '../../application/UnidadCreator'
import { useUnidadInitialData } from './useUnidadInitialData'

import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'

const repository = new UnidadSaveService()
const unidadCreator = new UnidadCreator(repository, useAuthStore.getState().events)

/**
 * A React hook for managing Unidad creation and update forms.
 * It handles form state, validation errors, and interactions with the UnidadCreator service.
 * @param defaultState - Optional initial state for the form, typically used for editing existing Unidads.
 * @returns An object containing form data, mode, errors, required fields, and various handlers.
 */
export function useCreateUnidad(defaultState?: DefaultUnidad) {
	const { initialData, mode, refreshInitialData, isError, isLoading, isNotFound, onRetry } =
		useUnidadInitialData(defaultState ?? initialUnidadState.formData)
	const directviaSaveFn = useCallback(async (data: UnidadParams) => {
		return await unidadCreator.create(data)
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
		submitError,
		dispatch
	} = useFormHandler({
		entityName: 'Unidads',
		initialState: initialUnidadState,
		reducer: unidadFormReducer,
		initialData,
		saveFn: directviaSaveFn,
		refreshInitialData
	})

	const handleParentChange = useCallback(
		async ({
			value,
			full_chain
		}: {
			value: UnidadDto['id']
			full_chain: UnidadDto['full_chain']
		}) => {
			dispatch({
				type: 'parentId',
				payload: { value, full_chain }
			})
		},
		[]
	)

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
		handleChange,
		handleParentChange
	}
}
