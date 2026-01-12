import { useCallback } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'
import { useProcessorInitialData } from './useProcessorInitialData'
import { ProcessorCreator } from '../../application/ProcessorCreator'
import { ProcessorSaveService } from '../service/processorSave.service'
import { initialProcessorState, processorFormReducer } from '../reducers/processorFormReducer'
import { type ProcessorParams } from '../../domain/dto/Processor.dto'

const repository = new ProcessorSaveService()
const processorCreator = new ProcessorCreator(repository, useAuthStore.getState().events)

/**
 * `useCreateProcessor`
 * @function
 * @description Hook personalizado para gestionar la creación y actualización de marcas.
 * Utiliza un reducer para manejar el estado del formulario y se integra con los servicios de aplicación.
 * @param {ProcessorParams} [defaultState] - El estado inicial opcional para el formulario de la marca.
 * @returns {object} Un objeto con el estado del formulario, funciones de manejo y metadatos.
 */

export function useCreateProcessor(defaultState?: ProcessorParams) {
	const { initialData, mode, refreshInitialData, isError, isLoading, isNotFound, onRetry } =
		useProcessorInitialData(defaultState ?? initialProcessorState.formData)
	const processorSaveFn = useCallback(async (data: ProcessorParams) => {
		return await processorCreator.create(data)
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
		entityName: 'processors',
		initialState: initialProcessorState,
		reducer: processorFormReducer,
		initialData,
		saveFn: processorSaveFn,
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
